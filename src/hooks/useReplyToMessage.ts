import { chainChatAbi } from "@/abi/chainChat";
import { chainChatContractAddress } from "@/lib/consts";
import { useWriteContract } from "wagmi";
import { getTransactionReceipt, waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { Address, decodeEventLog } from "viem";
import { Message } from "@/lib/types";
import { updateMessage } from "@/lib/actions";
import { toast } from "sonner";
import useReceivedMessages from "./useReceivedMessages";

export default function useReplyToMessage() {
  const { writeContractAsync } = useWriteContract();
  const { refetch: refetchReceivedMessages } = useReceivedMessages();

  const handleTransactionSubmitted = async (txHash: string) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const receipt = await getTransactionReceipt(config, {
      hash: txHash as Address,
    });

    const log = receipt.logs.find((log) => {
      try {
        const decoded = decodeEventLog({
          abi: chainChatAbi,
          data: log.data,
          topics: log.topics,
        });
        return decoded.eventName === "MessageReplied";
      } catch {
        return false;
      }
    });

    if (log) {
      const { args } = decodeEventLog({
        abi: chainChatAbi,
        data: log.data,
        topics: log.topics,
      });

      if (args) {
        await updateMessage(args as unknown as Message);
      }
    }
  };

  const replyToMessage = async (tokenId: number, message: string) => {
    try {
      const hash = await writeContractAsync({
        address: chainChatContractAddress,
        abi: chainChatAbi,
        functionName: "reply",
        args: [BigInt(tokenId), message],
      });

      await waitForTransactionReceipt(config, { hash: hash });

      await handleTransactionSubmitted(hash);

      await refetchReceivedMessages();
      toast.success("Reply sent successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error replying to message");
    }
  };

  return { replyToMessage };
}
