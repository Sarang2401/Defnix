"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";

/* ── Typed terminal ────────────────────────────── */
const terminalLines = [
  { type: "cmd",  text: "defnix audit --stack aws,k8s,postgres" },
  { type: "info", text: "scanning 142 controls..." },
  { type: "ok",   text: "SOC2 CC6.1 — access control verified ✓" },
  { type: "ok",   text: "SOC2 CC7.2 — monitoring pipeline ✓" },
  { type: "warn", text: "CC6.6 — 2 gaps detected, patching..." },
  { type: "ok",   text: "terraform apply — 12 resources updated" },
  { type: "info", text: "evidence pipeline: automated & ready" },
  { type: "ok",   text: "cloud posture score: 97 / 100 ✓" },
];

const CHAR_DELAY = 26;

function useTypedLines(lines: typeof terminalLines, active: boolean) {
  const [displayed, setDisplayed] = useState<{ type: string; text: string }[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (!active || lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx < line.text.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), CHAR_DELAY);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed((prev) => [...prev, { type: line.type, text: line.text }]);
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 150);
      return () => clearTimeout(t);
    }
  }, [active, lineIdx, charIdx, lines]);

  const current = lineIdx < lines.length
    ? { type: lines[lineIdx].type, text: lines[lineIdx].text.slice(0, charIdx) }
    : null;

  return { displayed, current };
}

const lineColor: Record<string, string> = {
  cmd:  "text-[var(--color-accent-bright)]",
  ok:   "text-[var(--color-success)]",
  warn: "text-[var(--color-warning)]",
  info: "text-[rgba(245,247,249,0.4)]",
};

const stats = [
  { icon: <Shield size={13} />, label: "SOC2 Certified Delivery" },
  { icon: <Globe size={13} />,  label: "12+ Countries Served" },
  { icon: <Zap size={13} />,   label: "2-Week Avg. Ship Time" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function HeroSection() {
  const [terminalActive, setTerminalActive] = useState(false);
  const { displayed, current } = useTypedLines(terminalLines, terminalActive);

  useEffect(() => {
    const t = setTimeout(() => setTerminalActive(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-32">
      {/* ── Muks-style large blob glows ─────── */}
      <div className="blob-violet w-[700px] h-[700px] -top-60 -left-60 opacity-70 animate-float-slow" />
      <div className="blob-pink w-[500px] h-[500px] top-1/2 -right-40 opacity-60 animate-float-slow" style={{ animationDelay: "-3s" }} />

      {/* Grid background */}
      <div className="bg-grid absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 py-28 lg:grid-cols-2 lg:items-center lg:gap-24">

        {/* ── Left: Copy ─────────────────────── */}
        <div>
          {/* Eyebrow badge */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-[var(--color-accent-bright)] mb-8"
              style={{
                background: "rgba(124, 58, 237, 0.1)",
                border: "1px solid rgba(124, 58, 237, 0.3)",
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-accent)]" />
              </span>
              Engineering Studio · Currently Onboarding
            </span>
          </motion.div>

          {/* H1 — Syne font, Muks-style large */}
          <motion.h1 {...fadeUp(0.08)} className="mb-7 text-5xl sm:text-6xl lg:text-[72px] leading-[1.0] tracking-[-0.03em] font-[var(--font-display)]">
            Build secure.
            <br />
            <span className="gradient-text-accent">Ship fast.</span>
            <br />
            <span className="text-[rgba(245,247,249,0.45)]">Scale boldly.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p {...fadeUp(0.18)} className="mb-9 max-w-lg text-[17px] leading-relaxed text-[var(--color-text-secondary)]">
            SOC2 readiness, cloud security, AI automation, websites, and mobile apps — 
            built by engineers who ship real outcomes, not slide decks.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.26)} className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="primary" size="lg" href="/contact">
              Book Free Consultation
              <ArrowRight size={16} />
            </Button>
            <Button variant="outline" size="lg" href="/case-studies">
              See Our Work
            </Button>
          </motion.div>

          {/* Trust pills */}
          <motion.div {...fadeUp(0.34)} className="flex flex-wrap gap-2.5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-[rgba(245,247,249,0.6)]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="text-[var(--color-accent-secondary)]">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Glassmorphic terminal ────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          className="hidden lg:block"
        >
          {/* Terminal card — Muks glassmorphic style */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.09)",
              boxShadow: "0 0 0 1px rgba(124,58,237,0.15) inset, 0 24px 80px -16px rgba(0,0,0,0.8), 0 0 60px -20px rgba(124,58,237,0.2)",
            }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[10px] text-[rgba(245,247,249,0.3)] tracking-widest uppercase">defnix — audit engine</span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--color-success)]" />
                </span>
                <span className="font-mono text-[9px] text-[var(--color-success)] tracking-widest">LIVE</span>
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-5 font-mono text-[12px] space-y-2.5 min-h-[300px]">
              {displayed.map((line, i) => (
                <div key={i} className={`flex gap-2 ${lineColor[line.type] || "text-[var(--color-text-secondary)]"}`}>
                  <span className="text-[rgba(245,247,249,0.2)] select-none shrink-0">{line.type === "cmd" ? "❯" : "  "}</span>
                  <span>{line.text}</span>
                </div>
              ))}
              {current && (
                <div className={`flex gap-2 ${lineColor[current.type] || "text-[var(--color-text-secondary)]"}`}>
                  <span className="text-[rgba(245,247,249,0.2)] select-none shrink-0">{current.type === "cmd" ? "❯" : "  "}</span>
                  <span>
                    {current.text}
                    <span className="animate-typing-cursor inline-block w-[5px] h-[12px] bg-[var(--color-accent)] ml-0.5 align-middle" />
                  </span>
                </div>
              )}
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[rgba(8,8,16,0.8)] to-transparent pointer-events-none" />
          </div>

          {/* Metric badges below terminal */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "SOC2 Controls", value: "142+",  color: "var(--color-accent-bright)" },
              { label: "Delivery Score", value: "98%",   color: "var(--color-success)" },
              { label: "Avg Response",   value: "< 24h", color: "var(--color-warning)" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-3.5 text-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <p className="text-xl font-bold font-[var(--font-display)]" style={{ color: m.color }}>{m.value}</p>
                <p className="text-[10px] text-[rgba(245,247,249,0.35)] mt-0.5 uppercase tracking-wider font-mono">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent pointer-events-none" />
    </section>
  );
}
