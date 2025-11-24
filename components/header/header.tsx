import { SearchBox, NavMenu } from "@/components/header";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full h-16 px-14 bg-bg2">
      <div className="flex h-full items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={150}
            height={35}
            className="w-32"
          />
        </Link>
        <SearchBox />
        <NavMenu />
      </div>
    </header>
  );
};
