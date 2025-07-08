// src/store/likesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const likesSlice = createSlice({
  name: "likes",
  initialState: [],
  reducers: {
    setLikes: (state, action) => action.payload,
    toggleLike: (state, action) => {
      // Update your like state logic here based on action.payload
    }
  }
});

export const { setLikes, toggleLike } = likesSlice.actions;
export default likesSlice.reducer;