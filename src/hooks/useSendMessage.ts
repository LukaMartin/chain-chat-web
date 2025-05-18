import { chainChatAbi } from "@/abi/chainChat";
import { chainChatContractAddress } from "@/lib/consts";
import { useWriteContract } from "wagmi";
import { getTransactionReceipt, waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { Address, decodeEventLog } from "viem";
import { Message } from "@/lib/types";
import { addMessage } from "@/lib/actions";
import { toast } from "sonner";
import useSentMessages from "./useSentMessages";

export default function useSendMessage() {
  const { writeContractAsync } = useWriteContract();
  const { refetch: refetchSentMessages } = useSentMessages();


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
        return decoded.eventName === "MessageSent";
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
        await addMessage(args as unknown as Message);
      }
    }
  };

  const sendMessage = async (to: Address, message: string) => {
    try {
      const hash = await writeContractAsync({
        address: chainChatContractAddress,
        abi: chainChatAbi,
        functionName: "sendMessage",
        args: [to, message],
      });

      await waitForTransactionReceipt(config, { hash: hash });

      await handleTransactionSubmitted(hash);

      await refetchSentMessages();
      toast.success("Message sent successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error sending message");
    }
  };

  return { sendMessage };
}
