import { mutationOptions, InfiniteData } from "@tanstack/react-query";
import { postReaction } from "../actions/post-reaction.action";
import { getQueryClient } from "@/lib/get-query-client";
import { FeedPost } from "../actions";

type FeedPage = {
  data: FeedPost[];
  meta?: {
    nextCursor: string | null;
  };
};

export const postReactionMutationOptions = mutationOptions({
  mutationFn: postReaction,
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
