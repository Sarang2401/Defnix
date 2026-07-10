"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Cloud, Bot, Globe, Menu, MoreHorizontal, Maximize2 } from "lucide-react";
import { useRef } from "react";
import { stats } from "@/lib/stats-data";

/* ─── Compliance dashboard mockup ──────────────────────────────
   Visible below the fold, partially clipped — like Craft's app
   preview that entices you to scroll.
   All colors strictly from DESIGN.md tokens.
   ─────────────────────────────────────────────────────────────── */

const statusItems = [
  { icon: ShieldCheck, label: "SOC2 Type II",     status: "COMPLIANT",  dot: "var(--color-sage)" },
  { icon: Cloud,       label: "Cloud Resilience", status: "MONITORED",  dot: "var(--color-sage)" },
  { icon: Bot,         label: "AI SOC Analyst",   status: "ACTIVE",     dot: "var(--color-sage)" },
  { icon: Globe,       label: "Web Delivery",     status: "LIVE",       dot: "var(--color-mist)" },
];

const metrics = ["satisfaction", "projects", "response-time", "solutions"].map((id) => {
  const s = stats.find((stat) => stat.id === id)!;
  return { value: s.display, label: s.label };
});

function DashboardMockup() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "960px",
        margin: "0 auto",
        background: "linear-gradient(145deg, var(--color-mockup-bg) 0%, var(--color-mockup-bg-alt) 100%)", // Light neumorphic face, like Craft's bright app
        border: "1px solid color-mix(in srgb, var(--color-sage) 30%, transparent)",
        borderRadius: "24px 24px 0 0",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 24px 64px color-mix(in srgb, var(--color-neu-dark) 50%, transparent), inset 2px 2px 5px #ffffff, inset -2px -2px 5px color-mix(in srgb, var(--color-sage) 20%, transparent)",
      }}
    >
      {/* Window chrome - light style */}
      <div
        style={{
          background: "var(--color-mockup-bg-alt)",
          borderBottom: "1px solid color-mix(in srgb, var(--color-sage) 20%, transparent)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* MacOS style window controls */}
        {["#FF5F56", "#FFBD2E", "#27C93F"].map((c) => (
          <span
            key={c}
            style={{
              width: 12, height: 12,
              borderRadius: "50%",
              backgroundColor: c,
              display: "inline-block",
            }}
          />
        ))}
        
        {/* Top middle pill */}
        <div style={{
            margin: "0 auto",
            display: "flex", alignItems: "center", gap: 10,
            background: "var(--color-mockup-bg)", borderRadius: "8px", padding: "4px 16px",
            boxShadow: "inset 2px 2px 5px color-mix(in srgb, var(--color-sage) 20%, transparent), inset -2px -2px 5px #ffffff"
        }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-pine)" }}>Defnix Security Dashboard</span>
        </div>

        {/* Right side icons */}
        <div style={{ display: "flex", gap: 12, color: "var(--color-sage)" }}>
            <Menu size={16} />
            <Maximize2 size={16} />
        </div>
      </div>

      {/* Dashboard body */}
      <div className="dashboard-body" style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: "24px" }}>

        {/* Left Sidebar */}
        <div className="dashboard-sidebar" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
                <h4 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-sage)", fontWeight: 700, marginBottom: 12 }}>Workspaces</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--color-mist)", padding: "10px 14px", borderRadius: "10px", color: "var(--color-surface)", fontWeight: 600, fontSize: "13px", boxShadow: "2px 2px 6px color-mix(in srgb, var(--color-sage) 40%, transparent)" }}>
                    🚀 Default Space
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", color: "var(--color-pine)", fontWeight: 500, fontSize: "13px" }}>
                    🔒 Compliance
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", color: "var(--color-pine)", fontWeight: 500, fontSize: "13px" }}>
                    ☁️ Cloud Config
                </div>
            </div>

            <div>
                <h4 style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-sage)", fontWeight: 700, marginBottom: 12 }}>Quick Stats</h4>
                {metrics.slice(0, 2).map(m => (
                    <div key={m.label} style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-surface)", lineHeight: 1 }}>{m.value}</div>
                        <div style={{ fontSize: "11px", color: "var(--color-pine)" }}>{m.label}</div>
                    </div>
                ))}
            </div>
        </div>

        {/* Main Content Area */}
        <div className="dashboard-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            
            {statusItems.map((item) => {
                const Icon = item.icon;
                return (
                    <div key={item.label} style={{
                        background: "var(--color-mockup-bg)",
                        borderRadius: "16px",
                        padding: "24px",
                        boxShadow: "4px 4px 10px color-mix(in srgb, var(--color-sage) 20%, transparent), -4px -4px 10px #ffffff",
                        display: "flex", flexDirection: "column", justifyContent: "space-between",
                        minHeight: "160px"
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: "10px",
                                background: "var(--color-mist)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "inset 2px 2px 4px #ffffff, inset -2px -2px 4px color-mix(in srgb, var(--color-sage) 40%, transparent)"
                            }}>
                                <Icon size={18} color="var(--color-surface)" />
                            </div>
                            <MoreHorizontal size={18} color="var(--color-sage)" />
                        </div>
                        <div>
                            <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-surface)", marginBottom: 6 }}>{item.label}</div>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 6,
                                background: "var(--color-mockup-bg-alt)", padding: "4px 10px", borderRadius: "999px",
                                fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-pine)",
                                boxShadow: "inset 1px 1px 3px color-mix(in srgb, var(--color-sage) 30%, transparent)"
                            }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.dot }} />
                                {item.status}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .dashboard-body { grid-template-columns: 1fr !important; padding: 20px !important; }
          .dashboard-sidebar { flex-direction: row !important; flex-wrap: wrap !important; gap: 16px !important; }
          .dashboard-main-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
        }
      `}</style>
    </div>
  );
}

/* ─── Main Hero ─────────────────────────────────────────────── */
export function HeroSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    
    // Parallax effects for the background shapes
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="hero-section"
      style={{
        backgroundColor: "var(--color-mockup-sky)", // Light fresh background reminiscent of Craft
        minHeight: "130vh", // Extra height to allow scrolling the mockup
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "160px",
        overflow: "hidden",
        position: "relative",
      }}
    >
        {/* ── Illustrative Background Layers (Craft style) ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            {/* Base gradient */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, var(--color-mist) 0%, var(--color-sage) 40%, var(--color-surface) 100%)", opacity: 0.8 }} />
            
            {/* Sun / Orb */}
            <motion.div style={{ y: y1, position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, #F4F8F6 0%, transparent 70%)", filter: "blur(40px)" }} />
            
            {/* Distant Hills / Waves */}
            <motion.div style={{ y: y2, position: "absolute", bottom: "30%", left: "-10%", width: "120%", height: "40%" }}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                    <path fill="var(--color-pine)" d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,96C672,85,768,107,864,122.7C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </motion.div>

            {/* Foreground Hills / Waves */}
            <motion.div style={{ y: y3, position: "absolute", bottom: "10%", left: "-5%", width: "110%", height: "50%" }}>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                    <path fill="var(--color-surface)" d="M0,224L60,213.3C120,203,240,181,360,192C480,203,600,245,720,234.7C840,224,960,160,1080,149.3C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </motion.div>

            {/* Very front dark base that blends into the next section */}
            <div style={{ position: "absolute", bottom: "-10px", left: 0, width: "100%", height: "25%", background: "var(--color-surface)" }} />
        </div>

      {/* ── Headline block ──────────────────────────────────── */}
      <div style={{ textAlign: "center", padding: "0 24px", zIndex: 10, width: "100%", maxWidth: "1200px" }}>

        {/* Main headline — Craft style: Massive, confident, elegant */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-headline)",
            fontWeight: 700,
            fontSize: "clamp(3.5rem, 8vw, 7rem)", // Significantly larger
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "var(--color-glass-deep)", // Dark text on the light sky background
            textShadow: "0 4px 24px rgba(255,255,255,0.4)", // Subtle glow to stand out
            maxWidth: "14ch",
            margin: "0 auto 24px",
          }}
        >
          Security engineering that earns your customers&apos; trust.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            fontWeight: 500,
            lineHeight: 1.5,
            color: "var(--color-surface)",
            maxWidth: "42ch",
            margin: "0 auto 48px",
            display: "block",
          }}
        >
          SOC2 compliance, cloud resilience, and AI-driven security — plus the websites, apps, and automation to run your business.
        </motion.p>

        {/* CTA — primary + secondary, clear hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 80,
          }}
        >
          <Link href="/contact" className="hero-cta-primary">
            Book a Free Consultation
          </Link>
          <Link href="/solutions" className="hero-cta-secondary">
            Explore Solutions
          </Link>
        </motion.div>
      </div>

      {/* ── Floating dashboard mockup — overlapping the background ── */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          paddingLeft: "clamp(16px, 4vw, 80px)",
          paddingRight: "clamp(16px, 4vw, 80px)",
          position: "relative",
          zIndex: 10,
          marginTop: "auto", // Push to bottom
        }}
      >
        <DashboardMockup />
      </motion.div>
    </section>
  );
}
