"use client";

import { FeedPost, FeedReactionType } from "@/features/feed/actions";
import { useCurrentUser } from "@/stores/current-user";
import { Forward, Heart, MessageCircleMore } from "lucide-react";
import { FEED_POST_REACTIONS } from "@/features/feed/constants";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { useMutation } from "@tanstack/react-query";
import { postReactionMutationOptions } from "@/features/feed/mutations";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ReactionButton } from "./post-like-button";

export const FeedPostFooter = ({
  post,
  isCommenting,
  setIsCommenting,
}: {
  post: FeedPost;
  isCommenting: boolean;
  setIsCommenting: (isCommenting: boolean) => void;
}) => {
  const { user } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: postReaction, isPending: isPostingReaction } =
    useMutation(postReactionMutationOptions);

  const myReaction = post.reactions.find(
    (reaction) => reaction.author.id === user?.id
  );

  const reactedReaction = myReaction
    ? FEED_POST_REACTIONS.find(
        (reaction) => reaction.value === myReaction.reactionType
      )
    : null;

  const handleReact = async (reactionType: FeedReactionType | null) => {
    try {
      setIsOpen(false);
      const res = await postReaction({ postId: post.id, reactionType });
      if (!res.success) {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError ? error.message : "An error occurred"
      );
    }
  };
  return (
    <footer className="grid grid-cols-3 bg-[#fbfcfd] gap-2 w-full p-2 last:rounded-b-md">
      <ReactionButton
        uniqueId={post.id}
        onReact={handleReact}
        disabled={isPostingReaction}
      >
        <button
          onClick={() => handleReact(!!reactedReaction ? null : "LIKE")}
          className="flex transition-all rounded-sm items-center justify-center w-full gap-2 h-12 cursor-pointer hover:bg-[#e4f1fd] relative"
          disabled={isPostingReaction}
        >
          {reactedReaction ? (
            <Image
              src={reactedReaction.icon}
              alt={reactedReaction.label}
              width={20}
              height={20}
              priority
              className="size-5"
            />
          ) : (
            <Heart className="size-4 text-color" />
          )}
          <span className="text-sm text-color">
            {reactedReaction ? reactedReaction.label : "Like"}
          </span>
        </button>
      </ReactionButton>

      <button
        type="button"
        onClick={() => setIsCommenting(!isCommenting)}
        className="flex transition-all rounded-sm items-center justify-center w-full gap-2 h-12 cursor-pointer hover:bg-[#e4f1fd]"
      >
        <MessageCircleMore className="size-4 text-color" />
        <span className="text-sm text-color">Comment</span>
      </button>

      <button className="flex transition-all rounded-sm items-center justify-center w-full gap-2 h-12 cursor-pointer hover:bg-[#e4f1fd]">
        <Forward className="size-4 text-color" />
        <span className="text-sm text-color">Share</span>
      </button>
    </footer>
  );
};
