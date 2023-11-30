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

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfiles",
  async (userID, thunkAPI) => {
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

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    resetProfilesState(state) {
      state.profile = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = "idle";
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        //state.error = action.payload as string; WHAT WOULD PAYLOAD LOOK LIKE HERE?
        //TODO BUILD AN ERROR STATE TRACKER FOR CURRENT ERROR INFO
      });
  },
});

export default profilesSlice.reducer;
