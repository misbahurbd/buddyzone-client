"use client";

import { cn, getInitials } from "@/lib/utils";
import { currentUserOptions } from "@/features/auth/queries/current-user.query";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { USER_NAV_MENU } from "@/constants";
import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/actions";
import { toast } from "sonner";
import { LogoutIcon } from "@/assets/icons";
import { getQueryClient } from "@/lib/get-query-client";

export const UserNav = () => {
  const router = useRouter();
  const queryClient = getQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const { data: user, isPending: isLoading } = useQuery(currentUserOptions);

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      toast.success(res.message);
      router.refresh();
      setIsOpen(false);
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    } else {
      toast.error(res.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <span className="size-7 rounded-full bg-gray-200 animate-pulse" />
        <span className="h-4 w-24 rounded-full bg-gray-200 animate-pulse" />
        <span className="size-4 rounded-full bg-gray-200 animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-white font-medium bg-color5 px-4 py-2 rounded-md hover:bg-color6 transition-all"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative flex h-16">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <div className="size-7 rounded-full">
          {user?.photo ? (
            <Image
              src={user.photo}
              alt={user.username}
              width={32}
              height={32}
              className="size-7 block rounded-full object-cover border border-color5"
            />
          ) : (
            <div className="size-7 text-xs font-medium flex items-center justify-center rounded-full bg-color5/10 text-color5 border border-color5">
              {getInitials(user.firstName, user.lastName)}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm max-w-[100px] truncate text-color">
            {user.firstName} {user.lastName}
          </p>
        </div>
        <ChevronDown className="size-4 text-color3" />
      </button>

      <div
        className={cn(
          "absolute top-full right-0 bg-bg2 rounded-b-md shadow-lg p-4 w-[290px] z-50 space-y-3 invisible -translate-y-4 opacity-0 transition-all duration-300 pointer-events-none",
          isOpen && "visible translate-y-0 opacity-100 pointer-events-auto"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="size-14 rounded-full">
            {user?.photo ? (
              <Image
                src={user.photo}
                alt={user.username}
                width={32}
                height={32}
                className="size-14 block rounded-full object-cover border-2 border-color5"
              />
            ) : (
              <div className="size-14 text-lg font-bold flex items-center justify-center rounded-full bg-color5/10 text-color5 border-2 border-color5">
                {getInitials(user.firstName, user.lastName)}
              </div>
            )}
          </div>
          <div>
            <p className="text-color font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <Link
              href={`/${user.username}`}
              className="text-sm text-color5 hover:opacity-80 transition-all"
            >
              View Profile
            </Link>
          </div>
        </div>
        <span className="block h-px w-full bg-bg5/10" />
        <div className="flex flex-col gap-3">
          {USER_NAV_MENU.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="flex items-center justify-center size-10 rounded-full bg-color5/10 text-color5">
                <item.icon className="size-5 text-color5" />
              </div>
              <p className="font-medium text-color7 group-hover:text-color5 transition-all">
                {item.label}
              </p>
              <ChevronRight className="size-4 text-color3 ml-auto" />
            </Link>
          ))}
          <button
            onClick={handleLogout}
            type="button"
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="flex items-center justify-center size-10 rounded-full bg-color5/10 text-color5">
              <LogoutIcon className="size-4 text-color5" />
            </div>
            <p className="font-medium text-color7 group-hover:text-color5 transition-all">
              Logout
            </p>
            <ChevronRight className="size-4 text-color3 ml-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
