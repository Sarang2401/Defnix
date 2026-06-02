"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const studies = [
  {
    title: "SaaS Startup achieved SOC2 Type I in 8 weeks",
    service: "Security",
    metric: "8 weeks to audit readiness",
    color: "#a78bfa",
  },
  {
    title: "Local cafe website reached #1 for coffee shop in Melbourne",
    service: "Web",
    metric: "#1 local search ranking",
    color: "#f59e0b",
  },
  {
    title: "Agency reduced onboarding from 3 hours to near zero",
    service: "Automation",
    metric: "~3 hours saved per client",
    color: "#e879f9",
  },
  {
    title: "Dental booking app generated 200+ bookings in month one",
    service: "Mobile",
    metric: "200+ bookings in 30 days",
    color: "#06b6d4",
  },
];

export function PortfolioPreviewSection() {
  return (
    <section
      className="section-gap relative"
      style={{ overflow: "clip", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-3">
              portfolio preview
            </p>
            <h2 className="text-3xl sm:text-4xl text-white font-medium">
              proof, not promises.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200"
          >
            View all <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Glassmorphic case study cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {studies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <div
                className="group rounded-2xl p-6 h-full flex flex-col justify-between cursor-pointer transition-all duration-350"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)", willChange: "transform, backdrop-filter", transform: "translateZ(0)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = `${study.color}0c`;
                  el.style.borderColor = `${study.color}35`;
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = `0 0 30px -8px ${study.color}40, 0 1px 0 rgba(255,255,255,0.05) inset`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 1px 0 rgba(255,255,255,0.05) inset";
                }}
              >
                {/* Service tag */}
                <div>
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{
                      color: study.color,
                      background: `${study.color}12`,
                      border: `1px solid ${study.color}28`,
                    }}
                  >
                    {study.service}
                  </span>
                  <h3
                    className="text-sm font-medium text-white mt-4 mb-4 leading-snug"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {study.title}
                  </h3>
                </div>

                {/* Metric + link */}
                <div className="flex items-center justify-between">
                  <p
                    className="text-xs font-mono font-semibold"
                    style={{ color: study.color }}
                  >
                    {study.metric}
                  </p>
                  <ExternalLink
                    size={12}
                    className="opacity-0 group-hover:opacity-60 transition-opacity duration-200"
                    style={{ color: study.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
