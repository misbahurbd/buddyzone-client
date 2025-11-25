"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { userProfileOptions } from "../queries/user-profile.query";
import { CreatePostBlock } from "@/features/feed/components";

export const UserCreatePost = ({ username }: { username: string }) => {
  const { data: userProfile } = useSuspenseQuery(userProfileOptions(username));

  if (!userProfile?.isCurrentUser) {
    return null;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CreatePostBlock />
    </div>
  );
};

