import { mutationOptions } from "@tanstack/react-query";
import { updateProfileImage } from "../actions/update-profile.action";
import { getQueryClient } from "@/lib/get-query-client";

export const updateProfileImageMutationOptions = mutationOptions({
  mutationFn: updateProfileImage,
  onSuccess: (data) => {
    if (data.success) {
      // Invalidate user profile query to refetch with new data
      getQueryClient().invalidateQueries({
        queryKey: ["user-profile"],
      });
      // Also invalidate current user query
      getQueryClient().invalidateQueries({
        queryKey: ["current-user"],
      });
    }
  },
});

