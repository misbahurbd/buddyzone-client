"use client";

import { AuthorAvatar } from "@/components/shared/author-avatar";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCurrentUser } from "@/stores/current-user";
import { ImageIcon, Loader2, Mic } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { postCommentMutationOptions } from "../mutations";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  comment: z.string(),
});

export const FeedPostCommentInput = ({
  postId,
  parentCommentId = null,
}: {
  postId: string;
  parentCommentId: string | null;
}) => {
  const { user } = useCurrentUser();
  const { mutateAsync: postComment, isPending: isPostingComment } = useMutation(
    postCommentMutationOptions
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      comment: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      if (data.comment.trim() === "") {
        return;
      }

      const res = await postComment({
        postId,
        comment: data.comment,
        parentCommentId,
      });

      form.reset();
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
    <form className="relative" onSubmit={handleSubmit}>
      {user && (
        <AuthorAvatar
          author={user}
          className="size-7 text-sm absolute left-2.5 top-1/2 -translate-y-1/2"
        />
      )}
      <textarea
        {...form.register("comment")}
        className="w-full block h-12 hide-scrollbar appearance-none resize-none rounded-[1.2rem] outline-none ps-12 pr-20 py-3 bg-[#f6f6f6]"
        placeholder="Write a comment"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="right-2.5 absolute top-1/2 -translate-y-1/2 flex items-center gap-2">
        {isPostingComment && (
          <Loader2 className="size-4 animate-spin text-color/60" />
        )}
        <button
          type="button"
          className="size-6 text-sm text-color/60 cursor-pointer rounded-full flex items-center justify-center"
        >
          <Mic className="size-4" />
        </button>
        <button
          type="button"
          className="size-6 text-sm text-color/60 cursor-pointer rounded-full flex items-center justify-center"
        >
          <ImageIcon className="size-4" />
        </button>
      </div>
    </form>
  );
};
