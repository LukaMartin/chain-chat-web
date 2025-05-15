import { chainChatContractAddress } from "@/lib/consts";
import { chainChatAbi } from "@/abi/chainChat";
import { useWriteContract } from "wagmi";
import { config } from "@/config/wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { deleteMessageAndNFT } from "@/lib/actions";
import { toast } from "sonner";

export default function useBlockUser() {
  const { writeContractAsync } = useWriteContract();

  const blockUser = async (tokenId: number) => {
    try {
      const hash = await writeContractAsync({
        address: chainChatContractAddress,
        abi: chainChatAbi,
        functionName: "blockUser",
        args: [tokenId],
      });

      const receipt = await waitForTransactionReceipt(config, { hash: hash });

      if (receipt.status === "success") {
        await deleteMessageAndNFT(tokenId);
        toast.success("User blocked successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error blocking user");
    }
  };

  return { blockUser };
}
