import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLikeCount,
  fetchLikeUsers,
  fetchLikeStatus,
  toggleLike,
} from "../store/BackendConfig/likesSlice";

// Utility to get/set liked posts in localStorage per user
function getCachedLikedPosts(userId) {
  return JSON.parse(localStorage.getItem(`likedPosts_${userId}`)) || [];
}
function setCachedLikedPosts(userId, likedPosts) {
  localStorage.setItem(`likedPosts_${userId}`, JSON.stringify(likedPosts));
}

const Likes = ({ targetType, targetId, userId, sessionId }) => {
  const dispatch = useDispatch();

  // Redux state
  const likeCount = useSelector((state) => state.likes.counts[targetId]);
  const likeUsers = useSelector((state) => state.likes.users[targetId]);
  const isLiked = useSelector((state) => state.likes.status[targetId]);
  // Optimistic UI state
  const [optimisticLiked, setOptimisticLiked] = useState(false);

  // On mount: use cache for instant feedback
  useEffect(() => {
    if (userId && targetId) {
      const cachedLikedPosts = getCachedLikedPosts(userId);
      setOptimisticLiked(cachedLikedPosts.includes(targetId));
    }
  }, [userId, targetId]);

  // On mount or prop change: fetch from API
  useEffect(() => {
    if (targetType && targetId) {
      dispatch(fetchLikeCount({ targetType, targetId }));
      dispatch(fetchLikeUsers({ targetType, targetId }));
      if (userId && sessionId) {
        dispatch(fetchLikeStatus({ targetType, targetId, userId, sessionId }));
      }
    }
  }, [dispatch, targetType, targetId, userId, sessionId]);

  // When API responds: update cache and optimistic UI
  useEffect(() => {
    if (isLiked !== undefined && userId && targetId) {
      let likedPosts = getCachedLikedPosts(userId);
      if (isLiked && !likedPosts.includes(targetId)) {
        likedPosts.push(targetId);
        setCachedLikedPosts(userId, likedPosts);
      } else if (!isLiked && likedPosts.includes(targetId)) {
        likedPosts = likedPosts.filter((id) => id !== targetId);
        setCachedLikedPosts(userId, likedPosts);
      }
      setOptimisticLiked(isLiked);
    }
  }, [isLiked, userId, targetId]);

  // Handle like button click (optimistic update)
  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (userId && sessionId) {
      // Optimistically update UI immediately
      setOptimisticLiked((prev) => !prev);
      // Dispatch toggleLike thunk
      dispatch(toggleLike({ targetType, targetId, userId, sessionId }));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLikeClick}
        disabled={!userId}
        className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
          optimisticLiked
            ? "bg-red-100 text-red-600 hover:bg-red-200"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        } ${!userId ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label={optimisticLiked ? "Unlike post" : "Like post"}
      >
        <svg
          className={`w-5 h-5 transition-all duration-300 ${
            optimisticLiked ? "fill-red-600 scale-110" : "fill-none"
          }`}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="font-medium text-sm">{likeCount ?? "..."}</span>
      </button>
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <span>•</span>
        <span>
          {!userId
            ? "Login to like"
            : optimisticLiked
            ? "You liked this"
            : "Like this post"}
        </span>
      </div>
      <div className="text-xs text-gray-400 ml-2">
        {likeUsers && likeUsers.length > 0
          ? `Liked by: ${likeUsers.join(", ")}`
          : ""}
      </div>
    </div>
  );
};

export default Likes;
