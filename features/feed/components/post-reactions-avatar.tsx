"use client";

import { AuthorAvatar } from "@/components/shared/author-avatar";
import { FeedReaction } from "../actions";
import { Tooltip } from "react-tooltip";

export const PostReactionsAvatar = ({
  postId,
  reactions,
  totalReactions,
}: {
  postId: string;
  reactions: FeedReaction[];
  totalReactions: number;
}) => {
  return (
    <div className="flex items-center relative">
      {reactions.map((reaction) => (
        <div
          className="not-first:-ml-3 hover:z-10 group cursor-default"
          key={reaction.author.id + reaction.reactionType + postId}
        >
          <div
            data-tooltip-id={`reaction-tooltip-${postId}`}
            data-tooltip-content={
              reaction.author.firstName + " " + reaction.author.lastName
            }
            className="group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300"
          >
            <AuthorAvatar
              author={reaction.author}
              className="size-8 text-[0.7rem] border-2 border-bg2"
            />
          </div>
        </div>
      ))}
      {totalReactions > reactions.length && (
        <div className="size-8 not-first:-ml-3 text-[0.7rem] leading-tight font-medium border-2 border-bg2 flex items-center justify-center rounded-full bg-color5 text-white">
          {totalReactions - reactions.length}+
        </div>
      )}
      <Tooltip
        place="top"
        id={`reaction-tooltip-${postId}`}
        className="py-1! px-3! w-fit! text-center! text-xs! rounded-md! bg-color! text-bg2! shadow-2xl!"
      />
    </div>
  );
};
