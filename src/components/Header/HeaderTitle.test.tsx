import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory, MemoryHistory } from "history";
import HeaderTitle from "./HeaderTitle";

describe("<HeaderTitle> component", () => {
  let history: MemoryHistory;

  beforeAll(() => {
    history = createMemoryHistory();
  });

  test("should render Home title when on home page", () => {
    render(
      <Router history={history}>
        <HeaderTitle />
      </Router>
    );

    const title = screen.getByText("Home");
    expect(title).toBeInTheDocument();
  });

  test("should render Wiki Search title when on /wiki-search page", () => {
    history.push("/wiki-search");

    render(
      <Router history={history}>
        <HeaderTitle />
      </Router>
    );

    const title = screen.getByText("Wiki search");
    expect(title).toBeInTheDocument();
  });

  test("should render Location Search title when on /location-search page", () => {
    history.push("/location-search");

    render(
      <Router history={history}>
        <HeaderTitle />
      </Router>
    );

    const title = screen.getByText("Location search");
    expect(title).toBeInTheDocument();
  });
});
