"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  BarChart3,
  PieChart,
  UserPlus,
  Settings,
  FileText,
  X,
  ArrowLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Investors", id: "investors" },
  { icon: ArrowLeftRight, label: "Transactions", id: "transactions" },
  { icon: BarChart3, label: "Sale Stages", id: "stages" },
  { icon: PieChart, label: "Allocations", id: "allocations" },
  { icon: UserPlus, label: "Referrals", id: "referrals" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function AdminSidebar({ isOpen, setIsOpen, currentTab, setCurrentTab }) {
  return (
    <aside 
      className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/10 bg-surface/80 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 lg:bg-surface/40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Logo Section */}
        <div className="border-b border-white/5 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-acid-lime shadow-[0_0_15px_rgba(204,255,0,0.3)]">
              <ShieldCheck className="h-5 w-5 text-black" />
            </div>
            <Link
              href="/"
              className="text-lg font-bold uppercase tracking-[0.2em] text-acid-lime"
            >
              BRX Admin
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
          <div className="mb-4 px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
            System Control
          </div>
          
          {sidebarItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                  isActive
                    ? "text-acid-lime"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="admin-sidebar-active"
                    className="absolute inset-0 rounded-xl bg-white/5 shadow-[0_0_20px_rgba(204,255,0,0.05)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="admin-sidebar-indicator"
                    className="absolute left-0 h-6 w-1 rounded-full bg-acid-lime"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  />
                )}
                <item.icon className={`h-5 w-5 ${isActive ? "text-acid-lime" : ""}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                )}
              </button>
            );
          })}

          <div className="mt-4 pt-4 border-t border-white/5">
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-acid-lime transition-all"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Website</span>
            </Link>
          </div>
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-white/5 p-4">
          <div className="flex justify-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/30">
              BRX Admin v1.0.4
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
