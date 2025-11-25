"use client";

import { FeedComment } from "@/features/feed/actions";
import {
  FeedPostCommentInput,
  FeedPostCommentList,
} from "@/features/feed/components";

export const FeedPostCommenting = ({
  setIsModalOpen,
  postId,
  comments,
  totalComments,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
  postId: string;
  comments: FeedComment[];
  totalComments: number;
}) => {
  return (
    <div className="p-6 flex flex-col gap-3">
      <FeedPostCommentInput postId={postId} parentCommentId={null} />
      <FeedPostCommentList
        setIsModalOpen={setIsModalOpen}
        postId={postId}
        comments={comments}
        totalComments={totalComments}
      />
    </div>
  );
};
