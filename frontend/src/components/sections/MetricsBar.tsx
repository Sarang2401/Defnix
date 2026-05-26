"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 100, suffix: "%", label: "Client Satisfaction", desc: "across all engagements" },
  { value: 15,  suffix: "+", label: "Projects Shipped",    desc: "on time, in scope" },
  { value: 2,   suffix: "wk", label: "Avg. Delivery",     desc: "kickoff to live" },
  { value: 12,  suffix: "+",  label: "Countries Served",   desc: "globally distributed" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.8,
      ease: "power3.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = `${Math.round(obj.val)}${suffix}`;
      },
    });
  }, [isInView, value, suffix]);

  return (
    <div ref={containerRef}>
      <span ref={ref} className="font-[var(--font-display)] text-4xl lg:text-5xl font-bold text-white">
        0{suffix}
      </span>
    </div>
  );
}

export function MetricsBar() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="gradient-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Glassmorphic metrics card — Muks style */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)", willChange: "transform, backdrop-filter", transform: "translateZ(0)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 32px 80px -20px rgba(0,0,0,0.7)",
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className={`flex flex-col justify-center px-8 py-12 lg:py-16 ${i < metrics.length - 1 ? "border-r border-[rgba(255,255,255,0.06)]" : ""} ${i === 0 || i === 2 ? "border-b border-[rgba(255,255,255,0.06)] lg:border-b-0" : ""}`}
              >
                <AnimatedNumber value={m.value} suffix={m.suffix} />
                <p className="text-sm font-semibold text-white mt-3 font-[var(--font-display)]">{m.label}</p>
                <p className="text-xs text-[rgba(245,247,249,0.35)] mt-1 font-mono">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="gradient-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
