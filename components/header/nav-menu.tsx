"use client";

import { DESKTOP_NAV_MENU } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-5">
      {DESKTOP_NAV_MENU.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="h-16 group px-3 flex items-center justify-center relative"
        >
          <span
            className={cn(
              "absolute transition-all bottom-0 left-0 w-full h-0 bg-[#00ACFF] opacity-60 group-hover:h-0.5",
              pathname === item.href && "h-0.5"
            )}
          />
          <item.icon
            className={cn(
              "size-5 text-gray-600 group-hover:text-[#00ACFF] transition-all",
              pathname === item.href && "text-[#00ACFF]"
            )}
          />
          {item.count && (
            <span className="absolute top-4 left-5 text-[11px] p-[3px] bg-color5 text-white leading-none rounded-full font-sans h-[17px] min-w-[17px] flex items-center justify-center border border-bg2">
              {item.count}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
};
