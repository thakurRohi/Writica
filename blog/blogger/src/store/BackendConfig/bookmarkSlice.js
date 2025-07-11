import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Set your base API URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || '/vercel-api/api';

// Fetch bookmark status for current user
export const fetchBookmarkStatus = createAsyncThunk(
    'bookmarks/fetchBookmarkStatus',
    async ({ targetType, targetId, userId, sessionId }) => {
      const res = await axios.get(
        `${API_BASE_URL}/bookmarks/bookmarkStatus?targetType=${targetType}&targetId=${targetId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-appwrite-user-id': userId,
            'x-appwrite-session-id': sessionId,
          },
        }
      );
      // Inject targetId into the response
      return { targetId, liked: res.data.liked };
    }
  );

// Toggle like (add or remove)
export const toggleBookmark = createAsyncThunk(
    'bookmarks/toggleBookmark',
    async ({ targetType, targetId, userId, sessionId }) => {
      const res = await axios.post(
        `${API_BASE_URL}/bookmarks/toggleBookmark`,
        { targetType, targetId },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-appwrite-user-id': userId,
            'x-appwrite-session-id': sessionId,
          },
        }
      );
      return res.data;
    }
  );

 export const fetchBookmarkPosts = createAsyncThunk(
    'bookmarks/fetchBookmarkPosts',
    async ({ userId,page = 1, limit = 20  }) => {
      const res = await axios.get(
        `${API_BASE_URL}/bookmarks/user/${userId}?page=${page}&limit=${limit}`
      );
      return { posts: res.data.Bookmarks };
    }
  );

  export const deleteBookmark = createAsyncThunk(
    'bookmarks/deleteBookmark',
    async ({ bookmarkId, userId, sessionId }) => {
      const res = await axios.delete(
        `${API_BASE_URL}/bookmarks/${bookmarkId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-appwrite-user-id': userId,
            'x-appwrite-session-id': sessionId,
          },
        }
      );
      return res.data;
    }
  );

  const initialState = {
    bookmarks: [],           // Array of bookmarked post IDs or objects
    bookmarkStatus: {},      // { [postId]: true/false } for quick lookup
    loading: false,          // For global loading state
    error: null,             // For error messages
    fetchStatus: 'idle',     // 'idle' | 'loading' | 'succeeded' | 'failed'
    toggleStatus: 'idle',    // Separate status for toggling
    deleteStatus: 'idle',    // Separate status for deleting
    fetchStatusStatus: 'idle',    // For fetchBookmarkStatus
    deleteError: null,            // For deleteBookmark errors
    fetchStatusError: null,       // For fetchBookmarkStatus errors
  };

  const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState,
 
    reducers: {
       
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBookmarkPosts.pending, (state) => {
          state.fetchStatus = 'loading';
          state.error = null;
     
        })
        .addCase(fetchBookmarkPosts.fulfilled, (state, action) => {
          state.fetchStatus = 'succeeded';
          state.bookmarks = action.payload.posts;
        })
        .addCase(fetchBookmarkPosts.rejected, (state, action) => {
          state.fetchStatus = 'failed';
          state.error = action.error.message;
        })
        .addCase(toggleBookmark.pending, (state) => {
          state.toggleStatus = 'loading';
        })
        .addCase(toggleBookmark.fulfilled, (state, action) => {
          state.toggleStatus = 'succeeded';
          const { targetId, action: toggleAction } = action.payload;
          state.bookmarkStatus[targetId] = toggleAction === 'added';
        })
        .addCase(toggleBookmark.rejected, (state, action) => {
          state.toggleStatus = 'failed';
          state.error = action.error.message;
        })
        .addCase(fetchBookmarkStatus.pending, (state) => {
          state.fetchStatusStatus = 'loading';
          state.fetchStatusError = null;
        })
        .addCase(fetchBookmarkStatus.fulfilled, (state, action) => {
          state.fetchStatusStatus = 'succeeded';
          // action.payload: { targetId, liked }
          const { targetId, liked } = action.payload;
          state.bookmarkStatus[targetId] = liked;
        })
        .addCase(fetchBookmarkStatus.rejected, (state, action) => {
          state.fetchStatusStatus = 'failed';
          state.fetchStatusError = action.error.message;
        })
        .addCase(deleteBookmark.pending, (state) => {
          state.deleteStatus = 'loading';
          state.deleteError = null;
        })
        .addCase(deleteBookmark.fulfilled, (state, action) => {
          state.deleteStatus = 'succeeded';
          // action.payload should include bookmarkId or targetId
          const { bookmarkId, targetId } = action.meta.arg;
          // Remove from bookmarks array if you store IDs
          if (bookmarkId) {
            state.bookmarks = state.bookmarks.filter(id => id !== bookmarkId);
            delete state.bookmarkStatus[bookmarkId];
          }
          // Or if you use targetId
          if (targetId) {
            state.bookmarks = state.bookmarks.filter(id => id !== targetId);
            delete state.bookmarkStatus[targetId];
          }
        })
        .addCase(deleteBookmark.rejected, (state, action) => {
          state.deleteStatus = 'failed';
          state.deleteError = action.error.message;
        })
    },
  });

  export default bookmarkSlice.reducer;


  