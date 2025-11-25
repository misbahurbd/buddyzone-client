"use client";

import { useEffect, useRef } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { userPostsOptions } from "../queries/user-posts.query";
import { FeedPostCard } from "@/features/feed/components";
import { ScaleLoader as Spinner } from "react-spinners";

export const UserPosts = ({ username }: { username: string }) => {
  const nextPageRef = useRef<HTMLDivElement>(null);
  const {
    data: postsData,
    hasNextPage,
    fetchNextPage,
    isPending: isPostsPending,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(userPostsOptions(username));

  const posts = postsData?.pages.flatMap((page) => page.data) ?? [];

  // Infinite scroll for posts
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
      return () => observer.disconnect();
    }
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
      {isPostsPending && (
        <div className="flex items-center gap-2 justify-center py-4">
          <Spinner barCount={3} height={16} width={2} margin={1} color="#AAA" />
          <span className="text-gray-500 text-sm">Loading posts...</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {posts.length === 0 ? (
          <div className="bg-bg2 rounded-lg p-6 text-center">
            <p className="text-color/60">No posts yet</p>
          </div>
        ) : (
          posts.map((post) => <FeedPostCard key={post.id} post={post} />)
        )}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={nextPageRef} />
      {isFetchingNextPage && (
        <div className="flex items-center gap-2 justify-center py-4">
          <Spinner barCount={3} height={16} width={2} margin={1} color="#AAA" />
          <span className="text-gray-500 text-sm">Loading more posts...</span>
        </div>
      )}
    </div>
  );
};

