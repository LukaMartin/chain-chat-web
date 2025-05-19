"use client";

import { useMediaQuery } from "usehooks-ts";
import ConnectButton from "./connect-button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 760px)");

  return (
    <header
      className={`flex items-center justify-between max-w-[1000px] xl:max-w-[1024px] px-4 lg:px-0 mx-auto w-full h-24 ${
        isMobile && "border-b border-card-hover z-50 sticky top-0 bg-background"
      }`}
    >
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={45} height={45} />
        </Link>
        <p className="text-white text-2xl font-bold mb-2 hidden md:block">
          ChainChat
        </p>
      </div>
      {isMobile && <ConnectButton />}
    </header>
  );
}
