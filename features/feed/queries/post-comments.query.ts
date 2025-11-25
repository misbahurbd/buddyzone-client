import { fetchPostComments } from "@/features/feed/actions";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const postCommentsOptions = (postId: string) =>
  infiniteQueryOptions({
    queryKey: ["feed:post-comments", { postId }],
    queryFn: async ({ pageParam }) => {
      const res = await fetchPostComments({
        postId,
        cursor: (pageParam as string | null) ?? null,
      });
      if (res.success) {
        return {
          data: res.data,
          meta: res.meta,
        };
      }
      return {
        data: [],
        meta: undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.meta?.nextCursor || null,
    initialPageParam: null as string | null,
  });
