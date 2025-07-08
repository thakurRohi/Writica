// src/store/commentsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComments: (state, action) => action.payload,
    addComment: (state, action) => { state.unshift(action.payload); },
    updateComment: (state, action) => {
      const idx = state.findIndex(c => c._id === action.payload._id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteComment: (state, action) => {
      return state.filter(c => c._id !== action.payload);
    }
  }
});

export const { setComments, addComment, updateComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;