"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { feedPostsOptions } from "@/features/feed/queries";
import { CreatePostBlock, FeedPostCard } from "@/features/feed/components";
import { ScaleLoader as Spinner } from "react-spinners";
import { useEffect, useRef } from "react";

export const MainContent = () => {
  const nextPageRef = useRef<HTMLDivElement>(null);
  const { data, hasNextPage, fetchNextPage, isPending, isFetchingNextPage } =
    useSuspenseInfiniteQuery(feedPostsOptions);

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    if (nextPageRef.current && hasNextPage) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      });
      observer.observe(nextPageRef.current);
    }
  }, [fetchNextPage, hasNextPage]);

  return (
    <main className="w-2/4 overflow-y-auto py-4 flex flex-col gap-4 hide-scrollbar">
      <CreatePostBlock />
      {isPending && (
        <div className="flex items-center gap-2 justify-center py-4">
          <Spinner barCount={3} height={16} width={2} margin={1} color="#AAA" />
          <span className="text-gray-500 text-sm">Loading posts...</span>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}
      </div>
      <div ref={nextPageRef} />
      {isFetchingNextPage && (
        <div className="flex items-center gap-2 justify-center py-4">
          <Spinner barCount={3} height={16} width={2} margin={1} color="#AAA" />
          <span className="text-gray-500 text-sm">Loading more posts...</span>
        </div>
      )}
    </main>
  );
};
