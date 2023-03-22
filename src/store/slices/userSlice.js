import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    email: "",
    password: "",
    loggedIn: false,
  },
  reducers: {
    updateUser: (state, action) => {
      const { valueKey, value } = action.payload;
      if (valueKey) set(state, valueKey, value);
    },

    resetForm: (state) => (state = {}),
  },
});

export const { updateUser, resetForm } = userSlice.actions;

export default userSlice.reducer;
