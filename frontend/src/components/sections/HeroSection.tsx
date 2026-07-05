"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Cloud, Bot, Globe } from "lucide-react";

/* ─── Compliance dashboard mockup ──────────────────────────────
   Visible below the fold, partially clipped — like Craft's app
   preview that entices you to scroll.
   All colors strictly from DESIGN.md tokens.
   ─────────────────────────────────────────────────────────────── */

const statusItems = [
  { icon: ShieldCheck, label: "SOC2 Type II",     status: "COMPLIANT",  dot: "#84A98C" },
  { icon: Cloud,       label: "Cloud Resilience", status: "MONITORED",  dot: "#84A98C" },
  { icon: Bot,         label: "AI SOC Analyst",   status: "ACTIVE",     dot: "#84A98C" },
  { icon: Globe,       label: "Web Delivery",     status: "LIVE",       dot: "#CAD2C5" },
];

const metrics = [
  { value: "100%", label: "Client satisfaction" },
  { value: "15+",  label: "Projects delivered"  },
  { value: "<1 hr",label: "Avg response time"   },
  { value: "6",    label: "Solutions"            },
];

function DashboardMockup() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "860px",
        margin: "0 auto",
        backgroundColor: "#354F52",           /* secondary */
        border: "1px solid rgba(82,121,111,0.35)", /* pine 35% */
        borderRadius: "16px 16px 0 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          backgroundColor: "#2F3E46",         /* surface */
          borderBottom: "1px solid rgba(82,121,111,0.25)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Traffic lights */}
        {["#52796F","#84A98C","#CAD2C5"].map((c) => (
          <span
            key={c}
            style={{
              width: 10, height: 10,
              borderRadius: "50%",
              backgroundColor: c,
              opacity: 0.6,
              display: "inline-block",
            }}
          />
        ))}
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-label)",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(202,210,197,0.4)",
          }}
        >
          defnix · security dashboard
        </span>
      </div>

      {/* Dashboard body */}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Metrics row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                backgroundColor: "#2F3E46",
                border: "1px solid rgba(82,121,111,0.25)",
                borderRadius: "10px",
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#CAD2C5",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(202,210,197,0.45)",
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Status list */}
        <div
          style={{
            backgroundColor: "#2F3E46",
            border: "1px solid rgba(82,121,111,0.25)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {statusItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 18px",
                  borderBottom: i < statusItems.length - 1
                    ? "1px solid rgba(82,121,111,0.18)"
                    : "none",
                }}
              >
                {/* Icon tile */}
                <div
                  style={{
                    width: 32, height: 32,
                    borderRadius: 8,
                    backgroundColor: "#354F52",
                    border: "1px solid rgba(82,121,111,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={14} color="#84A98C" />
                </div>

                {/* Label */}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "#CAD2C5",
                    flex: 1,
                  }}
                >
                  {item.label}
                </span>

                {/* Status badge */}
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--font-label)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: item.dot,
                  }}
                >
                  <span
                    style={{
                      width: 6, height: 6,
                      borderRadius: "50%",
                      backgroundColor: item.dot,
                      display: "inline-block",
                    }}
                  />
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>

        {/* Activity bar chart (decorative) */}
        <div
          style={{
            backgroundColor: "#2F3E46",
            border: "1px solid rgba(82,121,111,0.25)",
            borderRadius: "10px",
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(202,210,197,0.4)",
              marginBottom: 12,
            }}
          >
            Threat activity — last 7 days
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "40px" }}>
            {[30, 55, 40, 70, 45, 85, 60].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: "3px 3px 0 0",
                  backgroundColor: i === 5 ? "#84A98C" : "#52796F",
                  opacity: i === 5 ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Hero ─────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-surface)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "140px",
        paddingBottom: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Headline block ──────────────────────────────────── */}
      <div style={{ textAlign: "center", padding: "0 24px", zIndex: 10 }}>

        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 6, height: 6,
              borderRadius: "50%",
              backgroundColor: "#84A98C",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(202,210,197,0.6)",
            }}
          >
            Engineering studio · Bengaluru, India
          </span>
        </motion.div>

        {/* Main headline — inspired by Craft's massive centered type */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-headline)",
            fontWeight: 600,
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#CAD2C5",
            maxWidth: "16ch",
            margin: "0 auto 20px",
          }}
        >
          Security built{" "}
          <span style={{ color: "#84A98C" }}>
            for&nbsp;what&apos;s&nbsp;next.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.0625rem",
            lineHeight: 1.65,
            color: "rgba(202,210,197,0.65)",
            maxWidth: "46ch",
            margin: "0 auto 40px",
            display: "block",
          }}
        >
          SOC2 compliance, cloud resilience, AI automation, web &amp; mobile —
          every engagement starts with a free assessment call.
        </motion.p>

        {/* CTA — single pill like Craft */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 72,
          }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#CAD2C5",
              color: "#2F3E46",
              borderRadius: "999px",
              padding: "14px 32px",
              fontFamily: "var(--font-label)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#84A98C")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#CAD2C5")}
          >
            Book a free consultation
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/solutions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "transparent",
              color: "#CAD2C5",
              borderRadius: "999px",
              padding: "13px 28px",
              border: "1px solid rgba(202,210,197,0.25)",
              fontFamily: "var(--font-label)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(202,210,197,0.6)";
              e.currentTarget.style.color = "#CAD2C5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(202,210,197,0.25)";
            }}
          >
            See solutions
          </Link>
        </motion.div>
      </div>

      {/* ── Floating dashboard mockup — inspired by Craft's app preview ── */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.45, ease: "easeOut" }}
        style={{
          width: "100%",
          paddingLeft: "clamp(16px, 4vw, 80px)",
          paddingRight: "clamp(16px, 4vw, 80px)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Subtle top fade to blend hero into mockup */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40px",
            background: `linear-gradient(to bottom, #2F3E46, transparent)`,
            zIndex: 20,
            pointerEvents: "none",
          }}
        />
        <DashboardMockup />
      </motion.div>
    </section>
  );
}
