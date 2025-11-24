"use client";

import { FeedComment } from "../actions";
import { FeedPostComment } from "./feed-post-comment";

interface FeedPostCommentListProps {
  postId: string;
  comments: FeedComment[];
  totalComments: number;
}

export const FeedPostCommentList = ({
  postId,
  comments,
  totalComments,
}: FeedPostCommentListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {totalComments > comments.length && (
        <button
          className="text-sm font-medium text-color6 hover:text-color6 transition-all cursor-pointer mr-auto"
          onClick={() => {}}
        >
          View {totalComments - comments.length} previous comments
        </button>
      )}
      {comments.reverse().map((comment) => (
        <FeedPostComment key={comment.id} postId={postId} comment={comment} />
      ))}
    </div>
  );
};
