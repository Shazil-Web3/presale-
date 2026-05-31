"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Pause, 
  Edit3, 
  Trash2, 
  Layers,
  Zap,
  RefreshCw,
  Play
} from "lucide-react";

const DynamicAmount = ({ amount, className }) => {
  const length = amount.length;
  let scaleStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    width: '100%'
  };
  
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
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stages", {
        headers: {
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_STAGE_API_KEY
        }
      });
      const data = await res.json();
      if (data.ok) {
        setStages(data.stages);
      }
    } catch (err) {
      console.error("Failed to fetch presale stages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStage = async (stageId, currentlyActive) => {
    try {
      const res = await fetch("/api/admin/stages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_STAGE_API_KEY
        },
        body: JSON.stringify({
          stageId,
          isActive: !currentlyActive
        })
      });
      const resData = await res.json();
      if (resData.ok) {
        fetchStages();
      }
    } catch (err) {
      console.error("Failed to toggle stage status:", err);
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
        <RefreshCw className="h-8 w-8 text-acid-lime animate-spin" />
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Querying Phase Ledger...</span>
      </div>
    );
  }

  const activeStage = stages.find((st) => st.status === "Active") || {
    name: "No Active Stage",
    price: "$0.0000",
    hardCap: "$0.00",
    raised: "$0.00",
    progress: 0
  };

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-foreground">Sale Phases</h3>
          <p className="text-sm text-muted-foreground">Manage ICO stages and token pricing.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchStages}
            className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-bold text-foreground hover:bg-white/10 transition-all"
          >
            <RefreshCw size={18} />
            Reload
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
            <h2 className="text-3xl font-black text-foreground">{activeStage.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Price</p>
                <p className="text-xl font-bold text-foreground">{activeStage.price}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hard Cap</p>
                <DynamicAmount amount={activeStage.hardCap} className="text-xl font-bold text-foreground" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-foreground">Progress</span>
                <div className="flex-1 text-right ml-2">
                  <DynamicAmount amount={`${activeStage.raised} raised`} className="text-acid-lime" />
                </div>
              </div>
              <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${activeStage.progress}%` }}
                  className="h-full bg-acid-lime"
                />
              </div>
            </div>
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
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Raised</span>
                <span className="text-foreground font-bold">{stage.raised} ({stage.progress}%)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleToggleStage(stage.id, stage.status === "Active")}
                className={`flex-1 rounded-lg py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  stage.status === "Active" 
                    ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20" 
                    : "bg-acid-lime text-black hover:opacity-90 shadow-[0_0_10px_rgba(204,255,0,0.1)]"
                }`}
              >
                {stage.status === "Active" ? "Pause" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
