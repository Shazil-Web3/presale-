"use client";

import { Bell, ChevronDown } from "lucide-react";
import { useAccount, useChainId } from "wagmi";
import { chains } from "@/components/Web3Provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function DashboardHeader({ title, subtitle }) {
  const { address } = useAccount();
  const chainId = useChainId();
  const activeChain = chains.find((c) => c.id === chainId);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-surface/40 px-8 backdrop-blur-xl">
      <div>
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Chain Indicator */}
        {activeChain && (
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium">
            <div className="h-2 w-2 rounded-full bg-acid-lime animate-pulse" />
            {activeChain.name}
          </div>
        )}

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-white/10">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-acid-lime" />
        </button>

        {/* Wallet Badge */}
        <ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon" />
      </div>
    </header>
  );
}
