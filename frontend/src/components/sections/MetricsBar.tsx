"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 100, suffix: "%", label: "Client Satisfaction", desc: "across all engagements" },
  { value: 15, suffix: "+", label: "Projects Shipped", desc: "on time, in scope" },
  { value: 2, suffix: "wk", label: "Avg. Delivery", desc: "kickoff to live" },
  { value: 12, suffix: "+", label: "Countries Served", desc: "globally distributed" },
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
      <span ref={ref} className="text-4xl lg:text-5xl font-medium text-white tracking-tight">
        0{suffix}
      </span>
    </div>
  );
}

export function MetricsBar() {
  return (
    <section className="section-gap relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl border border-white/10 p-10 lg:p-14"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mb-3">
                  <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                </div>
                <p className="text-sm text-white/40 uppercase tracking-wider">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
