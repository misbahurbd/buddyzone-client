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
    setIsOpen(false);
    await postReaction({ postId: post.id, reactionType });
  };
  return (
    <footer className="grid grid-cols-3 bg-[#fbfcfd] gap-2 w-full p-2 last:rounded-b-md">
      <div
        className="relative group"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
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
        <div
          className={cn(
            "absolute delay-0 invisible origin-bottom scale-75 translate-y-4 opacity-0 transition-all duration-75 bottom-full left-1/2 -translate-x-1/2 p-2 w-max bg-bg2 shadow-lg rounded-full flex gap-2",
            isOpen &&
              "visible scale-100 translate-y-0 opacity-100 duration-300 delay-300"
          )}
        >
          {FEED_POST_REACTIONS.map((reaction) => (
            <button
              key={reaction.id + post.id}
              onClick={() => handleReact(reaction.value)}
              className="cursor-pointer origin-bottom hover:scale-125 hover:z-20 transition-all duration-300 disabled:opacity-50"
              disabled={isPostingReaction}
            >
              <Image
                key={reaction.id}
                data-tooltip-id={`reaction-tooltip-${post.id}`}
                data-tooltip-content={reaction.label}
                src={reaction.icon}
                alt={reaction.label}
                width={40}
                height={40}
                priority
                className="w-10 h-10 object-cover"
              />
            </button>
          ))}
          <Tooltip
            place="top"
            id={`reaction-tooltip-${post.id}`}
            className="py-1! px-3! w-fit! text-center! text-xs! rounded-md! bg-color! text-bg2! shadow-2xl!"
          />
        </div>
      </div>
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
