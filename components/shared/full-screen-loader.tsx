"use client";

import { ScaleLoader } from "react-spinners";
import { cn } from "@/lib/utils";

interface FullScreenLoaderProps {
  className?: string;
  color?: string;
  size?: number;
  message?: string;
}

export const FullScreenLoader = ({
  className,
  color = "#1890ff",
  size = 15,
  message,
}: FullScreenLoaderProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-bg2/80 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <ScaleLoader
          color={color}
          height={size}
          width={4}
          margin={2}
          radius={2}
        />
        {message && (
          <p className="text-sm font-medium text-color7 animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
