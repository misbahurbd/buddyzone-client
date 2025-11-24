"use client";

import { AuthorAvatar } from "@/components/shared/author-avatar";
import { FeedComment, FeedReactionType } from "../actions";
import Link from "next/link";
import { cn, formatShortTime } from "@/lib/utils";
import { Heart, ThumbsUp } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { commentReactionMutationOptions } from "../mutations/comment-reaction.mutation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { FEED_POST_REACTIONS } from "../constants";
import { useCurrentUser } from "@/stores/current-user";
import Image from "next/image";
import { ReactionButton } from "./post-like-button";
import { useState } from "react";
import { FeedPostCommentInput } from "./feed-post-comment-input";

export const FeedPostComment = ({
  postId,
  comment,
}: {
  postId: string;
  comment: FeedComment;
}) => {
  const [isReplying, setIsReplying] = useState(false);

  const { mutateAsync: commentReaction, isPending: isCommentingReaction } =
    useMutation(commentReactionMutationOptions);
  const { user } = useCurrentUser();

  const handleLike = async (
    commentId: string,
    reactionType: FeedReactionType | null
  ) => {
    try {
      const res = await commentReaction({ postId, commentId, reactionType });
      if (!res.success) {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError ? error.message : "An error occurred"
      );
    }
  };

  const myReaction = comment.reactions.find(
    (reaction) => reaction.author.id === user?.id
  );

  const reactedReaction = myReaction
    ? FEED_POST_REACTIONS.find(
        (reaction) => reaction.value === myReaction.reactionType
      )
    : null;
  return (
    <div key={comment.id} className="pl-14 relative flex flex-col gap-3">
      <AuthorAvatar
        author={comment.author}
        className="size-10 absolute left-0 top-0"
      />
      <div className="flex flex-col relative gap-2 bg-[#f6f6f6] p-3 rounded-xl">
        <Link
          href={`/profile/${comment.author.username}`}
          className="text-sm font-semibold text-color6 mb-2"
        >
          {comment.author.firstName} {comment.author.lastName}
        </Link>
        <p className="text-sm text-color7 leading-[1.2] wrap-break-word whitespace-pre-wrap">
          {comment.content}
        </p>
        <div className="absolute bottom-0 right-0 translate-y-1/2 flex items-center bg-bg2 p-2 py-1 shadow-xl leading-tight rounded-full">
          <ThumbsUp className="size-4 text-[#1990ff]" />
          <Heart className="size-4 text-[#ff0000] -ml-1.5" />
          <span className="text-sm text-color6 font-medium ml-2">
            {comment.totalReactions}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ReactionButton
          align="left"
          uniqueId={comment.id}
          onReact={(reactionType) => handleLike(comment.id, reactionType)}
          disabled={isCommentingReaction}
        >
          <button
            type="button"
            className="text-sm font-medium flex items-center gap-2 text-color6 hover:text-color6 transition-all cursor-pointer"
            onClick={() =>
              handleLike(comment.id, reactedReaction ? null : "LIKE")
            }
            disabled={isCommentingReaction}
          >
            {reactedReaction && (
              <Image
                src={reactedReaction.icon}
                alt={reactedReaction.label}
                width={20}
                height={20}
                priority
                className="size-4"
              />
            )}
            <span className="text-sm text-color">
              {reactedReaction ? reactedReaction.label : "Like"}
            </span>
          </button>
        </ReactionButton>
        <span className="text-sm text-color/40">•</span>
        <button
          type="button"
          className="text-sm font-medium text-color6 hover:text-color6 transition-all cursor-pointer"
        >
          Reply
        </button>
        <span className="text-sm text-color/40">•</span>
        <button
          type="button"
          className="text-sm font-medium text-color6 hover:text-color6 transition-all cursor-pointer"
        >
          Share
        </button>
        <span className="text-sm text-color/40">•</span>
        <span className="text-sm text-color7">
          {formatShortTime(new Date(comment.createdAt))}
        </span>
      </div>
      {comment.replies?.length > 0 && (
        <div className="flex flex-col gap-2">
          {comment.replies.map((reply) => (
            <FeedPostComment key={reply.id} postId={postId} comment={reply} />
          ))}
        </div>
      )}
      {!comment.parentId && (
        <FeedPostCommentInput postId={postId} parentCommentId={comment.id} />
      )}
    </div>
  );
};
