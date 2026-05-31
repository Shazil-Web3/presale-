"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useMousePosition } from "@/context/MouseContext";

export default function InteractiveOrb({ 
  className = "", 
  color = "rgba(204, 255, 0, 0.35)", 
  size = "45rem",
  blur = "80px",
  opacity = 1,
  interactionStrength = 40,
  initialX = "50%",
  initialY = "50%",
  animated = true
}) {
  const { x, y } = useMousePosition();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the movement
  const springConfig = { damping: 30, stiffness: 120 };
  const translateX = useSpring(mouseX, springConfig);
  const translateY = useSpring(mouseY, springConfig);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!animated) return;
    
    // Calculate distance from center of screen or container
    const mx = (x - window.innerWidth / 2) / interactionStrength;
    const my = (y - window.innerHeight / 2) / interactionStrength;
    
    mouseX.set(mx);
    mouseY.set(my);
  }, [x, y, mouseX, mouseY, interactionStrength, animated]);

  return (
    <div 
      className={`pointer-events-none absolute ${className}`}
      style={{
        left: initialX,
        top: initialY,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        className="h-full w-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur})`,
          opacity: opacity,
          x: animated ? translateX : 0,
          y: animated ? translateY : 0,
          willChange: "transform, opacity",
        }}
        animate={animated ? {
          scale: [1, 1.05, 1],
          opacity: [opacity * 0.8, opacity, opacity * 0.8],
        } : {}}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
