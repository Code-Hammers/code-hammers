import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IApplication } from "../../../types/applications";

interface ApplicationsState {
  applications: IApplication[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: ApplicationsState = {
  applications: [],
  status: "idle",
  error: null,
};

export const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/applications");
      return response.data;
    } catch (error) {
      let errorMessage = "An error occurred during fetching applications";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.applications = action.payload;
        state.status = "idle";
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default applicationsSlice.reducer;
