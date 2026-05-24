"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useMousePosition } from "@/context/MouseContext";

export default function InteractiveOrb({ 
  className = "", 
  color = "rgba(204, 255, 0, 0.35)", 
  size = "45rem",
  blur = "80px",
  opacity = 1,
  interactionStrength = 40
}) {
  const { x, y } = useMousePosition();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the movement
  const springConfig = { damping: 25, stiffness: 150 };
  const translateX = useSpring(mouseX, springConfig);
  const translateY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Calculate distance from center of screen or container
    // For simplicity, we use screen center to create a subtle parallax
    const mx = (x - window.innerWidth / 2) / interactionStrength;
    const my = (y - window.innerHeight / 2) / interactionStrength;
    
    mouseX.set(mx);
    mouseY.set(my);
  }, [x, y, mouseX, mouseY, interactionStrength]);

  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur})`,
        opacity: opacity,
        x: translateX,
        y: translateY,
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [opacity * 0.8, opacity, opacity * 0.8],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
