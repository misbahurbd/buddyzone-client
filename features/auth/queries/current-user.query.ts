import { currentUser } from "@/features/auth/actions/current-user.action";
import { queryOptions } from "@tanstack/react-query";

export const currentUserOptions = queryOptions({
  queryKey: ["current-user"],
  queryFn: async () => {
    const res = await currentUser();
    if (res.success) {
      return res.data;
    }
    return null;
  },
});
