"use client";

import useReceivedMessages from "@/hooks/useReceivedMessages";
import MessageCard from "./message-card";
import MessageCardSkeleton from "./message-card-skeleton";
import { useAccount } from "wagmi";
import { twMerge } from "tailwind-merge";

export default function Inbox() {
  const { receivedMessages, isLoading } = useReceivedMessages();
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-5.5 mt-5">Inbox</h2>
      {receivedMessages && receivedMessages.length > 0 ? (
        <div
          className={twMerge(
            `flex flex-col gap-y-4 max-h-[480px] overflow-y-auto ${
              receivedMessages && receivedMessages.length > 4 && "pr-3"
            }`
          )}
        >
          {receivedMessages?.map((message) => (
            <MessageCard
              key={message.id}
              tokenId={Number(message.token_id)}
              sender={message.sender}
              receiver={message.receiver}
              message={message.message}
              timestamp={Number(message.timestamp)}
              isReceived={true}
              viewed={message.viewed}
            />
          ))}
        </div>
      ) : isLoading ? (
        <div className="flex flex-col gap-y-4">
          <MessageCardSkeleton />
          <MessageCardSkeleton />
          <MessageCardSkeleton />
          <MessageCardSkeleton />
        </div>
      ) : isConnected ? (
        <p className="text-white/50 -mt-1">Your inbox is empty</p>
      ) : (
        <p className="text-white/50 -mt-1">
          Connect your wallet to view your inbox
        </p>
      )}
    </div>
  );
}
