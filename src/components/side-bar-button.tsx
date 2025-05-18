"use client";

import { useRouter } from "next/navigation";

type SideBarButtonProps = {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  count?: number | null;
};

export default function SideBarButton({
  icon,
  text,
  isActive,
  count,
}: SideBarButtonProps) {
  const router = useRouter();

  const handleClick = (text: string) => {
    router.push(`/?tab=${text.toLowerCase().split(" ")[0]}`);
  };

  return (
    <button
      onClick={() => handleClick(text)}
      className={`flex items-center gap-x-3 w-full py-2 pl-2 hover:bg-card rounded-lg transition-colors ${
        isActive &&
        "text-primary bg-primary/10 cursor-default hover:bg-primary/10"
      }`}
    >
      {icon}
      <span>{text}</span>
      {(count ?? 0) > 0 && (
        <span className="text-xs text-primary bg-primary/15 rounded-full px-2 py-1 ml-auto mr-2">
          {count}
        </span>
      )}
    </button>
  );
}
