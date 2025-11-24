import { mutationOptions, InfiniteData } from "@tanstack/react-query";
import { commentReaction, FeedPost } from "@/features/feed/actions";
import { getQueryClient } from "@/lib/get-query-client";

type FeedPage = {
  data: FeedPost[];
  meta?: {
    nextCursor: string | null;
  };
};

export const commentReactionMutationOptions = mutationOptions({
  mutationFn: commentReaction,
  onSuccess: (data) => {
    if (data.success) {
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
    }
  },
});
