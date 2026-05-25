"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import WalletConnect from "./WalletConnect";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [hoveredPath, setHoveredPath] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-6 z-50 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl transition-all hover:bg-white/[0.05] hover:border-white/20">
        <Link
          href="/"
          className="text-sm font-bold uppercase tracking-[0.25em] text-acid-lime"
        >
          BitRaxx
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 md:flex">
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
          <div className="ml-2">
            <WalletConnect />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <WalletConnect compact />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-20 z-50 rounded-2xl border border-white/10 bg-[#08080A]/95 p-6 backdrop-blur-2xl md:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-5 py-4 text-lg font-medium text-muted-foreground transition hover:border-acid-lime/30 hover:bg-acid-lime/5 hover:text-foreground"
                >
                  {item.label}
                  <div className="h-1.5 w-1.5 rounded-full bg-acid-lime opacity-0 transition group-hover:opacity-100" />
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="mb-4 text-center text-xs uppercase tracking-widest text-muted-foreground">
                  Connect your wallet
                </p>
                <div className="flex justify-center">
                  <WalletConnect />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
