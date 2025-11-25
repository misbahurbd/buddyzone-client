"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { postCommentsOptions } from "../queries/post-comments.query";
import { FeedPostComment } from "./feed-post-comment";
import { ScaleLoader as Spinner } from "react-spinners";
import { FeedPostCommentInput } from "./feed-post-comment-input";

export const PostComments = ({ postId }: { postId: string }) => {
  const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      ...postCommentsOptions(postId),
      enabled: !!postId,
    });

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="flex flex-col gap-3 p-6">
      <FeedPostCommentInput postId={postId} parentCommentId={null} />
      {isPending || isFetchingNextPage ? (
        <div className="flex items-center justify-start gap-2">
          <Spinner barCount={3} height={16} width={2} margin={1} color="#AAA" />
          <span className="text-gray-500 text-sm">Loading comments...</span>
        </div>
      ) : (
        <>
          {hasNextPage && (
            <button
              className="text-sm font-medium text-color6 hover:text-color6 transition-all cursor-pointer mr-auto"
              onClick={() => fetchNextPage()}
            >
              Load more comments
            </button>
          )}
        </>
      )}

      {comments.map((comment) => (
        <FeedPostComment key={comment.id} postId={postId} comment={comment} />
      ))}
    </div>
  );
};
