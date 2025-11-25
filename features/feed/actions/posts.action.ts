"use server";

import { Author } from "@/interfaces";
import { api, ApiResponse } from "@/lib/axios";
import { AxiosError } from "axios";

export type FeedReactionType =
  | "LIKE"
  | "LOVE"
  | "WOW"
  | "SAD"
  | "ANGRY"
  | "HAHA";

type FeedVisibility = "PUBLIC" | "PRIVATE" | "FRIENDS";

export interface FeedPostMedia {
  id: string;
  publicId: string;
  url: string;
}

export interface FeedReaction {
  id: string;
  reactionType: FeedReactionType;
  author: Author;
}

export interface FeedComment {
  id: string;
  parentId: string | null;
  content: string;
  createdAt: string;
  author: Author;
  reactions: FeedReaction[];
  replies: FeedComment[];
  totalReactions: number;
  totalReplies: number;
}

export interface FeedPost {
  id: string;
  content: string;
  visibility: FeedVisibility;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  mediaUrls: FeedPostMedia[];
  author: Author;
  reactions: FeedReaction[];
  comments: FeedComment[];
  totalReactions: number;
  totalComments: number;
}

export const getPosts = async ({
  cursor,
}: {
  cursor: string | null;
}): Promise<ApiResponse<FeedPost[]>> => {
  try {
    const res = await api.get("/api/v1/posts", { params: { cursor } });
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
