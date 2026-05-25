"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import InteractiveOrb from "@/components/ui/InteractiveOrb";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardLayout({ children, title, subtitle }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#08080a] text-foreground">
      {/* Decorative Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <InteractiveOrb 
          color="rgba(204, 255, 0, 0.15)" 
          size={600} 
          initialX="20%" 
          initialY="20%" 
          className="blur-[120px]"
        />
        <InteractiveOrb 
          color="rgba(168, 85, 247, 0.15)" 
          size={500} 
          initialX="80%" 
          initialY="70%" 
          className="blur-[100px]"
        />
        <InteractiveOrb 
          color="rgba(0, 255, 135, 0.1)" 
          size={400} 
          initialX="50%" 
          initialY="50%" 
          className="blur-[80px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 quantum-grid opacity-20" />

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

      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="relative z-10 flex min-h-screen flex-col lg:ml-64 transition-[margin] duration-300">
        <DashboardHeader 
          title={title} 
          subtitle={subtitle} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          <div className="mx-auto max-w-7xl space-y-8 lg:space-y-12">
            {children}
          </div>
        </main>

        <footer className="border-t border-white/5 bg-surface/20 p-6 sm:p-8 backdrop-blur-md">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <h3 className="text-lg font-bold text-foreground">Need Assistance?</h3>
              <p className="text-sm text-muted-foreground">Our support team is available 24/7 to help you.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all w-full sm:w-auto">
                Contact Support
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-acid-lime text-black text-sm font-bold hover:opacity-90 transition-all shadow-[0_0_20px_rgba(204,255,0,0.2)] w-full sm:w-auto">
                Visit Community
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
