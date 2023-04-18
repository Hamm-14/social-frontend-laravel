import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type AppSlice = {
  token: string;
};

const initialState: AppSlice = {
  token: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state: AppSlice, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = appSlice.actions;

const selectAppSlice = (state: RootState) => state.app;

export const selectToken = createSelector(selectAppSlice, (app) => app.token);
