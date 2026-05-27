"use client";

import { 
  Wallet, 
  Globe, 
  Cpu, 
  Save, 
  Plus,
  Trash2,
  Copy,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsTab() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Page Title for Mobile */}
      <div className="lg:hidden mb-6">
        <h2 className="text-2xl font-bold text-foreground">Platform Configuration</h2>
        <p className="text-sm text-muted-foreground">Manage your company wallets and supported networks.</p>
      </div>

      {/* Company Wallets Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-acid-lime/10 text-acid-lime shadow-[0_0_15px_rgba(204,255,0,0.1)]">
              <Wallet size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Company Wallets</h3>
              <p className="text-xs text-muted-foreground">Addresses where presale funds are routed.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-foreground hover:bg-white/10 transition-all">
            <Plus size={14} />
            <span className="hidden sm:inline">Add Wallet</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { id: 'treasury', label: "Treasury Wallet", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", desc: "Main storage for USDT/ETH funds" },
            { id: 'marketing', label: "Marketing Fund", address: "0x250F29d8EC2ab88b098defB751B7401B5f6d8976F", desc: "Allocated for referral rewards" },
          ].map((wallet) => (
            <div key={wallet.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/50 p-5 backdrop-blur-xl transition-all hover:border-acid-lime/30">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-acid-lime mb-1">{wallet.label}</p>
                    <p className="text-xs text-muted-foreground">{wallet.desc}</p>
                  </div>
                  <button 
                    onClick={() => handleCopy(wallet.address, wallet.id)}
                    className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-acid-lime transition-colors"
                  >
                    {copied === wallet.id ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                
                <div className="relative">
                  <div className="rounded-xl bg-black/40 border border-white/5 p-3 font-mono text-[11px] text-foreground break-all">
                    {wallet.address}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                  <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Edit</button>
                  <span className="text-white/10">|</span>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-rose-500/70 hover:text-rose-400 transition-colors">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Networks & Tokens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Supported Chains */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
              <Globe size={20} />
            </div>
            <h3 className="text-lg font-bold text-foreground">Active Chains</h3>
          </div>
          
          <div className="rounded-2xl border border-white/10 bg-surface/50 overflow-hidden backdrop-blur-xl">
            <div className="divide-y divide-white/5">
              {[
                { name: "Ethereum Mainnet", status: "Active", icon: "ETH" },
                { name: "BNB Smart Chain", status: "Active", icon: "BSC" },
              ].map((chain, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                      {chain.icon}
                    </div>
                    <span className={`text-sm font-medium ${chain.status === 'Active' ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {chain.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${chain.status === 'Active' ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                      {chain.status}
                    </span>
                    <div className={`h-2 w-2 rounded-full ${chain.status === 'Active' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-white/10'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Tokens */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10 text-purple-400">
              <Cpu size={20} />
            </div>
            <h3 className="text-lg font-bold text-foreground">Accepted Tokens</h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-surface/50 overflow-hidden backdrop-blur-xl">
            <div className="divide-y divide-white/5">
              {[
                { name: "USDT", type: "Stablecoin", status: "Enabled" },
                { name: "ETH", type: "Native", status: "Enabled" },
                { name: "BNB", type: "Native", status: "Enabled" },
              ].map((token, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                  <div>
                    <p className={`text-sm font-bold ${token.status === 'Enabled' ? 'text-foreground' : 'text-muted-foreground'}`}>{token.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{token.type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${token.status === 'Enabled' ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                      {token.status}
                    </span>
                    <div className={`h-2 w-2 rounded-full ${token.status === 'Enabled' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-white/10'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Global Actions */}
      <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p className="text-xs text-muted-foreground max-w-sm text-center sm:text-left">
          Changes to these settings will affect the live presale environment. Please double-check wallet addresses.
        </p>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-acid-lime px-8 py-4 text-sm font-bold text-black shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Save size={18} />
          Save Platform Changes
        </button>
      </div>
    </div>
  );
}
