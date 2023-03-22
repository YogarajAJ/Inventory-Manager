import { configureStore } from "@reduxjs/toolkit";
import inventoryFormReducer from "./slices/InventorySlice";
import userReducer from "./slices/userSlice";
import loaderReducer from "./slices/LoaderSlice";

export const store = configureStore({
  reducer: {
    inventory: inventoryFormReducer,
    user: userReducer,
    loader: loaderReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
