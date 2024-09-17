import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import { ApiContextProvider } from "../../store/api-context";
import ArticleSearchBar from "./ArticleSearchBar";
import TEST_DATA from "../../wikipediaTestData.json";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const SPINNER_CLASS = ".MuiCircularProgress-svg";

describe("<ArticleSearchBar> component", () => {
  beforeEach(() => {
    render(
      <ApiContextProvider>
        <ArticleSearchBar />
      </ApiContextProvider>
    );
  });

  test("should render correct label", () => {
    const searchBox = screen.getByRole("textbox");
    expect(searchBox.parentElement!.previousSibling).toHaveTextContent(
      "Search Article"
    );
  });

  test("should render spinner after typing", async () => {
    mockedAxios.get.mockResolvedValueOnce(TEST_DATA);
    const searchBox = screen.getByRole("textbox");
    userEvent.type(searchBox, "test");

    waitFor(() => {
      const spinner = document.querySelector(SPINNER_CLASS);
      expect(spinner).toBeInTheDocument();
    });
  });

  test("should not render spinner if not typing", () => {
    const spinner = document.querySelector(SPINNER_CLASS);
    expect(spinner).toBeNull();
  });

  test("should change value if typing", () => {
    const TEST_TEXT = "Test";
    mockedAxios.get.mockResolvedValueOnce(TEST_DATA);

    const searchBox = screen.getByRole("textbox");
    userEvent.type(searchBox, TEST_TEXT);

    expect(searchBox).toHaveValue(TEST_TEXT);
  });
});
