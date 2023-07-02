import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Search from "./Search";
import * as requests from "../requests";
import { renderWithProviders } from "../store/test-utils";
import { CapitalInfo } from "../types/types";

describe("<Search />", () => {
  let fetchSpy: jest.SpyInstance<Promise<CapitalInfo[]>, [], any>;
  beforeEach(() => {
    fetchSpy = jest.spyOn(requests, "fetchCitiesData").mockImplementation(() =>
      Promise.resolve([
        {
          capital: "Diego Garcia",
          countryCode: "IO",
        },
      ])
    );
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test("should fetch list of cities", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    expect(fetchSpy).toHaveBeenCalled();
    const searchInput = await screen.findByPlaceholderText(
      "Search for capitals!"
    );

    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, "d");
    expect(searchInput).toHaveValue("d");

    const cityName = await screen.findByText("iego Garcia"); // d is separated for coloring
    expect(cityName).toBeInTheDocument();
  });
});
