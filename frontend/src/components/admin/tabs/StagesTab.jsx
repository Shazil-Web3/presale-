"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  Pause, 
  Edit3, 
  Trash2, 
  Layers,
  Zap,
  Clock
} from "lucide-react";

const stages = [
  { 
    id: 1, 
    name: "Private Sale", 
    price: "$0.002", 
    hardCap: "$1,000,000", 
    raised: "$1,000,000", 
    progress: 100, 
    status: "Completed",
    date: "Jan 01 - Jan 31"
  },
  { 
    id: 2, 
    name: "ICO Phase 1", 
    price: "$0.005", 
    hardCap: "$6,000,000", 
    raised: "$4,285,910", 
    progress: 71.4, 
    status: "Active",
    date: "Feb 01 - Jun 30"
  },
  { 
    id: 3, 
    name: "ICO Phase 2", 
    price: "$0.008", 
    hardCap: "$10,000,000", 
    raised: "$0", 
    progress: 0, 
    status: "Upcoming",
    date: "Jul 01 - Oct 31"
  },
];

const DynamicAmount = ({ amount, className }) => {
  const length = amount.length;
  let scaleStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    width: '100%'
  };
  
  // More aggressive scaling for very long numbers
  if (length > 18) {
    scaleStyle.fontSize = '0.55em';
  } else if (length > 15) {
    scaleStyle.fontSize = '0.65em';
  } else if (length > 12) {
    scaleStyle.fontSize = '0.75em';
  } else if (length > 10) {
    scaleStyle.fontSize = '0.85em';
  }

  return (
    <span className={className} style={scaleStyle}>
      {amount}
    </span>
  );
};

export default function StagesTab() {
  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">Sale Phases</h3>
          <p className="text-sm text-muted-foreground">Manage ICO stages and token pricing.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-sm font-bold text-rose-400 hover:bg-rose-500/20 transition-all">
            <Pause size={18} />
            Stop Sale
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-acid-lime px-4 py-2.5 text-sm font-bold text-black shadow-[0_0_15px_rgba(204,255,0,0.2)] transition-all hover:opacity-90">
            <Plus size={18} />
            Add Stage
          </button>
        </div>
      </div>

      {/* Active Stage Overview */}
      <div className="rounded-3xl border border-acid-lime/20 bg-acid-lime/5 p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-acid-lime animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-acid-lime">Active Stage</span>
            </div>
            <h2 className="text-3xl font-black text-foreground">ICO Phase 1</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Price</p>
                <p className="text-xl font-bold text-foreground">$0.005</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hard Cap</p>
                <DynamicAmount amount="$6,000,000" className="text-xl font-bold text-foreground" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-foreground">Progress</span>
                <div className="flex-1 text-right ml-2">
                  <DynamicAmount amount="$4,285,910 raised" className="text-acid-lime" />
                </div>
              </div>
              <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "71.4%" }}
                  className="h-full bg-acid-lime"
                />
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-xs font-bold uppercase tracking-widest text-foreground hover:bg-white/20 transition-all">
              <Edit3 size={16} />
              Edit Active Stage
            </button>
          </div>
        </div>
        <Zap className="absolute -bottom-8 -right-8 h-48 w-48 text-acid-lime/5 rotate-12 pointer-events-none" />
      </div>

      {/* Stages Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage.id} className={`rounded-2xl border ${stage.status === 'Active' ? 'border-acid-lime/30 bg-acid-lime/5' : 'border-white/10 bg-surface/50'} p-6`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-2 rounded-xl ${stage.status === 'Active' ? 'bg-acid-lime/10 text-acid-lime' : 'bg-white/5 text-muted-foreground'}`}>
                <Layers size={20} />
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                stage.status === 'Active' ? 'bg-acid-lime/10 text-acid-lime' : 'bg-white/5 text-muted-foreground'
              }`}>
                {stage.status}
              </span>
            </div>
            <h4 className="text-lg font-bold text-foreground mb-4">{stage.name}</h4>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Price</span>
                <span className="text-foreground font-bold">{stage.price}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Hard Cap</span>
                <div className="flex-1 text-right ml-4">
                  <DynamicAmount amount={stage.hardCap} className="text-foreground font-bold" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 rounded-lg bg-white/5 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-white/10">Edit</button>
              <button className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
