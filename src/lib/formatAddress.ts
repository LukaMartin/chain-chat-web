import { Address } from "viem";

export function formatAddress(address: Address) {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}
