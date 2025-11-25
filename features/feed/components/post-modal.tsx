"use client";

import { FeedPost } from "../actions";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeedPostHeader } from "./feed-post-header";
import { PostImages } from "./post-images";
import { FeedPostFooter } from "./feed-post-footer";
import { PostReactionsAvatar } from "./post-reactions-avatar";
import { PostComments } from "./post-comments";

export const PostModal = ({
  post,
  isOpen,
  onClose,
}: {
  post: FeedPost;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [isCommenting, setIsCommenting] = useState(false);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-black/50 backdrop-blur-sm",
        "transition-opacity duration-200 ease-out",
        isOpen ? "opacity-100" : "opacity-0"
      )}
      style={{
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-3xl max-h-[90vh] bg-bg2 rounded-lg shadow-2xl",
          "flex flex-col overflow-hidden",
          "transition-all duration-300 ease-out"
        )}
        style={{
          animation: "modalSlideIn 0.3s ease-out",
        }}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-color/10">
          <h2 className="text-xl font-semibold text-color">Post Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-color/10 transition-colors text-color/60 hover:text-color"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <article className="flex flex-col">
            <div className="p-6 flex flex-col gap-4">
              <FeedPostHeader post={post} />
              <p className="text-color wrap-break-word whitespace-pre-wrap">
                {post.content}
              </p>
              {post.mediaUrls.length > 0 && (
                <PostImages images={post.mediaUrls} />
              )}
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
                      </span>
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
            <PostComments postId={post.id} />
          </article>
        </div>
      </div>
    </div>
  );

  // Render modal using portal
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return null;
};
