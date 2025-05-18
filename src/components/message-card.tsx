"use client";

import convertTimestamp from "@/lib/convertTimestamp";
import { formatAddress } from "@/lib/formatAddress";
import { useState } from "react";
import { FaReply, FaFire } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { Address } from "viem";
import MessageDialog from "./message-dialog";
import BurnDialog from "./burn-dialog";
import BlockDialog from "./block-dialog";
import { twMerge } from "tailwind-merge";
import useViewMessage from "@/hooks/useViewMessage";

type MessageCardProps = {
  tokenId: number;
  sender: string;
  receiver: string;
  message: string;
  timestamp: number;
  isReceived: boolean;
  viewed?: boolean;
};

export default function MessageCard({
  tokenId,
  sender,
  receiver,
  message,
  timestamp,
  isReceived,
  viewed,
}: MessageCardProps) {
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isBurnDialogOpen, setIsBurnDialogOpen] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [showReplySection, setShowReplySection] = useState(false);
  const [isViewed, setIsViewed] = useState(viewed);
  const { markAsRead } = useViewMessage();

  const handleCardClick = async () => {
    setShowReplySection(false);
    setIsReplyDialogOpen(true);
    if (!viewed && isReceived) {
      setIsViewed(true);
      markAsRead(tokenId);
    }
  };

  const handleReplyClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowReplySection(true);
    setIsReplyDialogOpen(true);
    if (!viewed && isReceived) {
      setIsViewed(true);
      markAsRead(tokenId);
    }
  };

  const handleBurnClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBurnDialogOpen(true);
    if (!viewed && isReceived) {
      setIsViewed(true);
      markAsRead(tokenId);
    }
  };

  const handleBlockClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBlockDialogOpen(true);
    if (!viewed && isReceived) {
      setIsViewed(true);
      markAsRead(tokenId);
    }
  };

  return (
    <div
      className={twMerge(
        `relative w-full min-h-[105px] flex justify-between bg-card border border-card-hover p-4 rounded-lg gap-x-6 lg:gap-x-10 cursor-pointer hover:border-white/80 transition-all ${
          !isViewed && isReceived && "font-medium bg-[#262626]"
        }`
      )}
      onClick={handleCardClick}
    >
      {!isViewed && isReceived && (
        <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-primary rounded-full" />
      )}
      <div className="flex flex-col gap-y-1.5 flex-1">
        <p className="font-semibold text-white/50">
          {isReceived
            ? formatAddress(sender as Address)
            : formatAddress(receiver as Address)}
        </p>
        <p className="line-clamp-2 text-sm">{message}</p>
      </div>
      <div className="flex flex-col gap-y-4 items-end shrink-0">
        <p className="text-white/50 text-sm">{convertTimestamp(timestamp)}</p>
        {isReceived && (
          <div className="flex items-center gap-x-2">
            <button
              onClick={handleReplyClick}
              className="bg-card border border-card-hover rounded-lg p-1.5 hover:bg-card-hover transition-colors"
            >
              <FaReply className="w-4 h-4" />
            </button>
            <button
              onClick={handleBurnClick}
              className="bg-card border border-card-hover rounded-lg p-1.5 hover:bg-card-hover transition-colors"
            >
              <FaFire className="w-4 h-4" />
            </button>
            <button
              onClick={handleBlockClick}
              className="bg-card border border-card-hover rounded-lg p-1.5 hover:bg-card-hover transition-colors"
            >
              <ImBlocked className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      <MessageDialog
        isOpen={isReplyDialogOpen}
        onClose={() => {
          setIsReplyDialogOpen(false);
          setShowReplySection(false);
        }}
        address={isReceived ? sender : receiver}
        message={message}
        tokenId={tokenId}
        isReceived={isReceived}
        showReplySection={showReplySection}
      />
      <BurnDialog
        isOpen={isBurnDialogOpen}
        onClose={() => setIsBurnDialogOpen(false)}
        tokenId={tokenId}
      />
      <BlockDialog
        isOpen={isBlockDialogOpen}
        onClose={() => setIsBlockDialogOpen(false)}
        tokenId={tokenId}
        sender={sender}
      />
    </div>
  );
}
