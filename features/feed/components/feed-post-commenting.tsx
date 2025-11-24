"use client";

import { FeedComment } from "@/features/feed/actions";
import { useCurrentUser } from "@/stores/current-user";
import {
  FeedPostCommentInput,
  FeedPostCommentList,
} from "@/features/feed/components";

export const FeedPostCommenting = ({
  postId,
  comments,
  totalComments,
}: {
  postId: string;
  comments: FeedComment[];
  totalComments: number;
}) => {
  const { user, isLoading } = useCurrentUser();

  return (
    <div className="p-6 flex flex-col gap-3">
      <FeedPostCommentInput postId={postId} parentCommentId={null} />
      <FeedPostCommentList postId={postId} comments={comments} />
    </div>
  );
};
