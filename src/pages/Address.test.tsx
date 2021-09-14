import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import TEST_DATA from "../locationsTestData.json";
import DETAILED_TEST_DATA from "../locationDetailsTestData.json";
import { LocationContextProvider } from "../store/address-context";
import PlaceType from "../models/PlaceType";
import Address from "./Address";
import GeocoderResult from "../models/GeocoderResult";

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
    render(
      <LocationContextProvider>
        <Address />
      </LocationContextProvider>
    );
    setUpGoogleMocks();
  });

  test("should render autocomplete prompts if search box filled in", async () => {
    const searchBox = screen.getByRole("textbox");
    userEvent.type(searchBox, "test");

    const autocompletePrompts = await screen.findAllByRole("option");
    expect(autocompletePrompts.length).toBe(5);
  });

  test("should render address if search box filled in", async () => {
    const searchBox = screen.getByRole("textbox");
    userEvent.type(searchBox, "test");

    const autocompletePrompts = await screen.findAllByRole("option");
    userEvent.click(autocompletePrompts[0]);

    const title = screen.getByText("Selected Address");
    const textFields = screen.getAllByRole("textbox");

    expect(title).toBeInTheDocument();
    expect(textFields.length).toBe(6);
    textFields.forEach((textfield) => expect(textfield).toHaveValue());
  });
});
