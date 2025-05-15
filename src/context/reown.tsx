"use client";

import { wagmiAdapter, projectId, hyperEvm } from "../config/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import hyperEvmLogo from "../../public/hyperliquid-logo.png";

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

const metadata = {
  name: "ChainChat",
  description: "An on-chain chat app built on HyperEvm",
  url: "https://chainchat.xyz",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [hyperEvm],
  defaultNetwork: hyperEvm,
  metadata: metadata,
  features: {
    analytics: true,
    socials: false,
  },
  chainImages: {
    999: hyperEvmLogo.src,
  },
});

function AppKitContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default AppKitContextProvider;
