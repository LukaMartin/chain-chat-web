"use client";

import convertTimestamp from "@/lib/convertTimestamp";
import { formatAddress } from "@/lib/formatAddress";
import { useState } from "react";
import { FaReply, FaFire } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { Address } from "viem";
import ReplyDialog from "./reply-dialog";
import BurnDialog from "./burn-dialog";
import BlockDialog from "./block-dialog";

type MessageCardProps = {
  tokenId: number;
  sender: string;
  message: string;
  timestamp: number;
  isReceived: boolean;
};

export default function MessageCard({
  tokenId,
  sender,
  message,
  timestamp,
  isReceived,
}: MessageCardProps) {
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isBurnDialogOpen, setIsBurnDialogOpen] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);

  return (
    <div className="h-[100px] flex justify-between bg-card border border-card-hover p-4 rounded-lg gap-x-6 lg:gap-x-10">
      <div className="flex flex-col gap-y-0.5">
        <p className="font-semibold text-white/50 self-start">
          {formatAddress(sender as Address)}
        </p>
        <p className="self-start line-clamp-2">{message}</p>
      </div>
      <div className="flex flex-col gap-y-4">
        <p className="self-end text-white/50">{convertTimestamp(timestamp)}</p>
        {isReceived && (
          <div className="flex items-center gap-x-2">
            <button
              onClick={() => setIsReplyDialogOpen(true)}
              className="bg-card border border-card-hover rounded-lg px-2 py-1 hover:bg-card-hover transition-colors"
            >
              <FaReply />
            </button>
            <button
              onClick={() => setIsBurnDialogOpen(true)}
              className="bg-card border border-card-hover rounded-lg px-2 py-1 hover:bg-card-hover transition-colors"
            >
              <FaFire />
            </button>
            <button
              onClick={() => setIsBlockDialogOpen(true)}
              className="bg-card border border-card-hover rounded-lg px-2 py-1 hover:bg-card-hover transition-colors"
            >
              <ImBlocked />
            </button>
          </div>
        )}
      </div>
      <ReplyDialog
        isOpen={isReplyDialogOpen}
        onClose={() => setIsReplyDialogOpen(false)}
        address={sender}
        message={message}
        tokenId={tokenId}
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
