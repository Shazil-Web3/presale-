"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Shield,
  Wallet,
  Globe,
  Lock,
  Zap,
  Layout,
  Cpu,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Layers,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Custom SVG Icons to avoid library instantiation issues in Turbopack
const IconTelegram = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
    </svg>
);

const IconTwitter = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
);

const IconGithub = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const IconInstagram = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

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

function AboutHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden px-6 flex items-center pt-32 pb-20 text-center">
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

      <div className="relative mx-auto max-w-5xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-foreground/80 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-acid-lime animate-pulse" />
            BitRaxx Ecosystem
          </div>

          <h1 className="font-display text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-8xl">
            Building Secure Infrastructure For The <span className="text-[color:var(--acid-lime)]">Next Era</span> Of Digital Assets
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            BitRaxx is a security-focused digital asset ecosystem designed to simplify multi-chain trading, token participation, and investor accessibility through scalable blockchain infrastructure.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard" className="btn-gradient inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold shadow-[0_0_20px_rgba(204,255,0,0.3)]">
              Explore Ecosystem <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="glass inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold transition-colors hover:bg-white/10">
              <FileText className="h-4 w-4" /> Whitepaper
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutBitRaxx() {
    const cards = [
        { title: "Multi-Chain Ready", icon: Globe },
        { title: "Secure Payments", icon: Lock },
        { title: "Investor Tracking", icon: Search },
        { title: "Scalable Infrastructure", icon: Cpu },
    ];

    return (
        <section className="relative px-6 py-24 overflow-hidden">
            <InteractiveOrb 
                className="-top-24 -left-48"
                color="rgba(0,255,135,0.25)"
                size="45rem"
                opacity={0.8}
            />
            
            <div className="mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <SectionHeader 
                            tag="Identity & Mission"
                            title="What Is BitRaxx?"
                            description="BitRaxx is a modern blockchain ecosystem focused on creating a safer and more scalable digital asset experience through multi-chain accessibility, intelligent infrastructure, and institutional-grade platform architecture."
                        />
                        <div className="mt-8 space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                Our mission is to bridge the gap between complex blockchain protocols and end-user accessibility, providing a hardened environment for digital asset participation.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {cards.map((card, i) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <GlareHover borderRadius="1.5rem">
                                    <div className="glass p-6 h-40 flex flex-col items-center justify-center text-center gap-4">
                                        <card.icon className="h-8 w-8 text-acid-lime" />
                                        <span className="font-semibold text-sm uppercase tracking-wider">{card.title}</span>
                                    </div>
                                </GlareHover>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function PlatformVision() {
    const milestones = [
        { label: "200M BRX Supply", value: "Fixed" },
        { label: "Multi-Chain", value: "Infrastructure" },
        { label: "Institutional", value: "Security Model" },
    ];

    return (
        <section className="relative px-6 py-32 overflow-hidden border-y border-white/5">
            <InteractiveOrb 
                className="-top-24 -right-48"
                color="rgba(168,85,247,0.15)"
                size="45rem"
                opacity={0.6}
            />
            <div className="absolute inset-0 z-0">
                <Grainient color1="#08080a" color2="#14141a" color3="#00ff87" opacity={0.3} />
            </div>

            <div className="mx-auto max-w-7xl relative z-10">
                <SectionHeader 
                    centered
                    tag="Future Outlook"
                    title="Designed For Long-Term Ecosystem Expansion"
                    description="The BitRaxx ecosystem is being developed to support future staking systems, launchpad participation, governance infrastructure, and scalable cross-chain utilities."
                />

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {milestones.map((m, i) => (
                        <div key={m.label} className="text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="text-5xl font-bold text-[color:var(--acid-lime)] mb-2"
                            >
                                {m.value}
                            </motion.div>
                            <div className="text-muted-foreground uppercase tracking-widest text-sm">{m.label}</div>
                        </div>
                    ))}
                </div>

                {/* Timeline Glow */}
                <div className="mt-24 relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-acid-lime to-transparent w-1/3"
                        animate={{ x: ["-100%", "300%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </div>
        </section>
    );
}

function CoreEcosystemFeatures() {
    const features = [
        {
            title: "Multi-Chain Accessibility",
            desc: "Interact across Ethereum and BNB Smart Chain using unified wallet connectivity.",
            icon: Globe
        },
        {
            title: "Secure Payment Infrastructure",
            desc: "Payments route directly to official company wallets with automated transaction tracking.",
            icon: Shield
        },
        {
            title: "Investor Dashboard",
            desc: "Track allocations, transaction history, and referral activity through a dedicated investor portal.",
            icon: Layout
        },
        {
            title: "Future Launchpad Ecosystem",
            desc: "BitRaxx is structured to support future token launches, staking participation, and ecosystem expansion.",
            icon: Zap
        }
    ];

    return (
        <section className="relative px-6 py-24 overflow-hidden">
             <InteractiveOrb 
                className="top-1/2 -left-48 -translate-y-1/2"
                color="rgba(0,255,135,0.2)"
                size="40rem"
                opacity={0.7}
            />
             <div className="mx-auto max-w-7xl relative z-10">
                <SectionHeader 
                    tag="Platform Capabilities"
                    title="Core Ecosystem Features"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {features.map((f, i) => (
                        <BorderGlow key={f.title} borderRadius={24} glowIntensity={2}>
                            <GlareHover borderRadius="1.5rem">
                                <div className="glass p-8 h-full flex flex-col gap-4 group">
                                    <div className="h-12 w-12 rounded-xl bg-acid-lime/10 border border-acid-lime/20 flex items-center justify-center transition-colors group-hover:bg-acid-lime/20">
                                        <f.icon className="h-6 w-6 text-acid-lime" />
                                    </div>
                                    <h3 className="text-xl font-bold">{f.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {f.desc}
                                    </p>
                                </div>
                            </GlareHover>
                        </BorderGlow>
                    ))}
                </div>
             </div>
        </section>
    );
}

function MultiChainInfrastructure() {
    const networks = [
        { name: "Ethereum", icon: "ETH", color: "#627EEA" },
        { name: "BNB Smart Chain", icon: "BSC", color: "#F3BA2F" },
    ];
    const wallets = ["MetaMask", "Trust Wallet", "WalletConnect", "Binance Web3 Wallet"];

    return (
        <section className="relative px-6 py-32 bg-white/[0.01] overflow-hidden">
            <InteractiveOrb 
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                color="rgba(204,255,0,0.1)"
                size="50rem"
                opacity={0.4}
            />
            <div className="mx-auto max-w-7xl relative z-10 flex flex-col items-center">
                <SectionHeader 
                    centered
                    tag="Connectivity"
                    title="Multi-Chain Infrastructure"
                    description="Built with modern Web3 wallet standards for seamless cross-network participation across the digital asset landscape."
                />

                <div className="mt-16 w-full max-w-4xl space-y-20">
                    <div className="flex flex-col items-center">
                        <h3 className="text-[10px] uppercase tracking-[0.3em] text-acid-lime font-bold mb-8">Supported Networks</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            {networks.map((n) => (
                                <div key={n.name} className="glass px-10 py-5 rounded-[2rem] border border-white/5 flex items-center gap-4 hover:border-white/10 transition-all hover:scale-105 group">
                                    <div 
                                        className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs bg-white/5 border border-white/10 transition-colors group-hover:border-white/20"
                                        style={{ color: n.color }}
                                    >
                                        {n.icon}
                                    </div>
                                    <span className="font-bold text-lg tracking-tight">{n.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
                        <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold mb-8">Supported Wallets</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {wallets.map((w) => (
                                <div key={w} className="glass px-8 py-4 rounded-2xl border border-white/5 text-sm font-medium text-muted-foreground hover:text-acid-lime hover:border-acid-lime/30 transition-all hover:-translate-y-1">
                                    {w}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SecurityArchitecture() {
    const cards = [
        "Advanced Encryption Standards",
        "Secure Wallet Connectivity",
        "Transaction Verification Infrastructure",
        "Scalable Backend Monitoring"
    ];

    return (
        <section className="relative px-6 py-24 overflow-hidden">
            <InteractiveOrb 
                className="bottom-0 -right-48"
                color="rgba(168,85,247,0.2)"
                size="40rem"
                opacity={0.8}
            />

            <div className="mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 grid gap-4">
                        {cards.map((c, i) => (
                            <motion.div 
                                key={c}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4 group hover:border-liquidity-emerald/30 transition-colors"
                            >
                                <div className="h-2 w-2 rounded-full bg-liquidity-emerald shadow-[0_0_10px_#00ff87]" />
                                <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{c}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="order-1 lg:order-2">
                        <SectionHeader 
                            tag="Trust & Safety"
                            title="Security Architecture"
                            description="BitRaxx prioritizes secure transaction processing, investor tracking, and scalable infrastructure reliability across supported blockchain networks."
                        />
                        <div className="mt-8 p-6 rounded-2xl bg-liquidity-emerald/5 border border-liquidity-emerald/20">
                             <div className="flex items-start gap-4">
                                <Shield className="h-6 w-6 text-liquidity-emerald shrink-0 mt-1" />
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Our multi-layered security model ensures that every interaction within the ecosystem is verified and tracked, providing peace of mind for all participants.
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FAQSection() {
    const faqs = [
        { q: "How can I participate in the presale?", a: "You can participate by connecting your wallet (MetaMask, Trust Wallet, etc.) and selecting your preferred network and currency on our home page." },
        { q: "Which wallets are supported?", a: "We support MetaMask, Trust Wallet, WalletConnect, and Binance Web3 Wallet through our integrated RainbowKit provider." },
        { q: "Which blockchain networks are supported?", a: "Currently, we support Ethereum and BNB Smart Chain (BEP-20) for token participation." },
        { q: "When will BRX distributions occur?", a: "Token distributions will occur following the conclusion of all presale stages. Detailed timelines will be announced via our official community channels." },
        { q: "How are allocations tracked?", a: "All allocations are securely tracked on-chain and linked to your participating wallet address, visible in real-time via your Investor Dashboard." }
    ];

    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="relative px-6 py-24 overflow-hidden">
            <InteractiveOrb 
                className="top-1/2 -left-48 -translate-y-1/2"
                color="rgba(0,255,135,0.15)"
                size="40rem"
                opacity={0.6}
            />
            <div className="mx-auto max-w-3xl relative z-10">
                <SectionHeader 
                    centered
                    tag="Support"
                    title="Frequently Asked Questions"
                />

                <div className="mt-12 space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="glass rounded-2xl border border-white/5 overflow-hidden">
                            <button 
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-semibold">{faq.q}</span>
                                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed"
                                    >
                                        {faq.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CommunityContact() {
    return (
        <section className="relative px-6 py-24 overflow-hidden">
             <div className="absolute inset-0 z-0">
                <InteractiveOrb 
                    className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    color="rgba(204,255,0,0.15)"
                    size="60rem"
                    opacity={0.6}
                />
             </div>

             <div className="mx-auto max-w-7xl relative z-10 text-center">
                <div className="glass p-12 md:p-20 rounded-[3rem] border border-white/10">
                    <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-8">
                        Join The BitRaxx Community
                    </h2>
                    
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        {[
                            { icon: IconTelegram, label: "Telegram", href: "#" },
                            { icon: IconTwitter, label: "X/Twitter", href: "#" },
                            { icon: IconGithub, label: "GitHub", href: "#" },
                            { icon: IconInstagram, label: "Instagram", href: "#" },
                        ].map((s) => (
                            <Link 
                                key={s.label} 
                                href={s.href}
                                className="glass h-14 w-14 rounded-full flex items-center justify-center text-muted-foreground hover:text-acid-lime hover:border-acid-lime/30 transition-all hover:scale-110"
                            >
                                <s.icon />
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-4">
                         <Link href="/dashboard" className="btn-gradient rounded-xl px-10 py-5 font-bold text-lg inline-block text-center">
                            Participate In Presale
                         </Link>
                    </div>
                </div>
             </div>
        </section>
    );
}

export default function AboutPage() {
  return (
    <div className="relative w-full">
      <AboutHero />
      <AboutBitRaxx />
      <PlatformVision />
      <CoreEcosystemFeatures />
      <MultiChainInfrastructure />
      <SecurityArchitecture />
      <FAQSection />
      <CommunityContact />
    </div>
  );
}
