"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const move = (event: MouseEvent) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="custom-cursor pointer-events-none fixed z-[90] h-6 w-6 rounded-full border border-[var(--color-accent)]/60"
      style={{ transform: `translate(${pos.x - 12}px, ${pos.y - 12}px)` }}
    />
  );
}
