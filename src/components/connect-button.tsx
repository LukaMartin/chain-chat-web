"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { formatAddress } from "@/lib/formatAddress";
import { AiOutlineDisconnect } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "usehooks-ts";

export default function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const isMobile = useMediaQuery("(max-width: 760px)");

  return (
    <button
      className={twMerge(
        "flex items-center gap-x-2 bg-card border border-card-hover rounded-lg px-3 py-1 self-end text-[15px] md:text-base hover:bg-card-hover active:scale-95 transition-all",
        isConnected && "cursor-default hover:bg-card active:scale-100",
        isMobile && "self-center"
      )}
      onClick={() => open()}
    >
      {address ? formatAddress(address) : "Connect"}
      {address && (
        <AiOutlineDisconnect
          className="text-white/50 hover:text-white hover:cursor-pointer transition-all"
          onClick={() => disconnect()}
        />
      )}
    </button>
  );
}
