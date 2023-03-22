import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

const DEFAULT_SEARCH_CRITERIA = {
  altPartNumber: "",
  partNumber: "",
  description: "",
};

export const inventoryForm = createSlice({
  name: "inventory",
  initialState: {
    data: [],
    search: DEFAULT_SEARCH_CRITERIA,
    toggleReset: false
  },
  reducers: {
    updateForm: (state, action) => {
      const { valueKey, value } = action.payload;
      set(state, valueKey, value);
    },

    setInventoryTableData: (state, action) => {
      set(state, "tableData", action.payload);
    },

    setInventoryData: (state, action) => {
      set(state, "data", action.payload);
    },

    resetForm: (state) => {
      set(state, "toggleReset", !state.toggleReset);
    }
  },
});

export const {
  updateForm,
  resetForm,
  setInventoryData,
  setInventoryTableData,
} = inventoryForm.actions;

export default inventoryForm.reducer;
