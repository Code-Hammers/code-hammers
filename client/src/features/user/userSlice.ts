import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userName: string;
}

const initialState: UserState = {
  userName: "TEST",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state) {},
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
