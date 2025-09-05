"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="fixed w-16 h-16 rounded-full border border-blue-900 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${position.x - 32}px, ${position.y - 32}px)`,
      }}
    />
  );
}
