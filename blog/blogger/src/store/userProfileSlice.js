// blog/blogger/src/store/userProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileService from '../appwrite/profile';
// Async thunk to fetch user profile by ID
export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (userId) => {
    try {
      const profile = await profileService.getProfile(userId);
      if (!profile) throw new Error('User not found');
      return profile;
    } catch (error) {
      throw new Error(error.message || 'User not found');
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;