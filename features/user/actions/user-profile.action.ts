"use server";

import { api, ApiResponse } from "@/lib/axios";
import { AxiosError } from "axios";

interface UserProfileResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  photo?: string;
  isCurrentUser: boolean;
  createdAt: string;
  updatedAt: string;
}

export const userProfile = async (
  username: string
): Promise<ApiResponse<UserProfileResponse>> => {
  try {
    const res = await api.get(`/api/v1/users/${username}`);
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
