import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddressFields from "./AddressFields";
import TEST_DATA from "../../locationDetailsTestData.json";
import GeocoderResult from "../../models/GeocoderResult";
import AddressContext from "../../store/address-context";
import Address from "../../models/Address";

const MOCK_ADDRESS = Address.fromGeocoderResult(TEST_DATA[0] as any as GeocoderResult);

const MOCK_ADDRESS_STATE = {
  searchInput: "",
  options: [],
  address: MOCK_ADDRESS,
  addresses: [],
  isFormValidated: false,
  onFirstNameChange: () => {},
  onLastNameChange: () => {},
  onSearchInputChange: () => {},
  onAddressChange: () => {},
  onSubmit: () => {},
};

describe("<AddressFields> component", () => {
  beforeEach(() => {
    render(
      <AddressContext.Provider value={MOCK_ADDRESS_STATE}>
        <AddressFields />
      </AddressContext.Provider>
    );
  });

  test("should render second step subtitle", () => {
    const title = screen.getByText("2. Fill-up personal info");

    expect(title).toBeInTheDocument();
  });

  test("should render first name empty field", () => {
    const firstName = screen.getByLabelText("Imię");

    expect(firstName).toBeInTheDocument();
    expect(firstName).toHaveValue("");
  });

  test("should render last name empty field", () => {
    const lastName = screen.getByLabelText("Nazwisko");

    expect(lastName).toBeInTheDocument();
    expect(lastName).toHaveValue("");
  });

  test("should render street name", () => {
    const street = screen.getByLabelText("Ulica");

    expect(street).toBeInTheDocument();
    expect(street).toHaveValue(MOCK_ADDRESS.street);
  });

  test("should render street number", () => {
    const street = screen.getByLabelText("Numer");

    expect(street).toBeInTheDocument();
    expect(street).toHaveValue(MOCK_ADDRESS.number);
  });

  test("should render postal code", () => {
    const street = screen.getByLabelText("Kod pocztowy");

    expect(street).toBeInTheDocument();
    expect(street).toHaveValue(MOCK_ADDRESS.postalCode);
  });

  test("should render city name", () => {
    const street = screen.getByLabelText("Miasto");

    expect(street).toBeInTheDocument();
    expect(street).toHaveValue(MOCK_ADDRESS.city);
  });

  test("should render country", () => {
    const street = screen.getByLabelText("Państwo");

    expect(street).toBeInTheDocument();
    expect(street).toHaveValue(MOCK_ADDRESS.country);
  });

  test("should render save button", () => {
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });
});
