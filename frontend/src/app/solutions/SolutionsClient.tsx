"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { solutionGroups, getSolutionsByGroup, type Solution, type SolutionGroup } from "@/lib/solutions-data";

/* ── Individual card ─────────────────────────────── */
function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
    const offset = index % 2;
    const indentClass = offset === 1 ? "lg:ml-16" : "";
    const IconComponent = solution.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            className={indentClass}
        >
            <Link href={solution.href} className="block group">
                <div
                    className="neu-sol-card solution-card"
                    style={{
                        borderRadius: "22px",
                        padding: "clamp(24px, 4vw, 36px)",
                        position: "relative",
                        overflow: "hidden",
                        background: "linear-gradient(145deg, var(--color-secondary), #2d4449)",
                        border: "1px solid rgba(82,121,111,0.18)",
                        boxShadow: "7px 7px 18px #1e2b31, -3px -3px 12px #3f5461",
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ["--accent" as any]: solution.accentColor,
                    }}
                >
                    {/* Top accent */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${solution.accentColor}, transparent)` }} />
                    {/* Corner glow */}
                    <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, color-mix(in srgb, ${solution.accentColor} 10%, transparent), transparent 70%)`, pointerEvents: "none" }} />

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left column */}
                        <div style={{ flexShrink: 0, width: "280px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                                <div style={{
                                    width: 50, height: 50, borderRadius: "14px",
                                    background: "linear-gradient(145deg, #2a3d45, var(--color-secondary))",
                                    border: `1px solid color-mix(in srgb, ${solution.accentColor} 30%, transparent)`,
                                    boxShadow: `3px 3px 8px #1e2b31, -2px -2px 6px #3f5461, 0 0 10px color-mix(in srgb, ${solution.accentColor} 18%, transparent)`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "22px", flexShrink: 0,
                                }}>
                                    <IconComponent size={24} color={solution.accentColor} />
                                </div>
                                <div style={{ background: "rgba(30,43,49,0.7)", border: `1px solid color-mix(in srgb, ${solution.accentColor} 25%, transparent)`, borderRadius: "8px", padding: "4px 10px", boxShadow: "inset 2px 2px 5px rgba(30,43,49,0.8)" }}>
                                    <span style={{ fontSize: "10px", color: solution.accentColor, letterSpacing: "0.06em", fontWeight: 500 }}>▲ {solution.risk}</span>
                                </div>
                            </div>

                            <h3 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "#CAD2C5", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 6 }}>
                                {solution.title}
                            </h3>
                            <p style={{ fontSize: "12px", color: "rgba(202,210,197,0.4)", marginBottom: 20 }}>{solution.subtitle}</p>

                            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(30,43,49,0.6)", border: `1px solid color-mix(in srgb, ${solution.accentColor} 30%, transparent)`, borderRadius: "14px", padding: "10px 16px", boxShadow: "inset 2px 2px 6px #1e2b31, inset -1px -1px 4px #3f5461" }}>
                                <span style={{ fontFamily: "var(--font-headline)", fontSize: "1.8rem", fontWeight: 700, color: solution.accentColor, lineHeight: 1 }}>{solution.metric}</span>
                                <span style={{ fontSize: "10px", color: "rgba(202,210,197,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{solution.metricLabel}</span>
                            </div>
                        </div>

                        {/* Right column */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: "14.5px", color: "rgba(202,210,197,0.6)", lineHeight: 1.75, marginBottom: 24 }}>{solution.description}</p>
                            <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px", marginBottom: 24 }}>
                                {solution.capabilities.map((cap) => (
                                    <li key={cap} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                        <CheckCircle size={12} color={solution.accentColor} style={{ marginTop: 3, flexShrink: 0 }} />
                                        <span style={{ fontSize: "13px", color: "rgba(202,210,197,0.5)", lineHeight: 1.5 }}>{cap}</span>
                                    </li>
                                ))}
                            </ul>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: solution.accentColor, fontSize: "13px", fontWeight: 500 }}>
                                learn more <ArrowRight size={13} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

/* ── One group of solutions with its own heading ─── */
function SolutionsGroupSection({ groupId }: { groupId: SolutionGroup }) {
    const meta = solutionGroups.find((g) => g.id === groupId)!;
    const items = getSolutionsByGroup(groupId);

    return (
        <div className="mb-20 last:mb-0">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-8">
                <p style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#52796F", fontWeight: 600 }}>
                    {meta.eyebrow}
                </p>
                <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 600, color: "#CAD2C5" }}>
                    {meta.label}
                </h2>
                <p style={{ fontSize: "13px", color: "rgba(202,210,197,0.45)", maxWidth: "48ch" }}>
                    {meta.description}
                </p>
            </div>
            <div className="space-y-6">
                {items.map((solution, index) => (
                    <SolutionCard key={solution.slug} solution={solution} index={index} />
                ))}
            </div>
        </div>
    );
}

/* ── Full grouped list, exported for page.tsx ─────── */
export function SolutionsList() {
    return (
        <>
            {solutionGroups.map((group) => (
                <SolutionsGroupSection key={group.id} groupId={group.id} />
            ))}
        </>
    );
}

/* ── CTA button (client — needs hover state) ─────── */
export function SolutionsCtaButton() {
    return (
        <Link href="/contact" className="btn-primary" style={{ gap: 8, padding: "14px 32px" }}>
            book a free consultation <ArrowRight size={14} />
        </Link>
    );
}
