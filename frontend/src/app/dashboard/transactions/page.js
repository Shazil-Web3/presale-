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
      <section className="quantum-panel rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-bold">Transaction History</h2>
          <div className="flex w-full md:w-auto gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search Hash..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-acid-lime/50 transition-all"
              />
            </div>
            <button className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-8 py-4 font-medium">Tx Hash</th>
                <th className="px-6 py-4 font-medium">Network</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Received</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-8 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx, i) => (
                <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-5 font-mono text-xs text-acid-lime/80 group-hover:text-acid-lime cursor-pointer">{tx.hash}</td>
                  <td className="px-6 py-5 text-sm">{tx.network}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{tx.paid}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{tx.token}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-foreground">{tx.received}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      tx.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      'bg-red-500/10 text-red-500 border border-red-500/20'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-muted-foreground">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-8 bg-white/[0.01] border-t border-white/5 flex justify-between items-center">
          <p className="text-xs text-muted-foreground">Showing 5 of 12 transactions</p>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-lg border border-white/10 text-xs disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-1.5 rounded-lg border border-white/10 text-xs">Next</button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
