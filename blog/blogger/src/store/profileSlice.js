// import conf from '../conf/conf.js';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { account, databases, Query } from '../appwrite/config.js';

// const DATABASE_ID = conf.appwriteDatabaseId;
// const COLLECTION_ID =conf.appwriteCollectionId;


// const initialState = {
//     profile: null,
//     loading: false,
//     error: null,
//   };

  
// // Thunk: fetch authenticated user's profile
// export const fetchProfile = createAsyncThunk(
//     'profile/fetchProfile',
//     async (_, { rejectWithValue }) => {
//       try {
//         // Get current user
//         const user = await account.get();
//         // Query profile collection for this user
//         const res = await databases.listDocuments(
//           DATABASE_ID,
//           COLLECTION_ID,
//           [Query.equal("userId", user.$id)]
//         );
//         if (res.documents.length === 0) throw new Error("Profile not found");
//         return { ...res.documents[0], email: user.email, username: user.name || user.$id };
//       } catch (err) {
//         return rejectWithValue(err.message || "Failed to fetch profile");
//       }
//     }
//   );

//   export const updateProfile = createAsyncThunk(
//     'profile/updateProfile',
//     async (updatedFields, { getState, rejectWithValue }) => {
//       try {
//         const { profile } = getState().profile;
//         const documentId = profile.$id; // or profile.id, adjust as per your schema
//         const res = await databases.updateDocument(
//           DATABASE_ID,
//           COLLECTION_ID,
//           documentId,
//           updatedFields
//         );
//         return res;
//       } catch (err) {
//         return rejectWithValue(err.message || "Failed to update profile");
//       }
//     }
//   );
  
//   const profileSlice = createSlice({
//     name: 'profile',
//     initialState,
//     reducers: {},
//     extraReducers: builder => {
//       builder
//         .addCase(fetchProfile.pending, state => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(fetchProfile.fulfilled, (state, action) => {
//           state.loading = false;
//           state.profile = action.payload;
//         })
//         .addCase(fetchProfile.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.payload;
//         });

//       builder
//       .addCase(updateProfile.fulfilled, (state, action) => {
//         state.profile = { ...state.profile, ...action.payload };
//       });
//     },
//   });
  
//   export default profileSlice.reducer;