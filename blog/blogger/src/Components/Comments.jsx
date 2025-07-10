import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments ,addComment,
  updateComment,
  deleteComment
} from "../store/BackendConfig/commentsSlice";

export default function Comments({  postId, content, parentCommentId, userId, sessionId ,commentId ,}) {
  const dispatch = useDispatch();
  const { items: comments, status, error } = useSelector((state) => state.comments);
  const [localLoading, setLocalLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  

  useEffect(() => {
    if (postId) {
      setLocalLoading(true);
      // dispatch(resetComments());
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
        {/* Add Comment Form */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!newComment.trim()) return;
            setActionLoading(true);
            await dispatch(addComment({ postId, content: newComment, parentCommentId: null, userId, sessionId }));
            await dispatch(fetchComments({ postId }));
            setNewComment("");
            setActionLoading(false);
          }}
          className="mb-4"
        >
          <textarea
            className="w-full border rounded p-2 mb-2"
            rows={2}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={actionLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={actionLoading}
          >
            {actionLoading ? "Adding..." : "Add Comment"}
          </button>
        </form>
        <p className="text-slate-500">No comments yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow p-6 border border-slate-200">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      {/* Add Comment Form */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!newComment.trim()) return;
          setActionLoading(true);
          await dispatch(addComment({ postId, content: newComment, parentCommentId: null, userId, sessionId }));
          await dispatch(fetchComments({ postId }));
          setNewComment("");
          setActionLoading(false);
        }}
        className="mb-4"
      >
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={2}
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={actionLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={actionLoading}
        >
          {actionLoading ? "Adding..." : "Add Comment"}
        </button>
      </form>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment._id} className="border-b last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-center mb-1 justify-between">
              <div className="flex items-center">
                <span className="font-bold text-slate-700 mr-2">{comment.userId}</span>
                <span className="text-xs text-slate-400">{comment.createdAt}</span>
              </div>
              {/* Three-dot menu for user's own comments */}
              {comment.userId === userId && (
                <div className="relative">
                  <button
                    className="p-1 rounded-full hover:bg-slate-100 focus:outline-none"
                    onClick={() => setOpenMenuId(openMenuId === comment._id ? null : comment._id)}
                    disabled={actionLoading}
                    aria-label="Open menu"
                    type="button"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="4" cy="10" r="2" />
                      <circle cx="10" cy="10" r="2" />
                      <circle cx="16" cy="10" r="2" />
                    </svg>
                  </button>
                  {openMenuId === comment._id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border border-slate-200 rounded shadow z-10">
                      {(() => {
                        const EDIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
                        const createdAtMs = new Date(comment.createdAt).getTime();
                        const nowMs = Date.now();
                        const canEdit = nowMs - createdAtMs < EDIT_WINDOW_MS;
                        return (
                          <>
                            {canEdit && (
                              <button
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
                                onClick={() => {
                                  setEditCommentId(comment._id);
                                  setEditContent(comment.content);
                                  setOpenMenuId(null);
                                }}
                                disabled={actionLoading}
                              >
                                Edit
                              </button>
                            )}
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-100"
                              onClick={async () => {
                                setOpenMenuId(null);
                                if (window.confirm("Delete this comment?")) {
                                  setActionLoading(true);
                                  await dispatch(deleteComment({ commentId: comment._id, userId, sessionId }));
                                  await dispatch(fetchComments({ postId }));
                                  setActionLoading(false);
                                }
                              }}
                              disabled={actionLoading}
                            >
                              Delete
                            </button>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
            {editCommentId === comment._id ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!editContent.trim()) return;
                  setActionLoading(true);
                  await dispatch(updateComment({ commentId: comment._id, content: editContent, userId, sessionId }));
                  await dispatch(fetchComments({ postId }));
                  setEditCommentId(null);
                  setEditContent("");
                  setActionLoading(false);
                }}
                className="mb-2"
              >
                <textarea
                  className="w-full border rounded p-2 mb-2"
                  rows={2}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  disabled={actionLoading}
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
                    onClick={() => {
                      setEditCommentId(null);
                      setEditContent("");
                    }}
                    disabled={actionLoading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-slate-800 mb-2">{comment.content}</div>
            )}
            {/* Show edit window expired message if not editable */}
            {comment.userId === userId && editCommentId !== comment._id && (() => {
              const EDIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
              const createdAtMs = new Date(comment.createdAt).getTime();
              const nowMs = Date.now();
              const canEdit = nowMs - createdAtMs < EDIT_WINDOW_MS;
              return !canEdit ? (
                <div className="text-xs text-slate-400 italic">Edit window expired</div>
              ) : null;
            })()}
          </li>
        ))}
      </ul>
    </div>
  );
} 