import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { CapitalInfo } from "../types/types";

const initialState: CapitalInfo[] = [];

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<CapitalInfo>) => {
      state.push(action.payload);
    },
  },
});

export const { addCity } = citiesSlice.actions;

export const store = configureStore({
  reducer: {
    cities: citiesSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
