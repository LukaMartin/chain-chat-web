"use client";

import { useMediaQuery } from "usehooks-ts";
import ConnectButton from "./connect-button";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 760px)");

  return (
    <header
      className={`flex items-center justify-between max-w-[1024px] px-4 lg:px-0 mx-auto w-full h-24 ${
        isMobile && "border-b border-card-hover z-50 sticky top-0 bg-background"
      }`}
    >
      <p className="text-white text-2xl font-bold">ChainChat</p>
      {isMobile && <ConnectButton />}
    </header>
  );
}
