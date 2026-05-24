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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Wallet Connection */}
          <section className="quantum-panel rounded-[32px] p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <Wallet className="h-6 w-6 text-acid-lime" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Wallet Connection</h2>
                <p className="text-muted-foreground text-sm">Manage your connected wallet and network.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 overflow-hidden w-full">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-acid-lime to-liquidity-emerald flex-shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Active Address</p>
                  <p className="text-sm font-mono truncate text-foreground">{address || "Not Connected"}</p>
                </div>
              </div>
              <button 
                onClick={() => disconnect()}
                className="w-full md:w-auto px-6 py-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm font-bold hover:bg-red-500/20 transition-all"
              >
                Disconnect
              </button>
            </div>
          </section>

          {/* Preferences */}
          <section className="quantum-panel rounded-[32px] p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <Bell className="h-6 w-6 text-acid-lime" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Preferences</h2>
                <p className="text-muted-foreground text-sm">Configure how you receive notifications and alerts.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Purchase Confirmations", desc: "Receive alerts when your transactions are confirmed." },
                { label: "Phase Adjustments", desc: "Get notified before presale phases change." },
                { label: "Referral Rewards", desc: "Alerts when a referral makes a purchase." },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div>
                    <p className="text-sm font-bold">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-white/10 relative cursor-pointer">
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-acid-lime" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Security Status */}
          <section className="quantum-panel rounded-[32px] p-6 space-y-6">
            <h2 className="text-lg font-bold">Security</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <Shield className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-xs font-bold text-foreground">Verified Account</p>
                  <p className="text-[10px] text-emerald-500 font-bold">TRUSTED SESSION</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Last Login</span>
                  <span className="text-foreground">2 mins ago</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Login IP</span>
                  <span className="text-foreground">192.168.1.1</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Session Type</span>
                  <span className="text-foreground">Browser (Chrome)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="quantum-panel rounded-[32px] p-6 space-y-4 border-red-500/10">
            <h2 className="text-lg font-bold text-red-500">Danger Zone</h2>
            <p className="text-xs text-muted-foreground">Permanently clear your session data and disconnect all services.</p>
            <button className="w-full py-3 rounded-xl border border-red-500/20 text-red-500 text-xs font-bold hover:bg-red-500/10 transition-all flex items-center justify-center gap-2">
              <Trash2 className="h-4 w-4" />
              Clear Local Data
            </button>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
