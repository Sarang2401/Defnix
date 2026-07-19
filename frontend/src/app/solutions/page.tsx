import type { Metadata } from "next";
import * as motion from "framer-motion/client";
import { SolutionsList, SolutionsCtaButton } from "./SolutionsClient";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
    title: "Solutions — Defnix",
    description: "Security engineering, SOC2 compliance, cloud resilience, AI-driven automation, website development, mobile apps, and business workflow automation.",
};

export default function SolutionsPage() {
    return (
        <div className="pt-28 pb-20" style={{ backgroundColor: "var(--color-surface)", position: "relative", overflow: "hidden" }}>
            {/* Technical Isometric Grid Background */}
            <div style={{ position: "absolute", top: -100, right: -200, width: "1200px", height: "800px", zIndex: 0, opacity: 0.4, pointerEvents: "none", transform: "rotateX(60deg) rotateZ(-45deg)" }}>
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="isometricGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="color-mix(in srgb, var(--color-sage) 15%, transparent)" strokeWidth="1"/>
                            <rect width="60" height="60" fill="color-mix(in srgb, var(--color-pine) 2%, transparent)"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#isometricGrid)" />
                </svg>
            </div>
            {/* Soft fade for grid */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 20%, var(--color-surface) 70%)", pointerEvents: "none", zIndex: 0 }} />

            {/* ── Header ─────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 mb-6 relative z-10">
                <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Solutions" }]} />
            </section>
            <section className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <p className="eyebrow" style={{ marginBottom: 20 }}>what we do</p>
                    <h1 style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                        fontWeight: 700, lineHeight: 1.08,
                        letterSpacing: "-0.03em", color: "var(--color-mist)", marginBottom: 20,
                    }}>
                        three disciplines.{" "}
                        <span className="text-gradient-sage">one</span>{" "}engineering studio.
                    </h1>
                    <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "color-mix(in srgb, var(--color-mist) 55%, transparent)", maxWidth: "56ch" }}>
                        security &amp; compliance, ai-driven operations, and product engineering — organized so you can find the right fit fast, whether that&apos;s an audit deadline or a new website.
                    </p>
                </motion.div>
            </section>

            {/* ── Solutions list (client), grouped by discipline ── */}
            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <SolutionsList />
            </section>

            {/* ── Bottom CTA ─────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 mt-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        borderRadius: "24px", textAlign: "center",
                        padding: "clamp(40px, 6vw, 64px)",
                        position: "relative", overflow: "hidden",
                        background: "linear-gradient(145deg, var(--color-secondary), var(--color-surface), var(--color-secondary))",
                        border: "1px solid color-mix(in srgb, var(--color-pine) 22%, transparent)",
                        boxShadow: "8px 8px 22px var(--color-neu-dark), -4px -4px 14px var(--color-neu-light)",
                    }}
                >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-sage) 50%, transparent), transparent)" }} />
                    <div style={{ position: "absolute", top: "-40px", left: "-40px", width: 200, height: 200, background: "radial-gradient(circle, color-mix(in srgb, var(--color-pine) 12%, transparent), transparent 70%)", filter: "blur(30px)", animation: "float-orb-a 12s ease-in-out infinite" }} />
                    <div style={{ position: "absolute", bottom: "-40px", right: "-40px", width: 180, height: 180, background: "radial-gradient(circle, color-mix(in srgb, var(--color-sage) 10%, transparent), transparent 70%)", filter: "blur(30px)", animation: "float-orb-b 15s ease-in-out infinite" }} />

                    <div style={{ position: "relative", zIndex: 10 }}>
                        <h2 style={{
                            fontFamily: "var(--font-headline)",
                            fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em",
                            marginBottom: 16,
                        }} className="text-gradient-sage">
                            not sure which solution fits?
                        </h2>
                        <p style={{ fontSize: "15px", color: "color-mix(in srgb, var(--color-mist) 55%, transparent)", lineHeight: 1.7, maxWidth: "48ch", margin: "0 auto 32px" }}>
                            book a free 30-minute call — we&apos;ll map your goals to the right discipline and next steps.
                        </p>
                        <SolutionsCtaButton />
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
