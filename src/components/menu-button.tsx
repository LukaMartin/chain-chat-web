"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

type MenuButtonProps = {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  count?: number | null;
  isMobile?: boolean;
};

export default function MenuButton({
  icon,
  text,
  isActive,
  count,
  isMobile,
}: MenuButtonProps) {
  const router = useRouter();

  const handleClick = (text: string) => {
    router.push(`/?tab=${text.toLowerCase().split(" ")[0]}`);
  };

  return (
    <button
      onClick={() => handleClick(text)}
      className={twMerge(
        "flex justify-center md:justify-start items-center gap-x-3 w-full py-2 pl-2 hover:bg-card rounded-none md:rounded-lg transition-colors",
        isActive &&
          "text-primary bg-primary/10 cursor-default hover:bg-primary/10",
        isActive && isMobile && "h-full text-primary bg-background"
      )}
    >
      {icon}
      <span className="relative">
        {text}
        {(count ?? 0) > 0 && isMobile && (
          <div className="absolute -top-2 -right-4 bg-primary rounded-full h-4 w-4 flex items-center justify-center">
            <span className="text-[10px] text-background font-semibold leading-none">
              {count && count < 100 ? count : "99"}
            </span>
          </div>
        )}
      </span>
      {(count ?? 0) > 0 && !isMobile && (
        <span className="text-xs text-primary bg-primary/15 rounded-full px-2 py-1 ml-auto mr-2">
          {count && count < 100 ? count : "99"}
        </span>
      )}
    </button>
  );
}
