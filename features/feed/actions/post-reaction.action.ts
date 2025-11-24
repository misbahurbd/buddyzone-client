"use server";

import { api, ApiResponse } from "@/lib/axios";
import { FeedPost, FeedReactionType } from ".";
import { AxiosError } from "axios";

export const postReaction = async ({
  postId,
  reactionType,
}: {
  postId: string;
  reactionType: FeedReactionType | null;
}): Promise<ApiResponse<FeedPost>> => {
  try {
    const res = await api.post(`/api/v1/posts/${postId}/reactions`, {
      reactionType,
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
