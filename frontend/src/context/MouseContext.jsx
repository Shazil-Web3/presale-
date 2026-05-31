"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";

const MouseContext = createContext({ x: 0, y: 0 });

export const MouseProvider = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (rafId.current) return;
      
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      rafId.current = requestAnimationFrame(() => {
        setPosition({ x: clientX, y: clientY });
        rafId.current = null;
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <MouseContext.Provider value={position}>
      {children}
    </MouseContext.Provider>
  );
};

export const useMousePosition = () => useContext(MouseContext);
