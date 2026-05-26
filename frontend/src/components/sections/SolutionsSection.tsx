"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cloud, Brain, Globe, Smartphone, Workflow, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { ReactNode } from "react";

interface Solution {
  icon: ReactNode;
  title: string;
  subtitle: string;
  impact: string;
  description: string;
  href: string;
  color: string;
}

const solutions: Solution[] = [
  {
    icon: <Shield size={18} />,
    title: "SOC2 Failure Prevention",
    subtitle: "Compliance Readiness Engineering",
    impact: "Faster audit readiness — fewer surprises",
    description: "We design your control framework, automate evidence collection, and build audit workflows directly into your operations — so your first audit is your cleanest one.",
    href: "/solutions/soc2-failure-prevention",
    color: "#a78bfa",
  },
  {
    icon: <Cloud size={18} />,
    title: "Cloud Insurance",
    subtitle: "Cloud Risk Reduction",
    impact: "Reduced blast radius & faster incident response",
    description: "Architecture hardening, disaster recovery planning, and monitoring systems that give your infrastructure real resilience — not just the appearance of it.",
    href: "/solutions/cloud-insurance",
    color: "#22c55e",
  },
  {
    icon: <Brain size={18} />,
    title: "AI Enhanced SOC Analyst",
    subtitle: "AI Security Automation",
    impact: "Less alert noise, faster threat triage",
    description: "Automated investigation pipelines and escalation logic that help your security team focus on real threats — not false positives.",
    href: "/solutions/ai-soc-analyst",
    color: "#e879f9",
  },
  {
    icon: <Globe size={18} />,
    title: "Website Development",
    subtitle: "Conversion-First Websites",
    impact: "Higher trust signals, better lead flow",
    description: "Performance-first websites built for search ranking, clarity, and client conversion. Not templates — engineered to work.",
    href: "/solutions/website-development",
    color: "#f59e0b",
  },
  {
    icon: <Smartphone size={18} />,
    title: "Mobile App Development",
    subtitle: "Cross-Platform Product Builds",
    impact: "Faster MVP-to-market delivery",
    description: "Reliable iOS and Android experiences with measurable business impact — from wireframe to App Store in weeks.",
    href: "/solutions/mobile-development",
    color: "#06b6d4",
  },
  {
    icon: <Workflow size={18} />,
    title: "Business Automation",
    subtitle: "n8n, Make, Zapier",
    impact: "Hours saved every single week",
    description: "Workflow automation for onboarding, client operations, and customer lifecycle tasks.",
    href: "/solutions/business-automation",
    color: "#ec4899",
  },
];

export function SolutionsSection() {
  const [active, setActive] = useState(0);
  const sol = solutions[active];

  return (
    <section className="section-gap relative overflow-hidden" id="solutions">
      {/* Blob glow */}
      <div className="blob-violet w-[500px] h-[500px] top-1/2 -right-60 -translate-y-1/2 opacity-40" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent-secondary)]"
          >
            What We Build
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-5xl max-w-xl font-[var(--font-display)]"
          >
            Execution-led services for serious growth.
          </motion.h2>
        </div>

        {/* ── Desktop: Tab panel ─────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-[360px_1fr] gap-5 min-h-[520px]">
          {/* List */}
          <div className="space-y-1.5 self-start">
            {solutions.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left transition-all duration-250 group ${
                  active === i
                    ? "border"
                    : "border border-transparent hover:border-[rgba(255,255,255,0.06)]"
                }`}
                style={active === i ? {
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(255,255,255,0.1)",
                } : {
                  background: "transparent",
                }}
              >
                {/* Icon */}
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-250"
                  style={{
                    background: active === i ? `${s.color}18` : "rgba(255,255,255,0.04)",
                    color: active === i ? s.color : "rgba(245,247,249,0.35)",
                    border: `1px solid ${active === i ? `${s.color}35` : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate transition-colors duration-200 ${active === i ? "text-white" : "text-[rgba(245,247,249,0.55)] group-hover:text-white"}`}>
                    {s.title}
                  </p>
                  <p className="text-xs text-[rgba(245,247,249,0.3)] truncate mt-0.5">{s.subtitle}</p>
                </div>
                <ChevronRight
                  size={13}
                  className={`shrink-0 transition-all duration-200 ${active === i ? "translate-x-0.5" : "opacity-0 group-hover:opacity-60"}`}
                  style={{ color: active === i ? s.color : "inherit" }}
                />
              </button>
            ))}
          </div>

          {/* Detail panel — Muks-style glassmorphic card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 24px 80px -20px rgba(0,0,0,0.7)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] as const }}
                className="h-full flex flex-col p-10"
              >
                {/* Ambient color glow in top-right */}
                <div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] pointer-events-none opacity-25 transition-colors duration-500"
                  style={{ background: sol.color }}
                />

                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `${sol.color}15`, color: sol.color, border: `1px solid ${sol.color}30` }}
                  >
                    {sol.icon}
                  </div>
                  <p className="text-xs font-mono uppercase tracking-widest" style={{ color: sol.color }}>
                    {sol.subtitle}
                  </p>
                </div>

                <h3 className="text-3xl font-bold text-white mb-4 font-[var(--font-display)] relative z-10">{sol.title}</h3>

                <div className="inline-flex items-center gap-2 mb-6 relative z-10">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: sol.color }} />
                  <span className="text-sm font-medium" style={{ color: sol.color }}>{sol.impact}</span>
                </div>

                <p className="text-[rgba(245,247,249,0.6)] text-base leading-relaxed flex-1 relative z-10">
                  {sol.description}
                </p>

                <div className="mt-8 relative z-10">
                  <Button variant="primary" size="md" href={sol.href}>
                    Explore Solution
                    <ArrowRight size={15} />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: Grid cards ─────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {solutions.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30` }}
              >
                {s.icon}
              </div>
              <h3 className="text-[15px] font-bold text-white mb-1 font-[var(--font-display)]">{s.title}</h3>
              <p className="text-[10px] text-[rgba(245,247,249,0.35)] mb-3 uppercase tracking-wider font-mono">{s.subtitle}</p>
              <p className="text-sm text-[rgba(245,247,249,0.55)] mb-5 leading-relaxed">{s.description}</p>
              <a href={s.href} className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: s.color }}>
                Learn More <ArrowRight size={11} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
