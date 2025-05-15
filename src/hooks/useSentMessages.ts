import { useQuery } from "@tanstack/react-query";
import { getSentMessages } from "@/lib/actions";
import { useAccount } from "wagmi";
import { Address } from "viem";

export default function useSentMessages() {
  const { address } = useAccount();

  const {
    data: sentMessages,
    isLoading,
    isPending,
    error,
    refetch
  } = useQuery({
    queryKey: ["sentMessages", address],
    queryFn: async () => {
      if (!address) return [];
      return await getSentMessages(address as Address);
    },
    enabled: !!address,
  });

  return { sentMessages, isLoading, isPending, error, refetch };
}
