import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import TEST_DATA from "../locationsTestData.json";
import DETAILED_TEST_DATA from "../locationDetailsTestData.json";
import { AddressContextProvider } from "../store/address-context";
import PlaceType from "../models/PlaceType";
import Address from "./Address";
import GeocoderResult from "../models/GeocoderResult";
import AddressModel from "../models/Address";
import axios from "axios";
import AddressApiResponse from "../models/AddressApiResponse";
import { act } from "react-dom/test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const MOCK_ADDRESS = AddressModel.fromGeocoderResult(DETAILED_TEST_DATA[0] as any as GeocoderResult);

const ERROR_RED = "rgb(244, 67, 54)";

const setUpGoogleMocks = () => {
  (window as any).google = {
    maps: {
      places: {
        AutocompleteService: function () {
          return {
            getPlacePredictions: (input: { input: string }, callback: (results?: PlaceType[]) => void) => {
              callback(TEST_DATA as any as PlaceType[]);
            },
          };
        },
      },
      Geocoder: function () {
        return {
          geocode: (placeId: { placeId: string }, callback: (result?: GeocoderResult) => void) => {
            callback(DETAILED_TEST_DATA as any as GeocoderResult);
          },
        };
      },
    },
  };
};

describe("<Address> component", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce([]);

    render(
      <AddressContextProvider>
        <Address />
      </AddressContextProvider>
    );
    setUpGoogleMocks();
  });

  test("should render title", async () => {
    const title = screen.getByText("Add new address");

    expect(title).toBeInTheDocument();
  });

  test("should render first step prompt", async () => {
    const subtitle = screen.getByText("1. Find location");

    expect(subtitle).toBeInTheDocument();
  });

  test("should render empty Saved addresses list", async () => {
    const savedAddressesTitle = screen.getByText("Saved addresses");
    const emptyListTitle = screen.getByText("Nothing to show");

    expect(savedAddressesTitle).toBeInTheDocument();
    expect(emptyListTitle).toBeInTheDocument();
  });

  test("should render autocomplete prompts if search box filled in", async () => {
    const searchBox = screen.getByRole("textbox");
    userEvent.type(searchBox, "test");

    const autocompletePrompts = await screen.findAllByRole("option");
    expect(autocompletePrompts.length).toBe(5);
  });

  test("should render address if search box filled in", async () => {
    await fillUpSearchBox();

    const title = await screen.findByText("2. Fill-up personal info");
    const textFields = await screen.findAllByRole("textbox");

    expect(title).toBeInTheDocument();
    expect(textFields.length).toBe(8);
    textFields.forEach((textfield) => {
      if (!(textfield.id == "Imię" || textfield.id == "Nazwisko")) expect(textfield).toHaveValue();
    });
  });

  test("should not add address with no firstname and lastname", async () => {
    await fillUpSearchBox();

    const button = await screen.findByRole("button");
    userEvent.click(button);

    const firstNameLabel = (await screen.findAllByText("Imię")).find((el) => el.tagName === "LABEL");
    expect(getComputedStyle(firstNameLabel!).color).toBe(ERROR_RED);

    const lastNameLabel = (await screen.findAllByText("Nazwisko")).find((el) => el.tagName === "LABEL");
    expect(getComputedStyle(lastNameLabel!).color).toBe(ERROR_RED);

    const emptyListTitle = screen.getByText("Nothing to show");
    expect(emptyListTitle).toBeInTheDocument();
    const addressesList = screen.queryAllByRole("listitem");
    expect(addressesList.length).toBe(0);
  });

  test("should add correct address", async () => {
    const MOCK_FRIST_NAME = "test";
    const MOCK_LAST_NAME = "test";
    MOCK_ADDRESS.firstName = MOCK_FRIST_NAME;
    MOCK_ADDRESS.lastName = MOCK_LAST_NAME;
    mockedAxios.post.mockResolvedValueOnce({ data: new AddressApiResponse(MOCK_ADDRESS) });

    await fillUpSearchBox();

    const firstNameInput = await screen.findByLabelText("Imię");
    userEvent.type(firstNameInput, MOCK_FRIST_NAME);

    const lastNameInput = await screen.findByLabelText("Nazwisko");
    userEvent.type(lastNameInput, MOCK_LAST_NAME);

    await act(async () => {
      const button = await screen.findByRole("button");
      userEvent.click(button);
    });

    const addressesList = await screen.findAllByRole("listitem");
    expect(addressesList.length).toBe(1);
  });

  const fillUpSearchBox = async () => {
    const searchBox = screen.getByRole("textbox");
    userEvent.type(searchBox, "test");

    const autocompletePrompts = await screen.findAllByRole("option");
    userEvent.click(autocompletePrompts[0]);
  };
});
