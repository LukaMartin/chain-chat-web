"use client";

import SideBar from "./side-bar";
import Inbox from "./inbox";
import SentMessages from "./sent-messages";
import NewMessage from "./new-message";
import dynamic from "next/dynamic";
import ConnectButtonSkeleton from "./connect-button-skeleton";

const DynamicConnectButton = dynamic(() => import("./connect-button"), {
  ssr: false,
  loading: () => <ConnectButtonSkeleton />,
});

type MessageContainerProps = {
  tab: string;
};

export default function MessageContainer({ tab }: MessageContainerProps) {
  return (
    <section className="flex bg-background rounded-xl border border-card-hover h-[620px] w-[760px] lg:w-[1024px] max-w-[95%] mx-auto">
      <SideBar tab={tab} />
      <div className="flex flex-col p-4 mt-2 w-2/3">
        <DynamicConnectButton />
        {tab === "inbox" && <Inbox />}
        {tab === "sent" && <SentMessages />}
        {tab === "new" && <NewMessage />}
      </div>
    </section>
  );
}
