import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserList {
  uid: string;
  nickname: string;
  messages: any[];
}

export const userListSlice = createSlice({
  name: "userList",
  initialState: [] as IUserList[],
  reducers: {
    saveCurrentUserList: (state, action: PayloadAction<IUserList[]>) =>
      action.payload,
  },
});

export const { saveCurrentUserList } = userListSlice.actions;
export default userListSlice.reducer;
