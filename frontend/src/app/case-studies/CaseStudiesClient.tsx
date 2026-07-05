"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, CheckCircle, ArrowRight, ShieldCheck, Cloud, Activity, Globe, Smartphone, Zap } from "lucide-react";

export type CaseStudy = {
    slug: string;
    client: string;
    industry: string;
    title: string;
    challenge: string;
    solution: string;
    results: string[];
    metric: string;
    metricLabel: string;
    accentColor: string;
    iconName: string;
};

const iconMap: Record<string, React.ElementType> = {
    ShieldCheck, Cloud, Activity, Globe, Smartphone, Zap
};

const filters = ["All", "Security", "Web", "Mobile", "Automation"];

/* ── Filter pills ─────────────────────────────────── */
export function FilterPills() {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {filters.map((filter) => (
                <div key={filter} style={{
                    borderRadius: "999px",
                    border: "1px solid rgba(82,121,111,0.2)",
                    background: "rgba(53,79,82,0.25)",
                    padding: "6px 18px", fontSize: "11px",
                    textTransform: "uppercase", letterSpacing: "0.12em",
                    color: "rgba(202,210,197,0.5)",
                    boxShadow: "3px 3px 8px #1e2b31, -1px -1px 5px #3f5461",
                    cursor: "pointer", transition: "all 0.2s ease", fontWeight: 500,
                }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#CAD2C5"; e.currentTarget.style.borderColor = "rgba(132,169,140,0.4)"; e.currentTarget.style.boxShadow = "inset 2px 2px 5px #1e2b31, inset -1px -1px 3px #3f5461"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(202,210,197,0.5)"; e.currentTarget.style.borderColor = "rgba(82,121,111,0.2)"; e.currentTarget.style.boxShadow = "3px 3px 8px #1e2b31, -1px -1px 5px #3f5461"; }}
                >
                    {filter}
                </div>
            ))}
        </div>
    );
}

/* ── Case study card ─────────────────────────────── */
function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
    const offset = index % 3;
    const indentClass = offset === 1 ? "lg:ml-[7.5%] lg:w-[85%]" : offset === 2 ? "lg:ml-[15%] lg:w-[85%]" : "lg:w-[85%]";
    const IconComponent = iconMap[study.iconName] || Zap;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3) }}
            className={indentClass}
        >
            <div style={{
                borderRadius: "22px", padding: "clamp(24px, 4vw, 44px)",
                position: "relative", overflow: "hidden",
                background: "linear-gradient(145deg, #354F52, #2d4449)",
                border: "1px solid rgba(82,121,111,0.18)",
                boxShadow: "7px 7px 18px #1e2b31, -3px -3px 12px #3f5461",
            }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${study.accentColor}80, transparent)` }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: 150, height: 150, background: `radial-gradient(circle at top right, ${study.accentColor}08, transparent 70%)`, pointerEvents: "none" }} />

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(30,43,49,0.6)", border: `1px solid ${study.accentColor}25`, borderRadius: "999px", padding: "4px 12px", boxShadow: "inset 2px 2px 5px rgba(30,43,49,0.8)" }}>
                                <IconComponent size={14} color={study.accentColor} />
                                <Building2 size={10} color={study.accentColor} />
                                <span style={{ fontSize: "10px", color: study.accentColor, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>{study.industry}</span>
                            </div>
                            <span style={{ fontSize: "11px", color: "rgba(202,210,197,0.4)", letterSpacing: "0.08em" }}>{study.client}</span>
                        </div>

                        <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "#CAD2C5", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 24 }}>{study.title}</h2>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px", marginBottom: 24 }}>
                            <div>
                                <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(202,210,197,0.3)", marginBottom: 8, fontWeight: 600 }}>challenge</p>
                                <p style={{ fontSize: "13px", color: "rgba(202,210,197,0.5)", lineHeight: 1.7 }}>{study.challenge}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(202,210,197,0.3)", marginBottom: 8, fontWeight: 600 }}>solution</p>
                                <p style={{ fontSize: "13px", color: "rgba(202,210,197,0.5)", lineHeight: 1.7 }}>{study.solution}</p>
                            </div>
                        </div>

                        <div style={{ padding: "16px 20px", borderRadius: "14px", background: "rgba(30,43,49,0.5)", border: `1px solid ${study.accentColor}15`, boxShadow: "inset 2px 2px 6px rgba(30,43,49,0.6), inset -1px -1px 4px rgba(63,84,97,0.15)" }}>
                            <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(202,210,197,0.3)", marginBottom: 12, fontWeight: 600 }}>results</p>
                            <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
                                {study.results.map((result) => (
                                    <li key={result} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                                        <CheckCircle size={11} color={study.accentColor} style={{ marginTop: 3, flexShrink: 0 }} />
                                        <span style={{ fontSize: "12px", color: "rgba(202,210,197,0.55)", lineHeight: 1.5 }}>{result}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Metric callout */}
                    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, borderLeft: "1px solid rgba(82,121,111,0.15)", paddingLeft: "clamp(24px, 3vw, 40px)", minWidth: 140 }} className="hidden lg:flex">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "24px 20px", borderRadius: "18px", background: "rgba(30,43,49,0.6)", border: `1px solid ${study.accentColor}25`, boxShadow: `inset 3px 3px 8px #1e2b31, inset -1px -1px 5px #3f5461, 0 0 16px ${study.accentColor}10` }}>
                            <span style={{ fontFamily: "var(--font-headline)", fontSize: "3rem", fontWeight: 800, color: study.accentColor, lineHeight: 1, textShadow: `0 0 24px ${study.accentColor}60` }}>{study.metric}</span>
                            <span style={{ fontSize: "10px", color: "rgba(202,210,197,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center" }}>{study.metricLabel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function CaseStudiesList({ studies }: { studies: CaseStudy[] }) {
    return (
        <div className="space-y-6">
            {studies.map((study, index) => (
                <CaseStudyCard key={study.slug} study={study} index={index} />
            ))}
        </div>
    );
}

export function CaseStudiesCtaButton() {
    return (
        <Link href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            backgroundColor: "#CAD2C5", color: "#2F3E46",
            borderRadius: "999px", padding: "14px 32px",
            fontFamily: "var(--font-label)", fontSize: "0.75rem",
            fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "4px 4px 12px #1e2b31, -2px -2px 8px #3f5461",
            transition: "all 0.25s ease",
        }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#84A98C"; e.currentTarget.style.boxShadow = "inset 2px 2px 6px rgba(30,43,49,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#CAD2C5"; e.currentTarget.style.boxShadow = "4px 4px 12px #1e2b31, -2px -2px 8px #3f5461"; }}
        >
            book a consultation <ArrowRight size={14} />
        </Link>
    );
}
