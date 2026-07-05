"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle, Search, Layers, Rocket } from "lucide-react";

const steps = [
    {
        number: "01",
        name: "Diagnose",
        window: "Week 1–2",
        action: "We audit your current stack, controls, and operational bottlenecks with precision.",
        outcome: "A prioritized engineering roadmap with clear risk signals and ROI targets.",
        icon: Search,
        accentColor: "#84A98C",
    },
    {
        number: "02",
        name: "Architect",
        window: "Week 2–3",
        action: "We design resilient systems, automation workflows, and compliance controls.",
        outcome: "A build plan that balances speed, security, and long-term maintainability.",
        icon: Layers,
        accentColor: "#52796F",
    },
    {
        number: "03",
        name: "Deliver",
        window: "Week 3+",
        action: "We ship implementations, evidence pipelines, and operating runbooks.",
        outcome: "Measurable outcomes: faster audits, safer cloud posture, less manual work.",
        icon: Rocket,
        accentColor: "#CAD2C5",
    },
];

/* ── Connector line between cards ─────────────── */
function AnimatedConnector({ active }: { active: boolean }) {
    return (
        <div style={{
            position: "absolute", top: "50%", right: "-24px",
            transform: "translateY(-50%)",
            width: "44px", height: "2px",
            zIndex: 20,
            overflow: "hidden",
        }}>
            {/* Base line */}
            <div style={{
                position: "absolute", inset: 0,
                background: "rgba(82,121,111,0.2)",
                borderRadius: "2px",
            }} />
            {/* Animated dash */}
            <motion.div
                animate={{ x: active ? ["0%", "100%"] : "0%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute", top: 0, left: 0,
                    width: "40%", height: "100%",
                    background: "linear-gradient(90deg, transparent, #84A98C, transparent)",
                    borderRadius: "2px",
                }}
            />
        </div>
    );
}

