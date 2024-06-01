import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface AlumniState {
  alumni: any[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  page: number;
  totalPages: number;
}

const initialState: AlumniState = {
  alumni: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
};

export const fetchAlumni = createAsyncThunk(
  'alumni/fetchAlumni',
  async ({ page, name, company }: { page: number; name: string; company: string }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/alumni?page=${page}&name=${encodeURIComponent(
          name,
        )}&company=${encodeURIComponent(company)}`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching alumni data');
    }
  },
);

const alumniSlice = createSlice({
  name: 'alumni',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlumni.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlumni.fulfilled, (state, action) => {
        state.alumni = action.payload.alumni;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.currentPage;
        state.status = 'idle';
      })
      .addCase(fetchAlumni.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default alumniSlice.reducer;
