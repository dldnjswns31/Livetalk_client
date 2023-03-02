import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import userReducers from "./slice/userSlice";
import userListReducers from "./slice/userListSlice";
import selectedUserReducers from "./slice/selectedUserSlice";

const logger = createLogger();

const store = configureStore({
  reducer: {
    user: userReducers,
    userList: userListReducers,
    selectedUser: selectedUserReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
