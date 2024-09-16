import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { AddressContextProvider } from "../../store/address-context";
import LocationSearchBar from "./LocationSearchBar";

describe("<LocationSearchBar> component", () => {
  beforeEach(() => {
    render(
      <AddressContextProvider>
        <LocationSearchBar />
      </AddressContextProvider>
    );
  });

  test("should render correct label", () => {
    const searchBox = screen.getByRole("textbox");
    expect(searchBox.parentElement!.previousSibling).toHaveTextContent("Address Search");
  });


  test("should change value if typing", () => {
    const TEST_TEXT = "Test";

    const searchBox = screen.getByRole("textbox");
    userEvent.type(searchBox, TEST_TEXT);

    expect(searchBox).toHaveValue(TEST_TEXT);
  });
});
