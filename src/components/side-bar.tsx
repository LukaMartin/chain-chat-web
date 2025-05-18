"use client";

import MenuButton from "./menu-button";
import { LuInbox, LuSend, LuCirclePlus, LuMail } from "react-icons/lu";
import useViewMessage from "@/hooks/useViewMessage";

const menuButtons = [
  {
    icon: <LuInbox />,
    text: "Inbox",
  },
  {
    icon: <LuSend />,
    text: "Sent",
  },
  {
    icon: <LuCirclePlus />,
    text: "New Message",
  },
];

type SideBarProps = {
  tab: string;
};

export default function SideBar({ tab }: SideBarProps) {
  const { unreadCount } = useViewMessage();

  return (
    <div className="flex flex-col w-1/3 border-r border-card-hover p-4">
      <p className="text-white/50 mt-[9px] ml-1.5 pb-[17px] flex items-center gap-x-3">
        <LuMail />
        Chat wallet-to-wallet
      </p>
      <div className="flex flex-col gap-y-2 border-t border-card-hover pt-4">
        {menuButtons.map((button) => (
          <MenuButton
            key={button.text}
            icon={button.icon}
            text={button.text}
            isActive={button.text.toLowerCase().split(" ")[0] === tab}
            count={
              button.text.toLowerCase().split(" ")[0] === "inbox"
                ? unreadCount
                : null
            }
          />
        ))}
      </div>
    </div>
  );
}
