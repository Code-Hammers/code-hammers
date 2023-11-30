import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProfile } from "../../../types/profile";

interface ProfileState {
  profile: IProfile | null; //TODO ADD PROPER TYPING ONCE OBJECT IS FINALIZED
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  status: "idle",
  error: null,
};

//TODO REVIEW TYPING
export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userID: string, thunkAPI) => {
    try {
      const response = await axios.get(`/api/profiles/${userID}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Error fetching profiles"
        );
      }
      return thunkAPI.rejectWithValue("An unexpected error occurred");
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
        //TODO state.error = action.payload as string; WHAT WOULD PAYLOAD LOOK LIKE HERE?
        //TODO HOOK UP GOOD ERROR INFO TO ERROR STATE
      });
  },
});

export default userProfileSlice.reducer;
