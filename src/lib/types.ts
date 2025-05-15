import { Address } from "viem";

export type Message = {
  tokenId: number;
  from: Address;
  to: Address;
  message: string;
  timestamp: number;
};

export type ChainChatNFT = {
  tokenId: number;
  tokenImage: string;
  currentOwner: Address;
};
