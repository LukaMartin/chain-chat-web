import { LuCopy } from "react-icons/lu";
import { toast } from "sonner";

type CopyButtonProps = {
  text: string;
};

export default function CopyButton({ text }: CopyButtonProps) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
      }}
    >
      <LuCopy className="w-4 h-4 ml-2" />
    </button>
  );
}
