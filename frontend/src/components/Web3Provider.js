"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
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

const customTheme = darkTheme({
  accentColor: "var(--acid-lime)",
  accentColorForeground: "#08080a",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
});

export default function Web3Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
