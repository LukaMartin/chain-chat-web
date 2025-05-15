"use server";

import { createClient } from "@/supabase/server";
import { ChainChatNFT, Message } from "./types";
import { getNFTDetails } from "./getNFTDetails";

export async function addMessage(message: Message) {
  const supabase = await createClient();

  const { error } = await supabase.from("chain_chat_messages").insert({
    token_id: Number(message.tokenId),
    sender: message.from,
    receiver: message.to,
    message: message.message,
    timestamp: Number(message.timestamp),
    viewed: false,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const details = await getNFTDetails(Number(message.tokenId));
  if (details?.imageUrl) {
    await addNFT({
      tokenId: Number(message.tokenId),
      tokenImage: details.imageUrl,
      currentOwner: message.to,
    });
  }
}

export async function addNFT(nft: ChainChatNFT) {
  const supabase = await createClient();

  const { error } = await supabase.from("chain_chat_token_data").insert({
    token_id: Number(nft.tokenId),
    token_image: nft.tokenImage,
    current_owner: nft.currentOwner,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function getReceivedMessages(address: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("chain_chat_messages")
    .select("*")
    .eq("receiver", address)
    .order("timestamp", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getSentMessages(address: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("chain_chat_messages")
    .select("*")
    .eq("sender", address)
    .order("timestamp", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateMessage(reply: Message) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("chain_chat_messages")
    .update({
      sender: reply.from,
      receiver: reply.to,
      message: reply.message,
      timestamp: Number(reply.timestamp),
      viewed: false,
    })
    .eq("token_id", reply.tokenId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const details = await getNFTDetails(Number(reply.tokenId));
  if (details?.imageUrl) {
    await updateNFT({
      tokenId: Number(reply.tokenId),
      tokenImage: details.imageUrl,
      currentOwner: reply.to,
    });
  }
}

export async function updateNFT(nft: ChainChatNFT) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("chain_chat_token_data")
    .update({
      token_image: nft.tokenImage,
      current_owner: nft.currentOwner,
    })
    .eq("token_id", nft.tokenId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function deleteMessageAndNFT(tokenId: number) {
  const supabase = await createClient();

  const { error: nftError } = await supabase
    .from("chain_chat_token_data")
    .delete()
    .eq("token_id", tokenId);

  if (nftError) {
    console.error(nftError);
    throw new Error(nftError.message);
  }

  const { error: messageError } = await supabase
    .from("chain_chat_messages")
    .delete()
    .eq("token_id", tokenId);

  if (messageError) {
    console.error(messageError);
    throw new Error(messageError.message);
  }
}

export async function updateMessageViewed(tokenId: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("chain_chat_messages")
    .update({ viewed: true })
    .eq("token_id", tokenId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
