import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLikeCount,
  fetchLikeUsers,
  fetchLikeStatus,
  toggleLike,
} from "../store/BackendConfig/likesSlice";
import profileService from "../appwrite/profile";

// Utility for localStorage
const likedPostsKey = (userId) => `likedPosts_${userId}`;
const getLikedPosts = (userId) =>
  JSON.parse(localStorage.getItem(likedPostsKey(userId)) || "[]");
const setLikedPosts = (userId, posts) =>
  localStorage.setItem(likedPostsKey(userId), JSON.stringify(posts));

// In-memory cache for userId -> name
const userNameCache = {};

// LocalStorage cache helpers
const USER_NAME_CACHE_KEY = 'userNameCache';
function getUserNameFromCache(userId) {
  if (userNameCache[userId]) return userNameCache[userId];
  const cache = JSON.parse(localStorage.getItem(USER_NAME_CACHE_KEY) || '{}');
  if (cache[userId]) {
    userNameCache[userId] = cache[userId];
    return cache[userId];
  }
  return null;
}
function setUserNameInCache(userId, name) {
  userNameCache[userId] = name;
  const cache = JSON.parse(localStorage.getItem(USER_NAME_CACHE_KEY) || '{}');
  cache[userId] = name;
  localStorage.setItem(USER_NAME_CACHE_KEY, JSON.stringify(cache));
}

const Likes = ({ targetType, targetId, userId, sessionId }) => {
  const dispatch = useDispatch();
  const likeCount = useSelector((state) => state.likes.counts[targetId]);
  const likeUsers = useSelector((state) => state.likes.users[targetId]);
  const isLiked = useSelector((state) => state.likes.status[targetId]);
  const [optimisticLiked, setOptimisticLiked] = useState(false);
  const [likeUserNames, setLikeUserNames] = useState([]);

  // Fetch like data and status
  useEffect(() => {
    if (targetType && targetId) {
      dispatch(fetchLikeCount({ targetType, targetId }));
      dispatch(fetchLikeUsers({ targetType, targetId }));
      if (userId && sessionId) {
        dispatch(fetchLikeStatus({ targetType, targetId, userId, sessionId }));
      }
    }
  }, [dispatch, targetType, targetId, userId, sessionId]);

  // Sync optimisticLiked with localStorage and API
  useEffect(() => {
    if (userId && targetId) {
      const cached = getLikedPosts(userId).includes(targetId);
      setOptimisticLiked(isLiked !== undefined ? isLiked : cached);
      if (isLiked !== undefined) {
        const posts = getLikedPosts(userId);
        if (isLiked && !posts.includes(targetId)) {
          setLikedPosts(userId, [...posts, targetId]);
        } else if (!isLiked && posts.includes(targetId)) {
          setLikedPosts(userId, posts.filter((id) => id !== targetId));
        }
      }
    }
  }, [isLiked, userId, targetId]);

  // Fetch names for first two like users (excluding current user)
  useEffect(() => {
    let isMounted = true;
    async function fetchNames() {
      if (likeUsers && likeUsers.length) {
        // Exclude current user
        const filtered = likeUsers.filter(id => id !== userId);
        const ids = filtered.slice(0, 2);
        const names = await Promise.all(
          ids.map(async (id) => {
            const cached = getUserNameFromCache(id);
            if (cached) return cached;
            try {
              const profile = await profileService.getProfile(id);
              const name = profile?.name || id;
              setUserNameInCache(id, name);
              return name;
            } catch {
              setUserNameInCache(id, id);
              return id;
            }
          })
        );
        if (isMounted) setLikeUserNames(names);
      } else {
        setLikeUserNames([]);
      }
    }
    fetchNames();
    return () => { isMounted = false; };
  }, [likeUsers, userId]);

  // Like button handler
  const handleLikeClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (userId && sessionId) {
      setOptimisticLiked((prev) => !prev);
      dispatch(toggleLike({ targetType, targetId, userId, sessionId }));
    }
  }, [dispatch, targetType, targetId, userId, sessionId]);

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
      <div className="text-xs text-gray-400 ml-2 flex items-center gap-1">
        {likeUserNames.length > 0 && (
          <>
            <svg className="inline w-4 h-4 text-red-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
            {`Liked by: ${likeUserNames.join(", ")}${likeUsers && likeUsers.length > 2 ? " and others" : ""}`}
          </>
        )}
      </div>
    </div>
  );
};

export default Likes;
