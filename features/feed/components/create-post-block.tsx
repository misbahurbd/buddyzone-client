"use client";

import { AuthorAvatar } from "@/components/shared/author-avatar";
import { useCurrentUser } from "@/stores/current-user";
import { createPostSchema, CreatePostSchema } from "@/features/feed/validators";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSelect } from "@/components/form/form-select";
import { fileUploadAction } from "@/features/upload/actions/file-upload.action";
import { useTransition } from "react";
import { toast } from "sonner";
import { ScaleLoader as Spinner } from "react-spinners";
import Image from "next/image";
import {
  CalendarDays,
  FileText,
  ImageIcon,
  Send,
  Video,
  X,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createPostMutationOptions } from "../mutations/create-post.mutation";
import { AxiosError } from "axios";

export const CreatePostBlock = () => {
  const { user } = useCurrentUser();
  const [isUploading, startTransition] = useTransition();
  const { mutateAsync: createPost, isPending: isCreatingPost } = useMutation(
    createPostMutationOptions
  );
  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
      visibility: "PUBLIC",
      mediaUrls: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "mediaUrls",
    rules: {
      minLength: 0,
      maxLength: 10,
    },
  });

  const handleFileUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        append({
          publicId: "temp",
          url: fileReader.result as string,
        });
      };

      formData.append("files", file);
    });

    startTransition(async () => {
      const res = await fileUploadAction(formData);
      if (res.success) {
        replace([
          ...form
            .getValues("mediaUrls")
            .filter((file) => file.publicId !== "temp"),
          ...res.data.map((file) => ({
            publicId: file.publicId,
            url: file.secureUrl,
          })),
        ]);
      }
      if (!res.success) {
        replace([
          ...form
            .getValues("mediaUrls")
            .filter((file) => file.publicId !== "temp"),
        ]);
        toast.error("Failed to upload files");
      }
    });
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await createPost(data);
      if (res.success) {
        toast.success("Post created successfully");
        form.reset();
      }
      if (!res.success) {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error instanceof AxiosError ? error.message : "An error occurred"
      );
    }
  });

  return (
    <section className="bg-bg2 rounded-md p-6">
      <form
        className="flex flex-col items-start gap-3 w-full"
        onSubmit={handleSubmit}
      >
        {user && (
          <div className="flex items-center gap-2">
            <AuthorAvatar author={user} className="size-9" />
            <div>
              <h4 className="text-sm font-medium text-color">
                {user.firstName} {user.lastName}
              </h4>

              <FormSelect
                control={form.control}
                name="visibility"
                options={[
                  { label: "Public", value: "PUBLIC" },
                  { label: "Private", value: "PRIVATE" },
                  { label: "Friends", value: "FRIENDS" },
                ]}
                className="px-1 py-1 text-xs h-auto min-h-0"
              />
            </div>
          </div>
        )}
        <textarea
          {...form.register("content")}
          className="hide-scrollbar block w-full appearance-none resize-none outline-none py-1.5"
          placeholder="Write someting ..."
          rows={3}
        />
        {fields.length > 0 && (
          <div className="flex flex-nowrap overflow-x-auto w-full hide-scrollbar gap-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="size-24 group/item rounded-md shrink-0 overflow-hidden relative"
              >
                {field.publicId !== "temp" && (
                  <button
                    type="button"
                    className="absolute opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-bg2/80 z-20 right-0 top-0 size-6 text-sm text-color/60 cursor-pointer rounded-full flex items-center justify-center"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <X className="size-4" />
                  </button>
                )}
                {field.publicId === "temp" && (
                  <div className="size-24 bg-bg2/30 rounded-md overflow-hidden absolute inset-0 flex items-center justify-center">
                    <Spinner
                      barCount={3}
                      height={20}
                      width={3}
                      margin={1}
                      color="#000"
                    />
                  </div>
                )}
                <Image
                  src={field.url}
                  alt={field.publicId}
                  width={100}
                  height={100}
                  className="size-24 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        )}
        <div className="bg-[#1890ff0d] p-3 flex items-center justify-between w-full">
          <div className="flex items-center gap-4 px-2">
            <input
              id="file-input"
              name="file-input"
              type="file"
              hidden
              multiple
              accept="image/png, image/jpeg, image/gif, image/webp"
              max={10}
              onChange={(e) => {
                if (e.target.files) {
                  const files = Array.from(e.target.files);
                  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

                  const oversizedFiles = files.filter(
                    (file) => file.size > MAX_FILE_SIZE
                  );

                  if (oversizedFiles.length > 0) {
                    const fileNames = oversizedFiles
                      .map((file) => file.name)
                      .join(", ");
                    toast.error(
                      `The following file(s) exceed 5MB limit: ${fileNames}. Please select smaller files.`
                    );
                  }

                  const validFiles = files.filter(
                    (file) => file.size <= MAX_FILE_SIZE
                  );

                  if (validFiles.length > 0) {
                    handleFileUpload(validFiles.slice(0, 10));
                  }

                  e.target.value = "";
                }
              }}
            />
            <label
              htmlFor="file-input"
              className="text-sm group font-medium transition text-color/60 hover:text-color5 cursor-pointer rounded-full flex items-center justify-center"
            >
              <ImageIcon className="size-5" />
              <span className="text-sm transition text-color/60 group-hover:text-color5 ml-2">
                Photo
              </span>
            </label>
            <button
              type="button"
              className="text-sm group font-medium transition text-color/60 hover:text-color5 cursor-pointer rounded-full flex items-center justify-center"
            >
              <Video className="size-5" />
              <span className="text-sm transition text-color/60 group-hover:text-color5 ml-2">
                Video
              </span>
            </button>
            <button
              type="button"
              className="text-sm group font-medium transition text-color/60 hover:text-color5 cursor-pointer rounded-full flex items-center justify-center"
            >
              <CalendarDays className="size-5" />
              <span className="text-sm transition text-color/60 group-hover:text-color5 ml-2">
                Event
              </span>
            </button>
            <button
              type="button"
              className="text-sm group font-medium transition text-color/60 hover:text-color5 cursor-pointer rounded-full flex items-center justify-center"
            >
              <FileText className="size-5" />
              <span className="text-sm transition text-color/60 group-hover:text-color5 ml-2">
                Article
              </span>
            </button>
          </div>
          <button
            type="submit"
            disabled={isUploading || isCreatingPost}
            className="text-sm px-5 py-3 rounded-md bg-color5 text-bg2 group font-medium transition hover:bg-color5/80 hover:text-bg2 cursor-pointer flex gap-2 items-center justify-center disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            <Send className="size-4" />
            <span className="font-medium">Post</span>
          </button>
        </div>
      </form>
    </section>
  );
};
