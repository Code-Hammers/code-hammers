import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  IApplicationFormData,
  IApplication,
} from "../../../types/applications";

interface ApplicationState {
  application: IApplication | null;
  status: "idle" | "loading" | "failed" | "creating" | "updating" | "deleting";
  error: string | null;
}

const initialState: ApplicationState = {
  application: null,
  status: "idle",
  error: null,
};

export const createApplication = createAsyncThunk(
  "application/createApplication",
  async (applicationData: IApplicationFormData, thunkAPI) => {
    try {
      const response = await axios.post("/api/applications", applicationData);
      return response.data;
    } catch (error) {
      let errorMessage = "An error occurred during application creation";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateApplication = createAsyncThunk(
  "applications/updateApplication",
  async (
    { id, ...formData }: Partial<IApplicationFormData> & { id: number },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(`/api/applications/${id}`, formData);
      return response.data;
    } catch (error) {
      let errorMessage = "An error occurred during application update";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

//TODO Build out delete thunks

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    resetApplicationState(state) {
      state.application = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createApplication.pending, (state) => {
        state.status = "creating";
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.application = action.payload;
        state.status = "idle";
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateApplication.pending, (state) => {
        state.status = "updating";
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        state.application = action.payload;
        state.status = "idle";
      })
      .addCase(updateApplication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetApplicationState } = applicationSlice.actions;
export default applicationSlice.reducer;
