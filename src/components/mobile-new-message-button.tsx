import { ImPencil } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

export default function MobileNewMessageButton() {
  const router = useRouter();
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected && (
        <button
          onClick={() => router.push("/?tab=new")}
          className="text-primary bg-card rounded-lg p-2 border border-card-hover md:hidden active:scale-95 transition-all duration-300"
        >
          <ImPencil />
        </button>
      )}
    </>
  );
}
