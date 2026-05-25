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
  X,
  ExternalLink,
} from "lucide-react";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { chains } from "@/components/Web3Provider";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: ArrowLeftRight, label: "Transactions", href: "/dashboard/transactions" },
  { icon: Users, label: "Referrals", href: "/dashboard/referrals" },
  { icon: Megaphone, label: "Announcements", href: "/dashboard/announcements" },
];

export default function DashboardSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const { disconnect } = useDisconnect();

  return (
    <aside 
      className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/10 bg-surface/80 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 lg:bg-surface/40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Logo & Back to Site */}
        <div className="border-b border-white/5 px-6 py-5 flex items-center justify-between lg:block space-y-4 lg:space-y-4">
          <div className="space-y-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-bold uppercase tracking-[0.2em] text-acid-lime"
            >
              BitRaxx
            </Link>
            
            <Link
              href="/"
              className="group hidden lg:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-acid-lime transition-colors py-2 px-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 w-fit"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
              Back to Website
            </Link>
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 pt-6 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
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

          <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
            <Link
              href="/"
              className="group flex lg:hidden items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-acid-lime transition-colors py-3 px-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 w-full justify-center"
            >
              <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
              Back to Website
            </Link>

            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                if (!connected) {
                  return (
                    <motion.button
                      onClick={openConnectModal}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(204, 255, 0, 0.15)" }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center justify-center gap-3 rounded-xl bg-acid-lime/10 border border-acid-lime/20 px-4 py-3 text-sm font-bold text-acid-lime transition-all"
                    >
                      <Wallet className="h-5 w-5" />
                      Connect Wallet
                    </motion.button>
                  );
                }

                return (
                  <div className="space-y-3">
                    <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-acid-lime/10 shadow-[0_0_15px_rgba(204,255,0,0.1)]">
                            <Wallet className="h-4 w-4 text-acid-lime" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="truncate text-xs font-bold text-foreground">
                              {account.displayName}
                            </p>
                            <p className="truncate text-[10px] font-medium text-muted-foreground">
                              {account.displayBalance ? account.displayBalance : "Connected"}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={openAccountModal}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                        >
                          <Settings size={14} />
                        </button>
                      </div>

                      <button
                        onClick={openChainModal}
                        className="flex w-full items-center justify-between gap-2 rounded-lg bg-white/5 border border-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          {chain.hasIcon && chain.iconUrl && (
                            <img src={chain.iconUrl} alt={chain.name} className="h-3 w-3 rounded-full" />
                          )}
                          <span>{chain.name}</span>
                        </div>
                        <ExternalLink size={10} className="text-acid-lime" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        disconnect();
                        setIsOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all hover:bg-red-500/10 hover:text-red-400"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/5 p-4 flex justify-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
            BitRaxx Dashboard v1.0
          </p>
        </div>
      </div>
    </aside>
  );
}
