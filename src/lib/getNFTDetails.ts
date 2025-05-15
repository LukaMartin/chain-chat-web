import { ethers } from "ethers";
import { chainChatContractAddress } from "./consts";
import { chainChatAbi } from "@/abi/chainChat";

export async function getNFTDetails(tokenId: number) {
  const provider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_HYPE_EVM_RPC_URL
  );
  const contract = new ethers.Contract(
    chainChatContractAddress,
    chainChatAbi,
    provider
  );

  try {
    // Get tokenURI and message details
    const [tokenURI, messageDetails] = await Promise.all([
      contract.tokenURI(tokenId),
      contract.getMessage(tokenId),
    ]);

    const metadata = await fetch(tokenURI);
    const rawText = await metadata.text();

    const cleanedJson = rawText
      .replace(/,\s*([}\]])/g, "$1")
      .replace(/\s+/g, " ")
      .trim();

    const metadataJson = JSON.parse(cleanedJson);

    const imageUrl = metadataJson.image;

    // Format message details
    const [content, sender, recipient, timestamp] = messageDetails;
    const messageTime = new Date(Number(timestamp) * 1000).toLocaleString();

    return {
      metadata,
      imageUrl,
      message: {
        content,
        sender,
        recipient,
        timestamp: messageTime,
      },
    };
  } catch (error) {
    console.error("Error fetching NFT details:", error);
  }
}
