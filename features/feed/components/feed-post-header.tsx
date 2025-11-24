"use client";
import { FeedPost } from "@/features/feed/actions";
import Image from "next/image";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const FeedPostHeader = ({ post }: { post: FeedPost }) => {
  return (
    <header className="flex items-center gap-2">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full">
          {post.author.photo ? (
            <Image
              src={post.author.photo}
              alt={post.author.username}
              width={40}
              height={40}
              className="size-10 rounded-full object-cover"
            />
          ) : (
            <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center">
              {getInitials(post.author.firstName, post.author.lastName)}
            </div>
          )}
        </div>
        <div>
          <p className="text-color">
            {post.author.firstName} {post.author.lastName}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${post.id}`}
              className="text-sm text-color/40 hover:text-color transition-all"
            >
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </Link>
            <span className="text-sm text-color/40">•</span>
            <span className="text-sm text-color/40 capitalize">
              {post.visibility.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
