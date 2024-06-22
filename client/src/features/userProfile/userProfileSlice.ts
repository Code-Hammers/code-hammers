import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProfile } from '../../../types/profile';

export interface ProfileState {
  profile: IProfile | null;
  status: 'idle' | 'loading' | 'failed' | 'updating';
  error: string | null;
}

export const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  error: null,
};

//TODO REVIEW TYPING
export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (userID: string, thunkAPI) => {
    try {
      const response = await axios.get(`/api/profiles/${userID}`);
      return response.data;
    } catch (error) {
      let errorMessage = 'An error occurred during profile retrieval';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async ({ userID, ...updateData }: Partial<IProfile> & { userID: string }, thunkAPI) => {
    try {
      const response = await axios.put(`/api/profiles/${userID}`, updateData);
      return response.data;
    } catch (error) {
      let errorMessage = 'An error occurred during profile update';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const uploadProfilePicture = createAsyncThunk(
  'profile/uploadProfilePicture',
  async ({ formData, userID }: { formData: FormData; userID: string }, thunkAPI) => {
    try {
      const response = await axios.post(`/api/images/profile-picture/${userID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (process.env.NODE_ENV === 'development') {
        console.log('💰 Woah there, that ish costs money 💰');
        console.log('❓❓Did Big Sean approve you to tax his AWS account❓❓');
        console.log("I didn't think so, get outta here");
      }
      return response.data;
    } catch (error) {
      let errorMessage = 'An error occurred during profile picture upload';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || errorMessage;
      }
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

const userProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileState(state) {
      state.profile = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'updating';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'idle';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(uploadProfilePicture.pending, (state) => {
        state.status = 'updating';
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'idle';
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default userProfileSlice.reducer;
