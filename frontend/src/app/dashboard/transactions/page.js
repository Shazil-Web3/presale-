"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Search, ExternalLink, Wallet, Sparkles, RefreshCw } from "lucide-react";

export default function TransactionsPage() {
  const { address, isConnected } = useAccount();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTransactions = async (userWallet) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/dashboard/transactions?wallet=${userWallet}`);
      const data = await res.json();
      if (data.ok) {
        setTransactions(data.transactions);
      }
    } catch (err) {
      console.error("Failed to load user transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isConnected && address) {
      fetchTransactions(address);
    }
  }, [mounted, isConnected, address]);

  if (!mounted) return null;

  // RENDER DISCONNECTED
  if (!isConnected || !address) {
    return (
      <DashboardLayout 
        title="Transactions" 
        subtitle="Track your purchase history and allocation status."
      >
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full relative overflow-hidden rounded-[32px] border border-white/10 bg-surface/30 p-8 backdrop-blur-xl flex flex-col items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-acid-lime/10 flex items-center justify-center border border-acid-lime/25 shadow-[0_0_20px_rgba(204,255,0,0.15)]">
              <Wallet className="h-8 w-8 text-acid-lime" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Connect Wallet</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect your wallet to retrieve your on-chain presale transaction logs and token allocations.
              </p>
            </div>

            <div className="rainbow-connect-wrapper scale-[1.05] mt-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // RENDER LOADING
  if (loading) {
    return (
      <DashboardLayout 
        title="Transactions" 
        subtitle="Track your purchase history and allocation status."
      >
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
          <RefreshCw className="h-8 w-8 text-acid-lime animate-spin" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Retrieving Transaction Ledger...</span>
        </div>
      </DashboardLayout>
    );
  }

  const filteredTransactions = transactions.filter((tx) =>
    tx.fullHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-acid-lime/30 transition-all placeholder:text-muted-foreground/40"
              />
            </div>
            <button 
              onClick={() => fetchTransactions(address)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-acid-lime/25 bg-acid-lime/10 text-acid-lime hover:bg-acid-lime/20 transition-all text-sm font-semibold shadow-[0_0_15px_rgba(204,255,0,0.1)]"
            >
              <RefreshCw className="h-4 w-4 animate-pulse" />
              Refresh
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide">
          {filteredTransactions.length === 0 ? (
            <div className="p-16 text-center text-sm text-muted-foreground">
              No transactions recorded for this wallet address in our ledger. Join the presale on the Home page to get started!
            </div>
          ) : (
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
                {filteredTransactions.map((tx, i) => (
                  <tr key={i} className="group hover:bg-white/[0.015] transition-colors">
                    <td 
                      onClick={() => window.open(tx.network.includes("Ethereum") ? `https://etherscan.io/tx/${tx.fullHash}` : `https://bscscan.com/tx/${tx.fullHash}`, "_blank")}
                      className="px-6 sm:px-10 py-6 font-mono text-xs text-muted-foreground group-hover:text-acid-lime transition-colors cursor-pointer select-all"
                    >
                      {tx.hash}
                    </td>
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
                        tx.status === 'Confirmed' || tx.status === 'Success' ? 'bg-emerald-500/5 text-emerald-500 border border-emerald-500/10' :
                        tx.status === 'Pending' ? 'bg-yellow-500/5 text-yellow-500 border border-yellow-500/10' :
                        'bg-red-500/5 text-red-500 border border-red-500/10'
                      }`}>
                        {tx.status === 'Success' ? 'Confirmed' : tx.status}
                      </span>
                    </td>
                    <td className="px-6 sm:px-10 py-6 text-sm text-muted-foreground text-right">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {filteredTransactions.length > 0 && (
          <div className="p-6 sm:p-8 bg-white/[0.005] border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground font-medium">
              Showing {filteredTransactions.length} transaction{filteredTransactions.length > 1 ? "s" : ""} in database
            </p>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}
