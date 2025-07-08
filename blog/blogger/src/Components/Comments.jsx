import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, resetComments } from "../store/BackendConfig/commentsSlice";

export default function Comments({ postId }) {
  const dispatch = useDispatch();
  const { items: comments, status, error } = useSelector((state) => state.comments);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      setLocalLoading(true);
      dispatch(resetComments());
      Promise.resolve().then(() => {
        dispatch(fetchComments({ postId })).then(() => setLocalLoading(false));
      });
    }
  }, [dispatch, postId]);

  if (localLoading || status === "loading") {
    return (
      <div className="mt-8 bg-white rounded-xl shadow p-6 border border-slate-200">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <p className="text-slate-500">Loading comments...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="mt-8 bg-white rounded-xl shadow p-6 border border-slate-200">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (status === "succeeded" && (!comments || comments.length === 0)) {
    return (
      <div className="mt-8 bg-white rounded-xl shadow p-6 border border-slate-200">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <p className="text-slate-500">No comments yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow p-6 border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment._id} className="border-b last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-center mb-1">
              <span className="font-bold text-slate-700 mr-2">{comment.userName}</span>
              <span className="text-xs text-slate-400">{comment.createdAt}</span>
            </div>
            <div className="text-slate-800">{comment.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 