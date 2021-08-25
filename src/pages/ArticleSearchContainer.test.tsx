import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ArticleSearchContainer from "./ArticleSearchContainer";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import TEST_DATA from "../wikipediaTestData.json";
import { WikiContextProvider } from "../store/wiki-context";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("<ArticleSearchContainer> component", () => {
  beforeEach(() => {
      render(
        <WikiContextProvider>
          <ArticleSearchContainer />
        </WikiContextProvider>
      );
  });

  test("should render search bar", () => {
    const element = screen.getByRole("textbox");
    expect(element).toBeInTheDocument();
  });

  test("should render prompt text", () => {
    const element = screen.getByText("Search in Wikipedia");
    expect(element).toBeInTheDocument();
  });

  test("should not render article list if search box empty", () => {
    const elements = screen.queryByRole("list");
    expect(elements).not.toBeInTheDocument();
  });

  test("should article list if search box filled in", async () => {
    mockedAxios.get.mockResolvedValueOnce(TEST_DATA);

    const searchBox = screen.getByRole("textbox");
    userEvent.type(searchBox, "test");

    const elements = await screen.findAllByRole("listitem");
    expect(elements).not.toHaveLength(0);
  });

  test("should not display prompt text if search box filled in", async () => {
    mockedAxios.get.mockResolvedValueOnce(TEST_DATA);

    const searchBox = screen.getByRole("textbox");
    userEvent.type(searchBox, "test");

    await screen.findAllByRole("listitem");
    const element = screen.queryByText("Search in Wikipedia");
    expect(element).toBeNull();
  });
});
