"use server";

import { api, ApiResponse } from "@/lib/axios";
import { AxiosError } from "axios";

export interface FileUploadResponse {
  publicId: string;
  url: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  resourceType: string;
  bytes: number;
  createdAt: string;
}

export const fileUploadAction = async (
  formData: FormData
): Promise<ApiResponse<FileUploadResponse[]>> => {
  try {
    const res = await api.post("/api/v1/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
