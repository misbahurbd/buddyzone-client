"use server";

import { AxiosError } from "axios";
import { RegisterSchema } from "@/features/auth/validators";
import { api, ApiResponse } from "@/lib/axios";

interface RegisterResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  photo?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const register = async (
  data: RegisterSchema
): Promise<ApiResponse<RegisterResponse>> => {
  try {
    const res = await api.post("/api/v1/auth/register", {
      firstName: data.firstName,
      lastName: data.lastName,
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
