import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  uid: string;
  email: string;
  nickname: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    saveUserData: (state, action: PayloadAction<IUser>) => action.payload,
  },
});

export const { saveUserData } = userSlice.actions;
export default userSlice.reducer;
