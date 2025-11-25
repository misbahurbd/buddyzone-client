"use server";

import { api, ApiResponse } from "@/lib/axios";
import { AxiosError } from "axios";
import { FeedPost } from "@/features/feed/actions";

export const getUserPosts = async ({
  username,
  cursor,
}: {
  username: string;
  cursor: string | null;
}): Promise<ApiResponse<FeedPost[]>> => {
  try {
    const res = await api.get(`/api/v1/posts/username/${username}`, {
      params: { cursor },
    });
    return {
      success: true,
      ...res.data,
    };
  } catch (errorResponse) {
    const error = errorResponse as AxiosError;
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  }
};

