import type { Metadata } from "next";
import * as motion from "framer-motion/client";
import { ValueCard, AboutCtaButton } from "./AboutClient";

export const metadata: Metadata = {
    title: "About Us — Defnix",
    description: "An engineering studio building cloud security, compliance readiness, and AI-driven automation for startups and small businesses — not enterprises.",
};

const values = [
    { title: "Engineering First", description: "We solve compliance and security problems with code, not with slide decks. Every deliverable is a working system, not a recommendation.", iconName: "Settings" },
    { title: "Outcome Oriented", description: "We measure success by your results — audits passed, incidents prevented, response times reduced — not by hours billed.", iconName: "Target" },
    { title: "Trust Through Transparency", description: "We document everything we build. When we leave, you own the entire system — the code, the runbooks, and the knowledge.", iconName: "Shield" },
    { title: "Pragmatic Innovation", description: "We use AI and automation where they create real leverage, not as buzzwords. Every technical decision is grounded in measurable impact.", iconName: "Lightbulb" },
];

const stats = [
    { value: "100%", label: "Client satisfaction", color: "var(--color-surface)" },
    { value: "15+", label: "Projects delivered", color: "var(--color-pine)" },
    { value: "<1hr", label: "Avg response time", color: "var(--color-surface)" },
    { value: "2wk", label: "Avg delivery time", color: "var(--color-pine)" },
];

export default function AboutPage() {
    return (
        <div className="pb-20" style={{ backgroundColor: "var(--color-surface)", position: "relative", overflow: "hidden" }}>
            {/* Sweeping bezier curves background */}
            <div style={{ position: "absolute", top: -100, left: "-10%", width: "120vw", height: "800px", zIndex: 0, opacity: 0.6, pointerEvents: "none" }}>
                <svg viewBox="0 0 1440 800" preserveAspectRatio="none" width="100%" height="100%">
                    <path fill="color-mix(in srgb, var(--color-pine) 6%, transparent)" d="M0,320L60,341.3C120,363,240,405,360,405.3C480,405,600,363,720,336C840,309,960,299,1080,314.7C1200,331,1320,373,1380,394.7L1440,416L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                    <path fill="color-mix(in srgb, var(--color-sage) 4%, transparent)" d="M0,192L48,208C96,224,192,256,288,277.3C384,299,480,309,576,282.7C672,256,768,192,864,181.3C960,171,1056,213,1152,240C1248,267,1344,277,1392,282.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>

            {/* ── Hero ──────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 pt-32 mb-28 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <p className="eyebrow" style={{ marginBottom: 20 }}>about defnix</p>
                    <h1 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", color: "var(--color-mist)", marginBottom: 24 }}>
                        we engineer the{" "}
                        <span className="text-gradient-sage">security infrastructure</span>
                        {" "}startups need — enterprises already have it.
                    </h1>
                    <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--color-text-secondary)", maxWidth: "55ch" }}>
                        we are an engineering studio that builds across cloud security, compliance readiness, ai automation, website development, and mobile apps — for startups and small businesses worldwide. we don&apos;t consult — we build.
                    </p>
                </motion.div>
            </section>

            {/* ── Mission — editorial pull-quote, not another boxed card ── */}
            <section className="max-w-4xl mx-auto px-6 mb-28 relative z-10">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <span style={{
                        fontFamily: "var(--font-accent)", fontStyle: "italic", fontWeight: 600,
                        fontSize: "4rem", color: "color-mix(in srgb, var(--color-sage) 35%, transparent)",
                        lineHeight: 0.5, display: "block", marginBottom: 8,
                    }} aria-hidden="true">
                        &ldquo;
                    </span>
                    <p style={{
                        fontFamily: "var(--font-accent)", fontStyle: "italic", fontWeight: 500,
                        fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)", color: "var(--color-mist)",
                        lineHeight: 1.4, letterSpacing: "-0.01em", maxWidth: "26ch", marginBottom: 24,
                    }}>
                        make great engineering accessible to every startup and small business.
                    </p>
                    <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: 1.75, maxWidth: "56ch" }}>
                        whether you need soc2 compliance, cloud security, ai-driven automation, a website that wins local search, or a mobile app your customers actually love — we build it. no consultants, no slide decks. just engineering that works.
                    </p>
                </motion.div>
            </section>

            {/* ── Stats row — light section break, formalized via .section-light ── */}
            <section className="section-light relative z-10 mb-28">
                <div className="max-w-5xl mx-auto px-6 py-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 24 }}
                    >
                        {stats.map((stat, i) => (
                            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} style={{ textAlign: "center" }}>
                                <p style={{ fontFamily: "var(--font-headline)", fontSize: "2.5rem", fontWeight: 700, color: stat.color, lineHeight: 1, marginBottom: 8 }}>{stat.value}</p>
                                <p style={{ fontSize: "11px", color: "color-mix(in srgb, var(--color-surface) 55%, transparent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Values grid ──────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 mb-24 relative z-10">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: 40 }}>
                    <p className="eyebrow" style={{ marginBottom: 16 }}>how we work</p>
                    <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 600, color: "var(--color-mist)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                        principles that guide{" "}<span style={{ color: "var(--color-sage)" }}>every engagement.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {values.map((value, i) => (
                        <motion.div key={value.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                            {/* ValueCard is a client component — handles hover via the shared .neu-sol-card class */}
                            <ValueCard value={value} index={i} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── CTA ──────────────────────────────── */}
            <section className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    className="neu-raised"
                    style={{ padding: "clamp(40px, 6vw, 64px)", textAlign: "center", position: "relative", overflow: "hidden", background: "linear-gradient(145deg, var(--color-secondary), var(--color-surface), var(--color-secondary))" }}
                >
                    <div className="animate-orb-a" style={{ position: "absolute", top: "-40px", left: "-40px", width: 220, height: 220, background: "radial-gradient(circle, color-mix(in srgb, var(--color-pine) 15%, transparent), transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />
                    <div className="animate-orb-b" style={{ position: "absolute", bottom: "-40px", right: "-40px", width: 200, height: 200, background: "radial-gradient(circle, color-mix(in srgb, var(--color-sage) 10%, transparent), transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-sage) 50%, transparent), transparent)" }} />

                    <div style={{ position: "relative", zIndex: 10 }}>
                        <h2 className="text-gradient-sage" style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16 }}>
                            let&apos;s build something secure.
                        </h2>
                        <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: "48ch", margin: "0 auto 32px" }}>
                            whether you need soc2 certification, cloud resilience engineering, or ai-driven security automation — we&apos;re here to help.
                        </p>
                        <AboutCtaButton />
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
