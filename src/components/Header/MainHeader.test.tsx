import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import MainHeader from "./MainHeader";

describe("<MainHeader> component", () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <MainHeader />
      </Router>
    );
  });

  test("should render title", () => {
    const title = screen.getByRole("heading");
    expect(title).toBeInTheDocument();
  });

  test("should render l3 links", () => {
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(3);
  });

  test("should render first Home link", () => {
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("Home");
    expect(links[0].getAttribute("href")).toBe("/");
  });

  test("should render first Wiki Search link", () => {
    const links = screen.getAllByRole("link");
    expect(links[1]).toHaveTextContent("Wiki search");
    expect(links[1].getAttribute("href")).toBe("/wiki-search");
  });

  test("should render first Location Search link", () => {
    const links = screen.getAllByRole("link");
    expect(links[2]).toHaveTextContent("Location search");
    expect(links[2].getAttribute("href")).toBe("/location-search");
  });
});

describe("<MainHeader> links panel", () => {
  test("should have only Home page selected", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <MainHeader />
      </Router>
    );
    const links = screen.getAllByRole("link");
    const homeLink = links.find(
      (link) => link.textContent === "Home"
    ) as HTMLLinkElement;
    const wikiLink = links.find(
      (link) => link.textContent === "Wiki search"
    ) as HTMLLinkElement;
    const locationLink = links.find(
      (link) => link.textContent === "Location search"
    ) as HTMLLinkElement;
    expect(homeLink.className).toMatch("active");
    expect(wikiLink.className).not.toMatch("active");
    expect(locationLink.className).not.toMatch("active");
  });

  test("should have only Wiki search page selected", () => {
    const history = createMemoryHistory();
    history.push("/wiki-search");

    render(
      <Router history={history}>
        <MainHeader />
      </Router>
    );
    const links = screen.getAllByRole("link");
    const homeLink = links.find(
      (link) => link.textContent === "Home"
    ) as HTMLLinkElement;
    const wikiLink = links.find(
      (link) => link.textContent === "Wiki search"
    ) as HTMLLinkElement;
    const locationLink = links.find(
      (link) => link.textContent === "Location search"
    ) as HTMLLinkElement;
    expect(homeLink.className).not.toMatch("active");
    expect(wikiLink.className).toMatch("active");
    expect(locationLink.className).not.toMatch("active");
  });

  test("should have only Wiki search page selected", () => {
    const history = createMemoryHistory();
    history.push("/location-search");

    render(
      <Router history={history}>
        <MainHeader />
      </Router>
    );
    const links = screen.getAllByRole("link");
    const homeLink = links.find(
      (link) => link.textContent === "Home"
    ) as HTMLLinkElement;
    const wikiLink = links.find(
      (link) => link.textContent === "Wiki search"
    ) as HTMLLinkElement;
    const locationLink = links.find(
      (link) => link.textContent === "Location search"
    ) as HTMLLinkElement;
    expect(homeLink.className).not.toMatch("active");
    expect(wikiLink.className).not.toMatch("active");
    expect(locationLink.className).toMatch("active");
  });
});
