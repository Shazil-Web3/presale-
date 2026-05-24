"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { arbitrum, bsc, mainnet, polygon } from "wagmi/chains";

export const chains = [mainnet, bsc, polygon, arbitrum];

const config = getDefaultConfig({
  appName: "BitRaxx",
  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
    "BITRAXX_DEV_PROJECT_ID",
  chains,
  ssr: true,
});

export default function Web3Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
