"use client";

import MessageCard from "./message-card";
import useSentMessages from "@/hooks/useSentMessages";
import MessageCardSkeleton from "./message-card-skeleton";
import { useAccount } from "wagmi";
import { twMerge } from "tailwind-merge";
import MobileNewMessageButton from "./mobile-new-message-button";
import { useMediaQuery } from "usehooks-ts";

export default function SentMessages() {
  const { sentMessages, isLoading } = useSentMessages();
  const { isConnected } = useAccount();
  const isMobile = useMediaQuery("(max-width: 760px)");

  return (
    <div className="flex flex-col h-full px-4 md:px-0">
      <div
        className={twMerge(
          `flex items-center justify-between`,
          isMobile && "z-50 sticky top-24 bg-background"
        )}
      >
        <h2 className="text-2xl font-bold mb-5.5 mt-5">Sent</h2>
        <MobileNewMessageButton />
      </div>
      {sentMessages && sentMessages.length > 0 ? (
        <div
          className={twMerge(
            "flex flex-col gap-y-3 md:gap-y-4 md:max-h-[470px] overflow-y-auto",
            sentMessages && sentMessages.length > 4 && !isMobile && "pr-3"
          )}
        >
          {sentMessages?.map((message) => (
            <MessageCard
              key={message.id}
              tokenId={Number(message.token_id)}
              sender={message.sender}
              receiver={message.receiver}
              message={message.message}
              timestamp={Number(message.timestamp)}
              isReceived={false}
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
        <p className="text-white/50 -mt-1">
          You haven&apos;t sent any messages
        </p>
      ) : (
        <p className="text-white/50 -mt-1">
          Connect your wallet to view your sent messages
        </p>
      )}
    </div>
  );
}
