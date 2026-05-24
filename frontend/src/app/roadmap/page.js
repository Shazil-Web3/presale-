"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Shield,
  Zap,
  Layout,
  Cpu,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  Rocket,
  Layers,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import GlareHover from "@/components/ui/GlareHover";
import BorderGlow from "@/components/ui/BorderGlow";
import InteractiveOrb from "@/components/ui/InteractiveOrb";
import ShapeGrid from "@/components/ui/ShapeGrid";

const Grainient = dynamic(() => import("@/components/ui/Grainient"), {
  ssr: false,
});

function SectionHeader({ tag, title, description, centered = false }) {
  return (
    <div className={`mb-12 ${centered ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}>
      <div className="text-xs tracking-[0.3em] text-[color:var(--acid-lime)] uppercase font-semibold">
        {tag}
      </div>
      <h2 className="font-display mt-4 text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

function RoadmapHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden px-6 flex items-center pt-32 pb-20">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="quantum-grid absolute inset-0" />
        <ShapeGrid 
          speed={0.5} 
          squareSize={40} 
          direction='diagonal' 
          borderColor="#3dac88" 
          hoverFillColor='#9bff00' 
          shape='square' 
          hoverTrailAmount={0} 
        />
      </div>

      <div className="relative mx-auto max-w-7xl w-full text-center">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-foreground/80 mb-8">
              <Clock className="h-3.5 w-3.5 text-acid-lime" />
              Strategic Rollout
            </div>

            <h1 className="font-display text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-8xl">
              Roadmap & <span className="text-[color:var(--acid-lime)]">Ecosystem</span> Expansion
            </h1>

            <p className="mt-8 mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              A phased development approach designed to scale the BitRaxx ecosystem across infrastructure, investor accessibility, and future blockchain utilities.
            </p>
        </motion.div>
      </div>
    </section>
  );
}

function RoadmapTimeline() {
    const phases = [
        {
            phase: "Phase 1",
            title: "Private Sale Launch",
            desc: "Initial BRX token presale activation and investor onboarding.",
            status: "active"
        },
        {
            phase: "Phase 2",
            title: "Public Sale Expansion",
            desc: "Expansion of token participation across broader investor audiences.",
            status: "pending"
        },
        {
            phase: "Phase 3",
            title: "Platform Infrastructure Scaling",
            desc: "Backend scalability upgrades, dashboard expansion, and ecosystem growth.",
            status: "pending"
        },
        {
            phase: "Phase 4",
            title: "Future Ecosystem Utilities",
            desc: "Future launchpad systems, staking utilities, and expanded blockchain integrations.",
            status: "pending"
        }
    ];

    return (
        <section className="relative px-6 py-24 overflow-hidden">
            <InteractiveOrb 
                className="top-1/4 -left-48"
                color="rgba(168,85,247,0.3)"
                size="45rem"
                opacity={0.9}
            />
            <InteractiveOrb 
                className="bottom-1/4 -right-48"
                color="rgba(204,255,0,0.3)"
                size="40rem"
                opacity={0.9}
            />
            <div className="mx-auto max-w-5xl relative z-10">
                <SectionHeader 
                    centered
                    tag="Timeline"
                    title="Strategic Milestones"
                />

                <div className="mt-16 space-y-8 relative">
                    {/* Vertical line */}
                    <div className="absolute left-[21px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

                    {phases.map((p, i) => (
                        <motion.div 
                            key={p.phase}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                            {/* Circle indicator */}
                            <div className="absolute left-0 md:left-1/2 top-0 h-10 w-10 rounded-full border border-white/20 bg-background flex items-center justify-center -translate-x-1/2 z-10">
                                <div className={`h-3 w-3 rounded-full ${p.status === 'active' ? 'bg-acid-lime shadow-[0_0_10px_#ccff00]' : 'bg-white/10'}`} />
                            </div>

                            <div className="flex-1 ml-12 md:ml-0">
                                <div className={`glass p-8 rounded-3xl border border-white/5 relative group hover:border-acid-lime/20 transition-colors ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                                    <div className="text-xs font-bold text-acid-lime uppercase tracking-widest mb-2">{p.phase}</div>
                                    <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                                </div>
                            </div>
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SaleStages() {
    const stages = [
        { name: "Private Sale", price: "$0.005", tag: "Current" },
        { name: "ICO Phase 1", price: "$0.015", tag: "Upcoming" },
        { name: "Exchange Expansion", price: "$0.05", tag: "Target" },
    ];

    return (
        <section className="relative px-6 py-24 bg-white/[0.02] overflow-hidden">
            <InteractiveOrb 
                className="top-0 -left-48"
                color="rgba(168,85,247,0.3)"
                size="35rem"
                opacity={0.8}
            />
            <InteractiveOrb 
                className="bottom-0 -right-48"
                color="rgba(0,255,135,0.35)"
                size="40rem"
                opacity={0.9}
            />
            <div className="mx-auto max-w-7xl relative z-10">
                <SectionHeader 
                    tag="Participation"
                    title="Sale Stages"
                />

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {stages.map((s, i) => (
                        <BorderGlow key={s.name} borderRadius={24} glowIntensity={s.tag === 'Current' ? 3 : 1}>
                            <GlareHover borderRadius="1.5rem">
                                <div className="glass p-8 h-full flex flex-col items-center text-center gap-4">
                                    <div className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest ${s.tag === 'Current' ? 'bg-acid-lime text-black' : 'bg-white/5 text-muted-foreground'}`}>
                                        {s.tag}
                                    </div>
                                    <h3 className="text-xl font-bold text-muted-foreground">{s.name}</h3>
                                    <div className={`text-4xl font-bold ${s.tag === 'Current' ? 'text-white' : 'text-white/40'}`}>
                                        {s.price}
                                    </div>
                                </div>
                            </GlareHover>
                        </BorderGlow>
                    ))}
                </div>
            </div>
        </section>
    );
}

import TokenomicsChart from "@/components/ui/TokenomicsChart";

function Tokenomics() {
    const slices = [
      { label: "Ecosystem & Core Rewards", value: 25, color: "#CCFF00" },
      { label: "Automated Staking Pools", value: 20, color: "#00FF87" },
      { label: "ICO Phases", value: 15, color: "#A6E000" },
      { label: "Core Team & Advisors", value: 15, color: "#22C97A" },
      { label: "Protocol Strategic Reserve", value: 10, color: "#7BFFB8" },
      { label: "Initial Private Sale Track", value: 10, color: "#E6FF66" },
      { label: "Marketing & Global Growth", value: 5, color: "#3F3F46" },
    ];

    return (
        <section className="relative px-6 py-24 overflow-hidden">
             <InteractiveOrb 
                className="top-0 -right-48"
                color="rgba(168,85,247,0.3)"
                size="35rem"
                opacity={0.8}
            />
             <InteractiveOrb 
                className="-bottom-32 -left-48"
                color="rgba(0,255,135,0.35)"
                size="40rem"
                opacity={0.9}
            />
            
            <div className="mx-auto max-w-7xl relative z-10">
                <div className="mb-16">
                    <SectionHeader 
                        tag="Economics"
                        title="Tokenomics Structure"
                        description="A balanced distribution model designed for sustainable ecosystem growth, long-term incentive alignment, and robust liquidity depth."
                    />
                </div>

                <TokenomicsChart slices={slices} />
            </div>
        </section>
    );
}

function TokenUtility() {
    const utility = [
        { title: "Ecosystem Participation", desc: "Unlock premium features and access within the BitRaxx trading platform.", icon: Layers },
        { title: "Future Staking Access", desc: "Participate in staking pools to earn rewards and support network security.", icon: Shield },
        { title: "Launchpad Participation", desc: "Gain priority access to future token launches and ecosystem projects.", icon: Rocket },
        { title: "Community Incentives", desc: "Earn rewards for community contributions, referrals, and governance participation.", icon: Zap },
    ];

    return (
        <section className="relative px-6 py-24 overflow-hidden">
            <InteractiveOrb 
                className="bottom-0 -right-48"
                color="rgba(0,255,135,0.35)"
                size="35rem"
                opacity={0.9}
            />
            <div className="mx-auto max-w-7xl relative z-10">
                <SectionHeader 
                    tag="Utility"
                    title="BRX Token Utility"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {utility.map((u, i) => (
                        <GlareHover key={u.title} borderRadius="1.5rem">
                            <div className="glass p-8 h-full flex flex-col gap-4 border border-white/5 hover:border-acid-lime/20 transition-colors">
                                <div className="h-12 w-12 rounded-xl bg-acid-lime/10 border border-acid-lime/20 flex items-center justify-center">
                                    <u.icon className="h-6 w-6 text-acid-lime" />
                                </div>
                                <h3 className="text-xl font-bold">{u.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {u.desc}
                                </p>
                            </div>
                        </GlareHover>
                    ))}
                </div>
            </div>
        </section>
    );
}

function AllocationBreakdown() {
    const allocations = [
        { label: "Public Sale (ICO)", percent: 15, amount: "30M BRX", vesting: "10% TGE, 6 months linear" },
        { label: "Staking Rewards", percent: 20, amount: "40M BRX", vesting: "48 months release" },
        { label: "Team & Advisors", percent: 15, amount: "30M BRX", vesting: "12 months cliff, 24 months linear" },
        { label: "Ecosystem Fund", percent: 25, amount: "50M BRX", vesting: "36 months linear" },
    ];

    return (
        <section className="relative px-6 py-24 bg-white/[0.02] overflow-hidden">
            <div className="mx-auto max-w-7xl relative z-10">
                <SectionHeader 
                    tag="Details"
                    title="Allocation Breakdown"
                />

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    {allocations.map((a, i) => (
                        <div key={a.label} className="glass p-8 rounded-3xl border border-white/5 flex flex-col gap-6">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">{a.label}</h3>
                                    <div className="text-acid-lime font-mono text-lg">{a.amount}</div>
                                </div>
                                <div className="text-4xl font-bold text-white/20">{a.percent}%</div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${a.percent}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="h-full bg-gradient-to-r from-acid-lime to-liquidity-emerald"
                                    />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
                                    <Clock className="h-3 w-3" />
                                    {a.vesting}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FutureEcosystem() {
    return (
        <section className="relative px-6 py-24 overflow-hidden">
              <InteractiveOrb 
                 className="top-0 -left-48"
                 color="rgba(0,255,135,0.3)"
                 size="40rem"
                 opacity={0.8}
             />
              <InteractiveOrb 
                 className="bottom-0 -right-48"
                 color="rgba(168,85,247,0.3)"
                 size="35rem"
                 opacity={0.8}
             />
             <div className="absolute inset-0 z-0">
                <Grainient color1="#08080a" color2="#14141a" color3="#8b5cf6" opacity={0.2} />
             </div>

             <div className="mx-auto max-w-7xl relative z-10">
                <div className="glass p-12 md:p-20 rounded-[3rem] border border-white/10 flex flex-col items-center text-center">
                    <SectionHeader 
                        centered
                        tag="Vision"
                        title="Building Beyond The Presale"
                        description="The BitRaxx roadmap is focused on sustainable ecosystem growth, scalable blockchain infrastructure, and long-term platform expansion."
                    />
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                         {[
                            { icon: Target, label: "Scalability" },
                            { icon: Shield, label: "Security" },
                            { icon: TrendingUp, label: "Growth" },
                            { icon: Rocket, label: "Innovation" },
                         ].map((item) => (
                            <div key={item.label} className="flex flex-col items-center gap-3">
                                <div className="h-14 w-14 rounded-full glass border border-white/10 flex items-center justify-center text-acid-lime">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <span className="text-sm font-semibold uppercase tracking-wider">{item.label}</span>
                            </div>
                         ))}
                    </div>
                </div>
             </div>
        </section>
    );
}

function WhitepaperCTA() {
    return (
        <section className="relative px-6 py-24 overflow-hidden">
            <InteractiveOrb 
                className="top-0 -right-48"
                color="rgba(168,85,247,0.3)"
                size="35rem"
                opacity={0.8}
            />
            <InteractiveOrb 
                className="top-1/2 -left-48 -translate-y-1/2"
                color="rgba(0,255,135,0.35)"
                size="40rem"
                opacity={0.9}
            />
            <div className="mx-auto max-w-3xl text-center relative z-10">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-acid-lime/10 border border-acid-lime/20 mb-8">
                    <FileText className="h-10 w-10 text-acid-lime" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Explore Full Project Documentation</h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                    Dive deep into our technical architecture, tokenomics model, and ecosystem strategy through the official BitRaxx whitepaper.
                </p>
                <button className="btn-gradient rounded-xl px-10 py-5 font-bold text-lg flex items-center gap-3 mx-auto shadow-[0_0_30px_rgba(204,255,0,0.2)]">
                    Download Whitepaper <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </section>
    );
}

export default function RoadmapPage() {
  return (
    <div className="relative w-full">
      <RoadmapHero />
      <RoadmapTimeline />
      <SaleStages />
      <Tokenomics />
      <TokenUtility />
      <AllocationBreakdown />
      <FutureEcosystem />
      <WhitepaperCTA />
    </div>
  );
}
