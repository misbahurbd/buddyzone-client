"use server";

import { api, ApiResponse } from "@/lib/axios";
import { AxiosError } from "axios";
import { FeedComment } from "./posts.action";

export const fetchPostComments = async ({
  postId,
  cursor,
}: {
  cursor: string | null;
  postId: string;
}): Promise<ApiResponse<FeedComment[]>> => {
  try {
    const res = await api.get(`/api/v1/posts/${postId}/comments`, {
      params: { cursor, limit: 2 },
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
