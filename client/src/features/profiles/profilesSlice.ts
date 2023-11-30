import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProfile } from "../../../types/profile";

interface ProfilesState {
  profiles: IProfile[]; //TODO ADD PROPER TYPING ONCE OBJECT IS FINALIZED
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: ProfilesState = {
  profiles: [],
  status: "idle",
  error: null,
};

export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/profiles");
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
      state.profiles = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
        state.status = "idle";
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = "failed";
        //state.error = action.payload as string; WHAT WOULD PAYLOAD LOOK LIKE HERE?
        //TODO BUILD AN ERROR STATE TRACKER FOR CURRENT ERROR INFO
      });
  },
});

export default profilesSlice.reducer;
