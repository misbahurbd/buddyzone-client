"use client";

import { AuthorAvatar } from "@/components/shared/author-avatar";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCurrentUser } from "@/stores/current-user";
import { Image, ImageIcon, Mic } from "lucide-react";

const schema = z.object({
  comment: z.string(),
});

export const FeedPostCommentInput = ({ postId }: { postId: string }) => {
  const { user } = useCurrentUser();
  const form = useForm<{ comment: string }>({
    defaultValues: {
      comment: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    if (data.comment.trim() === "") {
      return;
    }

    console.log(data);
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
      />
      <div className="right-2.5 absolute top-1/2 -translate-y-1/2 flex items-center gap-2">
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
