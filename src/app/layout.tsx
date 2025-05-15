import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppKitContextProvider from "@/context/reown";
import { headers } from "next/headers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ChainChat",
  description: "An on-chain chat app built on HyperEvm",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-background text-white min-h-screen`}
      >
        <AppKitContextProvider cookies={cookies}>
          {children}
        </AppKitContextProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1f1f1f",
              border: "1px solid #2d2d2d",
              color: "white",
            },
          }}
        />
      </body>
    </html>
  );
}
