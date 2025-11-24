"use server";

import { api, ApiResponse } from "@/lib/axios";
import { AxiosError } from "axios";
import { FeedPost } from ".";
import { CreatePostSchema } from "../validators";

export const createPost = async ({
  content,
  visibility,
  mediaUrls,
}: CreatePostSchema): Promise<ApiResponse<FeedPost>> => {
  try {
    const res = await api.post("/api/v1/posts", {
      content,
      visibility,
      mediaUrls,
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
