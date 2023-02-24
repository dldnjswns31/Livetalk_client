import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import userReducers from "./slice/userSlice";

const logger = createLogger();

const store = configureStore({
  reducer: { user: userReducers },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
