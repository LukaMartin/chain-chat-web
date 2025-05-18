import MobileMenu from "./mobile-menu";
import NewMessage from "./new-message";
import Inbox from "./inbox";
import SentMessages from "./sent-messages";

type MobileMessageContainerProps = {
  tab: string;
};

export default function MobileMessageContainer({
  tab,
}: MobileMessageContainerProps) {
  return (
    <section className="flex flex-col w-full h-full md:hidden">
      {tab === "inbox" && <Inbox />}
      {tab === "sent" && <SentMessages />}
      {tab === "new" && <NewMessage />}
      <MobileMenu tab={tab} />
    </section>
  );
}
