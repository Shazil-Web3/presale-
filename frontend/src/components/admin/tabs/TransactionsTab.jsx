"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Hash,
  Wallet,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const transactions = [
  { id: 1, hash: "0x7a2b...f3e1", wallet: "0x71...3a2b", token: "USDT", network: "BSC", amount: "5,000", value: "$5,000", status: "Success", date: "2026-05-26 14:22:05" },
  { id: 2, hash: "0x9e1f...d2c4", wallet: "0x42...9e1f", token: "ETH", network: "ETH", amount: "1.25", value: "$4,120", status: "Success", date: "2026-05-26 13:45:12" },
  { id: 3, hash: "0xbc42...a9d8", wallet: "0x9a...bc42", token: "BNB", network: "BSC", amount: "12.5", value: "$7,800", status: "Pending", date: "2026-05-26 13:12:45" },
  { id: 4, hash: "0xde34...12b3", wallet: "0x12...de34", token: "USDT", network: "ETH", amount: "2,500", value: "$2,500", status: "Success", date: "2026-05-26 12:55:30" },
  { id: 5, hash: "0x5678...90ef", wallet: "0x56...7890", token: "USDT", network: "BSC", amount: "10,000", value: "$10,000", status: "Failed", date: "2026-05-26 12:30:15" },
  { id: 6, hash: "0x1234...5678", wallet: "0x34...5678", token: "ETH", network: "ETH", amount: "0.5", value: "$1,650", status: "Success", date: "2026-05-26 11:45:00" },
  { id: 7, hash: "0xabcd...efgh", wallet: "0x89...abcd", token: "BNB", network: "BSC", amount: "5.0", value: "$3,100", status: "Success", date: "2026-05-26 11:20:22" },
];

export default function TransactionsTab() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by hash or wallet..." 
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
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/5 bg-white/[0.02] text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Tx Hash</th>
                <th className="px-6 py-4">Wallet</th>
                <th className="px-6 py-4">Chain</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx) => (
                <tr key={tx.id} className="group transition-colors hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-medium text-foreground group-hover:text-acid-lime transition-colors">
                      {tx.hash}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {tx.wallet}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-muted-foreground">{tx.network}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">{tx.amount} {tx.token}</span>
                      <span className="text-[10px] text-muted-foreground">{tx.value}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider w-fit ${
                      tx.status === 'Success' ? 'bg-emerald-400/10 text-emerald-400' : 
                      tx.status === 'Pending' ? 'bg-acid-lime/10 text-acid-lime' : 
                      'bg-rose-400/10 text-rose-400'
                    }`}>
                      {tx.status === 'Success' ? <CheckCircle2 size={12} /> : 
                       tx.status === 'Pending' ? <Clock size={12} /> : 
                       <AlertCircle size={12} />}
                      {tx.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] text-muted-foreground">{tx.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-white/5 hover:text-acid-lime">
                      <ExternalLink size={16} />
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
            Total Transactions: <span className="font-bold text-foreground">48,291</span>
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
