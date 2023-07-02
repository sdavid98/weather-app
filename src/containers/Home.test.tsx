import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../store/test-utils";
import Home from "./Home";

describe("<Home />", () => {
  test("should list stored cities", () => {
    renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      {
        preloadedState: {
          cities: [
            { capital: "Budapest", countryCode: "hu" },
            { capital: "Berlin", countryCode: "de" },
          ],
        },
      }
    );

    expect(screen.getByText("Budapest")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
  });
});
