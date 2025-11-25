import { Suspense } from "react";
import {
  UserProfile,
  UserPosts,
  UserCreatePost,
  UserProfileLoading,
  UserPostsLoading,
} from "@/features/user/components";
import { userProfileOptions } from "@/features/user/queries/user-profile.query";
import { userPostsOptions } from "@/features/user/queries/user-posts.query";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const UserProfilePage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(userProfileOptions(username));
  void queryClient.prefetchInfiniteQuery(userPostsOptions(username));

  return (
    <section className="h-full overflow-hidden px-14 flex gap-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="w-2/4 overflow-y-auto py-4 flex flex-col gap-4 hide-scrollbar mx-auto">
          {/* Profile Section */}
          <Suspense fallback={<UserProfileLoading />}>
            <UserProfile username={username} />
          </Suspense>

          {/* Create Post Block - Only for current user */}
          <Suspense fallback={null}>
            <UserCreatePost username={username} />
          </Suspense>

          {/* Posts Section */}
          <Suspense fallback={<UserPostsLoading />}>
            <UserPosts username={username} />
          </Suspense>
        </div>
      </HydrationBoundary>
    </section>
  );
};

export default UserProfilePage;
