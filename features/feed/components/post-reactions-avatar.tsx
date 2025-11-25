"use client";

import { AuthorAvatar } from "@/components/shared/author-avatar";
import { FeedReaction } from "../actions";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { ReactionList } from "@/components/shared/reaction-list";

export const PostReactionsAvatar = ({
  postId,
  reactions,
  totalReactions,
}: {
  postId: string;
  reactions: FeedReaction[];
  totalReactions: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center relative group cursor-pointer"
        type="button"
        aria-label="View all reactions"
      >
        {reactions.map((reaction) => (
          <div
            className="not-first:-ml-3 hover:z-10 group"
            key={reaction.author.id + reaction.reactionType + postId}
          >
            <div className="group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
              <AuthorAvatar
                author={reaction.author}
                className="size-8 text-[0.7rem] border-2 border-bg2"
              />
            </div>
          </div>
        ))}
        {totalReactions > reactions.length && (
          <div className="size-8 not-first:-ml-3 text-[0.7rem] leading-tight font-medium border-2 border-bg2 flex items-center justify-center rounded-full bg-color5 text-white group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
            {totalReactions - reactions.length}+
          </div>
        )}
      </button>
      <ReactionList
        postId={postId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
