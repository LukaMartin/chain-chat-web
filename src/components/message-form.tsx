"use client";

import useSendMessage from "@/hooks/useSendMessage";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Address } from "viem";
import { useAccount } from "wagmi";

export default function MessageForm() {
  const [walletAddress, setWalletAddress] = useState("");
  const [debouncedAddress] = useDebounce(walletAddress, 700);
  const [message, setMessage] = useState("");
  const [debouncedMessage] = useDebounce(message, 700);
  const [isPending, setIsPending] = useState(false);
  const validAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  const { sendMessage } = useSendMessage();
  const { address } = useAccount();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);

    if (!debouncedAddress || !debouncedMessage) {
      return;
    }

    if (!validAddressRegex.test(debouncedAddress)) {
      return;
    }

    await sendMessage(debouncedAddress as Address, debouncedMessage);

    setWalletAddress("");
    setMessage("");
    setIsPending(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[92%] md:w-3/4 lg:w-2/3 mx-auto [@media(max-height:700px)]:mb-10 md:mb-0 rounded-xl p-6 border border-card-hover"
    >
      <label htmlFor="to" className="mb-2">
        To
        {!validAddressRegex.test(debouncedAddress) &&
          debouncedAddress.length > 0 && (
            <span className="text-red-500 ml-2">
              Enter a valid wallet address
            </span>
          )}
        {address && debouncedAddress === address && (
          <span className="text-red-500 ml-2">
            Address can&apos;t be your own
          </span>
        )}
      </label>
      <input
        type="text"
        placeholder="0x..."
        name="to"
        id="to"
        className="bg-card border border-card-hover rounded-lg px-3 py-2 text-white/80 outline-none focus:ring-1 focus:ring-card-hover placeholder:text-[15px]"
        autoComplete="off"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />

      <label htmlFor="message" className="mb-2 mt-4">
        Message
      </label>
      <div className="relative w-full">
        <textarea
          placeholder="Type your message..."
          name="message"
          id="message"
          className="h-48 w-full bg-card border border-card-hover rounded-lg p-3 text-white/80 outline-none focus:ring-1 focus:ring-card-hover placeholder:text-[15px]"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={280}
        />
        <p className="absolute bottom-2 right-2 text-sm text-white/50">
          {message.length} / 280
        </p>
      </div>

      <button
        disabled={isPending || !debouncedAddress || !debouncedMessage}
        type="submit"
        className="bg-primary text-background font-semibold rounded-lg p-2 mt-6 hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary transition-all duration-300"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
