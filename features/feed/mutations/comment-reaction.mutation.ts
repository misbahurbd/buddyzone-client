import { mutationOptions, InfiniteData } from "@tanstack/react-query";
import {
  commentReaction,
  FeedPost,
  FeedComment,
} from "@/features/feed/actions";
import { getQueryClient } from "@/lib/get-query-client";

type FeedPage = {
  data: FeedPost[];
  meta?: {
    nextCursor: string | null;
  };
};

type FeedCommentPage = {
  data: FeedComment[];
  meta?: {
    nextCursor: string | null;
  };
};

export const commentReactionMutationOptions = mutationOptions({
  mutationFn: commentReaction,
  onSuccess: (data, variables) => {
    if (data.success) {
      const postId = variables.postId;

      // Update this post data
      getQueryClient().setQueryData<InfiniteData<FeedPage>>(
        ["feed:posts"],
        (old: InfiniteData<FeedPage> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((post: FeedPost) =>
                post.id === data.data.id ? data.data : post
              ),
            })),
          };
        }
      );

      // Replace the entire comments cache with fresh data from the response
      // This handles reactions on both top-level comments and replies (which are nested in replies array)
      getQueryClient().setQueryData<InfiniteData<FeedCommentPage>>(
        ["feed:post-comments", { postId }],
        (old: InfiniteData<FeedCommentPage> | undefined) => {
          if (!old) {
            // If no cache exists, create a new one with all comments from response
            return {
              pages: [
                {
                  data: data.data.comments,
                  meta: undefined,
                },
              ],
              pageParams: [null],
            };
          }

          // Replace the first page with fresh comments data, keep other pages
          const firstPage = old.pages[0];
          return {
            ...old,
            pages: [
              {
                ...firstPage,
                data: data.data.comments,
              },
              ...old.pages.slice(1),
            ],
          };
        }
      );
    }
  },
});
