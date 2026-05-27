"use client";

import { useState } from "react";
import { 
  Search, 
  Download, 
  Send, 
  CheckCircle2, 
  Clock, 
  Wallet,
  MoreHorizontal
} from "lucide-react";

const allocations = [
  { id: 1, wallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", amount: "2,500,000", status: "Distributed", date: "2026-05-24" },
  { id: 2, wallet: "0x250F29d8EC2ab88b098defB751B7401B5f6d8976F", amount: "1,000,000", status: "Pending", date: "2026-05-23" },
  { id: 3, wallet: "0x9aC7656EC7ab88b098defB751B7401B5f6d8976F", amount: "8,400,000", status: "Pending", date: "2026-05-22" },
  { id: 4, wallet: "0x12C7656EC7ab88b098defB751B7401B5f6d8976F", amount: "240,000", status: "Distributed", date: "2026-05-21" },
  { id: 5, wallet: "0x56C7656EC7ab88b098defB751B7401B5f6d8976F", amount: "1,780,000", status: "Pending", date: "2026-05-20" },
];

export default function AllocationsTab() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Distributed</p>
          <p className="text-2xl font-bold text-emerald-400">412,500,000 BRX</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Pending Distribution</p>
          <p className="text-2xl font-bold text-acid-lime">124,700,000 BRX</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-6 rounded-2xl border border-acid-lime/20 bg-acid-lime/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-acid-lime text-black flex items-center justify-center">
            <Send size={20} />
          </div>
          <p className="text-sm font-bold text-foreground">Manual Distribution Mode</p>
        </div>
        <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-acid-lime text-black font-bold text-sm shadow-[0_0_15px_rgba(204,255,0,0.2)]">
          Distribute All Pending
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/10 bg-surface/50 overflow-hidden backdrop-blur-xl">
        <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filter wallet..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-surface border border-white/10 rounded-lg text-xs focus:outline-none"
            />
          </div>
          <button className="p-2 text-muted-foreground hover:text-foreground">
            <Download size={18} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Wallet</th>
                <th className="px-6 py-4">Allocation</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allocations.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-foreground">{item.wallet}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-foreground">{item.amount} BRX</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${
                      item.status === 'Distributed' ? 'text-emerald-400' : 'text-acid-lime'
                    }`}>
                      {item.status === 'Distributed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {item.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal size={18} />
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
