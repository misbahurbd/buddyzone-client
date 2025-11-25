"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/stores/current-user";
import { useQuery } from "@tanstack/react-query";
import { currentUserOptions } from "@/features/auth/queries/current-user.query";
import { FullScreenLoader } from "@/components/shared/full-screen-loader";

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setUser = useCurrentUser((state) => state.setUser);
  const { data: user, isPending: isLoading } = useQuery(currentUserOptions);

  useEffect(() => {
    setUser(user || null);
  }, [user, setUser]);

  if (isLoading) {
    return <FullScreenLoader color="#1890ff" size={15} message="Loading..." />;
  }

  return <>{children}</>;
};
