"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

const terminalLines = [
  "SOC2 controls mapped and automated",
  "Cloud hardening completed for production",
  "Mobile booking app shipped in 6 weeks",
  "n8n workflow cut onboarding time by 80%",
];

function TerminalMotif() {
  const [line, setLine] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setLine((prev) => (prev + 1) % terminalLines.length);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6">
      <p className="mb-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Live Delivery Feed</p>
      <p className="font-[var(--font-mono)] text-sm text-[var(--color-accent)]">&gt; {terminalLines[line]}</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center pt-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 font-[var(--font-mono)] text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]"
          >
            Defnix Engineering Studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mb-6 text-5xl sm:text-6xl lg:text-7xl"
          >
            Build once.
            <br />
            <span className="gradient-text-cyan">Scale securely.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mb-7 max-w-xl text-lg text-[var(--color-text-secondary)]"
          >
            SOC2 readiness, cloud security, websites, mobile apps, and automation systems built for founders who need outcomes, not vendor chaos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button variant="primary" size="lg" href="/contact">
              Book Free Consultation
              <ArrowRight size={18} />
            </Button>
            <Button variant="outline" size="lg" href="/case-studies">
              See Our Work
            </Button>
          </motion.div>

          <div className="grid max-w-xl grid-cols-2 gap-3 text-xs text-[var(--color-text-muted)] sm:grid-cols-4">
            {["50+ projects", "12+ countries", "98% delivery score", "24h response"].map((item) => (
              <div key={item} className="rounded border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-2 text-center">
                {item}
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm text-[var(--color-accent)]">Currently onboarding 3 new clients this quarter.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="space-y-4"
        >
          <TerminalMotif />
          <div className="card-glow rounded-2xl bg-[var(--color-bg-surface)] p-6">
            <p className="mb-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Trusted Stack</p>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-secondary)]">
              {["AWS", "GCP", "Next.js", "React Native", "n8n", "Terraform"].map((tool) => (
                <span key={tool} className="rounded border border-[var(--color-border)] px-2.5 py-1">{tool}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
