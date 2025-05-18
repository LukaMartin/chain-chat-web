"use client";

import { twMerge } from "tailwind-merge";
import MessageForm from "./message-form";
import { useAccount } from "wagmi";

export default function NewMessage() {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <h2
        className={twMerge(
          `text-2xl font-bold mb-8 mt-5 text-center ${
            !isConnected && "text-left mb-6.5"
          }`
        )}
      >
        New Message
      </h2>
      {isConnected ? (
        <MessageForm />
      ) : (
        <p className="text-white/50 -mt-1">
          Connect your wallet to send a message
        </p>
      )}
    </div>
  );
}
