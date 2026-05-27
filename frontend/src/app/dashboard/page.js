"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import BorderGlow from "@/components/ui/BorderGlow";
import { 
  TrendingUp, 
  Coins, 
  Flame, 
  Users, 
  ExternalLink, 
  Search, 
  Copy, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  AlertCircle,
  Info
} from "lucide-react";

// --- Mock Data ---
const portfolioStats = [
  { title: "Total Invested", value: "$5,250", subtext: "Across all supported networks", icon: TrendingUp, color: "rgba(204, 255, 0, 0.4)", glow: "72 100 50" },
  { title: "BRX Allocation", value: "1,050,000 BRX", subtext: "Current estimated allocation", icon: Coins, color: "rgba(0, 255, 135, 0.4)", glow: "152 100 50" },
  { title: "Current Sale Stage", value: "Phase 1 — Private Sale", subtext: "1 BRX = $0.005", icon: Flame, color: "rgba(168, 85, 247, 0.4)", glow: "270 95 75" },
  { title: "Referral Rewards", value: "15,000 BRX", subtext: "Estimated referral incentives", icon: Users, color: "rgba(204, 255, 0, 0.4)", glow: "72 100 50" },
];

const transactions = [
  { hash: "0x91A...D2C1", network: "BNB Smart Chain", token: "USDT", paid: "$500", received: "100,000 BRX", status: "Confirmed", date: "May 25, 2026" },
];

// --- Sub-components ---

const StatCard = ({ item }) => (
  <BorderGlow 
    className="h-full" 
    glowColor={item.glow}
    backgroundColor="rgba(20, 20, 26, 0.6)"
    colors={[item.color, "rgba(255, 255, 255, 0.1)"]}
  >
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
          <item.icon className="h-5 w-5 text-acid-lime" />
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{item.title}</p>
        <h3 className="text-2xl font-bold text-foreground mt-1">{item.value}</h3>
        <p className="text-[10px] text-muted-foreground/60 mt-2 uppercase tracking-wider">{item.subtext}</p>
      </div>
    </div>
  </BorderGlow>
);

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DashboardLayout 
      title="Investor Dashboard" 
      subtitle="Monitor your BRX allocations and presale activity."
    >
      <div className="space-y-8 lg:space-y-16">
        {/* 1. Portfolio Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {portfolioStats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <StatCard item={stat} />
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
                  {/* Decorative static border with subtle hover effect */}
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
                    <circle
                      cx={64}
                      cy={64}
                      r={56}
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      className="text-white/5 sm:hidden"
                    />
                    <circle
                      cx={80}
                      cy={80}
                      r={70}
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-white/5 hidden sm:block"
                    />
                    
                    {/* Progress Ring */}
                    <motion.circle
                      cx={64}
                      cy={64}
                      r={56}
                      stroke="url(#chartGradient)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      strokeDasharray="352"
                      initial={{ strokeDashoffset: 352 }}
                      animate={{ strokeDashoffset: 352 * 0.25 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="drop-shadow-[0_0_8px_rgba(204,255,0,0.3)] sm:hidden"
                    />
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
                      animate={{ strokeDashoffset: 440 * 0.25 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="drop-shadow-[0_0_8px_rgba(204,255,0,0.3)] hidden sm:block"
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold mb-1">Status</span>
                      <span className="text-white font-bold text-2xl sm:text-3xl tracking-tighter">75<span className="text-acid-lime text-lg sm:text-xl">%</span></span>
                    </motion.div>
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center md:justify-start">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">1,050,000 BRX</h2>
                    <span className="px-3 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-widest">
                      Pending
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                    Your allocation is verified. Distribution will follow the announced schedule.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-8 pt-6 border-t border-white/5 justify-center md:justify-start">
                {[
                  { label: "Allocation Confirmed", status: "done" },
                  { label: "Wallet Verified", status: "done" },
                  { label: "Distribution Pending", status: "waiting" }
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
                <p className="text-xs text-muted-foreground">Phase 1 — Private Sale Active</p>
              </div>
              <div className="text-left sm:text-right space-y-1">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Time Left</div>
                <div className="text-base sm:text-lg font-mono font-bold text-acid-lime tracking-tight">05D : 11H : 42M</div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                  <span className="text-muted-foreground">Raised: <span className="text-foreground">$2.5M</span></span>
                  <span className="text-muted-foreground">Target: <span className="text-foreground">$10M</span></span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/5 border border-white/10 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-acid-lime to-liquidity-emerald shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Remaining</p>
                  <p className="text-lg sm:text-xl font-bold text-foreground">24.5M BRX</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Price</p>
                  <p className="text-lg sm:text-xl font-bold text-acid-lime">$0.005</p>
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
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-acid-lime/30 transition-all placeholder:text-muted-foreground/40"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left min-w-[600px] lg:min-w-full">
              <thead className="bg-white/[0.01] text-[10px] uppercase tracking-widest text-muted-foreground font-bold border-b border-white/5">
                <tr>
                  <th className="px-6 sm:px-10 py-5">Hash</th>
                  <th className="px-6 py-5">Network</th>
                  <th className="px-6 py-5 text-right">Paid</th>
                  <th className="px-6 py-5 text-right">Received</th>
                  <th className="px-6 sm:px-10 py-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx, i) => (
                  <tr key={i} className="group hover:bg-white/[0.015] transition-colors">
                    <td className="px-6 sm:px-10 py-6 font-mono text-xs text-muted-foreground group-hover:text-acid-lime transition-colors cursor-pointer">{tx.hash}</td>
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
                        tx.status === 'Confirmed' ? 'bg-emerald-500/5 text-emerald-500 border border-emerald-500/10' :
                        tx.status === 'Pending' ? 'bg-yellow-500/5 text-yellow-500 border border-yellow-500/10' :
                        'bg-red-500/5 text-red-500 border border-red-500/10'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 sm:p-6 bg-white/[0.005] border-t border-white/5 text-center">
            <button className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-acid-lime transition-colors">View All Activity</button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
