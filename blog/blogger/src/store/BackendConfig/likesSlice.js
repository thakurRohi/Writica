import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Set your base API URL here
const API_BASE_URL = '/vercel-api/api';


// Fetch like count for a target (post or comment)
export const fetchLikeCount = createAsyncThunk(
  'likes/fetchLikeCount',
  async ({ targetType, targetId }) => {
    const res = await axios.get(
      `${API_BASE_URL}/likes/count?targetType=${targetType}&targetId=${targetId}`
    );
    return res.data;
  }
);

// Fetch users who liked a target
export const fetchLikeUsers = createAsyncThunk(
  'likes/fetchLikeUsers',
  async ({ targetType, targetId }) => {
    const res = await axios.get(
      `${API_BASE_URL}/likes/users?targetType=${targetType}&targetId=${targetId}`
    );
    return res.data;
  }
);

// Fetch like status for current user
export const fetchLikeStatus = createAsyncThunk(
  'likes/fetchLikeStatus',
  async ({ targetType, targetId, userId, sessionId }) => {
    const res = await axios.get(
      `${API_BASE_URL}/likes/status?targetType=${targetType}&targetId=${targetId}`,
      {
        headers: {
          'x-appwrite-user-id': userId,
          'x-appwrite-session-id': sessionId,
        },
      }
    );
    return res.data;
  }
);

// Toggle like (add or remove)
export const toggleLike = createAsyncThunk(
  'likes/toggleLike',
  async ({ targetType, targetId, userId, sessionId }) => {
    const res = await axios.post(
      `${API_BASE_URL}/likes/toggle`,
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


const likesSlice = createSlice({
    name: 'likes',
    initialState: {
      count: 0,
      users: [],
      status: 'idle',
      liked: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchLikeCount.fulfilled, (state, action) => {
          state.count = action.payload.count;
        })
        .addCase(fetchLikeUsers.fulfilled, (state, action) => {
          state.users = action.payload.userIds;
        })
        .addCase(fetchLikeStatus.fulfilled, (state, action) => {
          state.liked = action.payload.liked;
        })
        .addCase(toggleLike.fulfilled, (state, action) => {
          if (action.payload.action === 'added') {
            state.liked = true;
            state.count += 1;
            state.users.push(action.payload.userId);
          } else if (action.payload.action === 'removed') {
            state.liked = false;
            state.count = Math.max(0, state.count - 1);
            state.users = state.users.filter(id => id !== action.payload.userId);
          }
        })
        .addMatcher(
          (action) => action.type.endsWith('/pending'),
          (state) => {
            state.status = 'loading';
            state.error = null;
          }
        )
        .addMatcher(
          (action) => action.type.endsWith('/rejected'),
          (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          }
        );
    },
  });
  
  export default likesSlice.reducer;
  
