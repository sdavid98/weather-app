import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import { citiesSlice, RootState } from "./index";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = { cities: [] },
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const store = configureStore({
    reducer: { cities: citiesSlice.reducer },
    preloadedState,
  });

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
