"use server";

import { api, ApiResponse } from "@/lib/axios";
import { AxiosError } from "axios";

export const logout = async (): Promise<ApiResponse<null>> => {
  try {
    await api.post("/api/v1/auth/logout");
    return {
      success: true,
      message: "Logout successful",
      data: null,
    };
  } catch (errorResponse) {
    const error = errorResponse as AxiosError;
    return {
      success: false,
      message: error.message || "An error occurred",
    };
  }
};
