"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    name: "Diagnose",
    window: "Week 1–2",
    action: "We audit your current stack, controls, and operational bottlenecks with precision.",
    outcome: "A prioritized engineering roadmap with clear risk signals and ROI targets.",
    color: "#a78bfa",
  },
  {
    number: "02",
    name: "Architect",
    window: "Week 2–3",
    action: "We design resilient systems, automation workflows, and compliance controls.",
    outcome: "A build plan that balances speed, security, and long-term maintainability.",
    color: "#e879f9",
  },
  {
    number: "03",
    name: "Deliver",
    window: "Week 3+",
    action: "We ship implementations, evidence pipelines, and operating runbooks.",
    outcome: "Measurable outcomes: faster audits, safer cloud posture, less manual work.",
    color: "#22c55e",
  },
];

export function HowWeWorkSection() {
  return (
    <section className="section-gap relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} id="how-we-work">
      {/* Blob */}
      <div className="blob-pink w-[400px] h-[400px] -bottom-40 -left-40 opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-[0.22em] uppercase mb-3"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-[var(--font-display)]"
          >
            Diagnose. Architect. Deliver.
          </motion.h2>
        </div>

        {/* ── Desktop: 3 glassmorphic cards ─────── */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              <div
                className="rounded-2xl p-8 h-full flex flex-col transition-all duration-400 group-hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${step.color}40`;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px -10px ${step.color}40, 0 1px 0 rgba(255,255,255,0.06) inset`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 0 rgba(255,255,255,0.06) inset";
                }}
              >
                {/* Step number + window */}
                <div className="flex items-start justify-between mb-8">
                  <span
                    className="font-[var(--font-display)] text-6xl font-bold leading-none select-none"
                    style={{ color: `${step.color}25` }}
                  >
                    {step.number}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{
                      color: step.color,
                      border: `1px solid ${step.color}30`,
                      background: `${step.color}0f`,
                    }}
                  >
                    {step.window}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 font-[var(--font-display)]">{step.name}</h3>
                <p className="text-[rgba(245,247,249,0.55)] text-base leading-relaxed flex-1">{step.action}</p>

                <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[rgba(245,247,249,0.25)] mb-2">Outcome</p>
                  <p className="text-sm text-[rgba(245,247,249,0.45)]">{step.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile: Vertical timeline ─────────── */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold"
                  style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}35` }}
                >
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 mt-2" style={{ background: "rgba(255,255,255,0.07)" }} />
                )}
              </div>

              <div
                className="rounded-2xl p-5 mb-4 flex-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white font-[var(--font-display)]">{step.name}</h3>
                  <span className="font-mono text-[10px] text-[rgba(245,247,249,0.3)]">{step.window}</span>
                </div>
                <p className="text-sm text-[rgba(245,247,249,0.5)] mb-4">{step.action}</p>
                <p className="text-xs text-[rgba(245,247,249,0.3)] pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>{step.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
