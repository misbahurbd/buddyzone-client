"use server";

import { api, ApiResponse } from "@/lib/axios";
import { AxiosError } from "axios";
import { FeedPost } from "./posts.action";

export const postComment = async ({
  postId,
  comment,
  parentCommentId,
}: {
  postId: string;
  comment: string;
  parentCommentId: string | null;
}): Promise<ApiResponse<FeedPost>> => {
  try {
    const res = await api.post(`/api/v1/posts/${postId}/comment`, {
      comment,
      parentCommentId,
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
