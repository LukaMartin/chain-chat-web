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
    <section className="px-4 lg:px-0 mt-12 hidden md:block">
      <section className="flex bg-background rounded-xl border border-card-hover h-[625px] max-w-[1000px] xl:max-w-[1024px] w-full mx-auto">
        <SideBar tab={tab} />
        <div className="flex flex-col p-4 w-2/3">
          <div className="flex justify-end border-b border-card-hover pb-4">
            <DynamicConnectButton />
          </div>

          {tab === "inbox" && <Inbox />}
          {tab === "sent" && <SentMessages />}
          {tab === "new" && <NewMessage />}
        </div>
      </section>
    </section>
  );
}
