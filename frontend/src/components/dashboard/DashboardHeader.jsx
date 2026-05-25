"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";
import { useAccount } from "wagmi";
import WalletConnect from "../shared/WalletConnect";
import { motion } from "framer-motion";

export default function DashboardHeader({ title, subtitle, onMenuClick }) {
  const { address } = useAccount();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-surface/40 px-4 sm:px-6 lg:px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <motion.button
          onClick={onMenuClick}
          animate={{
            boxShadow: [
              "0 0 0px rgba(204, 255, 0, 0)",
              "0 0 10px rgba(204, 255, 0, 0.25)",
              "0 0 0px rgba(204, 255, 0, 0)"
            ],
            borderColor: [
              "rgba(255, 255, 255, 0.1)",
              "rgba(204, 255, 0, 0.6)",
              "rgba(255, 255, 255, 0.1)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="p-2 rounded-lg border bg-white/5 text-muted-foreground hover:text-white lg:hidden flex-shrink-0"
        >
          <Menu size={20} className="text-acid-lime" />
        </motion.button>
        
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold text-foreground sm:text-xl">{title}</h1>
          {subtitle && (
            <p className="hidden truncate text-sm text-muted-foreground sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="ml-4 flex items-center gap-2 sm:gap-4 flex-shrink-0">
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
