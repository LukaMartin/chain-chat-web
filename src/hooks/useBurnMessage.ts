import { chainChatAbi } from "@/abi/chainChat";
import { chainChatContractAddress } from "@/lib/consts";
import { useWriteContract } from "wagmi";
import { config } from "@/config/wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { deleteMessageAndNFT } from "@/lib/actions";
import { toast } from "sonner";
import useReceivedMessages from "./useReceivedMessages";

export default function useBurnMessage() {
  const { writeContractAsync } = useWriteContract();
  const { refetch: refetchReceivedMessages } = useReceivedMessages();


  const burnMessage = async (tokenId: number) => {
    try {
      const hash = await writeContractAsync({
        address: chainChatContractAddress,
        abi: chainChatAbi,
        functionName: "burnMessage",
        args: [tokenId],
        type: "eip1559",
      });

      const receipt = await waitForTransactionReceipt(config, { hash: hash });

      if (receipt.status === "success") {
        await deleteMessageAndNFT(tokenId);

        await refetchReceivedMessages();
        toast.success("Message burned successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error burning message");
    }
  };

  return { burnMessage };
}
