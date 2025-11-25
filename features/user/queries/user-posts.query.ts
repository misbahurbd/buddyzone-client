import { getUserPosts } from "../actions/user-posts.action";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const userPostsOptions = (username: string) =>
  infiniteQueryOptions({
    queryKey: ["user-posts", { username }],
    queryFn: async ({ pageParam }) => {
      const res = await getUserPosts({
        username,
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

