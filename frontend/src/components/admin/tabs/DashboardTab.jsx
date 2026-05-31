"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Layers, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  ShieldCheck,
  RefreshCw
} from "lucide-react";

export default function DashboardTab() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stats", {
        headers: {
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_STAGE_API_KEY
        }
      });
      const resData = await res.json();
      if (resData.ok) {
        setData(resData);
      }
    } catch (err) {
      console.error("Failed to load admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
        <RefreshCw className="h-8 w-8 text-acid-lime animate-spin" />
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Loading Admin Statistics...</span>
      </div>
    );
  }

  const stats = [
    { 
      label: "Total Raised", 
      value: data.stats.totalRaised, 
      change: "+12.5%", 
      isPositive: true, 
      icon: Wallet,
      color: "text-acid-lime"
    },
    { 
      label: "Total Investors", 
      value: data.stats.totalInvestors, 
      change: "+8.2%", 
      isPositive: true, 
      icon: Users,
      color: "text-blue-400"
    },
    { 
      label: "Current Sale Stage", 
      value: data.stats.currentStage, 
      change: "Active", 
      isPositive: true, 
      icon: Layers,
      color: "text-purple-400"
    },
    { 
      label: "Pending Allocations", 
      value: data.stats.pendingAllocations, 
      change: "Sync Completed", 
      isPositive: true, 
      icon: Clock,
      color: "text-orange-400"
    },
  ];

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
              <div className={`flex items-center gap-1 text-[10px] font-bold uppercase ${stat.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
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
            {data.recentActivity.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">No recent activity detected.</div>
            ) : (
              data.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">Purchase • {activity.time}</p>
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
              ))
            )}
          </div>
        </div>

        {/* Allocation Summary */}
        <div className="rounded-2xl border border-white/10 bg-surface/50 p-6 backdrop-blur-xl">
          <h3 className="mb-6 text-lg font-bold text-foreground">Allocation Summary</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Distribution Progress</span>
                <span className="font-bold text-acid-lime">{data.distribution.progressPercent}%</span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${data.distribution.progressPercent}%` }}
                  className="h-full bg-gradient-to-r from-acid-lime to-liquidity-emerald"
                />
              </div>
              <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
                <span>{data.distribution.totalDistributed} Sent</span>
                <span>{data.distribution.totalSupply} Total</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Pending Claims</span>
                <span className="text-sm font-bold text-foreground">{data.distribution.totalClaimable}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Locked Tokens</span>
                <span className="text-sm font-bold text-foreground">{data.distribution.lockedTokens}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
