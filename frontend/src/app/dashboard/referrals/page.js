"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Users, Copy, CheckCircle2, DollarSign, Award, Wallet, Sparkles, RefreshCw } from "lucide-react";

export default function ReferralsPage() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [referralLink, setReferralLink] = useState("");
  const [metrics, setMetrics] = useState({ totalReferrals: 0, referredVolumeUsd: 0, rewardBrx: 0 });
  const [referredInvestors, setReferredInvestors] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const fetchReferrals = async (userWallet) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/dashboard/referrals?wallet=${userWallet}`);
      const data = await res.json();
      if (data.ok) {
        setReferralLink(data.referralLink);
        setMetrics(data.metrics);
        setReferredInvestors(data.referredInvestors);
      }
    } catch (err) {
      console.error("Failed to load referrals data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isConnected && address) {
      fetchReferrals(address);
    }
  }, [mounted, isConnected, address]);

  const copyReferral = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (!mounted) return null;

  // RENDER DISCONNECTED
  if (!isConnected || !address) {
    return (
      <DashboardLayout 
        title="Referral Program" 
        subtitle="Invite friends and earn BRX rewards."
      >
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full relative overflow-hidden rounded-[32px] border border-white/10 bg-surface/30 p-8 backdrop-blur-xl flex flex-col items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-acid-lime/10 flex items-center justify-center border border-acid-lime/25 shadow-[0_0_20px_rgba(204,255,0,0.15)]">
              <Users className="h-8 w-8 text-acid-lime" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Connect Wallet</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect your wallet to generate your unique referral links and start earning 5% BRX commissions.
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
        title="Referral Program" 
        subtitle="Invite friends and earn BRX rewards."
      >
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
          <RefreshCw className="h-8 w-8 text-acid-lime animate-spin" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Querying Referrals Ledger...</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Referral Program" 
      subtitle="Invite friends and earn BRX rewards."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Referral Card */}
          <section className="quantum-panel rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 space-y-6 sm:space-y-8 border-white/5 bg-surface/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-acid-lime/10 flex items-center justify-center border border-acid-lime/20 flex-shrink-0">
                <Users className="h-6 w-6 sm:h-7 sm:w-7 text-acid-lime" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">Invite & Earn</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">Earn 5% BRX for every purchase made by your referrals.</p>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Your Unique Referral Link</p>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 bg-black/40 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-muted-foreground truncate border border-white/5 flex items-center min-h-[48px]">
                  {referralLink}
                </div>
                <button 
                  onClick={copyReferral}
                  className="px-6 py-3 rounded-xl bg-acid-lime text-black text-sm font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 h-[48px] sm:h-auto"
                >
                  {copySuccess ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copySuccess ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4">
              {[
                { label: "Total Referrals", value: metrics.totalReferrals.toString(), icon: Users },
                { label: "Referred Volume", value: `$${metrics.referredVolumeUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: DollarSign },
                { label: "Total Rewards", value: `${metrics.rewardBrx.toLocaleString()} BRX`, icon: Award, color: "text-acid-lime" },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between min-h-[100px]">
                  <div className="flex justify-between items-start">
                    <stat.icon className="h-4 w-4 text-muted-foreground/60" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color || "text-foreground"}`}>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Referred Users Table */}
          <section className="quantum-panel rounded-[24px] sm:rounded-[32px] overflow-hidden border-white/5 bg-surface/30">
            <div className="p-6 sm:p-8 border-b border-white/5">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">Referred Investors</h2>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              {referredInvestors.length === 0 ? (
                <div className="p-12 text-center text-sm text-muted-foreground">
                  You haven't referred any investors yet. Share your referral link to earn rewards!
                </div>
              ) : (
                <table className="w-full text-left min-w-[600px] lg:min-w-full">
                  <thead className="bg-white/[0.01] text-[10px] uppercase tracking-widest text-muted-foreground font-bold border-b border-white/5">
                    <tr>
                      <th className="px-6 sm:px-8 py-5">Wallet Address</th>
                      <th className="px-6 py-5">Purchase Amount</th>
                      <th className="px-6 py-5">Reward Earned</th>
                      <th className="px-6 sm:px-8 py-5 text-right">Date Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {referredInvestors.map((user, i) => (
                      <tr key={i} className="group hover:bg-white/[0.015] transition-colors">
                        <td className="px-6 sm:px-8 py-6 font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                          {user.fullWallet}
                        </td>
                        <td className="px-6 py-6 text-sm font-bold text-foreground">{user.amount}</td>
                        <td className="px-6 py-6 text-sm font-bold text-acid-lime">{user.reward}</td>
                        <td className="px-6 sm:px-8 py-6 text-sm text-muted-foreground text-right">{user.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="quantum-panel rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 space-y-6 border-white/5 bg-surface/30">
            <h2 className="text-lg font-bold text-foreground">Program Rules</h2>
            <ul className="space-y-5">
              {[
                "Earn 5% rewards in BRX tokens.",
                "Rewards are distributed after phase completion.",
                "Self-referrals are strictly prohibited.",
                "Referral link must be used during purchase."
              ].map((rule, i) => (
                <li key={i} className="flex gap-4 text-sm text-muted-foreground leading-relaxed">
                  <div className="h-6 w-6 rounded-lg bg-acid-lime/10 flex items-center justify-center flex-shrink-0 text-acid-lime text-xs font-bold border border-acid-lime/10">
                    {i + 1}
                  </div>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
