"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Gift, 
  TrendingUp, 
 Wallet,
  ExternalLink,
  Search,
  Filter
} from "lucide-react";

const referrers = [
  { id: 1, wallet: "0x71C7...8976", referrals: 142, volume: "$284,500", rewards: "56,900 BRX" },
  { id: 2, wallet: "0x250F...d8EC", referrals: 98, volume: "$142,000", rewards: "28,400 BRX" },
  { id: 3, wallet: "0x9aC7...656E", referrals: 76, volume: "$115,200", rewards: "23,040 BRX" },
  { id: 4, wallet: "0x12C7...56EC", referrals: 64, volume: "$98,400", rewards: "19,680 BRX" },
  { id: 5, wallet: "0x56C7...E7ab", referrals: 52, volume: "$74,100", rewards: "14,820 BRX" },
];

export default function ReferralsTab() {
  return (
    <div className="space-y-6">
      {/* Referrer Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-4">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search referrers..." 
              className="h-9 w-full rounded-lg border border-white/10 bg-surface/50 pl-9 pr-4 text-xs focus:border-acid-lime/30 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-white/10">
            <Filter size={14} />
            Filters
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Referrer Wallet</th>
                <th className="px-6 py-4">Total Referrals</th>
                <th className="px-6 py-4">Purchase Volume</th>
                <th className="px-6 py-4">Rewards</th>
                <th className="px-6 py-4 text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {referrers.map((ref) => (
                <tr key={ref.id} className="group transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-medium text-foreground group-hover:text-acid-lime transition-colors">{ref.wallet}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-foreground">{ref.referrals}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-emerald-400">{ref.volume}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-acid-lime">{ref.rewards}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-muted-foreground hover:text-foreground transition-all">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
