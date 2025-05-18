"use client";

import useReceivedMessages from "@/hooks/useReceivedMessages";
import MessageCard from "./message-card";
import MessageCardSkeleton from "./message-card-skeleton";
import { useAccount } from "wagmi";
import { twMerge } from "tailwind-merge";
import MobileNewMessageButton from "./mobile-new-message-button";
import { useMediaQuery } from "usehooks-ts";
import useViewMessage from "@/hooks/useViewMessage";

export default function Inbox() {
  const { receivedMessages, isLoading } = useReceivedMessages();
  const { isConnected } = useAccount();
  const { unreadCount } = useViewMessage();
  const isMobile = useMediaQuery("(max-width: 760px)");

  return (
    <div className="flex flex-col h-full px-4 md:px-0">
      <div
        className={twMerge(
          "flex items-center justify-between",
          "max-md:z-50 max-md:sticky max-md:top-24 max-md:bg-background"
        )}
      >
        <div className="flex items-center gap-x-3">
          <h2 className="text-2xl font-bold mb-5.5 mt-5">Inbox</h2>
          {(unreadCount ?? 0) > 0 && isMobile && (
            <p className="text-xs text-primary bg-primary/15 rounded-full px-2 py-1 mt-0.5">
              {unreadCount}
            </p>
          )}
        </div>

        <MobileNewMessageButton />
      </div>
      {receivedMessages && receivedMessages.length > 0 ? (
        <div
          className={twMerge(
            "flex flex-col gap-y-3 md:gap-y-4 max-h-full md:max-h-[470px] overflow-y-auto",
            receivedMessages &&
              receivedMessages.length > 4 &&
              "md:-mr-4 md:pr-2"
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
