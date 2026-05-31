"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Gift, 
  TrendingUp, 
  Wallet,
  ExternalLink,
  Search,
  Filter,
  RefreshCw
} from "lucide-react";

export default function ReferralsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [referrers, setReferrers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReferrers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/referrals?search=${searchTerm}`, {
        headers: {
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_STAGE_API_KEY
        }
      });
      const data = await res.json();
      if (data.ok) {
        setReferrers(data.referrers);
      }
    } catch (err) {
      console.error("Failed to fetch referrers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrers();
  }, [searchTerm]);

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full rounded-lg border border-white/10 bg-surface/50 pl-9 pr-4 text-xs focus:border-acid-lime/30 focus:outline-none"
            />
          </div>
          <button 
            onClick={fetchReferrers}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-white/10"
          >
            <RefreshCw size={14} />
            Reload
          </button>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-16 text-center">
              <RefreshCw className="h-8 w-8 text-acid-lime animate-spin mx-auto mb-3" />
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Querying Referrals Ledger...</span>
            </div>
          ) : referrers.length === 0 ? (
            <div className="p-16 text-center text-sm text-muted-foreground">
              No matching referrer analytics found in database.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Referrer Wallet</th>
                  <th className="px-6 py-4">Total Referrals</th>
                  <th className="px-6 py-4">Purchase Volume</th>
                  <th className="px-6 py-4">Rewards</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {referrers.map((ref) => (
                  <tr key={ref.id} className="group transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-medium text-foreground group-hover:text-acid-lime transition-colors select-all">
                        {ref.wallet}
                      </span>
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
