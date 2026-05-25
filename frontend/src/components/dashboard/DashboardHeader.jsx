"use client";

import { Bell, ChevronDown } from "lucide-react";
import { useAccount } from "wagmi";
import WalletConnect from "../shared/WalletConnect";

export default function DashboardHeader({ title, subtitle }) {
  const { address } = useAccount();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-surface/40 px-4 sm:px-8 backdrop-blur-xl">
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-bold text-foreground sm:text-xl">{title}</h1>
        {subtitle && (
          <p className="hidden truncate text-sm text-muted-foreground sm:block">{subtitle}</p>
        )}
      </div>

      <div className="ml-4 flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <button className="relative hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-white/10 xs:flex">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-acid-lime" />
        </button>

        {/* Wallet Badge */}
        <WalletConnect />
      </div>
    </header>
  );
}
