"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Layers, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  ShieldCheck
} from "lucide-react";

const stats = [
  { 
    label: "Total Raised", 
    value: "$4,285,910", 
    change: "+12.5%", 
    isPositive: true, 
    icon: Wallet,
    color: "text-acid-lime"
  },
  { 
    label: "Total Investors", 
    value: "12,842", 
    change: "+8.2%", 
    isPositive: true, 
    icon: Users,
    color: "text-blue-400"
  },
  { 
    label: "Current Sale Stage", 
    value: "ICO Phase 1", 
    change: "Active", 
    isPositive: true, 
    icon: Layers,
    color: "text-purple-400"
  },
  { 
    label: "Pending Allocations", 
    value: "452", 
    change: "-2.4%", 
    isPositive: false, 
    icon: Clock,
    color: "text-orange-400"
  },
];

const recentActivity = [
  { id: 1, type: "purchase", user: "0x71...3a2b", amount: "5,000 BRX", time: "2 mins ago", status: "Success" },
  { id: 2, type: "referral", user: "0x42...9e1f", amount: "250 BRX", time: "15 mins ago", status: "Pending" },
  { id: 3, type: "purchase", user: "0x9a...bc42", amount: "12,500 BRX", time: "42 mins ago", status: "Success" },
  { id: 4, type: "kyc", user: "0x12...de34", amount: "Verified", time: "1 hour ago", status: "Completed" },
];

export default function DashboardTab() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/50 p-5 backdrop-blur-xl transition-all hover:border-acid-lime/30"
          >
            <div className="flex items-start justify-between">
              <div className={`rounded-xl bg-white/5 p-2.5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            </div>
            
            {/* Background Glow */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-acid-lime/5 blur-2xl transition-all group-hover:bg-acid-lime/10" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="col-span-1 lg:col-span-2 rounded-2xl border border-white/10 bg-surface/50 p-6 backdrop-blur-xl">
          <h3 className="mb-6 text-lg font-bold text-foreground">Recent Transactions</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    activity.type === 'purchase' ? 'bg-emerald-400/10 text-emerald-400' : 
                    activity.type === 'referral' ? 'bg-blue-400/10 text-blue-400' : 
                    'bg-purple-400/10 text-purple-400'
                  }`}>
                    {activity.type === 'purchase' ? <TrendingUp size={18} /> : 
                     activity.type === 'referral' ? <Users size={18} /> : 
                     <ShieldCheck size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} • {activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{activity.amount}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${
                    activity.status === 'Success' || activity.status === 'Completed' ? 'text-emerald-400' : 'text-acid-lime'
                  }`}>
                    {activity.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full rounded-xl border border-white/5 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all hover:bg-white/5 hover:text-foreground">
            View All Transactions
          </button>
        </div>

        {/* Allocation Summary */}
        <div className="rounded-2xl border border-white/10 bg-surface/50 p-6 backdrop-blur-xl">
          <h3 className="mb-6 text-lg font-bold text-foreground">Allocation Summary</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Distribution Progress</span>
                <span className="font-bold text-acid-lime">48.2%</span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "48.2%" }}
                  className="h-full bg-gradient-to-r from-acid-lime to-liquidity-emerald"
                />
              </div>
              <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
                <span>412.5M BRX Sent</span>
                <span>857.2M Total</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Pending Claims</span>
                <span className="text-sm font-bold text-foreground">124.7M BRX</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Locked Tokens</span>
                <span className="text-sm font-bold text-foreground">320.0M BRX</span>
              </div>
            </div>

            <button className="w-full rounded-xl bg-acid-lime py-3 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(204,255,0,0.2)] transition-all hover:opacity-90">
              Manage Allocations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
