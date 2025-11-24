"use client";

import { FeedComment } from "../actions";
import { FeedPostComment } from "./feed-post-comment";

interface FeedPostCommentListProps {
  postId: string;
  comments: FeedComment[];
}

export const FeedPostCommentList = ({
  postId,
  comments,
}: FeedPostCommentListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {comments.map((comment) => (
        <FeedPostComment key={comment.id} postId={postId} comment={comment} />
      ))}
    </div>
  );
};
