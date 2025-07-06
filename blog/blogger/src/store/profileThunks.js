import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/auth"
import profileService from "../appwrite/profile"

export const registerUserAndCreateProfile = createAsyncThunk(
  'user/registerAndCreateProfile',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      // 1. Register user and create session
      const session = await authService.createAccount({ email, password, name });

      // 2. Get user details
      const user = await authService.getCurrentUser();
      if (!user) throw new Error("Failed to get user data after registration");

      // 3. Create profile document
      const profile = await profileService.createUserProfile({
        userId: user.$id,
        name: user.name,
        email: user.email,
      });

      return { user, session, profile }; // <-- Include profile
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const createUserProfile = createAsyncThunk(
    'profile/createUserProfile',
    async ({ userId, name, email }, { rejectWithValue }) => {
        try {
            const profile = await profileService.createUserProfile({ userId, name, email });
            return profile;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async (userId, { rejectWithValue }) => {
        try {
            const profile = await profileService.getProfile(userId);
            return profile;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async ({ userId, data }, { rejectWithValue }) => {
        try {
            // 1. Fetch the profile document for this user
            const profileDocs = await profileService.findProfileByUserId(userId);
            if (!profileDocs || profileDocs.length === 0) {
                throw new Error("Profile not found for user");
            }
            const documentId = profileDocs[0].$id;

            // 2. Update the profile using the documentId
            const profile = await profileService.updateProfile(documentId, data);
            return profile;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);