import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { CapitalInfo } from "../types/types";

export type CitiesState = CapitalInfo[];

const initialState: CitiesState = [];

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.cities += 1;
    // },
    // decrement: (state) => {
    //   state.cities -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.cities += action.payload;
    // },
  },
});

// export const { increment, decrement, incrementByAmount } = citiesSlice.actions;

export const store = configureStore({
  reducer: {
    cities: citiesSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
