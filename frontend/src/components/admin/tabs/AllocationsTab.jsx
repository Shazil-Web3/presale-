"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Download, 
  Send, 
  CheckCircle2, 
  Clock, 
  Wallet,
  MoreHorizontal,
  RefreshCw,
  AlertCircle
} from "lucide-react";

export default function AllocationsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allocations, setAllocations] = useState([]);
  const [totalDistributed, setTotalDistributed] = useState("0 BRX");
  const [totalPending, setTotalPending] = useState("0 BRX");
  const [loading, setLoading] = useState(true);

  const fetchAllocations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/allocations?search=${searchTerm}`, {
        headers: {
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_STAGE_API_KEY
        }
      });
      const data = await res.json();
      if (data.ok) {
        setAllocations(data.allocations);
        setTotalDistributed(data.totalDistributed);
        setTotalPending(data.totalPending);
      }
    } catch (err) {
      console.error("Failed to load allocations data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total Distributed</p>
          <p className="text-2xl font-bold text-emerald-400">{totalDistributed}</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Pending Claims</p>
          <p className="text-2xl font-bold text-acid-lime">{totalPending}</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/10 bg-surface/50 overflow-hidden backdrop-blur-xl">
        <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filter wallet address..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-surface border border-white/10 rounded-lg text-xs focus:outline-none focus:border-acid-lime/30"
            />
          </div>
          <button 
            onClick={fetchAllocations}
            className="p-2 text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <RefreshCw size={14} className="animate-spin" style={{ animationDuration: "3s" }} />
            Reload
          </button>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-16 text-center">
              <RefreshCw className="h-8 w-8 text-acid-lime animate-spin mx-auto mb-3" />
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Querying Allocations Ledger...</span>
            </div>
          ) : allocations.length === 0 ? (
            <div className="p-16 text-center text-sm text-muted-foreground">
              No matching token allocations recorded in database.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-white/5">
                <tr>
                  <th className="px-6 py-4">Wallet</th>
                  <th className="px-6 py-4">Allocation</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Capture Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allocations.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-foreground select-all">{item.wallet}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-foreground">{item.amount} BRX</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${
                        item.status === 'Distributed' ? 'text-emerald-400' : item.status === 'Pending' ? 'text-acid-lime' : 'text-rose-400'
                      }`}>
                        {item.status === 'Distributed' ? <CheckCircle2 size={12} /> : item.status === 'Pending' ? <Clock size={12} /> : <AlertCircle size={12} />}
                        {item.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-muted-foreground">{item.date}</span>
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
