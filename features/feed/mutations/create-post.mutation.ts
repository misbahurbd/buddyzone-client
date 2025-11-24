import { mutationOptions, InfiniteData } from "@tanstack/react-query";
import { FeedPost, createPost } from "@/features/feed/actions";
import { getQueryClient } from "@/lib/get-query-client";

type FeedPage = {
  data: FeedPost[];
  meta?: {
    nextCursor: string | null;
  };
};

export const createPostMutationOptions = mutationOptions({
  mutationFn: createPost,
  onSuccess: (data) => {
    if (data.success) {
      getQueryClient().setQueryData<InfiniteData<FeedPage>>(
        ["feed:posts"],
        (old: InfiniteData<FeedPage> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: [{ data: [data.data], meta: undefined }, ...old.pages],
          };
        }
      );
    }
  },
});
