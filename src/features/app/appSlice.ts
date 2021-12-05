import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { AppState } from "../../model/negocio";

const initialState: AppState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export const {} = appSlice.actions;

export const selectForm = (state: RootState) => state.app;

export default appSlice.reducer;
