"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  FileText,
  Gauge,
  GitFork,
  Globe,
  Lock,
  Music2,
  Scale,
  Send,
  Shield,
  Snowflake,
  Sparkles,
  MessageCircle,
  Wallet,
} from "lucide-react";
import LiquidEther from "@/components/three/LiquidEther";
import GlareHover from "@/components/ui/GlareHover";
import BorderGlow from "@/components/ui/BorderGlow";
import InteractiveOrb from "@/components/ui/InteractiveOrb";
import dynamic from "next/dynamic";

const Grainient = dynamic(() => import("@/components/ui/Grainient"), {
  ssr: false,
});

function Particles() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Reduced particle count for performance
    setDots(
      Array.from({ length: 24 }).map((_, i) => ({
        i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 8,
        dur: 8 + Math.random() * 12,
        size: 1 + Math.random() * 2,
        hue: Math.random() > 0.5 ? "#CCFF00" : "#00FF87",
      }))
    );
  }, []);

  if (dots.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.i}
          className="particle-dot"
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: d.hue,
            borderRadius: 9999,
            opacity: 0.25, // Slightly lower opacity
            boxShadow: `0 0 4px ${d.hue}`, // Reduced shadow blur
            animation: `floaty ${d.dur}s ease-in-out ${d.delay}s infinite`,
            willChange: "transform, opacity", // Hint to browser
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const liquidEtherColors = useMemo(() => ["#5227FF", "#97e324", "#b5ff44"], []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-6 flex items-center pt-24 pb-20">
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={liquidEtherColors}
          mouseForce={40}
          cursorSize={80}
          isViscous={false}
          viscous={0}
          iterationsViscous={1}
          iterationsPoisson={6}
          resolution={0.3}
          isBounce={true}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <Particles />

      <div className="relative mx-auto max-w-7xl w-full py-24">
        <div className="rise flex flex-col items-center text-center">
          <div className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-foreground/80">
            <span className="ping-dot" />
            Live Presale: Phase 1 Active
          </div>

          <h1 className="font-display mt-8 max-w-4xl text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-8xl">
            Launching a <span className="text-gradient-lime">Safer Future</span> in Crypto Trading
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            BitRaxx ($BRX) is an institutional-grade, security-first ecosystem backed by a
            live operational trading platform. Advanced risk-management infrastructure
            designed to improve trading protection and capital efficiency.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard" className="btn-gradient inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold">
              Participate In Presale <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="glass inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold transition-colors hover:bg-white/10">
              <FileText className="h-4 w-4" /> Whitepaper
            </Link>
          </div>

          <div className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-8">
            {[
              { k: "Scalable", v: "Infrastructure" },
              { k: "Advanced", v: "Protection" },
              { k: "200M", v: "Total $BRX" },
            ].map((s) => (
              <BorderGlow key={s.v} borderRadius={16} glowIntensity={2.9} backgroundColor="transparent">
                <GlareHover borderRadius="1rem" glareOpacity={0.15}>
                  <div className="glass h-full w-full p-6">
                    <div className="font-display text-gradient-lime text-3xl font-bold">{s.k}</div>
                    <div className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{s.v}</div>
                  </div>
                </GlareHover>
              </BorderGlow>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Presale() {
  const [network, setNetwork] = useState("BSC");
  const [currency, setCurrency] = useState("USDT");
  const [amount, setAmount] = useState("100");

  const rates = { USDT: 1, BNB: 580, ETH: 3200 };
  const brx = useMemo(() => {
    const n = parseFloat(amount || "0");
    return ((n * (rates[currency] || 1)) / 0.005).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    });
  }, [amount, currency]);

  return (
    <section className="relative px-6 py-24 overflow-hidden">
      {/* Background Orbs */}
      <InteractiveOrb 
        className="-top-24 -left-48"
        color="rgba(0,255,135,0.35)"
        size="45rem"
        opacity={1}
        interactionStrength={30}
      />
      <InteractiveOrb 
        className="top-1/2 -right-64 -translate-y-1/2"
        color="rgba(168,85,247,0.3)"
        size="50rem"
        opacity={0.9}
        interactionStrength={40}
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" style={{ color: "#00ff5eff" }} /> Phase 1 — Private Sale
          </div>
          <h2 className="font-display mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Acquire <span className="text-gradient-lime">$BRX</span> at the entry rate
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Track allocations, referrals, and transaction history from your{" "}
            <Link href="/dashboard" className="text-acid-lime hover:underline">
              investor dashboard
            </Link>.
          </p>
        </div>

        <div className="relative">
          <div className="radial-lime absolute -inset-6" />
          <GlareHover borderRadius="1.5rem" glareOpacity={0.15}>
            <div className="glass relative p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs tracking-widest text-muted-foreground uppercase">Network</span>
              <div className="flex rounded-full border border-white/5 bg-white/5 p-1">
                {["BSC", "ETH"].map((n) => (
                  <button
                    key={n}
                    onClick={() => setNetwork(n)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      network === n
                        ? "bg-[color:var(--lime)] text-[#08080A]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {n === "BSC" ? "BNB Chain (BEP-20)" : "Ethereum"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-2">
              {["USDT", "BNB", "ETH"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`rounded-xl border py-3 text-sm font-semibold transition ${
                    currency === c
                      ? "border-[color:var(--lime)] bg-[color:var(--lime)]/10 text-foreground"
                      : "border-white/5 bg-white/5 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-xs text-muted-foreground">You pay ({currency})</span>
                <input
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  inputMode="decimal"
                  className="mt-2 w-full rounded-xl border border-white/5 bg-[#0b0b0f] px-4 py-3.5 font-mono text-lg outline-none focus:border-[color:var(--lime)]/60"
                />
              </label>
              <label className="block">
                <span className="text-xs text-muted-foreground">You receive (BRX)</span>
                <div
                  className="mt-2 w-full rounded-xl border border-white/5 bg-[#0b0b0f] px-4 py-3.5 font-mono text-lg"
                  style={{ color: "#CCFF00" }}
                >
                  {brx}
                </div>
              </label>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              Rate: <span className="text-foreground">1 BRX = $0.005</span> · Network:{" "}
              <span className="text-foreground">{network === "BSC" ? "BNB Chain (BEP-20)" : "Ethereum"}</span>
            </div>

            <Link href="/dashboard" className="btn-gradient mt-6 w-full rounded-xl py-4 font-semibold inline-block text-center">Buy $BRX Now</Link>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-[color:var(--lime)]/20 bg-[color:var(--lime)]/5 p-4 text-xs leading-relaxed text-foreground/80">
                <span className="mr-1">🔒</span>
                Payments are routed directly to official company wallets. Wallet addresses and
                transaction records are securely tracked for allocation management.
              </div>
              <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-[10px] leading-relaxed text-muted-foreground uppercase tracking-wider">
                Note: BRX allocations will appear in your dashboard after purchase. 
                Distribution timelines will be announced by the BitRaxx team.
              </div>
            </div>
          </div>
          </GlareHover>
        </div>
      </div>
    </section>
  );
}

function Chains() {
  const items = [
    "Ethereum",
    "BNB Chain (BEP-20)",
    "MetaMask",
    "Trust Wallet",
    "Binance Web3",
    "WalletConnect",
  ];
  const row = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-white/5 py-16">
      <div className="mb-8 text-center text-xs tracking-[0.3em] text-muted-foreground uppercase">
        Supported networks & institutional wallets
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#08080A] to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#08080A] to-transparent" />
        <div className="marquee flex w-max gap-4">
          {row.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="glass group whitespace-nowrap rounded-full border border-white/5 px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-[color:var(--lime)]/40 hover:text-[color:var(--lime)]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    {
      icon: Shield,
      tag: "BitRaxx Protection",
      title: "Advanced Risk Protection",
      desc: "Security-first architecture focused on reducing exposure during volatile market conditions and improving capital efficiency.",
    },
    {
      icon: Wallet,
      tag: "Unified Wallet",
      title: "Multi-Chain Consolidation",
      desc: "Seamlessly manage cross-chain assets, multi-network swap sequences, and deep ledger token states under one intuitive interface.",
    },
    {
      icon: Gauge,
      tag: "Infrastructure",
      title: "High-Performance Execution",
      desc: "Built for scalable high-frequency trading environments with complete automated load balancing and zero transaction delays.",
    },
  ];

  return (
    <section id="about" className="relative px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-60">
        <Grainient 
          color1="#000000" 
          color2="#10B981" 
          color3="#8462a4" 
          timeSpeed={0.25} 
          colorBalance={0} 
          warpStrength={1} 
          warpFrequency={5} 
          warpSpeed={2} 
          warpAmplitude={50} 
          blendAngle={0} 
          blendSoftness={0.05} 
          rotationAmount={500} 
          noiseScale={2} 
          grainAmount={0.1} 
          grainScale={2} 
          grainAnimated={false} 
          contrast={1.5} 
          gamma={1} 
          saturation={1} 
          centerX={0} 
          centerY={0} 
          zoom={0.9} 
        />
      </div>
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.3em] text-[color:var(--lime)] uppercase">Platform Core</div>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Infrastructure engineered for <span className="text-gradient-lime">scalability</span>.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((it) => {
            const Icon = it.icon;

            return (
              <BorderGlow key={it.title} borderRadius={24} glowIntensity={2.9} backgroundColor="transparent">
                <GlareHover borderRadius="1.5rem" glareOpacity={0.1}>
                  <article className="glass card-hover relative h-full overflow-hidden p-7">
                    <div className="relative">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[color:var(--lime)]/30 bg-[color:var(--lime)]/10">
                        <Icon className="h-5 w-5" style={{ color: "#CCFF00" }} />
                      </div>
                      <div className="mt-5 text-xs tracking-widest text-muted-foreground uppercase">{it.tag}</div>
                      <h3 className="font-display mt-1 text-2xl font-semibold">{it.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                    </div>
                  </article>
                </GlareHover>
              </BorderGlow>
            );
          })}
        </div>

        {/* Referral Section */}
        <div className="mt-20">
          <BorderGlow borderRadius={24} glowIntensity={2} backgroundColor="transparent">
            <div className="glass flex flex-col items-center justify-between gap-8 rounded-3xl p-8 md:flex-row md:p-12">
              <div className="max-w-xl text-center md:text-left">
                <h3 className="font-display text-3xl font-bold">Referral Rewards Program</h3>
                <p className="mt-4 text-muted-foreground">
                  Invite users to the BitRaxx ecosystem and earn BRX-based referral incentives. 
                  Build your network and grow your allocation as the community expands.
                </p>
              </div>
              <button className="btn-gradient whitespace-nowrap rounded-xl px-8 py-4 font-semibold">
                Get Referral Link
              </button>
            </div>
          </BorderGlow>
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
    <section className="relative px-6 py-32 overflow-hidden">
      {/* Background Orbs */}
      <InteractiveOrb 
        className="-bottom-32 -left-48"
        color="rgba(0,255,135,0.2)"
        size="45rem"
        opacity={0.8}
        interactionStrength={35}
      />
      <InteractiveOrb 
        className="top-0 -right-40"
        color="rgba(204,255,0,0.25)"
        size="50rem"
        opacity={0.9}
        interactionStrength={25}
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="text-xs tracking-[0.3em] text-[color:var(--lime)] uppercase font-bold">Tokenomics</div>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight md:text-6xl leading-tight">
            Allocation built for <br />
            <span className="text-gradient-lime italic">long-term durability</span>.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl leading-relaxed">
            A balanced distribution model designed for sustainable ecosystem growth, 
            long-term incentive alignment, and robust liquidity depth.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <div className="glass px-5 py-3 rounded-2xl border border-white/5">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Symbol</span>
              <span className="font-mono text-acid-lime font-bold">$BRX</span>
            </div>
            <div className="glass px-5 py-3 rounded-2xl border border-white/5">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Total Supply</span>
              <span className="font-mono text-foreground font-bold">200,000,000</span>
            </div>
          </div>
        </div>

        <TokenomicsChart slices={slices} />
      </div>
    </section>
  );
}

function Timeline() {
  const phases = [
    {
      tag: "Phase 1 — Private Sale",
      state: "Current",
      price: "$0.005",
      date: "Began May 10, 2026",
      active: true,
    },
    { tag: "Phase 2 — ICO Phase 1", state: "Upcoming", price: "$0.015", date: "Begins May 15, 2026" },
    { tag: "Phase 3 — Planned Exchange Expansion", state: "Scheduled", price: "$0.05", date: "Target Sep 3, 2026" },
    { tag: "Phase 4 — 6M Ecosystem", state: "Forward Target", price: "$0.25", date: "Long-term parameter" },
  ];

  return (
    <section id="roadmap" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.3em] text-[color:var(--lime)] uppercase">Sale Timeline</div>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Multi-stage <span className="text-gradient-lime">progression</span> to listing.
          </h2>
        </div>

        <div className="relative mt-14">
          <div className="absolute right-0 left-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />
          <div className="grid gap-5 md:grid-cols-4">
            {phases.map((p, i) => (
              <div key={p.tag} className="relative">
                <div
                  className="mx-auto hidden h-4 w-4 items-center justify-center rounded-full border-2 bg-[#08080A] md:flex"
                  style={{
                    borderColor: p.active ? "#CCFF00" : "rgba(255,255,255,0.2)",
                    boxShadow: p.active ? "0 0 14px #CCFF00" : "none",
                  }}
                />
                <GlareHover
                  borderRadius="1rem"
                  glareOpacity={p.active ? 0.2 : 0.1}
                  className="w-full"
                >
                  <article
                    className={`glass card-hover relative h-full p-5 ${p.active ? "border-[color:var(--lime)]/40" : ""}`}
                    style={
                      p.active
                        ? {
                            boxShadow:
                              "0 0 0 1px rgba(204,255,0,0.4), 0 18px 60px -10px rgba(204,204,0,0.25)",
                          }
                        : undefined
                    }
                  >
                    <div
                      className="text-[10px] tracking-widest uppercase"
                      style={{ color: p.active ? "#CCFF00" : "#7A7A85" }}
                    >
                      {p.state}
                    </div>
                    <div className="mt-1 font-semibold">{p.tag}</div>
                    <div className="font-display text-gradient-lime mt-3 text-3xl font-bold">{p.price}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{p.date}</div>
                    <div className="mt-4 text-xs text-muted-foreground">Stage 0{i + 1} / 04</div>
                  </article>
                </GlareHover>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Security() {
  const items = [
    {
      icon: Lock,
      title: "Enterprise-Grade Security",
      desc: "High-level data encryption and secure in-memory execution protocols for all transactions.",
    },
    {
      icon: Snowflake,
      title: "Hot/Cold Wallet Segregation",
      desc: "Operational asset risk isolation via independent and secure vault networks.",
    },
    {
      icon: Scale,
      title: "Transparent Asset Management",
      desc: "Focus on capital efficiency and verifiable asset monitoring to ensure ecosystem stability.",
    },
    {
      icon: Brain,
      title: "Advanced Threat Monitoring",
      desc: "Real-time security pattern interceptors designed to identify and mitigate potential risks.",
    },
  ];

  return (
    <section className="relative px-6 py-24 overflow-hidden">
      {/* Background Orbs */}
      <InteractiveOrb 
        className="-top-40 -right-48"
        color="rgba(168,85,247,0.25)"
        size="55rem"
        opacity={0.8}
        blur="120px"
        interactionStrength={50}
      />
      <InteractiveOrb 
        className="-bottom-24 -left-32"
        color="rgba(0,255,135,0.3)"
        size="40rem"
        opacity={0.9}
        interactionStrength={30}
      />

      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.3em] text-[color:var(--lime)] uppercase">Cryptographic Security</div>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Hardened at the <span className="text-gradient-lime">core</span>.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => {
            const Icon = it.icon;

            return (
              <BorderGlow key={it.title} borderRadius={16} glowIntensity={2.9} backgroundColor="transparent">
                <GlareHover borderRadius="1rem" glareOpacity={0.1}>
                  <div className="glass card-hover h-full p-6">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5" style={{ color: "#00FF87" }} />
                    </div>
                    <h3 className="font-display mt-5 text-lg font-semibold">{it.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                  </div>
                </GlareHover>
              </BorderGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FooterHighlights() {
  const socials = [
    { icon: Send, label: "Telegram" },
    { icon: GitFork, label: "GitHub" },
    { icon: Music2, label: "TikTok" },
    { icon: MessageCircle, label: "X" },
    { icon: Globe, label: "Instagram" },
  ];

  return (
    <section className="relative border-t border-white/5 px-6 pb-8 pt-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-5 w-5 rotate-45 rounded-[3px]" style={{ background: "linear-gradient(135deg,#CCFF00,#00FF87)" }} />
            <span className="font-display font-bold">
              BitRaxx<span style={{ color: "#00FF87" }}>.io</span>
            </span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            BitRaxx is building a security-focused digital asset ecosystem designed for
            global scalability across the MENA region, Southeast Asia, and European
            hubs, delivering professional crypto rails to enterprise partners.
          </p>
        </div>
        <div className="flex items-start md:justify-end">
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="glass card-hover flex h-11 w-11 items-center justify-center rounded-xl text-foreground/80 hover:text-[color:var(--lime)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Hero />
      <Presale />
      <Chains />
      <Highlights />
      <Tokenomics />
      <Timeline />
      <Security />
      <FooterHighlights />
    </div>
  );
}
