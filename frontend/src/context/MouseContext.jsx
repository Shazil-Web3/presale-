"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";

const MouseContext = createContext({ x: 0, y: 0 });

export const MouseProvider = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rafId.current) return;
      
      rafId.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        rafId.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
