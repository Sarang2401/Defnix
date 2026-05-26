"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight, CalendarDays } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-gap" id="cta">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative overflow-hidden rounded-3xl text-center px-8 py-24 lg:px-20"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(32px)", willChange: "transform, backdrop-filter", transform: "translateZ(0)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 40px 100px -30px rgba(0,0,0,0.8)",
          }}
        >
          {/* Large violet blob glow inside card */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(124,58,237,0.2),transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(232,121,249,0.12),transparent_60%)] pointer-events-none" />

          {/* Subtle grid */}
          <div className="bg-grid absolute inset-0 opacity-50 pointer-events-none" />

          <div className="relative z-10">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono font-medium text-[var(--color-accent-bright)] uppercase tracking-widest mb-8"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
            >
              <CalendarDays size={11} />
              Free 30-Minute Consultation
            </div>

            {/* Headline — Syne */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 max-w-3xl mx-auto font-[var(--font-display)] leading-[1.05]">
              Ready to turn this quarter
              <br />
              into{" "}
              <span className="gradient-text-accent">real momentum?</span>
            </h2>

            {/* Subtext */}
            <p className="mx-auto mb-10 max-w-xl text-[rgba(245,247,249,0.55)] text-lg leading-relaxed">
              Get a practical execution plan for security, product delivery, and automation wins — zero obligation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="primary" size="lg" href="/contact">
                Book Free Consultation
                <ArrowRight size={16} />
              </Button>
              <Button variant="outline" size="lg" href="/case-studies">
                View Case Studies
              </Button>
            </div>

            {/* Micro trust line */}
            <p className="mt-8 text-xs text-[rgba(245,247,249,0.3)] font-mono">
              No commitment · Responds within 4 hours · Currently onboarding 3 new clients
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
