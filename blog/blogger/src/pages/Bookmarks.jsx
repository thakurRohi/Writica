import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarkStatus,toggleBookmark,fetchBookmarkPosts,deleteBookmark
} from "../store/BackendConfig/bookmarkSlice";

const Bookmarks = ({ postId ,targetType, targetId }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const sessionId = useSelector((state) => state.auth.sessionId);
    const userId=userData?.$id
    const {  bookmarks, fetchStatus, error } = useSelector((state) => state.bookmarks);
    useEffect(() => {
        if (userId && sessionId) {
          dispatch(fetchBookmarkPosts({ userId, page: 1, limit: 1000 }));
        }
      }, [dispatch, userId, sessionId]);

      
  if (fetchStatus === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
    
  return (
    <ul>
  {Array.isArray(bookmarks) && bookmarks.length > 0 ? (
    bookmarks.map(({ _id, targetId }) => (
      <li key={_id}>{targetId}</li>
    ))
  ) : (
    <li>No bookmarks found.</li>
  )}
</ul>

  );

}

export default Bookmarks