/* ── Step number badge ────────────────────────── */
function StepBadge({ number, color }: { number: string; color: string }) {
    return (
        <div style={{ position: "relative", display: "inline-flex" }}>
            {/* Outer halo */}
            <div style={{
                position: "absolute", inset: -3,
                borderRadius: "50%",
                border: `1px solid ${color}25`,
                boxShadow: `0 0 12px ${color}15`,
            }} />
            {/* Badge */}
            <div style={{
                width: 52, height: 52,
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(145deg, #2d4449, #354F52)",
                border: `1px solid ${color}35`,
                boxShadow: `4px 4px 10px #1e2b31, -2px -2px 8px #3f5461, 0 0 10px ${color}20`,
                fontFamily: "var(--font-headline)",
                fontSize: "15px",
                fontWeight: 700,
                color: color,
                letterSpacing: "0.02em",
                flexShrink: 0,
            }}>
                {number}
            </div>
        </div>
    );
}

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
    const [hovered, setHovered] = useState(false);
    const Icon = step.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.12 }}
            style={{ position: "relative" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Animated connector (not on last card) */}
            {index < steps.length - 1 && (
                <AnimatedConnector active={hovered} />
            )}

            <div style={{
                borderRadius: "22px",
                padding: "28px",
                height: "100%",
                display: "flex", flexDirection: "column",
                position: "relative", overflow: "hidden",
                background: "linear-gradient(145deg, #354F52 0%, #2d4449 100%)",
                border: `1px solid ${hovered ? step.accentColor + "45" : "rgba(82,121,111,0.18)"}`,
                boxShadow: hovered
                    ? `inset 4px 4px 12px #1e2b31, inset -2px -2px 8px #3f5461, 0 0 28px ${step.accentColor}10`
                    : `7px 7px 18px #1e2b31, -4px -4px 12px #3f5461`,
                transition: "all 0.4s ease",
                cursor: "default",
            }}>
                {/* Top accent line */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: `linear-gradient(90deg, ${step.accentColor}80, transparent)`,
                    opacity: hovered ? 1 : 0.4,
                    transition: "opacity 0.35s ease",
                }} />

                {/* Corner decoration */}
                <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: 100, height: 100,
                    background: `radial-gradient(circle at top right, ${step.accentColor}10, transparent 70%)`,
                    pointerEvents: "none",
                }} />

                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
                    <StepBadge number={step.number} color={step.accentColor} />

                    <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                        background: "rgba(30,43,49,0.6)",
                        border: `1px solid ${step.accentColor}25`,
                        borderRadius: "999px",
                        padding: "4px 12px",
                        boxShadow: "inset 2px 2px 5px rgba(30,43,49,0.8), inset -1px -1px 3px rgba(63,84,97,0.2)",
                    }}>
                        <span style={{ fontSize: "11px", color: step.accentColor, fontWeight: 500, letterSpacing: "0.08em" }}>
                            {step.window}
                        </span>
                    </div>
                </div>

                {/* Step name */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, background: `rgba(255,255,255,0.05)` }}>
                        <Icon size={18} color={step.accentColor} />
                    </div>
                    <h3 style={{
                        fontSize: "1.45rem",
                        fontWeight: 700,
                        color: "#CAD2C5",
                        fontFamily: "var(--font-headline)",
                        letterSpacing: "-0.01em",
                    }}>
                        {step.name}
                    </h3>
                </div>

                {/* Action description */}
                <p style={{
                    fontSize: "14px",
                    color: hovered ? "rgba(202,210,197,0.7)" : "rgba(202,210,197,0.5)",
                    lineHeight: 1.7,
                    flex: 1,
                    transition: "color 0.35s ease",
                }}>
                    {step.action}
                </p>

                {/* Outcome box */}
                <div style={{
                    marginTop: 20,
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: "rgba(30,43,49,0.5)",
                    border: `1px solid ${step.accentColor}18`,
                    boxShadow: "inset 2px 2px 6px rgba(30,43,49,0.6), inset -1px -1px 4px rgba(63,84,97,0.15)",
                }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <CheckCircle size={13} color={step.accentColor} style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                            <p style={{
                                fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.12em",
                                color: "rgba(202,210,197,0.3)", marginBottom: 4, fontWeight: 600,
                            }}>
                                outcome
                            </p>
                            <p style={{
                                fontSize: "12.5px",
                                color: hovered ? step.accentColor : "rgba(202,210,197,0.4)",
                                lineHeight: 1.55,
                                transition: "color 0.35s ease",
                            }}>
                                {step.outcome}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function HowWeWorkSection() {
    return (
        <section
            className="section-gap relative"
            style={{ overflow: "clip", borderTop: "1px solid rgba(82,121,111,0.08)", background: "var(--color-surface)" }}
            id="how-we-work"
        >
            {/* Background Orbs */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
                <motion.div
                    animate={{ 
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.1, 1] 
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        top: "10%",
                        left: "-10%",
                        width: "60vw",
                        height: "60vw",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(132,169,140,0.05) 0%, transparent 60%)",
                        filter: "blur(60px)",
                    }}
                />
                <motion.div
                    animate={{ 
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                        scale: [1, 1.2, 1] 
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    style={{
                        position: "absolute",
                        bottom: "-20%",
                        right: "-10%",
                        width: "50vw",
                        height: "50vw",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(82,121,111,0.06) 0%, transparent 60%)",
                        filter: "blur(60px)",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="mb-16 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 6, height: 6, borderRadius: "50%", backgroundColor: "#52796F",
                                boxShadow: "0 0 8px rgba(82,121,111,0.8)",
                            }} className="animate-pulse-dot" />
                            <p style={{
                                fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
                                color: "#52796F", fontWeight: 500,
                            }}>
                                how we work
                            </p>
                        </div>
                        <h2 style={{
                            fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                            fontWeight: 600,
                            color: "#CAD2C5",
                            fontFamily: "var(--font-headline)",
                            lineHeight: 1.15,
                            letterSpacing: "-0.02em",
                        }}>
                            diagnose.{" "}
                            <span style={{ color: "#84A98C" }}>architect.</span>{" "}
                            deliver.
                        </h2>
                    </motion.div>
                </div>

                {/* Desktop: 3 cards with connectors */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-12 relative">
                    {steps.map((step, i) => (
                        <StepCard key={step.name} step={step} index={i} />
                    ))}
                </div>

                {/* Mobile: Vertical timeline */}
                <div className="lg:hidden space-y-4">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.name}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45, delay: i * 0.1 }}
                            style={{ display: "flex", gap: 16 }}
                        >
                            {/* Timeline left column */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <StepBadge number={step.number} color={step.accentColor} />
                                {i < steps.length - 1 && (
                                    <div style={{
                                        width: "2px", flex: 1, marginTop: 8, minHeight: 32,
                                        background: `linear-gradient(to bottom, ${step.accentColor}40, transparent)`,
                                    }} />
                                )}
                            </div>

                            {/* Card */}
                            <div style={{
                                flex: 1, marginBottom: 8,
                                borderRadius: "16px",
                                background: "linear-gradient(145deg, #354F52, #2d4449)",
                                border: `1px solid rgba(82,121,111,0.2)`,
                                boxShadow: "5px 5px 14px #1e2b31, -2px -2px 8px #3f5461",
                                padding: "20px",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <step.icon size={16} color={step.accentColor} />
                                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#CAD2C5", fontFamily: "var(--font-headline)" }}>
                                            {step.name}
                                        </h3>
                                    </div>
                                    <span style={{ fontSize: "10px", color: step.accentColor, fontWeight: 500 }}>{step.window}</span>
                                </div>
                                <p style={{ fontSize: "13px", color: "rgba(202,210,197,0.5)", lineHeight: 1.6, marginBottom: 12 }}>
                                    {step.action}
                                </p>
                                <div style={{
                                    padding: "10px 12px", borderRadius: "10px",
                                    background: "rgba(30,43,49,0.5)",
                                    border: `1px solid ${step.accentColor}18`,
                                }}>
                                    <p style={{ fontSize: "11px", color: "rgba(202,210,197,0.35)" }}>{step.outcome}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
