"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Settings, Wallet, Shield, Bell, User, ExternalLink, Trash2 } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";

export default function SettingsPage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <DashboardLayout 
      title="Settings" 
      subtitle="Manage your account preferences and security."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8 lg:space-y-12">
          {/* Wallet Connection */}
          <section className="quantum-panel rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 space-y-6 sm:space-y-8 border-white/5 bg-surface/30">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                <Wallet className="h-6 w-6 sm:h-7 sm:w-7 text-acid-lime" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Wallet Connection</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">Manage your connected wallet and network.</p>
              </div>
            </div>

            <div className="p-4 sm:p-8 rounded-2xl bg-black/40 border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4 overflow-hidden w-full">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-tr from-acid-lime to-liquidity-emerald flex-shrink-0 shadow-[0_0_20px_rgba(204,255,0,0.2)]" />
                <div className="overflow-hidden">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Active Address</p>
                  <p className="text-xs sm:text-sm font-mono truncate text-foreground/90">{address || "Not Connected"}</p>
                </div>
              </div>
              <button 
                onClick={() => disconnect()}
                className="w-full md:w-auto px-8 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-black uppercase tracking-widest hover:bg-red-500/10 transition-all"
              >
                Disconnect
              </button>
            </div>
          </section>

          {/* Preferences */}
          <section className="quantum-panel rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 space-y-6 sm:space-y-8 border-white/5 bg-surface/30">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                <Bell className="h-6 w-6 sm:h-7 sm:w-7 text-acid-lime" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Preferences</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">Configure how you receive notifications and alerts.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Purchase Confirmations", desc: "Receive alerts when your transactions are confirmed." },
                { label: "Phase Adjustments", desc: "Get notified before presale phases change." },
                { label: "Referral Rewards", desc: "Alerts when a referral makes a purchase." },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="pr-4">
                    <p className="text-sm sm:text-base font-bold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-white/10 relative cursor-pointer flex-shrink-0">
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-acid-lime shadow-[0_0_10px_rgba(204,255,0,0.5)]" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {/* Security Status */}
          <section className="quantum-panel rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 space-y-6 border-white/5 bg-surface/30">
            <h2 className="text-lg font-bold text-foreground">Security</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <Shield className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-xs font-bold text-foreground">Verified Account</p>
                  <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-0.5">TRUSTED SESSION</p>
                </div>
              </div>
              
              <div className="space-y-4 px-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Last Login</span>
                  <span className="text-foreground font-bold">2 mins ago</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Login IP</span>
                  <span className="text-foreground font-bold font-mono">192.168.1.1</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Session Type</span>
                  <span className="text-foreground font-bold">Browser (Chrome)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="quantum-panel rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 space-y-6 border-red-500/10 bg-surface/30">
            <h2 className="text-lg font-bold text-red-500">Danger Zone</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">Permanently clear your session data and disconnect all services.</p>
            <button className="w-full py-3 rounded-xl border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 transition-all flex items-center justify-center gap-2">
              <Trash2 className="h-4 w-4" />
              Clear Local Data
            </button>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
