"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CTASection() {
    const [btnHovered, setBtnHovered] = useState(false);

    return (
        <section className="section-gap relative overflow-hidden" style={{ background: "var(--color-surface)", paddingBottom: "180px" }}>
            {/* Massive bottom wave transitioning into footer */}
            <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, zIndex: 0, overflow: "hidden", lineHeight: 0 }}>
                <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ display: "block", width: "calc(100% + 1.3px)", height: "200px" }}>
                    <path fill="var(--color-glass-mid)" d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,69.3C1120,64,1280,64,1360,64L1440,64L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z"></path>
                    <path fill="var(--color-glass-deep)" d="M0,128L80,122.7C160,117,320,107,480,117.3C640,128,800,160,960,160C1120,160,1280,128,1360,112L1440,96L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z"></path>
                </svg>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8 }}
                    style={{ position: "relative", borderRadius: "28px", overflow: "hidden" }}
                >
                    {/* Neumorphic outer container */}
                    <div style={{
                        position: "relative",
                        borderRadius: "28px",
                        overflow: "hidden",
                        background: "linear-gradient(145deg, var(--color-secondary) 0%, var(--color-surface) 50%, var(--color-secondary) 100%)",
                        border: "1px solid color-mix(in srgb, var(--color-pine) 25%, transparent)",
                        boxShadow: "10px 10px 28px var(--color-neu-dark), -5px -5px 18px var(--color-neu-light)",
                        padding: "clamp(48px, 8vw, 80px) clamp(32px, 6vw, 80px)",
                        textAlign: "center",
                    }}>
                        {/* Animated floating orbs */}
                        <div className="animate-orb-a" style={{
                            position: "absolute",
                            top: "-60px", left: "-40px",
                            width: "280px", height: "280px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, color-mix(in srgb, var(--color-pine) 18%, transparent) 0%, transparent 70%)",
                            pointerEvents: "none",
                            filter: "blur(40px)",
                        }} />
                        <div className="animate-orb-b" style={{
                            position: "absolute",
                            bottom: "-80px", right: "-60px",
                            width: "320px", height: "320px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, color-mix(in srgb, var(--color-sage) 12%, transparent) 0%, transparent 70%)",
                            pointerEvents: "none",
                            filter: "blur(50px)",
                        }} />

                        {/* Top decorative gradient border */}
                        <div style={{
                            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                            background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-pine) 60%, transparent), color-mix(in srgb, var(--color-sage) 60%, transparent), color-mix(in srgb, var(--color-pine) 60%, transparent), transparent)",
                        }} />

                        {/* Dot grid overlay */}
                        <div className="bg-dot-grid absolute inset-0 opacity-20 pointer-events-none" />

                        {/* Corner shimmer accents */}
                        <div style={{
                            position: "absolute", top: 0, left: 0,
                            width: "200px", height: "200px",
                            background: "radial-gradient(circle at top left, color-mix(in srgb, var(--color-pine) 10%, transparent), transparent 60%)",
                            pointerEvents: "none",
                        }} />
                        <div style={{
                            position: "absolute", bottom: 0, right: 0,
                            width: "200px", height: "200px",
                            background: "radial-gradient(circle at bottom right, color-mix(in srgb, var(--color-sage) 8%, transparent), transparent 60%)",
                            pointerEvents: "none",
                        }} />

                        {/* Content */}
                        <div style={{ position: "relative", zIndex: 10 }}>
                            {/* Eyebrow pill */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}
                            >
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: 7,
                                    background: "color-mix(in srgb, var(--color-neu-dark) 60%, transparent)",
                                    border: "1px solid color-mix(in srgb, var(--color-pine) 25%, transparent)",
                                    borderRadius: "999px",
                                    padding: "6px 16px",
                                    boxShadow: "inset 2px 2px 6px color-mix(in srgb, var(--color-neu-dark) 80%, transparent), inset -1px -1px 4px color-mix(in srgb, var(--color-neu-light) 20%, transparent)",
                                }}>
                                    <Sparkles size={12} color="var(--color-sage)" />
                                    <span style={{
                                        fontSize: "11px", color: "var(--color-sage)",
                                        fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase",
                                    }}>
                                        free consultation
                                    </span>
                                </div>
                            </motion.div>

                            {/* Headline */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                style={{
                                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                                    fontWeight: 700,
                                    fontFamily: "var(--font-headline)",
                                    letterSpacing: "-0.03em",
                                    lineHeight: 1.1,
                                    marginBottom: 20,
                                    background: "linear-gradient(135deg, var(--color-mist) 0%, var(--color-sage) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                ready to build something great?
                            </motion.h2>

                            {/* Sub-copy */}
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.22 }}
                                style={{
                                    fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                                    color: "color-mix(in srgb, var(--color-mist) 55%, transparent)",
                                    fontFamily: "var(--font-body)",
                                    lineHeight: 1.7,
                                    maxWidth: "52ch",
                                    margin: "0 auto 40px",
                                }}
                            >
                                whether it&apos;s soc2 compliance, a website for your cafe, a booking app,
                                or automating your workflows — book a free consultation and let&apos;s talk.
                            </motion.p>

                            {/* CTA buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.35 }}
                                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}
                            >
                                {/* Primary CTA */}
                                <Link
                                    href="/contact"
                                    onMouseEnter={() => setBtnHovered(true)}
                                    onMouseLeave={() => setBtnHovered(false)}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: 8,
                                        backgroundColor: btnHovered ? "var(--color-sage)" : "var(--color-mist)",
                                        color: "var(--color-surface)",
                                        borderRadius: "999px",
                                        padding: "14px 32px",
                                        fontFamily: "var(--font-label)",
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        textDecoration: "none",
                                        boxShadow: btnHovered
                                            ? "inset 2px 2px 6px color-mix(in srgb, var(--color-neu-dark) 20%, transparent), 0 0 20px color-mix(in srgb, var(--color-sage) 30%, transparent)"
                                            : "5px 5px 14px var(--color-neu-dark), -2px -2px 8px var(--color-neu-light)",
                                        transform: btnHovered ? "scale(0.98)" : "scale(1)",
                                        transition: "all 0.25s ease",
                                    }}
                                >
                                    book a consultation
                                    <motion.span animate={{ x: btnHovered ? 3 : 0 }} transition={{ duration: 0.2 }}>
                                        <ArrowRight size={14} />
                                    </motion.span>
                                </Link>

                                {/* Secondary CTA */}
                                <Link
                                    href="/solutions"
                                    className="cta-secondary-link"
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: 8,
                                        background: "transparent",
                                        color: "color-mix(in srgb, var(--color-mist) 65%, transparent)",
                                        borderRadius: "999px",
                                        padding: "13px 28px",
                                        border: "1px solid color-mix(in srgb, var(--color-mist) 20%, transparent)",
                                        fontFamily: "var(--font-label)",
                                        fontSize: "0.75rem",
                                        fontWeight: 500,
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        textDecoration: "none",
                                        boxShadow: "3px 3px 8px var(--color-neu-dark), -2px -2px 6px var(--color-neu-light)",
                                    }}
                                >
                                    explore all solutions
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
