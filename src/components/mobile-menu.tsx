"use client";

import { LuInbox, LuSend } from "react-icons/lu";
import useViewMessage from "@/hooks/useViewMessage";
import MenuButton from "./menu-button";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type MobileMenuProps = {
  tab: string;
};

const mobileMenuButtons = [
  {
    icon: <LuInbox size={18} />,
    text: "Inbox",
  },
  {
    icon: <LuSend size={18} />,
    text: "Sent",
  },
];

export default function MobileMenu({ tab }: MobileMenuProps) {
  const { unreadCount } = useViewMessage();

  return (
    <section className="w-full fixed bottom-0 left-0 right-0 border-t border-card-hover h-16 z-50 bg-background">
      <div className="w-full h-full relative flex items-center justify-evenly ">
        {mobileMenuButtons.map((button) => (
          <div
            className="w-full flex items-center justify-center"
            key={button.text}
          >
            {button.text.toLowerCase().split(" ")[0] === tab && (
              <motion.div
                className={twMerge(
                  "absolute top-0 h-0.5 w-24 bg-primary rounded-lg ml-3"
                )}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                layoutId="activeTab"
              />
            )}
            <MenuButton
              icon={button.icon}
              text={button.text}
              isActive={button.text.toLowerCase().split(" ")[0] === tab}
              count={
                button.text.toLowerCase().split(" ")[0] === "inbox"
                  ? unreadCount
                  : null
              }
              isMobile={true}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
