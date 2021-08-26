import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";

describe("<Home> component", () => {
  beforeEach(() => {
    render(<Home />);
  });

  test("should render 'Welcome' title", () => {
    const title = screen.getByText("Welcome to");
    expect(title).toBeInTheDocument();
  });

  test("should render 'OmniFinder' title", () => {
    const title = screen.getByText("OmniFinder");
    expect(title).toBeInTheDocument();
  });

  test("should render Wikipedia logo", () => {
    const image = document.querySelector("img") as HTMLImageElement;
    expect(image.src).toContain("logo.png");
  });
});
