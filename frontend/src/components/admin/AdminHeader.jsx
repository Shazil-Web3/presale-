"use client";

import { Menu, User } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminHeader({ title, description, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-surface/40 px-4 sm:px-6 lg:px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <motion.button
          onClick={onMenuClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors lg:hidden flex-shrink-0"
        >
          <Menu size={20} />
        </motion.button>
        
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-lg font-bold text-foreground sm:text-xl">{title}</h1>
          </div>
          {description && (
            <p className="hidden truncate text-sm text-muted-foreground sm:block">{description}</p>
          )}
        </div>
      </div>

      <div className="ml-4 flex items-center gap-3 sm:gap-4 flex-shrink-0">
        {/* Admin Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-bold text-foreground">Admin User</p>
            <p className="text-[10px] font-medium text-muted-foreground">Super Admin</p>
          </div>
          <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-acid-lime/20 to-liquidity-emerald/20 p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-[9px] bg-surface text-muted-foreground">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
