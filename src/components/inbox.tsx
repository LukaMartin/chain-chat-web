"use client";

import useReceivedMessages from "@/hooks/useReceivedMessages";
import MessageCard from "./message-card";
import MessageCardSkeleton from "./message-card-skeleton";
import { useAccount } from "wagmi";

export default function Inbox() {
  const { receivedMessages, isLoading } = useReceivedMessages();
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-6.5 pt-[3px]">Inbox</h2>
      {receivedMessages && receivedMessages.length > 0 ? (
        <div className="flex flex-col gap-y-4">
          {receivedMessages?.map((message) => (
            <MessageCard
              key={message.id}
              tokenId={Number(message.token_id)}
              sender={message.sender}
              message={message.message}
              timestamp={Number(message.timestamp)}
              isReceived={true}
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
