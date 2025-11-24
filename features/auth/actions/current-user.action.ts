"use server";

import { api, ApiResponse } from "@/lib/axios";
import { AxiosError } from "axios";

interface CurrentUserResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  photo?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const currentUser = async (): Promise<
  ApiResponse<CurrentUserResponse>
> => {
  try {
    const res = await api.get("/api/v1/auth/me");
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
