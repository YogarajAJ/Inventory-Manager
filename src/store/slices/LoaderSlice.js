import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: { load: false },
  reducers: {
    updateLoader: (state, action) => {
      set(state, "load", action.payload);
    },
  },
});

export const { updateLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
