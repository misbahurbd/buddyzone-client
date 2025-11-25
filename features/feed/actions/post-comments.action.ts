"use server";

import { api, ApiResponse } from "@/lib/axios";
import { FeedReaction } from "./posts.action";
import { AxiosError } from "axios";

export const getPostReactions = async (
  postId: string,
  options: {
    cursor?: string | null;
  } = {}
): Promise<ApiResponse<FeedReaction[]>> => {
  try {
    const res = await api.get(`/api/v1/posts/${postId}/reactions`, {
      params: options,
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
