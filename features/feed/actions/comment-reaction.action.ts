"use server";

import { api, ApiResponse } from "@/lib/axios";
import { AxiosError } from "axios";
import { FeedPost, FeedReactionType } from "@/features/feed/actions/";

export const commentReaction = async ({
  postId,
  commentId,
  reactionType,
}: {
  postId: string;
  commentId: string;
  reactionType: FeedReactionType | null;
}): Promise<ApiResponse<FeedPost>> => {
  try {
    const res = await api.post(
      `/api/v1/posts/${postId}/comment/${commentId}/react`,
      {
        reactionType,
      }
    );

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
