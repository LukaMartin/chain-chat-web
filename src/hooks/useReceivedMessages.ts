import { useQuery } from "@tanstack/react-query";
import { getReceivedMessages } from "@/lib/actions";
import { useAccount } from "wagmi";
import { Address } from "viem";

export default function useReceivedMessages() {
  const { address } = useAccount();

  const {
    data: receivedMessages,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["receivedMessages", address],
    queryFn: async () => {
      if (!address) return [];
      return await getReceivedMessages(address as Address);
    },
    enabled: !!address,
  });

  return { receivedMessages, isLoading, error, refetch };
}
