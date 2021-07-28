import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Article from "./ArticleComponent";

const TITLE = "TEST TITLE";
const URL = "TEST URL";
const SNIPPET = "TEST SNIPPET";

describe("<Article> component", () => {
  beforeEach(() => {
    render(<Article title={TITLE} snippet={SNIPPET} url={URL} />);
  });

  test("should render title", () => {
    const title = screen.getByText(TITLE);

    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H5");
  });

  test("should render snippet", () => {
    const snippet = screen.getByText(SNIPPET);

    expect(snippet).toBeInTheDocument();
    expect(snippet.tagName).toBe("P");
  });

  test("should render button link", () => {
    const buttonLink = screen.getByRole("link");

    expect(buttonLink).toBeInTheDocument();
    expect(buttonLink.textContent).toBe("Open");
    expect(buttonLink.getAttribute("href")).toBe(URL);
  });
});
