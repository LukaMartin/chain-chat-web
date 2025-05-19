import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-background hidden md:block mt-auto text-white/50 max-w-[1000px] xl:max-w-[1024px] px-4 lg:px-0 mx-auto w-full h-12">
      <div className="flex items-center justify-between">
        <p className="text-sm">&copy; {new Date().getFullYear()} ChainChat</p>
        <div className="flex items-center gap-2">
          <Link
            href="https://discord.gg/zQmCfnjRBy"
            target="_blank"
            className="hover:text-white transition-all duration-300"
          >
            <FaDiscord size={20} />
          </Link>
          <Link
            href="https://x.com/chainchatx"
            target="_blank"
            className="hover:text-white transition-all duration-300"
          >
            <FaXTwitter />
          </Link>
        </div>
      </div>
    </footer>
  );
}
