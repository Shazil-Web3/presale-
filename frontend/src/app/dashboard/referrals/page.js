"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Users, Copy, CheckCircle2, TrendingUp, DollarSign, Award } from "lucide-react";

export default function ReferralsPage() {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyReferral = () => {
    navigator.clipboard.writeText("https://brx.io/ref/BRX9281");
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const referredUsers = [
    { wallet: "0x123...456", amount: "$1,200", reward: "6,000 BRX", date: "May 20, 2026" },
    { wallet: "0x789...abc", amount: "$500", reward: "2,500 BRX", date: "May 18, 2026" },
    { wallet: "0xdef...ghi", amount: "$2,800", reward: "14,000 BRX", date: "May 15, 2026" },
  ];

  return (
    <DashboardLayout 
      title="Referral Program" 
      subtitle="Invite friends and earn BRX rewards."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Referral Card */}
          <section className="quantum-panel rounded-[32px] p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-acid-lime/10 flex items-center justify-center border border-acid-lime/20">
                <Users className="h-6 w-6 text-acid-lime" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Invite & Earn</h2>
                <p className="text-muted-foreground text-sm">Earn 5% BRX for every purchase made by your referrals.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Your Unique Referral Link</p>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 bg-black/40 rounded-xl px-4 py-3 text-sm font-mono text-muted-foreground truncate border border-white/5 flex items-center">
                  https://brx.io/ref/BRX9281
                </div>
                <button 
                  onClick={copyReferral}
                  className="px-6 py-3 rounded-xl bg-acid-lime text-black font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {copySuccess ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copySuccess ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {[
                { label: "Total Referrals", value: "12", icon: Users },
                { label: "Referred Volume", value: "$4,500", icon: DollarSign },
                { label: "Total Rewards", value: "15,000 BRX", icon: Award, color: "text-acid-lime" },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase mb-1">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color || ""}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Referred Users Table */}
          <section className="quantum-panel rounded-[32px] overflow-hidden">
            <div className="p-8 border-b border-white/5">
              <h2 className="text-xl font-bold">Referred Investors</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-8 py-4 font-medium">Wallet Address</th>
                    <th className="px-6 py-4 font-medium">Purchase Amount</th>
                    <th className="px-6 py-4 font-medium">Reward Earned</th>
                    <th className="px-8 py-4 font-medium">Date Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {referredUsers.map((user, i) => (
                    <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-5 font-mono text-xs text-muted-foreground group-hover:text-foreground">{user.wallet}</td>
                      <td className="px-6 py-5 text-sm font-bold">{user.amount}</td>
                      <td className="px-6 py-5 text-sm font-bold text-acid-lime">{user.reward}</td>
                      <td className="px-8 py-5 text-sm text-muted-foreground">{user.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="quantum-panel rounded-[32px] p-6 space-y-6">
            <h2 className="text-lg font-bold">Program Rules</h2>
            <ul className="space-y-4">
              {[
                "Earn 5% rewards in BRX tokens.",
                "Rewards are distributed after phase completion.",
                "Self-referrals are strictly prohibited.",
                "Referral link must be used during purchase."
              ].map((rule, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <div className="h-5 w-5 rounded-full bg-acid-lime/10 flex items-center justify-center flex-shrink-0 text-acid-lime text-[10px] font-bold">
                    {i + 1}
                  </div>
                  {rule}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
