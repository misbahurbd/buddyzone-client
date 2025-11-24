"use client";

import { Author } from "@/interfaces";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";

export const AuthorAvatar = ({
  author,
  className,
}: {
  author: Author;
  className?: string;
}) => {
  return (
    <div className={cn("size-10 rounded-full", className)}>
      {author.photo ? (
        <Image
          src={author.photo}
          alt={author.username}
          width={100}
          height={100}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-gray-200 text-[1em] flex items-center justify-center">
          {getInitials(author.firstName, author.lastName)}
        </div>
      )}
    </div>
  );
};
