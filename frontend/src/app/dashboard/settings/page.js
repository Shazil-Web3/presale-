"use client";

import { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Settings, Wallet, Shield, Bell, Trash2, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [prefs, setPrefs] = useState({
    purchaseConfirmations: true,
    phaseAdjustments: true,
    referralRewards: true,
  });

  const fetchPreferences = async (userWallet) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/dashboard/preferences?wallet=${userWallet}`);
      const data = await res.json();
      if (data.ok) {
        setPrefs(data.preferences);
      }
    } catch (err) {
      console.error("Failed to fetch notification preferences:", err);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async (updatedPrefs) => {
    if (!address) return;
    try {
      setSaving(true);
      await fetch(`/api/dashboard/preferences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          ...updatedPrefs,
        }),
      });
    } catch (err) {
      console.error("Failed to save notification preferences:", err);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isConnected && address) {
      fetchPreferences(address);
    }
  }, [mounted, isConnected, address]);

  const handleToggle = (key) => {
    const updated = {
      ...prefs,
      [key]: !prefs[key],
    };
    setPrefs(updated);
    savePreferences(updated);
  };

  if (!mounted) return null;

  // RENDER DISCONNECTED
  if (!isConnected || !address) {
    return (
      <DashboardLayout 
        title="Settings" 
        subtitle="Manage your account preferences and security."
      >
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full relative overflow-hidden rounded-[32px] border border-white/10 bg-surface/30 p-8 backdrop-blur-xl flex flex-col items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-acid-lime/10 flex items-center justify-center border border-acid-lime/25 shadow-[0_0_20px_rgba(204,255,0,0.15)]">
              <Settings className="h-8 w-8 text-acid-lime" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Connect Wallet</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect your investor wallet to view and manage notification alerts and session security.
              </p>
            </div>

            <div className="rainbow-connect-wrapper scale-[1.05] mt-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // RENDER LOADING
  if (loading) {
    return (
      <DashboardLayout 
        title="Settings" 
        subtitle="Manage your account preferences and security."
      >
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
          <RefreshCw className="h-8 w-8 text-acid-lime animate-spin" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Retrieving Preferences...</span>
        </div>
      </DashboardLayout>
    );
  }

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
                  <p className="text-xs sm:text-sm font-mono truncate text-foreground/90">{address}</p>
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
                { key: "purchaseConfirmations", label: "Purchase Confirmations", desc: "Receive alerts when your transactions are confirmed." },
                { key: "phaseAdjustments", label: "Phase Adjustments", desc: "Get notified before presale phases change." },
                { key: "referralRewards", label: "Referral Rewards", desc: "Alerts when a referral makes a purchase." },
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => handleToggle(item.key)}
                  className="flex justify-between items-center p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                >
                  <div className="pr-4">
                    <p className="text-sm sm:text-base font-bold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                  <div className={`h-6 w-11 rounded-full relative flex-shrink-0 transition-colors ${prefs[item.key] ? 'bg-acid-lime/20' : 'bg-white/10'}`}>
                    <motion.div 
                      layout
                      className={`absolute top-1 h-4 w-4 rounded-full ${prefs[item.key] ? 'right-1 bg-acid-lime shadow-[0_0_10px_rgba(204,255,0,0.5)]' : 'left-1 bg-muted-foreground'}`} 
                    />
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
                  <span className="text-muted-foreground font-medium">Session State</span>
                  <span className="text-foreground font-bold font-mono">Sync Complete</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Preferences Status</span>
                  <span className="text-foreground font-bold">{saving ? "Saving..." : "Saved"}</span>
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
