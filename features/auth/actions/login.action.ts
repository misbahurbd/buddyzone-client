"use server";

import { AxiosError } from "axios";
import { LoginSchema } from "@/features/auth/validators";
import { api, ApiResponse } from "@/lib/axios";

interface LoginResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  photo?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const login = async (
  data: LoginSchema
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const res = await api.post("/api/v1/auth/login", {
      email: data.email,
      password: data.password,
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
