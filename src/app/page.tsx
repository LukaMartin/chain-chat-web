import MessageContainer from "@/components/message-container";

type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: HomeProps) {
  const { tab } = await searchParams;

  return (
    <main className="min-h-screen flex items-center">
      <MessageContainer tab={(tab as string) || "inbox"} />
    </main>
  );
}
