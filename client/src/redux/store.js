import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cakeReducer from "./cakeSlice";
export const store = configureStore({
  reducer: { user: userReducer, cake: cakeReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
