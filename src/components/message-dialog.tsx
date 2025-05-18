"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { formatAddress } from "@/lib/formatAddress";
import { Address } from "viem";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { IoMdClose } from "react-icons/io";
import useReplyToMessage from "@/hooks/useReplyToMessage";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import CopyButton from "./copy-button";

type MessageDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  message: string;
  tokenId: number;
  isReceived: boolean;
  showReplySection?: boolean;
};

export default function MessageDialog({
  isOpen,
  onClose,
  address,
  message,
  tokenId,
  isReceived,
  showReplySection = false,
}: MessageDialogProps) {
  const [replyMessage, setReplyMessage] = useState("");
  const [debouncedReplyMessage] = useDebounce(replyMessage, 700);
  const [isPending, setIsPending] = useState(false);
  const { replyToMessage } = useReplyToMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!debouncedReplyMessage) return;

    setIsPending(true);
    await replyToMessage(tokenId, debouncedReplyMessage);

    setReplyMessage("");
    setIsPending(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={onClose}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
          <motion.div
            className="flex min-h-full items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <DialogPanel className="relative w-full max-w-md rounded-xl bg-background border border-card-hover p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
              <DialogTitle
                as="h3"
                className="text-base md:text-lg font-medium border-b border-card-hover pb-4 flex items-center"
              >
                Message {isReceived ? "from" : "to"}{" "}
                {formatAddress(address as Address)}
                <CopyButton text={address} />
              </DialogTitle>
              <p
                className={twMerge(
                  "mt-6 mb-6 bg-card border border-card-hover rounded-lg p-3 text-white/80",
                  !showReplySection && "mb-0"
                )}
              >
                {message}
              </p>

              {showReplySection && (
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <textarea
                      placeholder="Type your reply..."
                      name="reply-message"
                      id="reply-message"
                      className="h-48 w-full bg-card border border-card-hover rounded-lg p-3 text-white/80 outline-none focus:ring-1 focus:ring-card-hover placeholder:text-[15px]"
                      autoComplete="off"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      maxLength={280}
                    />
                    <p className="absolute bottom-2 right-2 text-sm text-white/50">
                      {replyMessage.length} / 280
                    </p>
                  </div>
                  <button
                    disabled={!debouncedReplyMessage || isPending}
                    type="submit"
                    className="bg-primary text-background font-semibold w-full rounded-lg p-2 mt-6 hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary transition-all duration-300"
                  >
                    {isPending ? "Replying..." : "Reply"}
                  </button>
                </form>
              )}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-all duration-300"
              >
                <IoMdClose />
              </button>
            </DialogPanel>
          </motion.div>
        </div>
      </Dialog>
    </AnimatePresence>
  );
}
