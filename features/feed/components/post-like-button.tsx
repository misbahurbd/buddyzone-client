"use client";

import { FeedReactionType } from "@/features/feed/actions";
import { FEED_POST_REACTIONS } from "@/features/feed/constants";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ReactionButtonProps {
  uniqueId: string;
  children: React.ReactNode;
  onReact: (reactionType: FeedReactionType | null) => void;
  disabled: boolean;
  align?: "left" | "right" | "center";
  position?: "top" | "bottom";
}

export const ReactionButton = ({
  uniqueId,
  children,
  onReact,
  disabled,
  align = "center",
  position = "bottom",
}: ReactionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {children}
      <div
        className={cn(
          "absolute delay-0 invisible origin-bottom scale-75 opacity-0 transition-all duration-75 p-2 w-max bg-bg2 shadow-lg rounded-full flex gap-2",
          align === "left" && "left-0",
          align === "right" && "right-0",
          align === "center" && "left-1/2 -translate-x-1/2",
          position === "top" && "top-full origin-top",
          position === "bottom" && "bottom-full origin-bottom",
          position === "top" &&
            (align === "left"
              ? "origin-top-left"
              : align === "right"
              ? "origin-top-right"
              : "origin-top-center"),
          position === "bottom" &&
            (align === "left"
              ? "origin-bottom-left"
              : align === "right"
              ? "origin-bottom-right"
              : "origin-bottom-center"),
          isOpen && "visible scale-100 opacity-100 duration-300 delay-300"
        )}
      >
        {FEED_POST_REACTIONS.map((reaction) => (
          <button
            key={reaction.id + uniqueId}
            onClick={() => {
              setIsOpen(false);
              onReact(reaction.value);
            }}
            className="cursor-pointer origin-bottom hover:scale-125 hover:z-20 transition-all duration-300 disabled:opacity-50"
            disabled={disabled}
          >
            <Image
              key={reaction.id}
              data-tooltip-id={`reaction-tooltip-${uniqueId}`}
              data-tooltip-content={reaction.label}
              src={reaction.icon}
              alt={reaction.label}
              width={40}
              height={40}
              priority
              className="w-10 h-10 object-cover"
            />
          </button>
        ))}
        <Tooltip
          place="top"
          id={`reaction-tooltip-${uniqueId}`}
          className="py-1! px-3! w-fit! text-center! text-xs! rounded-md! bg-color! text-bg2! shadow-2xl!"
        />
      </div>
    </div>
  );
};
