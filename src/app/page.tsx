import MessageContainer from "@/components/message-container";
import Header from "@/components/header";
import MobileMessageContainer from "@/components/mobile-message-container";
import Footer from "@/components/footer";

type HomeProps = {
  searchParams: Promise<{
    tab: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { tab } = await searchParams;

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <MessageContainer tab={(tab as string) || "inbox"} />
      <MobileMessageContainer tab={(tab as string) || "inbox"} />
      <Footer />
    </main>
  );
}
