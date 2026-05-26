"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Working with Defnix felt like adding a senior security engineer to our team. They structured our compliance process properly from the start instead of scrambling before the audit.",
    name: "Engineering Lead",
    title: "VP Engineering",
    company: "Seed-Stage SaaS Startup",
    stars: 5,
  },
  {
    quote: "Their team was thorough and transparent throughout. They documented everything clearly and made sure we understood every control in our cloud setup. Night and day vs. other vendors.",
    name: "CTO",
    title: "Chief Technology Officer",
    company: "Early-Stage AI Company",
    stars: 5,
  },
  {
    quote: "They built our cafe's website in under two weeks and it already shows up when people search for coffee shops in our area. Very happy with the result and the ongoing support.",
    name: "Owner",
    title: "Cafe Owner",
    company: "Independent Cafe · Melbourne, AU",
    stars: 5,
  },
  {
    quote: "Defnix automated our entire client onboarding workflow — what used to take 3 hours per client now happens automatically. Massive time saver for a small team like ours.",
    name: "Founder",
    title: "Agency Founder",
    company: "Digital Marketing Agency · London, UK",
    stars: 5,
  },
];

export function TestimonialSection() {
  return (
    <section className="section-gap relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} id="testimonials">
      {/* Blob glow */}
      <div className="blob-violet w-[500px] h-[500px] -top-40 right-0 opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-[0.22em] uppercase mb-3"
            >
              Client Feedback
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-5xl font-[var(--font-display)]"
            >
              Proof of execution.
            </motion.h2>
          </div>

          {/* Rating badge — glassmorphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="shrink-0 flex items-center gap-3 rounded-2xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(16px)", willChange: "transform, backdrop-filter", transform: "translateZ(0)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-[#f59e0b] text-[#f59e0b]" />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-white font-[var(--font-display)]">5.0 / 5.0</p>
              <p className="text-[10px] text-[rgba(245,247,249,0.35)] font-mono">Avg. client rating</p>
            </div>
          </motion.div>
        </div>

        {/* 2-column card grid — Muks glassmorphic style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl p-8 flex flex-col transition-all duration-400"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)", willChange: "transform, backdrop-filter", transform: "translateZ(0)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.065)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.13)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(item.stars)].map((_, j) => (
                  <Star key={j} size={12} className="fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[rgba(245,247,249,0.65)] text-[15px] leading-relaxed flex-1 mb-8">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div
                className="flex items-center gap-3 pt-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(124,58,237,0.12)",
                    border: "1px solid rgba(124,58,237,0.3)",
                  }}
                >
                  <Quote size={13} className="text-[var(--color-accent-bright)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white font-[var(--font-display)]">{item.name}</p>
                  <p className="text-xs text-[rgba(245,247,249,0.35)] font-mono">{item.title} · {item.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
