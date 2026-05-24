"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [hoveredPath, setHoveredPath] = useState(null);

  return (
    <header className="fixed inset-x-0 top-6 z-50 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl transition-all hover:bg-white/[0.05] hover:border-white/20">
        <Link
          href="/"
          className="text-sm font-bold uppercase tracking-[0.25em] text-acid-lime"
        >
          BitRaxx
        </Link>

        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredPath(item.href)}
                onMouseLeave={() => setHoveredPath(null)}
                className="relative rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
                {hoveredPath === item.href && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-acid-lime"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
