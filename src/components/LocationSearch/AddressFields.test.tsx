import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddressFields from "./AddressFields";
import TEST_DATA from "../../locationDetailsTestData.json";
import Address from "../../models/Address";
import GeocoderResult from "../../models/GeocoderResult";

const ADDRESS = new Address(TEST_DATA[0] as any as GeocoderResult);

describe("<AddressFields> component", () => {
  beforeEach(() => {
    render(<AddressFields address={ADDRESS} />);
  });

  test("should render title", () => {
    const title = screen.getByText("Selected Address");

    expect(title).toBeInTheDocument();
  });

  test("should render street name", () => {
    const street = screen.getByLabelText("Ulica");

    expect(street).toBeInTheDocument();
    expect(street).toHaveValue(ADDRESS.street);
  });

  test("should render street number", () => {
    const street = screen.getByLabelText("Numer");

    expect(street).toBeInTheDocument();
    expect(street).toHaveValue(ADDRESS.number);
  });

  test("should render postal code", () => {
    const street = screen.getByLabelText("Kod pocztowy");

    expect(street).toBeInTheDocument();
    expect(street).toHaveValue(ADDRESS.postalCode);
  });

  test("should render city name", () => {
    const street = screen.getByLabelText("Miasto");

    expect(street).toBeInTheDocument();
    expect(street).toHaveValue(ADDRESS.city);
  });

  test("should render country", () => {
    const street = screen.getByLabelText("Państwo");

    expect(street).toBeInTheDocument();
    expect(street).toHaveValue(ADDRESS.country);
  });
});
