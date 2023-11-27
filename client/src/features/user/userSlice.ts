import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  userData: any; //TODO ADD PROPER TYPING ONCE USER OBJECT IS FINALIZED
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  userData: null,
  status: "idle",
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed";
        //TODO BUILD AN ERROR STATE TRACKER FOR CURRENT ERROR INFO
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
