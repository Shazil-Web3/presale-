"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import BorderGlow from "@/components/ui/BorderGlow";
import { 
  TrendingUp, 
  Coins, 
  Flame, 
  Users, 
  ShieldCheck, 
  Search,
  Wallet,
  Sparkles,
  RefreshCw
} from "lucide-react";

// --- Sub-components ---
const StatCard = ({ title, value, subtext, icon: Icon, color, glow }) => (
  <BorderGlow 
    className="h-full" 
    glowColor={glow}
    backgroundColor="rgba(20, 20, 26, 0.6)"
    colors={[color, "rgba(255, 255, 255, 0.1)"]}
  >
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
          <Icon className="h-5 w-5 text-acid-lime" />
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold text-foreground mt-1">{value}</h3>
        <p className="text-[10px] text-muted-foreground/60 mt-2 uppercase tracking-wider">{subtext}</p>
      </div>
    </div>
  </BorderGlow>
);

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDashboardData = async (userWallet) => {
    try {
      setLoading(true);
      const statsRes = await fetch(`/api/dashboard/stats?wallet=${userWallet}`);
      const statsData = await statsRes.json();
      
      const txRes = await fetch(`/api/dashboard/transactions?wallet=${userWallet}`);
      const txData = await txRes.json();

      if (statsData.ok) {
        setStats(statsData.stats);
      }
      if (txData.ok) {
        setTransactions(txData.transactions);
      }
    } catch (err) {
      console.error("Failed to load dashboard statistics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isConnected && address) {
      fetchDashboardData(address);
    }
  }, [mounted, isConnected, address]);

  if (!mounted) return null;

  // --- 1. RENDER DISCONNECTED STATE ---
  if (!isConnected || !address) {
    return (
      <DashboardLayout 
        title="Investor Dashboard" 
        subtitle="Monitor your BRX allocations and presale activity."
      >
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full relative overflow-hidden rounded-[32px] border border-white/10 bg-surface/30 p-8 backdrop-blur-xl flex flex-col items-center gap-6"
          >
            {/* Background decorative glow */}
            <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-acid-lime/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl pointer-events-none" />

            <div className="h-16 w-16 rounded-2xl bg-acid-lime/10 flex items-center justify-center border border-acid-lime/25 shadow-[0_0_20px_rgba(204,255,0,0.15)]">
              <Wallet className="h-8 w-8 text-acid-lime" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Connect Wallet</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect your investor wallet to view your personal token allocations, refer friends, and track your purchase history.
              </p>
            </div>

            <div className="rainbow-connect-wrapper scale-[1.05] mt-2">
              <ConnectButton />
            </div>

            <div className="mt-2 text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-acid-lime" />
              Real-Time Supabase Ledger
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  // --- 2. RENDER LOADING STATE ---
  if (loading || !stats) {
    return (
      <DashboardLayout 
        title="Investor Dashboard" 
        subtitle="Monitor your BRX allocations and presale activity."
      >
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
          <RefreshCw className="h-8 w-8 text-acid-lime animate-spin" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Synchronizing Ledger...</span>
        </div>
      </DashboardLayout>
    );
  }

  // --- 3. RENDER FULLY DYNAMIC DASHBOARD ---
  const activeStage = stats.activeStage || {
    name: "Upcoming Phase",
    priceUsd: 0.008,
    raisedUsd: 0,
    hardCapUsd: 10000000,
    percentComplete: 0
  };

  const dashboardCards = [
    { title: "Total Invested", value: `$${stats.totalInvestedUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, subtext: "Across all supported networks", icon: TrendingUp, color: "rgba(204, 255, 0, 0.4)", glow: "72 100 50" },
    { title: "BRX Allocation", value: `${stats.brxAllocation.toLocaleString()} BRX`, subtext: "Current estimated allocation", icon: Coins, color: "rgba(0, 255, 135, 0.4)", glow: "152 100 50" },
    { title: "Current Sale Stage", value: activeStage.name, subtext: `1 BRX = $${activeStage.priceUsd}`, icon: Flame, color: "rgba(168, 85, 247, 0.4)", glow: "270 95 75" },
    { title: "Referral Rewards", value: `${stats.referralRewardsBrx.toLocaleString()} BRX`, subtext: "Estimated referral incentives", icon: Users, color: "rgba(204, 255, 0, 0.4)", glow: "72 100 50" },
  ];

  const filteredTransactions = transactions.filter((tx) =>
    tx.fullHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout 
      title="Investor Dashboard" 
      subtitle="Monitor your BRX allocations and presale activity."
    >
      <div className="space-y-8 lg:space-y-16">
        {/* 1. Portfolio Overview Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {dashboardCards.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </section>

        {/* 2. Allocation Status & Live Presale Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Allocation Status */}
          <section className="quantum-panel rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 relative overflow-hidden group border-white/5 bg-surface/30">
            <div className="absolute top-0 right-0 p-6 sm:p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck size={120} className="text-acid-lime sm:w-[160px] sm:h-[160px]" />
            </div>
            
            <div className="relative z-10 flex flex-col gap-8 sm:gap-10">
              <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10">
                <div className="relative flex items-center justify-center group/chart flex-shrink-0">
                  <div className="absolute inset-0 -m-3 sm:-m-4 pointer-events-none opacity-10 group-hover/chart:opacity-20 transition-opacity">
                    <div className="absolute inset-0 border-[1px] border-dashed border-white/40 rounded-full" />
                  </div>

                  <svg className="h-32 w-32 sm:h-40 sm:w-40 transform -rotate-90 overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#CCFF00" />
                        <stop offset="100%" stopColor="#00FF87" />
                      </linearGradient>
                    </defs>

                    {/* Background Ring */}
                    <circle cx={80} cy={80} r={70} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                    
                    {/* Progress Ring */}
                    <motion.circle
                      cx={80}
                      cy={80}
                      r={70}
                      stroke="url(#chartGradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      fill="transparent"
                      strokeDasharray="440"
                      initial={{ strokeDashoffset: 440 }}
                      animate={{ strokeDashoffset: stats.brxAllocation > 0 ? 440 * 0.25 : 440 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="drop-shadow-[0_0_8px_rgba(204,255,0,0.3)]"
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Session</span>
                      <span className="font-bold text-sm tracking-tighter text-emerald-400">
                        Active
                      </span>
                    </motion.div>
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center md:justify-start">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{stats.brxAllocation.toLocaleString()} BRX</h2>
                    <span className="px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 border-emerald-500/20 text-emerald-500">
                      Secured
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                    Your wallet connection is secure. Once the presale stages are completed, your confirmed BRX allocations will be claimable directly through this investor command center.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-8 pt-6 border-t border-white/5 justify-center md:justify-start">
                {[
                  { label: "Wallet Connected", status: "done" },
                  { label: "Allocation Confirmed", status: stats.brxAllocation > 0 ? "done" : "waiting" },
                  { label: "Tokens Claimable", status: "waiting" }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3">
                    <div className={`h-1.5 w-1.5 rounded-full ${step.status === 'done' ? 'bg-acid-lime' : 'bg-white/20'}`} />
                    <span className={`text-[10px] sm:text-xs font-medium ${step.status === 'done' ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Live Presale Progress */}
          <section className="quantum-panel rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 border-white/5 bg-surface/30">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 sm:mb-10">
              <div className="space-y-1">
                <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Presale Progress
                </h2>
                <p className="text-xs text-muted-foreground">{activeStage.name} Active</p>
              </div>
              <div className="text-left sm:text-right space-y-1">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Funding Health</div>
                <div className="text-base sm:text-lg font-mono font-bold text-acid-lime tracking-tight">
                  {activeStage.percentComplete}% Raised
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                  <span className="text-muted-foreground">Raised: <span className="text-foreground">${activeStage.raisedUsd.toLocaleString()}</span></span>
                  <span className="text-muted-foreground">Target: <span className="text-foreground">${activeStage.hardCapUsd.toLocaleString()}</span></span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/5 border border-white/10 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-acid-lime to-liquidity-emerald shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${activeStage.percentComplete}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Cap Limit</p>
                  <p className="text-lg sm:text-xl font-bold text-foreground">${activeStage.hardCapUsd.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Rate</p>
                  <p className="text-lg sm:text-xl font-bold text-acid-lime">${activeStage.priceUsd} / BRX</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 3. Transactions Table (Full Width) */}
        <section className="quantum-panel rounded-[24px] sm:rounded-[32px] overflow-hidden border-white/5 bg-surface/30">
          <div className="p-6 sm:p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-lg sm:text-xl font-bold text-foreground w-full md:w-auto">Recent Activity</h2>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search transaction..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-acid-lime/30 transition-all placeholder:text-muted-foreground/40"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide">
            {filteredTransactions.length === 0 ? (
              <div className="p-12 text-center text-sm text-muted-foreground">
                No recorded transaction hashes found. Join the presale on the Home page to get started!
              </div>
            ) : (
              <table className="w-full text-left min-w-[600px] lg:min-w-full">
                <thead className="bg-white/[0.01] text-[10px] uppercase tracking-widest text-muted-foreground font-bold border-b border-white/5">
                  <tr>
                    <th className="px-6 sm:px-10 py-5">Hash</th>
                    <th className="px-6 py-5">Network</th>
                    <th className="px-6 py-5 text-right">Paid</th>
                    <th className="px-6 py-5 text-right">Received</th>
                    <th className="px-6 sm:px-10 py-5 text-center">Status</th>
                    <th className="px-6 py-5 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredTransactions.map((tx, i) => (
                    <tr key={i} className="group hover:bg-white/[0.015] transition-colors">
                      <td 
                        onClick={() => window.open(tx.network.includes("Ethereum") ? `https://etherscan.io/tx/${tx.fullHash}` : `https://bscscan.com/tx/${tx.fullHash}`, "_blank")}
                        className="px-6 sm:px-10 py-6 font-mono text-xs text-muted-foreground group-hover:text-acid-lime transition-colors cursor-pointer"
                      >
                        {tx.hash}
                      </td>
                      <td className="px-6 py-6 text-sm font-medium text-foreground/80">{tx.network}</td>
                      <td className="px-6 py-6 text-sm text-right">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground">{tx.paid}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{tx.token}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-sm font-bold text-foreground text-right">{tx.received}</td>
                      <td className="px-6 sm:px-10 py-6 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                          tx.status === 'Confirmed' || tx.status === 'Success' ? 'bg-emerald-500/5 text-emerald-500 border border-emerald-500/10' :
                          tx.status === 'Pending' ? 'bg-yellow-500/5 text-yellow-500 border border-yellow-500/10' :
                          'bg-red-500/5 text-red-500 border border-red-500/10'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-sm text-muted-foreground text-right">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
