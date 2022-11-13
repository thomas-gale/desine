import { configureStore } from "@reduxjs/toolkit";
import { loadState } from "../hooks/state";
import configReducer from "./config/configSlice";

export const store = configureStore({
  devTools: true,
  reducer: {
    config: configReducer,
  },
  // preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
