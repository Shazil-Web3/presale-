"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TokenomicsChart({ slices, totalAmount = "200M", totalLabel = "TOTAL SUPPLY", className = "" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const radius = 80;
  const circ = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className={cn("grid lg:grid-cols-2 gap-12 items-center", className)}>
      <div className="relative flex items-center justify-center order-1 lg:order-2">
        {/* Outer glow background */}
        <div className="absolute inset-0 bg-acid-lime/5 blur-[120px] -z-10" />
        
        <div className="relative group">
          <svg viewBox="-125 -125 250 250" className="h-72 w-72 md:h-80 md:w-80 overflow-visible">
            {/* Background Ring */}
            <circle
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="32"
            />

            {/* Slices */}
            {slices.map((s, i) => {
              const len = (s.value / 100) * circ;
              const currentOffset = offset;
              offset += len;
              const isHovered = hoveredIndex === i;

              return (
                <motion.circle
                  key={s.label}
                  r={radius}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={isHovered ? 40 : 32}
                  strokeDasharray={`${len} ${circ - len}`}
                  strokeDashoffset={-currentOffset}
                  transform="rotate(-90)"
                  initial={{ strokeDasharray: `0 ${circ}`, opacity: 0 }}
                  animate={{ 
                    strokeDasharray: `${len} ${circ - len}`,
                    opacity: hoveredIndex === null || isHovered ? 1 : 0.4,
                    scale: isHovered ? 1.05 : 1,
                    filter: isHovered ? `drop-shadow(0 0 15px ${s.color}cc)` : `drop-shadow(0 0 5px ${s.color}33)`,
                  }}
                  transition={{ 
                    strokeDasharray: { duration: 1.5, ease: "easeOut", delay: i * 0.1 },
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    strokeWidth: { duration: 0.2 },
                    opacity: { duration: 0.2 }
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer transition-colors"
                  style={{ originX: "0px", originY: "0px" }}
                />
              );
            })}

            {/* Center Info Panel */}
            <foreignObject x="-60" y="-60" width="120" height="120">
              <div className="flex h-full w-full items-center justify-center">
                <div className="glass h-28 w-28 rounded-full border border-white/10 flex flex-col items-center justify-center text-center p-4 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <AnimatePresence mode="wait">
                    {hoveredIndex !== null ? (
                      <motion.div
                        key="hovered"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-2xl font-bold tracking-tight" style={{ color: slices[hoveredIndex].color }}>
                          {slices[hoveredIndex].value}%
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1 line-clamp-2 px-1 font-bold">
                          {slices[hoveredIndex].label}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-2xl font-bold text-white tracking-tighter">{totalAmount}</span>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-1 font-bold">
                          {totalLabel}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </foreignObject>
          </svg>

          {/* Decorative rotating border */}
          <div className="absolute inset-0 -m-12 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="absolute inset-0 border-[1px] border-dashed border-white/20 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-6 border-[1px] border-dotted border-acid-lime/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          </div>
        </div>
      </div>

      <div className="order-2 lg:order-1 space-y-3">
        {slices.map((s, i) => (
          <motion.div
            key={s.label}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "glass group flex items-center justify-between rounded-2xl px-6 py-4 border border-white/5 transition-all cursor-pointer",
              hoveredIndex === i ? "border-white/20 bg-white/10 translate-x-2" : "hover:border-white/10"
            )}
            animate={{
              opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.5,
              scale: hoveredIndex === i ? 1.02 : 1
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="h-3 w-3 rounded-full shadow-[0_0_10px_currentColor]" 
                style={{ backgroundColor: s.color, color: s.color }} 
              />
              <span className={cn(
                "text-sm font-medium transition-colors",
                hoveredIndex === i ? "text-white" : "text-muted-foreground group-hover:text-white"
              )}>
                {s.label}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm font-bold text-white/90">{s.value}%</span>
              <motion.div 
                className="h-1 w-8 bg-white/10 rounded-full overflow-hidden"
                animate={{ width: hoveredIndex === i ? 40 : 32 }}
              >
                <motion.div 
                  className="h-full" 
                  style={{ backgroundColor: s.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
