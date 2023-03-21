import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  uid: string;
  nickname: string;
}

export const selectedUserSlice = createSlice({
  name: "selectedChat",
  initialState: {} as IUser,
  reducers: {
    saveSelectedUser: (state, action: PayloadAction<IUser>) => action.payload,
  },
});

export const { saveSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;
