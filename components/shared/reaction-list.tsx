"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FeedReactionType } from "@/features/feed/actions";
import { postReactionsOptions } from "@/features/feed/queries";
import { startTransition, useEffect, useRef, useState } from "react";
import { FEED_POST_REACTIONS } from "@/features/feed/constants";
import { AuthorAvatar } from "./author-avatar";
import { ScaleLoader } from "react-spinners";

export const ReactionList = ({
  postId,
  isOpen,
  onClose,
}: {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<FeedReactionType | "ALL">(
    "ALL"
  );
  const prevPostIdRef = useRef(postId);

  const { data, hasNextPage, fetchNextPage, isPending, isFetchingNextPage } =
    useInfiniteQuery({
      ...postReactionsOptions(postId),
      enabled: isOpen,
    });

  // Reset tab when postId changes - using key on modal to reset state
  const modalKey = `${postId}-${isOpen}`;

  // Reset tab when opening modal for a different post
  // This is necessary to reset UI state when modal opens for different posts
  // Using useEffect is the recommended pattern for syncing state with props
  useEffect(() => {
    if (isOpen && prevPostIdRef.current !== postId) {
      startTransition(() => {
        setSelectedTab("ALL");
        prevPostIdRef.current = postId;
      });
    }
  }, [isOpen, postId]);

  const reactions = data?.pages.flatMap((page) => page.data) || [];

  // Group reactions by type for counts
  const reactionCounts = reactions.reduce<Record<FeedReactionType, number>>(
    (acc, reaction) => {
      acc[reaction.reactionType] = (acc[reaction.reactionType] || 0) + 1;
      return acc;
    },
    {
      LIKE: 0,
      LOVE: 0,
      WOW: 0,
      SAD: 0,
      ANGRY: 0,
      HAHA: 0,
    }
  );

  // Filter reactions based on selected tab
  const filteredReactions =
    selectedTab === "ALL"
      ? reactions
      : reactions.filter((reaction) => reaction.reactionType === selectedTab);

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

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    if (!isOpen || !hasNextPage || isFetchingNextPage) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: contentRef.current,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [isOpen, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        key={modalKey}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-2xl max-h-[90vh] bg-bg2 rounded-lg shadow-2xl",
          "flex flex-col overflow-hidden",
          "transition-all duration-300 ease-out"
        )}
        style={{
          animation: "modalSlideIn 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-color/10">
          <h2 className="text-xl font-semibold text-color">
            Reactions {!isPending && `(${reactions.length})`}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-color/10 transition-colors text-color/60 hover:text-color"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Reaction Tabs */}
        {!isPending && (
          <div className="flex items-center gap-2 px-6 pt-4 pb-2 border-b border-color/10 overflow-x-auto">
            <button
              onClick={() => setSelectedTab("ALL")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                selectedTab === "ALL"
                  ? "bg-color5/10 text-color5"
                  : "text-color/60 hover:text-color hover:bg-color/5"
              )}
            >
              All
              <span className="text-xs">({reactions.length})</span>
            </button>
            {FEED_POST_REACTIONS.map((reaction) => {
              const count = reactionCounts[reaction.value];
              if (count === 0) return null;
              return (
                <button
                  key={reaction.id}
                  onClick={() => setSelectedTab(reaction.value)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                    selectedTab === reaction.value
                      ? "bg-color5/10 text-color5"
                      : "text-color/60 hover:text-color hover:bg-color/5"
                  )}
                >
                  <Image
                    src={reaction.icon}
                    alt={reaction.label}
                    width={20}
                    height={20}
                    className="size-5 object-cover"
                  />
                  <span>{reaction.label}</span>
                  <span className="text-xs">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Content */}
        {isPending ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <ScaleLoader
                color="#1890ff"
                height={20}
                width={4}
                margin={2}
                radius={2}
              />
              <p className="text-sm font-medium text-color/60">
                Loading reactions...
              </p>
            </div>
          </div>
        ) : (
          <div ref={contentRef} className="flex-1 overflow-y-auto p-6">
            {filteredReactions.length === 0 ? (
              <div className="text-center py-12 text-color/60">
                <p>No reactions yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {filteredReactions.map((reaction, index) => {
                  const reactionConfig = FEED_POST_REACTIONS.find(
                    (r) => r.value === reaction.reactionType
                  );

                  return (
                    <div
                      key={reaction.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-color/5 transition-all duration-300"
                      style={{
                        animation: `slideInLeft 0.3s ease-out ${
                          index * 50
                        }ms both`,
                      }}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <AuthorAvatar
                          author={reaction.author}
                          className="size-10"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-color truncate">
                            {reaction.author.firstName}{" "}
                            {reaction.author.lastName}
                          </p>
                          {reaction.author.username && (
                            <p className="text-xs text-color/60 truncate">
                              @{reaction.author.username}
                            </p>
                          )}
                        </div>
                      </div>
                      {reactionConfig && (
                        <div className="shrink-0 ml-4">
                          <Image
                            src={reactionConfig.icon}
                            alt={reactionConfig.label}
                            width={24}
                            height={24}
                            className="size-6 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Infinite scroll sentinel */}
            {hasNextPage && (
              <div
                ref={sentinelRef}
                className="flex justify-center items-center py-4"
              >
                {isFetchingNextPage && (
                  <div className="flex items-center gap-2">
                    <ScaleLoader
                      color="#1890ff"
                      height={12}
                      width={3}
                      margin={1}
                      radius={1}
                    />
                    <span className="text-sm text-color/60">
                      Loading more...
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Render modal using portal
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return null;
};
