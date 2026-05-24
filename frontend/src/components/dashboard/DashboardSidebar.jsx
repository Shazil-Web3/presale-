"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Users,
  Megaphone,
  Settings,
  LogOut,
  Wallet,
  ArrowLeft,
} from "lucide-react";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { chains } from "@/components/Web3Provider";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: ArrowLeftRight, label: "Transactions", href: "/dashboard/transactions" },
  { icon: Users, label: "Referrals", href: "/dashboard/referrals" },
  { icon: Megaphone, label: "Announcements", href: "/dashboard/announcements" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();

  const activeChain = chains.find((c) => c.id === chainId);
  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Not Connected";

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-surface/40 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        {/* Logo & Back to Site */}
        <div className="border-b border-white/5 px-6 py-5 space-y-4">
          <Link
            href="/"
            className="block text-lg font-bold uppercase tracking-[0.2em] text-acid-lime"
          >
            BitRaxx
          </Link>
          
          <Link
            href="/"
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-acid-lime transition-colors py-2 px-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 w-fit"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Back to Website
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4 pt-6">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                  isActive
                    ? "text-acid-lime"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-white/5 shadow-[0_0_20px_rgba(204,255,0,0.05)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 h-6 w-1 rounded-full bg-acid-lime"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  />
                )}
                <item.icon className={`h-5 w-5 ${isActive ? "text-acid-lime" : ""}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Wallet Info */}
        <div className="border-t border-white/5 p-4">
          <div className="mb-4 rounded-xl bg-white/5 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-acid-lime/10 shadow-[0_0_15px_rgba(204,255,0,0.1)]">
                <Wallet className="h-5 w-5 text-acid-lime" />
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-medium text-foreground">
                  {shortAddress}
                </p>
                <p className="truncate text-[10px] text-muted-foreground">
                  {activeChain?.name || "No Chain"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => disconnect()}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground transition-all hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
