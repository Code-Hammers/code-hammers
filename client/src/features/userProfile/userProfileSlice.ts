import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProfile } from "../../../types/profile";

export interface ProfileState {
  profile: IProfile | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

export const initialState: ProfileState = {
  profile: null,
  status: "idle",
  error: null,
};

//TODO REVIEW TYPING
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userID: string, thunkAPI) => {
    try {
      const test = await axios.get("/api/google-sheets/auth/google");
      const response = await axios.get(`/api/profiles/${userID}`);
      return response.data;
    } catch (error) {
      let errorMessage = "An error occurred during profile retrieval";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const userProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState(state) {
      state.profile = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = "idle";
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default userProfileSlice.reducer;
