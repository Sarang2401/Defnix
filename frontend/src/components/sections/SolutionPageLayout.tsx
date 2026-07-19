"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition } from "../ui/PageTransition";
import { Breadcrumb } from "../ui/Breadcrumb";
import { Button } from "../ui/Button";
import { solutions } from "@/lib/solutions-data";
import {
    ArrowRight, ArrowUpRight, AlertTriangle, Users, Target, Cpu, Package, Handshake,
    Shield, Cloud, Brain, Globe, Smartphone, Workflow, Zap, CheckCircle, type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    AlertTriangle, Users, Target, Cpu, Package, Handshake,
    Shield, Cloud, Brain, Globe, Smartphone, Workflow, Zap,
};

interface SectionBlock { iconName: string; title: string; content: string | string[]; }

interface SolutionPageProps {
    iconName: string; label: string; title: string; subtitle: string; slug?: string;
    sections: { problem: SectionBlock; audience: SectionBlock; risks: SectionBlock; approach: SectionBlock; capabilities: SectionBlock; deliverables: SectionBlock; engagement: SectionBlock; };
}

const SECTION_ORDER = ["problem", "audience", "risks", "approach", "capabilities", "deliverables", "engagement"] as const;
type SectionKey = typeof SECTION_ORDER[number];

/* ── List / prose content, varied by section type ─────────────── */
function SectionBody({ id, content, accent }: { id: SectionKey; content: string | string[]; accent: string }) {
    if (typeof content === "string") {
        return (
            <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.8, fontSize: "1.02rem", maxWidth: "62ch" }}>
                {content}
            </p>
        );
    }

    // "risks" reads as a caution list; everything else as positive check-grid.
    const isRisk = id === "risks";
    const ItemIcon = isRisk ? AlertTriangle : CheckCircle;

    return (
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {content.map((item, i) => (
                <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.25) }}
                    className="flex items-start gap-3"
                    style={{
                        padding: "14px 16px",
                        borderRadius: "12px",
                        background: "color-mix(in srgb, var(--color-neu-dark) 35%, transparent)",
                        border: `1px solid color-mix(in srgb, ${accent} 12%, transparent)`,
                    }}
                >
                    <ItemIcon size={16} color={accent} style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ color: "var(--color-text-secondary)", lineHeight: 1.6, fontSize: "0.92rem" }}>{item}</span>
                </motion.li>
            ))}
        </ul>
    );
}

