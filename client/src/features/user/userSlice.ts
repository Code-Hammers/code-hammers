import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IUser } from '../../../types/user';

export interface UserState {
  userData: IUser | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

export const initialState: UserState = {
  userData: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });

      if (response.status === 400 || response.status === 401) {
        const errorMessage = response.data.msg || 'An error occurred during login';
        return thunkAPI.rejectWithValue(errorMessage);
      }

      return response.data;
    } catch (error) {
      let errorMessage = 'An error occurred during login';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userData = action.payload;
      })
      .addCase(
        loginUser.rejected,
        (
          state,
          action: PayloadAction<
            unknown,
            string,
            {
              arg: { email: string; password: string };
              requestId: string;
              requestStatus: 'rejected';
              aborted: boolean;
              condition: boolean;
            },
            SerializedError
          >,
        ) => {
          state.status = 'failed';
          // Ensure the payload is treated as a strings
          state.error = action.payload as string;
        },
      );
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
