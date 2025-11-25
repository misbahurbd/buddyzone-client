import { queryOptions } from "@tanstack/react-query";
import { userProfile } from "../actions/user-profile.action";

export const userProfileOptions = (username: string) =>
  queryOptions({
    queryKey: ["user-profile", { username }],
    queryFn: async () => {
      const res = await userProfile(username);
      if (res.success) {
        return res.data;
      }
      return null;
    },
  });
