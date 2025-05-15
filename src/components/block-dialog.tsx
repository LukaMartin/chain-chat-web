"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import useBlockUser from "@/hooks/useBlockUser";
import { formatAddress } from "@/lib/formatAddress";
import { Address } from "viem";
import { AnimatePresence, motion } from "framer-motion";

type BlockDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  tokenId: number;
  sender: string;
};

export default function BlockDialog({
  isOpen,
  onClose,
  tokenId,
  sender,
}: BlockDialogProps) {
  const { blockUser } = useBlockUser();
  const [isPending, setIsPending] = useState(false);

  const handleBurn = async () => {
    setIsPending(true);
    await blockUser(tokenId);
    setIsPending(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <Dialog
        open={isOpen}
        onClose={onClose}
        as="div"
        className="relative z-10 focus:outline-none"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
          <motion.div
            className="flex min-h-full items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <DialogPanel className="relative w-fit max-w-md rounded-xl bg-background border border-card-hover p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
              <DialogTitle
                as="h3"
                className="text-lg text-white/90 font-medium border-b border-card-hover pb-4 pt-1"
              >
                Are you sure you want to block{" "}
                {formatAddress(sender as Address)}?
              </DialogTitle>
              <button
                disabled={isPending}
                onClick={handleBurn}
                className="bg-primary text-background font-semibold w-full rounded-lg p-2 mt-6 hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary transition-all duration-300"
              >
                {isPending ? "Blocking..." : "Block"}
              </button>
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-white/50 hover:text-white transition-all duration-300"
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
