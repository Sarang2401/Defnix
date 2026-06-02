"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    name: "Diagnose",
    window: "Week 1–2",
    action: "We audit your current stack, controls, and operational bottlenecks with precision.",
    outcome: "A prioritized engineering roadmap with clear risk signals and ROI targets.",
  },
  {
    number: "02",
    name: "Architect",
    window: "Week 2–3",
    action: "We design resilient systems, automation workflows, and compliance controls.",
    outcome: "A build plan that balances speed, security, and long-term maintainability.",
  },
  {
    number: "03",
    name: "Deliver",
    window: "Week 3+",
    action: "We ship implementations, evidence pipelines, and operating runbooks.",
    outcome: "Measurable outcomes: faster audits, safer cloud posture, less manual work.",
  },
];

export function HowWeWorkSection() {
  return (
    <section className="section-gap relative border-t border-white/[0.06]" style={{ overflow: "clip" }} id="how-we-work">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs text-white/40 tracking-[0.2em] uppercase mb-3"
          >
            how we work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-5xl text-white font-medium"
          >
            diagnose. architect. deliver.
          </motion.h2>
        </div>

        {/* Desktop: 3 cards */}
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
              <div className="card-glow rounded-2xl bg-neutral-900/60 backdrop-blur-sm p-8 h-full flex flex-col transition-all duration-400 group-hover:-translate-y-1">
                {/* Step number + window */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-6xl font-bold leading-none select-none text-white/[0.08]">
                    {step.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full text-white/50 border border-white/10 bg-white/5">
                    {step.window}
                  </span>
                </div>

                <h3 className="text-2xl font-medium text-white mb-4">{step.name}</h3>
                <p className="text-white/60 text-base leading-relaxed flex-1">{step.action}</p>

                <div className="mt-8 pt-6 border-t border-white/[0.07]">
                  <p className="text-[10px] uppercase tracking-wider text-white/25 mb-2">outcome</p>
                  <p className="text-sm text-white/45">{step.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Vertical timeline */}
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white/50 border border-white/10 bg-white/5">
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 mt-2 bg-white/[0.07]" />
                )}
              </div>

              <div className="card-glow rounded-2xl bg-neutral-900/60 backdrop-blur-sm p-5 mb-4 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-white">{step.name}</h3>
                  <span className="text-[10px] text-white/30">{step.window}</span>
                </div>
                <p className="text-sm text-white/50 mb-4">{step.action}</p>
                <p className="text-xs text-white/30 pt-4 border-t border-white/[0.07]">{step.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
