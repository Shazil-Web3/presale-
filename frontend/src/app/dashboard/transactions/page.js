"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Search, ExternalLink } from "lucide-react";

const transactions = [
  { hash: "0x91A...D2C1", network: "BNB Smart Chain", token: "USDT", paid: "$500", received: "100,000 BRX", status: "Confirmed", date: "May 25, 2026" },
  { hash: "0x32B...E4F2", network: "Ethereum", token: "USDC", paid: "$2,000", received: "400,000 BRX", status: "Pending", date: "May 24, 2026" },
  { hash: "0x78C...G9H1", network: "Polygon", token: "MATIC", paid: "$250", received: "50,000 BRX", status: "Failed", date: "May 23, 2026" },
  { hash: "0x12D...K3L4", network: "BNB Smart Chain", token: "BNB", paid: "2.5 BNB", received: "150,000 BRX", status: "Confirmed", date: "May 22, 2026" },
  { hash: "0x56E...M5N6", network: "Ethereum", token: "ETH", paid: "1.2 ETH", received: "600,000 BRX", status: "Confirmed", date: "May 21, 2026" },
];

export default function TransactionsPage() {
  return (
    <DashboardLayout 
      title="Transactions" 
      subtitle="Track your purchase history and allocation status."
    >
      <section className="quantum-panel rounded-[24px] sm:rounded-[32px] overflow-hidden border-white/5 bg-surface/30">
        <div className="p-6 sm:p-10 border-b border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <h2 className="text-xl font-bold text-foreground">Transaction History</h2>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search Hash..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-acid-lime/30 transition-all placeholder:text-muted-foreground/40"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium text-muted-foreground hover:text-foreground">
              <ExternalLink className="h-4 w-4" />
              <span className="sm:hidden lg:inline">Explorer</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left min-w-[800px] lg:min-w-full">
            <thead className="bg-white/[0.01] text-[10px] uppercase tracking-widest text-muted-foreground font-bold border-b border-white/5">
              <tr>
                <th className="px-6 sm:px-10 py-5">Tx Hash</th>
                <th className="px-6 py-5">Network</th>
                <th className="px-6 py-5">Payment</th>
                <th className="px-6 py-5">Received</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 sm:px-10 py-5 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx, i) => (
                <tr key={i} className="group hover:bg-white/[0.015] transition-colors">
                  <td className="px-6 sm:px-10 py-6 font-mono text-xs text-muted-foreground group-hover:text-acid-lime transition-colors cursor-pointer">{tx.hash}</td>
                  <td className="px-6 py-6 text-sm font-medium text-foreground/80">{tx.network}</td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">{tx.paid}</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{tx.token}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm font-bold text-foreground">{tx.received}</td>
                  <td className="px-6 py-6 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      tx.status === 'Confirmed' ? 'bg-emerald-500/5 text-emerald-500 border border-emerald-500/10' :
                      tx.status === 'Pending' ? 'bg-yellow-500/5 text-yellow-500 border border-yellow-500/10' :
                      'bg-red-500/5 text-red-500 border border-red-500/10'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 sm:px-10 py-6 text-sm text-muted-foreground text-right">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 sm:p-8 bg-white/[0.005] border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-medium">Showing 5 of 12 transactions</p>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 py-2 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:bg-white/5 transition-all disabled:opacity-30 disabled:hover:bg-transparent" disabled>Previous</button>
            <button className="flex-1 sm:flex-none px-6 py-2 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:bg-white/5 transition-all">Next</button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
