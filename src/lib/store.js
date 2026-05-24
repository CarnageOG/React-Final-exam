import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../lib/slices/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
        user: userSlice,
    },
  });
};