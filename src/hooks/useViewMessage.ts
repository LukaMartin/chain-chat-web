import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMessageViewed, getUnreadCount } from "@/lib/actions";
import { useAccount } from "wagmi";
import { Address } from "viem";

export default function useViewMessage() {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const { data: unreadCount } = useQuery({
    queryKey: ["unreadCount", address],
    queryFn: async () => {
      if (!address) return 0;
      return await getUnreadCount(address as Address);
    },
    enabled: !!address,
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: async (tokenId: number) => {
      await updateMessageViewed(tokenId);
      return tokenId;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["unreadCount", address] });

      const previousCount = await queryClient.getQueryData([
        "unreadCount",
        address,
      ]);

      queryClient.setQueryData(["unreadCount", address], (old: number) =>
        old > 0 ? old - 1 : 0
      );

      return { previousCount };
    },
    onError: (error, tokenId, context) => {
      queryClient.setQueryData(
        ["unreadCount", address],
        context?.previousCount
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["unreadCount", address] });
    },
  });

  return { markAsRead, unreadCount };
}
