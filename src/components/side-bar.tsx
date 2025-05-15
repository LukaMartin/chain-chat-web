import SideBarButton from "./side-bar-button";
import { LuInbox, LuSend, LuCirclePlus } from "react-icons/lu";

const buttons = [
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
  return (
    <div className="flex flex-col w-1/3 border-r border-card-hover p-4">
      <div className="mb-8 pl-2 pt-2">
        <h3 className="text-xl font-bold mb-4">ChainChat</h3>
        <p className="text-sm text-white/50">Fully on-chain</p>
      </div>

      <div className="flex flex-col gap-y-2">
        {buttons.map((button) => (
          <SideBarButton
            key={button.text}
            icon={button.icon}
            text={button.text}
            isActive={button.text.toLowerCase().split(" ")[0] === tab}
          />
        ))}
      </div>
    </div>
  );
}
