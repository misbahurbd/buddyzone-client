"use server";

import { api, ApiResponse } from "@/lib/axios";
import { AxiosError } from "axios";

interface UpdateProfileResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  photo?: string;
  isCurrentUser: boolean;
  createdAt: string;
  updatedAt: string;
}

export const updateProfileImage = async (
  photoUrl: string
): Promise<ApiResponse<UpdateProfileResponse>> => {
  try {
    console.log("photoUrl", photoUrl);

    const res = await api.put("/api/v1/users/me", {
      photo: photoUrl,
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
