"use client";

import { FeedPost } from "@/features/feed/actions";
import { FeedPostHeader } from "./feed-post-header";
import { PostImages } from "./post-images";
import { FeedPostFooter } from "./feed-post-footer";
import { PostReactionsAvatar } from "./post-reactions-avatar";
import { useState } from "react";
import { FeedPostCommenting } from "./feed-post-commenting";
import { PostModal } from "./post-modal";

export const FeedPostCard = ({ post }: { post: FeedPost }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <article className="flex flex-col bg-bg2 rounded-md">
      <div className="p-6 flex flex-col gap-4">
        <FeedPostHeader post={post} setIsModalOpen={() => setIsModalOpen(true)} />
        <p className="text-color wrap-break-word whitespace-pre-wrap ">
          {post.content}
        </p>
        {post.mediaUrls.length > 0 && <PostImages images={post.mediaUrls} />}
        {post.reactions.length > 0 && (
          <div className="flex items-center gap-2 justify-between">
            <PostReactionsAvatar
              postId={post.id}
              reactions={post.reactions}
              totalReactions={post.totalReactions}
            />
            <div className="flex items-center gap-4">
              <button
                className="text-sm transition-all group text-color/40 cursor-pointer"
                type="button"
                onClick={() => setIsCommenting(true)}
              >
                <span className="font-medium text-color group-hover:text-color5! transition">
                  {post.totalComments}
                </span>
                <span className="text-color/40 text-sm ml-1.5 group-hover:text-color5 transition">
                  {post.totalComments === 1 ? "comment" : "comments"}
                </span>{" "}
              </button>
              <div className="text-sm transition-all group text-color/40 cursor-pointer">
                <span className="font-medium text-color group-hover:text-color5! transition">
                  0
                </span>
                <span className="text-color/40 text-sm ml-1.5 group-hover:text-color5 transition">
                  share
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <FeedPostFooter
        post={post}
        isCommenting={isCommenting}
        setIsCommenting={setIsCommenting}
      />
      <PostModal
        post={post}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {isCommenting && (
        <FeedPostCommenting
          setIsModalOpen={setIsModalOpen}
          postId={post.id}
          comments={post.comments}
          totalComments={post.totalComments}
        />
      )}
    </article>
  );
};
