"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/stores/current-user";

export const CurrentUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const fetchUser = useCurrentUser((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <>{children}</>;
};
