"use client";

import { useRef, useTransition } from "react";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { userProfileOptions } from "../queries/user-profile.query";
import { updateProfileImageMutationOptions } from "../mutations/update-profile.mutation";
import { fileUploadAction } from "@/features/upload/actions/file-upload.action";
import { getInitials, cn } from "@/lib/utils";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export const UserProfile = ({ username }: { username: string }) => {
  const { data: userProfile } = useSuspenseQuery(userProfileOptions(username));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();

  const { mutateAsync: updateProfileImage } = useMutation(
    updateProfileImageMutationOptions
  );

  const handleFileChange = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    startTransition(async () => {
      const res = await fileUploadAction(formData);
      if (res.success) {
        updateProfileImage(res.data[0].secureUrl);
      }
      if (!res.success) {
        toast.error("Failed to upload files");
      }
    });
  };

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-color/60">User not found</p>
      </div>
    );
  }

  return (
    <div className="bg-bg2 rounded-lg p-6 w-full flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
      {/* Profile Image Section - Centered */}
      <label htmlFor="profile-image-input" className="relative group">
        <div
          className={cn(
            "size-32 rounded-full overflow-hidden border-4 border-bg2",
            userProfile.isCurrentUser && !isUploading && "cursor-pointer",
            userProfile.isCurrentUser && "hover:opacity-90 transition-opacity"
          )}
        >
          {userProfile.photo ? (
            <Image
              src={userProfile.photo}
              alt={userProfile.username}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-200 text-4xl flex items-center justify-center text-color/60">
              {getInitials(userProfile.firstName, userProfile.lastName)}
            </div>
          )}
        </div>
        {userProfile.isCurrentUser && (
          <>
            <div
              className={cn(
                "absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                isUploading && "opacity-100"
              )}
            >
              {isUploading ? (
                <Loader2 className="size-6 text-white animate-spin" />
              ) : (
                <Camera className="size-6 text-white" />
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              id="profile-image-input"
              onChange={(e) => {
                if (e.target.files) {
                  const files = Array.from(e.target.files);
                  handleFileChange(files);
                  e.target.value = "";
                }
              }}
              className="hidden"
            />
          </>
        )}
      </label>

      {/* User Info - Center Aligned */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-medium text-color">
          @{userProfile.username}
        </p>
        <p className="text-sm text-color/60">
          Joined{" "}
          {formatDistanceToNow(new Date(userProfile.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};
