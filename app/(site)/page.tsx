import { LeftAside, MainContent, RightAside } from "@/features/feed/components";
import { feedPostsOptions } from "@/features/feed/queries/feed.query";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const HomePage = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery(feedPostsOptions);

  return (
    <section className="h-full overflow-hidden px-14 flex gap-5">
      <LeftAside />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainContent />
      </HydrationBoundary>
      <RightAside />
    </section>
  );
};

export default HomePage;