/* ── One anchored section ─────────────────────────────────────── */
function Section({ id, index, section, accent }: { id: SectionKey; index: number; section: SectionBlock; accent: string }) {
    const Icon = iconMap[section.iconName] || AlertTriangle;
    return (
        <motion.section
            id={id}
            data-section={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            style={{ scrollMarginTop: "120px" }}
            className="neu-raised"
        >
            <div style={{ padding: "clamp(28px, 4vw, 44px)", position: "relative", overflow: "hidden", borderRadius: "var(--radius-md)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, color-mix(in srgb, ${accent} 70%, transparent), transparent)` }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: 160, height: 160, background: `radial-gradient(circle at top right, color-mix(in srgb, ${accent} 8%, transparent), transparent 70%)`, pointerEvents: "none" }} />

                <div className="flex items-center gap-4 mb-6">
                    <div style={{
                        width: 44, height: 44, borderRadius: "13px", flexShrink: 0,
                        background: "linear-gradient(145deg, var(--color-glass-mid), var(--color-secondary))",
                        border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
                        boxShadow: `inset 1px 1px 3px color-mix(in srgb, var(--color-neu-light) 30%, transparent), 0 0 10px color-mix(in srgb, ${accent} 12%, transparent)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <Icon size={20} color={accent} />
                    </div>
                    <div>
                        <span style={{ fontFamily: "ui-monospace, 'SF Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", color: "color-mix(in srgb, var(--color-mist) 35%, transparent)" }}>
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", fontWeight: 600, color: "var(--color-mist)", letterSpacing: "-0.01em", lineHeight: 1.15 }}>
                            {section.title}
                        </h2>
                    </div>
                </div>

                <SectionBody id={id} content={section.content} accent={accent} />
            </div>
        </motion.section>
    );
}

/* ── Sticky scroll-spy table of contents (desktop) ────────────── */
function TableOfContents({ sections, active, accent }: { sections: { id: SectionKey; title: string }[]; active: SectionKey; accent: string }) {
    const jump = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: y, behavior: "smooth" });
    };

    return (
        <nav aria-label="On this page" className="hidden lg:block sticky" style={{ top: 120 }}>
            <p className="type-label" style={{ color: "var(--color-text-muted)", marginBottom: 16 }}>on this page</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 2, borderLeft: "1px solid var(--color-border)" }}>
                {sections.map((s, i) => {
                    const isActive = s.id === active;
                    return (
                        <li key={s.id}>
                            <button
                                onClick={() => jump(s.id)}
                                style={{
                                    display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
                                    padding: "7px 0 7px 16px", marginLeft: "-1px",
                                    borderLeft: `2px solid ${isActive ? accent : "transparent"}`,
                                    color: isActive ? "var(--color-mist)" : "var(--color-text-muted)",
                                    fontSize: "0.82rem", fontWeight: isActive ? 600 : 400,
                                    cursor: "pointer", transition: "color 0.2s ease, border-color 0.2s ease",
                                }}
                            >
                                <span style={{ fontFamily: "ui-monospace, 'SF Mono', monospace", fontSize: "10px", color: isActive ? accent : "color-mix(in srgb, var(--color-mist) 25%, transparent)" }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                {s.title}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export function SolutionPageLayout({ iconName, label, title, subtitle, slug, sections }: SolutionPageProps) {
    const HeroIcon = iconMap[iconName] || Shield;
    const solution = slug ? solutions.find((s) => s.slug === slug) : undefined;
    const accent = solution?.accentColor || "var(--color-sage)";
    const risk = solution?.risk;

    const ordered = SECTION_ORDER.map((id) => ({ id, ...sections[id] }));
    const [active, setActive] = useState<SectionKey>("problem");

    // Scroll-spy — highlight the section nearest the top of the viewport.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.getAttribute("data-section") as SectionKey);
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        const els = document.querySelectorAll("[data-section]");
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const related = solutions.filter((s) => s.slug !== slug).slice(0, 3);

    return (
        <div className="pt-28 pb-20" style={{ backgroundColor: "var(--color-surface)", position: "relative", overflow: "hidden" }}>
            {/* Accent glow orbs, tinted to this solution */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
                <div className="animate-orb-a" style={{ position: "absolute", top: "-8%", right: "-6%", width: 460, height: 460, borderRadius: "50%", background: `radial-gradient(circle, color-mix(in srgb, ${accent} 12%, transparent), transparent 70%)`, filter: "blur(50px)" }} />
                <div className="animate-orb-b" style={{ position: "absolute", top: "40%", left: "-10%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--color-pine) 8%, transparent), transparent 70%)", filter: "blur(60px)" }} />
                <div className="absolute inset-0 bg-dot-grid opacity-[0.12]" />
            </div>

            {/* ── Hero ─────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-6 mb-16 relative z-10">
                <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: title }]} />

                <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-center">
                    {/* Left — copy */}
                    <PageTransition>
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div style={{
                                    width: 44, height: 44, borderRadius: "13px",
                                    background: "linear-gradient(145deg, var(--color-secondary), var(--color-glass-mid))",
                                    border: `1px solid color-mix(in srgb, ${accent} 35%, transparent)`,
                                    boxShadow: `0 0 14px color-mix(in srgb, ${accent} 18%, transparent)`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <HeroIcon size={22} color={accent} />
                                </div>
                                <span className="type-label" style={{ color: accent }}>{label}</span>
                            </div>

                            <h1 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(2.4rem, 5vw, 3.75rem)", fontWeight: 700, color: "var(--color-mist)", letterSpacing: "-0.03em", lineHeight: 1.06, marginBottom: 20 }}>
                                {title}
                            </h1>

                            <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.75, fontSize: "1.1rem", maxWidth: "52ch", marginBottom: 28 }}>
                                {subtitle}
                            </p>

                            {/* The stakes — the real risk stat, pulled out */}
                            {risk && (
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: 10,
                                    padding: "12px 18px", borderRadius: "999px", marginBottom: 32,
                                    background: "color-mix(in srgb, var(--color-neu-dark) 45%, transparent)",
                                    border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                                    boxShadow: "inset 2px 2px 6px color-mix(in srgb, var(--color-neu-dark) 60%, transparent)",
                                }}>
                                    <AlertTriangle size={15} color={accent} style={{ flexShrink: 0 }} />
                                    <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>{risk}</span>
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-4">
                                <Button variant="primary" size="lg" href="/contact">book a free consultation <ArrowRight size={18} /></Button>
                                <button
                                    onClick={() => { const el = document.getElementById("problem"); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" }); }}
                                    className="cta-secondary-link"
                                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: "999px", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)", fontFamily: "var(--font-label)", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", background: "transparent" }}
                                >
                                    explore details
                                </button>
                            </div>
                        </div>
                    </PageTransition>

                    {/* Right — the outcome metric, marketing-card style */}
                    {solution && (
                        <PageTransition delay={0.15}>
                            <div style={{
                                borderRadius: "24px", padding: "36px 32px", position: "relative", overflow: "hidden",
                                background: "linear-gradient(145deg, var(--color-secondary), var(--color-glass-deep))",
                                border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                                boxShadow: `8px 8px 22px var(--color-neu-dark), -4px -4px 14px var(--color-neu-light), 0 0 30px color-mix(in srgb, ${accent} 8%, transparent)`,
                            }}>
                                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 0%, color-mix(in srgb, ${accent} 12%, transparent), transparent 60%)`, pointerEvents: "none" }} />
                                <div style={{ position: "relative", zIndex: 1 }}>
                                    <p className="type-label" style={{ color: "color-mix(in srgb, var(--color-mist) 45%, transparent)", marginBottom: 18 }}>the outcome</p>
                                    <div style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(3.5rem, 7vw, 5rem)", fontWeight: 800, color: accent, lineHeight: 1, letterSpacing: "-0.03em", textShadow: `0 0 40px color-mix(in srgb, ${accent} 35%, transparent)` }}>
                                        {solution.metric}
                                    </div>
                                    <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", marginTop: 12, lineHeight: 1.5 }}>
                                        {solution.metricLabel}
                                    </p>
                                    <div className="divider-gradient" style={{ margin: "24px 0" }} />
                                    <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        {solution.capabilities.slice(0, 3).map((cap) => (
                                            <li key={cap} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                                <CheckCircle size={13} color={accent} style={{ flexShrink: 0, marginTop: 3 }} />
                                                <span style={{ fontSize: "0.82rem", color: "color-mix(in srgb, var(--color-mist) 60%, transparent)", lineHeight: 1.45 }}>{cap}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </PageTransition>
                    )}
                </div>
            </section>

            {/* ── Body: sticky TOC + sections ──────────────── */}
            <section className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-[200px_1fr] gap-10 lg:gap-16">
                    <TableOfContents sections={ordered.map((s) => ({ id: s.id, title: s.title }))} active={active} accent={accent} />
                    <div className="flex flex-col gap-6 min-w-0">
                        {ordered.map((s, i) => (
                            <Section key={s.id} id={s.id} index={i} section={s} accent={accent} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Related solutions ────────────────────────── */}
            <section className="max-w-6xl mx-auto px-6 mt-24 relative z-10">
                <p className="eyebrow" style={{ marginBottom: 24 }}>keep exploring</p>
                <div className="grid sm:grid-cols-3 gap-4">
                    {related.map((s) => {
                        const RIcon = s.icon;
                        return (
                            <Link key={s.slug} href={s.href} className="neu-raised group" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 12, borderRadius: "var(--radius-md)", textDecoration: "none" }}>
                                <div className="flex items-center justify-between">
                                    <div style={{
                                        width: 40, height: 40, borderRadius: "11px",
                                        background: "linear-gradient(145deg, var(--color-glass-mid), var(--color-secondary))",
                                        border: `1px solid color-mix(in srgb, ${s.accentColor} 28%, transparent)`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        <RIcon size={18} color={s.accentColor} />
                                    </div>
                                    <ArrowUpRight size={16} color="var(--color-text-muted)" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: "var(--font-headline)", fontSize: "1rem", fontWeight: 600, color: "var(--color-mist)", marginBottom: 4, lineHeight: 1.25 }}>{s.title}</h3>
                                    <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", lineHeight: 1.5 }}>{s.subtitle}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* ── Final CTA ────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-6 mt-16 relative z-10">
                <PageTransition>
                    <div
                        className="text-center relative overflow-hidden"
                        style={{
                            borderRadius: "24px", padding: "clamp(40px, 6vw, 64px)",
                            background: "linear-gradient(145deg, var(--color-secondary), var(--color-surface), var(--color-secondary))",
                            border: `1px solid color-mix(in srgb, ${accent} 22%, transparent)`,
                            boxShadow: "8px 8px 22px var(--color-neu-dark), -4px -4px 14px var(--color-neu-light)",
                        }}
                    >
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${accent} 55%, transparent), transparent)` }} />
                        <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "var(--color-mist)", letterSpacing: "-0.02em", marginBottom: 14 }}>
                            ready to get started?
                        </h2>
                        <p style={{ color: "var(--color-text-secondary)", maxWidth: "48ch", lineHeight: 1.7, margin: "0 auto 32px" }}>
                            book a free 30-minute consultation. we&apos;ll assess your current posture and outline a clear path forward.
                        </p>
                        <Button variant="primary" size="lg" href="/contact">book a free consultation <ArrowRight size={18} /></Button>
                    </div>
                </PageTransition>
            </section>
        </div>
    );
}
