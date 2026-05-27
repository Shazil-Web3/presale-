"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import InteractiveOrb from "@/components/ui/InteractiveOrb";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminLayout({ children, currentTab, setCurrentTab }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getTabTitle = (id) => {
    switch(id) {
      case 'dashboard': return 'Admin Command Center';
      case 'investors': return 'Investor Management';
      case 'transactions': return 'Transaction Ledger';
      case 'stages': return 'Presale Stage Control';
      case 'allocations': return 'Token Distribution';
      case 'referrals': return 'Referral Analytics';
      case 'settings': return 'System Settings';
      default: return 'Admin Panel';
    }
  };

  const getTabDescription = (id) => {
    switch(id) {
      case 'dashboard': return 'Real-time performance analytics and platform health monitoring.';
      case 'investors': return 'Complete directory of all token holders and presale participants.';
      case 'transactions': return 'Comprehensive log of all incoming payments and network interactions.';
      case 'stages': return 'Manage ICO phases, token pricing, and sale availability.';
      case 'allocations': return 'Track and distribute BRX tokens to eligible wallets.';
      case 'referrals': return 'Monitor the referral ecosystem and reward distribution.';
      case 'settings': return 'Configure platform wallets, chains, and payment tokens.';
      default: return 'Manage your crypto ecosystem from a single interface.';
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08080a] text-foreground selection:bg-acid-lime/30">
      {/* Decorative Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <InteractiveOrb 
          color="rgba(204, 255, 0, 0.08)" 
          size={800} 
          initialX="10%" 
          initialY="10%" 
          blur="140px"
          animated={true}
        />
        <InteractiveOrb 
          color="rgba(0, 255, 135, 0.06)" 
          size={600} 
          initialX="90%" 
          initialY="90%" 
          blur="120px"
          animated={true}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 quantum-grid opacity-10" />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <AdminSidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      <div className="relative z-10 flex min-h-screen flex-col lg:ml-64 transition-[margin] duration-300">
        <AdminHeader 
          title={getTabTitle(currentTab)} 
          description={getTabDescription(currentTab)} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
