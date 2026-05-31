"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  ChevronLeft,
  ChevronRight,
  User,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function InvestorsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const fetchInvestors = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/investors?search=${searchTerm}&status=${statusFilter}`, {
        headers: {
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_STAGE_API_KEY
        }
      });
      const data = await res.json();
      if (data.ok) {
        setInvestors(data.investors);
      }
    } catch (err) {
      console.error("Failed to load admin investors list:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (wallet, newStatus) => {
    try {
      const res = await fetch("/api/admin/investors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_STAGE_API_KEY
        },
        body: JSON.stringify({
          walletAddress: wallet,
          status: newStatus
        })
      });
      const resData = await res.json();
      if (resData.ok) {
        fetchInvestors();
        setActionMenuOpen(null);
      }
    } catch (err) {
      console.error("Failed to update investor verification status:", err);
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, [searchTerm, statusFilter]);

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
          <div className="flex items-center gap-1 bg-surface/50 rounded-xl border border-white/10 px-2 py-1 backdrop-blur-xl">
            {["All", "Verified", "Pending", "Flagged"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === st 
                    ? "bg-acid-lime/10 text-acid-lime" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          <button 
            onClick={fetchInvestors}
            className="flex items-center gap-2 rounded-xl bg-acid-lime px-4 py-2.5 text-sm font-bold text-black shadow-[0_0_15px_rgba(204,255,0,0.2)] transition-all hover:opacity-90"
          >
            <RefreshCw size={18} />
            Reload
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-16 text-center">
              <RefreshCw className="h-8 w-8 text-acid-lime animate-spin mx-auto mb-3" />
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Fetching Investors...</span>
            </div>
          ) : investors.length === 0 ? (
            <div className="p-16 text-center text-sm text-muted-foreground">
              No matching investor records found in database.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="border-b border-white/5 bg-white/[0.02] text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Investor Wallet</th>
                  <th className="px-6 py-4">Invested Amount</th>
                  <th className="px-6 py-4">BRX Allocation</th>
                  <th className="px-6 py-4">Network</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {investors.map((investor) => (
                  <tr key={investor.id} className="group transition-colors hover:bg-white/[0.02] relative">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-acid-lime">
                          <User size={14} />
                        </div>
                        <span className="font-mono text-xs text-foreground select-all">
                          {investor.wallet}
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
                    <td className="px-6 py-4 text-right relative">
                      <div className="flex justify-end items-center gap-1.5">
                        <button 
                          onClick={() => setActionMenuOpen(actionMenuOpen === investor.wallet ? null : investor.wallet)}
                          className="rounded-lg p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        
                        {actionMenuOpen === investor.wallet && (
                          <div className="absolute right-6 top-12 z-30 w-36 rounded-xl border border-white/10 bg-[#0e0e12] p-1.5 shadow-2xl backdrop-blur-xl text-left">
                            <p className="text-[8px] uppercase tracking-widest text-muted-foreground/60 px-2.5 py-1.5 font-bold">Verification Actions</p>
                            {["Verified", "Pending", "Flagged"].map((op) => (
                              <button
                                key={op}
                                onClick={() => handleUpdateStatus(investor.wallet, op)}
                                className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg text-foreground hover:bg-white/5 hover:text-acid-lime transition-colors flex items-center gap-2"
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${
                                  op === 'Verified' ? 'bg-emerald-400' : op === 'Pending' ? 'bg-acid-lime' : 'bg-rose-400'
                                }`} />
                                {op}
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

        {/* Pagination Info */}
        <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.01] px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Total Investors in Registry: <span className="font-bold text-foreground">{investors.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
