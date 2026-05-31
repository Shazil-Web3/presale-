"use client";

import { useState, useEffect } from "react";
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
  AlertCircle,
  RefreshCw,
  MoreHorizontal
} from "lucide-react";

export default function TransactionsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/transactions?search=${searchTerm}&status=${statusFilter}`, {
        headers: {
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_STAGE_API_KEY
        }
      });
      const data = await res.json();
      if (data.ok) {
        setTransactions(data.transactions);
      }
    } catch (err) {
      console.error("Failed to load admin transactions list:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (txHash, newStatus) => {
    try {
      const res = await fetch("/api/admin/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_STAGE_API_KEY
        },
        body: JSON.stringify({
          txHash: txHash,
          status: newStatus
        })
      });
      const resData = await res.json();
      if (resData.ok) {
        fetchTransactions();
        setActionMenuOpen(null);
      }
    } catch (err) {
      console.error("Failed to update transaction status:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by hash or wallet address..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full rounded-xl border border-white/10 bg-surface/50 pl-10 pr-4 text-sm backdrop-blur-xl focus:border-acid-lime/30 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-surface/50 rounded-xl border border-white/10 px-2 py-1 backdrop-blur-xl">
            {["All", "Success", "Pending", "Failed"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === st 
                    ? "bg-acid-lime/10 text-acid-lime" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {st === "Success" ? "Confirmed" : st}
              </button>
            ))}
          </div>
          <button 
            onClick={fetchTransactions}
            className="flex items-center gap-2 rounded-xl bg-acid-lime px-4 py-2.5 text-sm font-bold text-black shadow-[0_0_15px_rgba(204,255,0,0.2)] transition-all hover:opacity-90"
          >
            <RefreshCw size={18} />
            Reload
          </button>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-16 text-center">
              <RefreshCw className="h-8 w-8 text-acid-lime animate-spin mx-auto mb-3" />
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Querying Ledger...</span>
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-16 text-center text-sm text-muted-foreground">
              No matching transaction records found in ledger.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="border-b border-white/5 bg-white/[0.02] text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Tx Hash</th>
                  <th className="px-6 py-4">Investor Wallet</th>
                  <th className="px-6 py-4">Chain</th>
                  <th className="px-6 py-4">Paid Value</th>
                  <th className="px-6 py-4">BRX Allocated</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Capture Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="group transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-medium text-foreground group-hover:text-acid-lime transition-colors cursor-pointer select-all">
                        {tx.fullHash}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-muted-foreground select-all">
                        {tx.wallet}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-muted-foreground">{tx.network}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground">{tx.amount}</span>
                        <span className="text-[10px] text-muted-foreground">{tx.value}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-acid-lime">{tx.received}</span>
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
                        {tx.status === 'Success' ? 'Confirmed' : tx.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] text-muted-foreground">{tx.date}</span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <div className="flex justify-end items-center gap-2">
                        <button 
                          onClick={() => window.open(tx.network === "ETH" ? `https://etherscan.io/tx/${tx.fullHash}` : `https://bscscan.com/tx/${tx.fullHash}`, "_blank")}
                          className="rounded-lg p-2 text-muted-foreground hover:text-acid-lime transition-all"
                        >
                          <ExternalLink size={15} />
                        </button>
                        
                        <button 
                          onClick={() => setActionMenuOpen(actionMenuOpen === tx.id ? null : tx.id)}
                          className="rounded-lg p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                        
                        {actionMenuOpen === tx.id && (
                          <div className="absolute right-6 top-12 z-30 w-36 rounded-xl border border-white/10 bg-[#0e0e12] p-1.5 shadow-2xl backdrop-blur-xl text-left">
                            <p className="text-[8px] uppercase tracking-widest text-muted-foreground/60 px-2.5 py-1.5 font-bold">Ledge Actions</p>
                            {["Success", "Pending", "Failed"].map((op) => (
                              <button
                                key={op}
                                onClick={() => handleUpdateStatus(tx.fullHash, op)}
                                className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg text-foreground hover:bg-white/5 hover:text-acid-lime transition-colors flex items-center gap-2"
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${
                                  op === 'Success' ? 'bg-emerald-400' : op === 'Pending' ? 'bg-acid-lime' : 'bg-rose-400'
                                }`} />
                                {op === "Success" ? "Confirm" : op}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
