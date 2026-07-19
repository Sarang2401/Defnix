"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle, ArrowRight, ShieldCheck, Cloud, Activity, Globe, Smartphone, Zap } from "lucide-react";

export type CaseStudyCategory = "Security" | "Web" | "Mobile" | "Automation";

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
    category: CaseStudyCategory;
};

const iconMap: Record<string, React.ElementType> = {
    ShieldCheck, Cloud, Activity, Globe, Smartphone, Zap
};

const filters: Array<"All" | CaseStudyCategory> = ["All", "Security", "Web", "Mobile", "Automation"];

/* ── Case file dossier card ───────────────────────── */
function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
    const offset = index % 3;
    const indentClass = offset === 1 ? "lg:ml-[7.5%] lg:w-[85%]" : offset === 2 ? "lg:ml-[15%] lg:w-[85%]" : "lg:w-[85%]";
    const IconComponent = iconMap[study.iconName] || Zap;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.3) }}
            className={indentClass}
            style={{ position: "relative" }}
        >
            {/* Folder tab — case file identifier, sits flush above the card */}
            <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--color-secondary)",
                border: "1px solid color-mix(in srgb, " + study.accentColor + " 30%, transparent)",
                borderBottom: "none",
                borderRadius: "10px 10px 0 0",
                padding: "8px 18px",
                marginLeft: "clamp(24px, 4vw, 44px)",
                position: "relative",
                zIndex: 1,
            }}>
                <IconComponent size={12} color={study.accentColor} />
                <span style={{
                    fontFamily: "ui-monospace, 'SF Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: study.accentColor,
                }}>
                    case file № {String(index + 1).padStart(2, "0")}
                </span>
            </div>

            <div style={{
                borderRadius: "0 22px 22px 22px",
                padding: "clamp(24px, 4vw, 44px)",
                position: "relative", overflow: "hidden",
                background: "linear-gradient(145deg, var(--color-secondary), var(--color-glass-mid))",
                border: `1px solid color-mix(in srgb, ${study.accentColor} 18%, var(--color-border))`,
                boxShadow: "7px 7px 18px var(--color-neu-dark), -3px -3px 12px var(--color-neu-light)",
            }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 150, height: 150, background: `radial-gradient(circle at top right, color-mix(in srgb, ${study.accentColor} 8%, transparent), transparent 70%)`, pointerEvents: "none" }} />

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                            <span style={{
                                fontFamily: "ui-monospace, 'SF Mono', monospace",
                                fontSize: "11px", color: "var(--color-text-muted)", letterSpacing: "0.04em",
                            }}>
                                {"// "}{study.client} · {study.industry}
                            </span>
                        </div>

                        <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "var(--color-mist)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 24 }}>{study.title}</h2>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px", marginBottom: 24 }}>
                            <div>
                                <p className="type-label" style={{ color: "var(--color-text-muted)", marginBottom: 8 }}>challenge</p>
                                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{study.challenge}</p>
                            </div>
                            <div>
                                <p className="type-label" style={{ color: "var(--color-text-muted)", marginBottom: 8 }}>solution</p>
                                <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{study.solution}</p>
                            </div>
                        </div>

                        <div className="neu-inset" style={{ padding: "16px 20px" }}>
                            <p className="type-label" style={{ color: "var(--color-text-muted)", marginBottom: 12 }}>results</p>
                            <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
                                {study.results.map((result) => (
                                    <li key={result} style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                                        <CheckCircle size={11} color={study.accentColor} style={{ marginTop: 3, flexShrink: 0 }} />
                                        <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{result}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Metric — rendered as a rotated ink-stamp seal */}
                    <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 150 }} className="hidden lg:flex">
                        <div style={{
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
                            width: 148, height: 148, borderRadius: "50%",
                            border: `2px dashed color-mix(in srgb, ${study.accentColor} 55%, transparent)`,
                            transform: "rotate(-8deg)",
                            padding: "12px",
                        }}>
                            <span style={{ fontFamily: "var(--font-headline)", fontSize: "2.35rem", fontWeight: 800, color: study.accentColor, lineHeight: 1, textShadow: `0 0 24px color-mix(in srgb, ${study.accentColor} 40%, transparent)` }}>{study.metric}</span>
                            <span style={{ fontSize: "9px", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center" }}>{study.metricLabel}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Explorer — interactive filter + filtered list ───────────── */
export function CaseStudiesExplorer({ studies }: { studies: CaseStudy[] }) {
    const [active, setActive] = useState<"All" | CaseStudyCategory>("All");
    const filtered = active === "All" ? studies : studies.filter((s) => s.category === active);

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 48 }}
                role="group"
                aria-label="Filter case studies by category"
            >
                {filters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() => setActive(filter)}
                        aria-pressed={active === filter}
                        className="blog-category-pill"
                        data-active={active === filter || undefined}
                        style={{
                            borderRadius: "999px",
                            border: "1px solid var(--color-border)",
                            padding: "6px 18px", fontSize: "11px",
                            textTransform: "uppercase", letterSpacing: "0.12em",
                            fontWeight: 500,
                            cursor: "pointer",
                        }}
                    >
                        {filter}
                    </button>
                ))}
            </motion.div>

            {filtered.length === 0 ? (
                <p style={{ color: "var(--color-text-muted)", fontSize: "14px", padding: "40px 0" }}>
                    No case studies in this category yet.
                </p>
            ) : (
                <div className="space-y-6">
                    {filtered.map((study, index) => (
                        <CaseStudyCard key={study.slug} study={study} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
}

export function CaseStudiesCtaButton() {
    return (
        <Link href="/contact" className="btn-primary" style={{ gap: 8 }}>
            book a free consultation <ArrowRight size={14} />
        </Link>
    );
}
