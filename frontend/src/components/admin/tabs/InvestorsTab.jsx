"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  ChevronLeft,
  ChevronRight,
  User
} from "lucide-react";

const investors = [
  { id: 1, wallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", amount: "$12,500", tokens: "2,500,000", network: "BSC", status: "Verified", date: "2026-05-24" },
  { id: 2, wallet: "0x250F29d8EC2ab88b098defB751B7401B5f6d8976F", amount: "$5,000", tokens: "1,000,000", network: "ETH", status: "Verified", date: "2026-05-23" },
  { id: 3, wallet: "0x9aC7656EC7ab88b098defB751B7401B5f6d8976F", amount: "$42,000", tokens: "8,400,000", network: "BSC", status: "Pending", date: "2026-05-22" },
  { id: 4, wallet: "0x12C7656EC7ab88b098defB751B7401B5f6d8976F", amount: "$1,200", tokens: "240,000", network: "ETH", status: "Verified", date: "2026-05-21" },
  { id: 5, wallet: "0x56C7656EC7ab88b098defB751B7401B5f6d8976F", amount: "$8,900", tokens: "1,780,000", network: "BSC", status: "Flagged", date: "2026-05-20" },
  { id: 6, wallet: "0x34C7656EC7ab88b098defB751B7401B5f6d8976F", amount: "$15,000", tokens: "3,000,000", network: "ETH", status: "Verified", date: "2026-05-19" },
  { id: 7, wallet: "0x89C7656EC7ab88b098defB751B7401B5f6d8976F", amount: "$2,500", tokens: "500,000", network: "BSC", status: "Verified", date: "2026-05-18" },
];

export default function InvestorsTab() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search wallet address..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-surface/50 pl-10 pr-4 text-sm backdrop-blur-xl focus:border-acid-lime/30 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-surface/50 px-4 py-2.5 text-sm font-medium text-foreground backdrop-blur-xl transition-all hover:bg-white/5">
            <Filter size={18} />
            Filters
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-acid-lime px-4 py-2.5 text-sm font-bold text-black shadow-[0_0_15px_rgba(204,255,0,0.2)] transition-all hover:opacity-90">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/5 bg-white/[0.02] text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Investor Wallet</th>
                <th className="px-6 py-4">Invested Amount</th>
                <th className="px-6 py-4">BRX Allocation</th>
                <th className="px-6 py-4">Network</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {investors.map((investor) => (
                <tr key={investor.id} className="group transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-acid-lime">
                        <User size={14} />
                      </div>
                      <span className="font-mono text-xs text-foreground">
                        {investor.wallet.slice(0, 6)}...{investor.wallet.slice(-4)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-foreground">{investor.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-acid-lime">{investor.tokens} BRX</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-muted-foreground">{investor.network}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      investor.status === 'Verified' ? 'bg-emerald-400/10 text-emerald-400' : 
                      investor.status === 'Pending' ? 'bg-acid-lime/10 text-acid-lime' : 
                      'bg-rose-400/10 text-rose-400'
                    }`}>
                      {investor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-muted-foreground">{investor.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-white/5 hover:text-foreground">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.01] px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Total Investors: <span className="font-bold text-foreground">12,842</span>
          </p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-white/5 p-2 text-muted-foreground transition-all hover:bg-white/5">
              <ChevronLeft size={18} />
            </button>
            <button className="rounded-lg border border-white/5 p-2 text-muted-foreground transition-all hover:bg-white/5">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
