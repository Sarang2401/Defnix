import type { Metadata } from "next";
import * as motion from "framer-motion/client";
import { Sparkles } from "lucide-react";
import { ValueCard, AboutCtaButton } from "./AboutClient";

export const metadata: Metadata = {
    title: "About Us — Defnix",
    description: "We are an engineering-focused team specializing in cloud security, compliance readiness, and AI-driven automation for modern startups.",
};

const values = [
    { title: "Engineering First", description: "We solve compliance and security problems with code, not with slide decks. Every deliverable is a working system, not a recommendation.", accent: "#84A98C", iconName: "Settings" },
    { title: "Outcome Oriented", description: "We measure success by your results — audits passed, incidents prevented, response times reduced — not by hours billed.", accent: "#52796F", iconName: "Target" },
    { title: "Trust Through Transparency", description: "We document everything we build. When we leave, you own the entire system — the code, the runbooks, and the knowledge.", accent: "#CAD2C5", iconName: "Shield" },
    { title: "Pragmatic Innovation", description: "We use AI and automation where they create real leverage, not as buzzwords. Every technical decision is grounded in measurable impact.", accent: "#84A98C", iconName: "Lightbulb" },
];

const stats = [
    { value: "100%", label: "Client satisfaction", color: "#84A98C" },
    { value: "15+", label: "Projects delivered", color: "#52796F" },
    { value: "<1hr", label: "Avg response time", color: "#CAD2C5" },
    { value: "2wk", label: "Avg delivery time", color: "#84A98C" },
];

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20" style={{ backgroundColor: "var(--color-surface)", position: "relative", overflow: "hidden" }}>
            {/* Sweeping bezier curves background */}
            <div style={{ position: "absolute", top: -100, left: "-10%", width: "120vw", height: "800px", zIndex: 0, opacity: 0.6, pointerEvents: "none" }}>
                <svg viewBox="0 0 1440 800" preserveAspectRatio="none" width="100%" height="100%">
                    <path fill="rgba(82,121,111,0.06)" d="M0,320L60,341.3C120,363,240,405,360,405.3C480,405,600,363,720,336C840,309,960,299,1080,314.7C1200,331,1320,373,1380,394.7L1440,416L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                    <path fill="rgba(132,169,140,0.04)" d="M0,192L48,208C96,224,192,256,288,277.3C384,299,480,309,576,282.7C672,256,768,192,864,181.3C960,171,1056,213,1152,240C1248,267,1344,277,1392,282.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>

            {/* ── Hero ──────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 mb-28 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <div className="animate-pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#52796F", boxShadow: "0 0 8px rgba(82,121,111,0.8)" }} />
                        <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#52796F", fontWeight: 500 }}>about defnix</p>
                    </div>
                    <h1 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#CAD2C5", marginBottom: 24 }}>
                        we engineer the{" "}
                        <span style={{ background: "linear-gradient(135deg, #84A98C, #CAD2C5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>security infrastructure</span>
                        {" "}that startups need.
                    </h1>
                    <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(202,210,197,0.6)", maxWidth: "55ch" }}>
                        we are an engineering-focused team that builds across cloud security, compliance readiness, ai automation, website development, and mobile apps — for startups and small businesses worldwide. we don&apos;t consult — we build.
                    </p>
                </motion.div>
            </section>

            {/* ── Mission card ─────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 mb-24 relative z-10">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ borderRadius: "24px", padding: "clamp(32px, 5vw, 56px)", position: "relative", overflow: "hidden", background: "linear-gradient(145deg, #354F52 0%, #2d4449 100%)", border: "1px solid rgba(82,121,111,0.25)", boxShadow: "8px 8px 22px #1e2b31, -4px -4px 14px #3f5461" }}
                >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #84A98C, #52796F, transparent)" }} />
                    <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle at top right, rgba(132,169,140,0.1), transparent 65%)", pointerEvents: "none" }} />

                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                        <Sparkles size={14} color="#52796F" />
                        <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#52796F", fontWeight: 500 }}>our mission</p>
                    </div>
                    <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, color: "#CAD2C5", lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 16, maxWidth: "28ch" }}>
                        make great engineering accessible to every startup and small business.
                    </h2>
                    <p style={{ fontSize: "15px", color: "rgba(202,210,197,0.55)", lineHeight: 1.75, maxWidth: "56ch" }}>
                        whether you need soc2 compliance, cloud security, ai-driven automation, a website that wins local search, or a mobile app your customers actually love — we build it. no consultants, no slide decks. just engineering that works.
                    </p>
                </motion.div>
            </section>

            {/* ── Stats row ────────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 mb-24 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ borderRadius: "20px", background: "linear-gradient(145deg, #2d4449, #2F3E46, #354F52)", border: "1px solid rgba(82,121,111,0.2)", boxShadow: "inset 4px 4px 12px #1e2b31, inset -2px -2px 8px #3f5461", padding: "36px 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 24 }}
                >
                    {stats.map((stat, i) => (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} style={{ textAlign: "center" }}>
                            <p style={{ fontFamily: "var(--font-headline)", fontSize: "2.5rem", fontWeight: 700, color: stat.color, lineHeight: 1, marginBottom: 8, textShadow: `0 0 20px ${stat.color}40` }}>{stat.value}</p>
                            <p style={{ fontSize: "11px", color: "rgba(202,210,197,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── Values grid ──────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 mb-24 relative z-10">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: 40 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div className="animate-pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#52796F", boxShadow: "0 0 8px rgba(82,121,111,0.8)" }} />
                        <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#52796F", fontWeight: 500 }}>how we work</p>
                    </div>
                    <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 600, color: "#CAD2C5", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                        principles that guide{" "}<span style={{ color: "#84A98C" }}>every engagement.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {values.map((value, i) => (
                        <motion.div key={value.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                            {/* ValueCard is a client component — handles hover events */}
                            <ValueCard value={value} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── CTA ──────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ borderRadius: "24px", padding: "clamp(40px, 6vw, 64px)", textAlign: "center", position: "relative", overflow: "hidden", background: "linear-gradient(145deg, #354F52, #2F3E46, #354F52)", border: "1px solid rgba(82,121,111,0.22)", boxShadow: "8px 8px 22px #1e2b31, -4px -4px 14px #3f5461" }}
                >
                    <div style={{ position: "absolute", top: "-40px", left: "-40px", width: 220, height: 220, background: "radial-gradient(circle, rgba(82,121,111,0.15), transparent 70%)", filter: "blur(30px)", pointerEvents: "none", animation: "float-orb-a 12s ease-in-out infinite" }} />
                    <div style={{ position: "absolute", bottom: "-40px", right: "-40px", width: 200, height: 200, background: "radial-gradient(circle, rgba(132,169,140,0.1), transparent 70%)", filter: "blur(30px)", pointerEvents: "none", animation: "float-orb-b 15s ease-in-out infinite" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(132,169,140,0.5), transparent)" }} />

                    <div style={{ position: "relative", zIndex: 10 }}>
                        <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", background: "linear-gradient(135deg, #CAD2C5, #84A98C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 16 }}>
                            let&apos;s build something secure.
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(202,210,197,0.55)", lineHeight: 1.7, maxWidth: "48ch", margin: "0 auto 32px" }}>
                            whether you need soc2 certification, cloud resilience engineering, or ai-driven security automation — we&apos;re here to help.
                        </p>
                        <AboutCtaButton />
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
