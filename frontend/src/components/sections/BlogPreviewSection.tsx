"use client";

import Link from "next/link";
import { ArrowRight, Clock, BookOpen, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { useState, memo } from "react";

/* ─── Engineering Insights — "dispatch log" layout ──────────────
   A sticky terminal-styled intro panel next to a numbered feed of
   posts styled as log entries, rather than a generic blog-card grid.
   Distinct from the card-grid pattern used everywhere else on the
   site, while staying inside the same 5-color token system.
   ─────────────────────────────────────────────────────────────── */

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readingTime: number;
    date: string;
    isNew?: boolean;
}

const categoryAccent: Record<string, string> = {
    "SOC2 Compliance": "var(--color-sage)",
    "Cloud Security": "var(--color-pine)",
    "AI & Automation": "var(--color-mist)",
};

const samplePosts: BlogPost[] = [
    {
        slug: "why-73-percent-soc2-audits-fail",
        title: "Why 73% of SOC2 Audits Fail on the First Attempt — And How to Prevent It",
        excerpt: "Deep dive into the most common SOC2 failure patterns, the technical controls that trip up engineering teams, and a systematic prevention framework.",
        category: "SOC2 Compliance",
        readingTime: 8,
        date: "Feb 2026",
        isNew: true,
    },
    {
        slug: "cloud-insurance-engineering-discipline",
        title: "Cloud Insurance Is Not a Product — It's an Engineering Discipline",
        excerpt: "Covers cloud risk reduction, incident readiness engineering, and disaster recovery architecture.",
        category: "Cloud Security",
        readingTime: 7,
        date: "Feb 2026",
    },
    {
        slug: "ai-augmented-soc-analyst",
        title: "The AI-Augmented SOC Analyst: Moving Beyond Alert Fatigue",
        excerpt: "Explores AI-driven security operations, automated triage, and the future of SOC workflows.",
        category: "AI & Automation",
        readingTime: 9,
        date: "Feb 2026",
    },
];

/* ── Left panel — sticky terminal-styled intro ───────────────── */
function TerminalIntroPanel() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky"
            style={{ top: 140 }}
        >
            <p className="eyebrow" style={{ marginBottom: 20 }}>technical blog</p>

            <h2 style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 600,
                color: "var(--color-mist)",
                fontFamily: "var(--font-headline)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                marginBottom: 16,
            }}>
                engineering{" "}
                <span style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontWeight: 500, color: "var(--color-sage)" }}>
                    insights
                </span>
            </h2>

            <p className="type-body" style={{ marginBottom: 28, maxWidth: "34ch" }}>
                Notes from the field — the patterns, failures, and fixes we run into building security and software for startups.
            </p>

            {/* Terminal readout */}
            <div
                className="neu-inset"
                style={{
                    padding: "14px 18px",
                    marginBottom: 32,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <Terminal size={14} color="var(--color-sage)" style={{ flexShrink: 0 }} />
                <span style={{
                    fontFamily: "ui-monospace, 'SF Mono', monospace",
                    fontSize: "0.78rem",
                    color: "color-mix(in srgb, var(--color-mist) 70%, transparent)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>
                    tail -f engineering.log
                </span>
                <span className="animate-typing-cursor" style={{ color: "var(--color-sage)" }}>█</span>
            </div>

            <Link
                href="/blog"
                className="cta-secondary-link"
                style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "10px 20px",
                    borderRadius: "999px",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-label)",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                }}
            >
                <BookOpen size={13} /> view all posts <ArrowRight size={12} />
            </Link>
        </motion.div>
    );
}

/* ── Right column — numbered log entries ─────────────────────── */
const LogEntry = memo(function LogEntry({ post, index, isLast }: { post: BlogPost; index: number; isLast: boolean }) {
    const [hovered, setHovered] = useState(false);
    const accent = categoryAccent[post.category] || "var(--color-sage)";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link
                href={`/blog/${post.slug}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    display: "flex",
                    gap: "clamp(16px, 3vw, 32px)",
                    padding: "28px clamp(16px, 3vw, 28px)",
                    borderBottom: isLast ? "none" : "1px solid var(--color-border)",
                    textDecoration: "none",
                    borderRadius: "16px",
                    backgroundColor: hovered ? "var(--color-secondary)" : "transparent",
                    transition: "background-color 0.3s ease",
                }}
            >
                {/* Index number */}
                <span style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: hovered ? accent : "color-mix(in srgb, var(--color-mist) 22%, transparent)",
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: "2ch",
                    transition: "color 0.3s ease",
                }}>
                    {String(index + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                        <span style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                            color: accent,
                        }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: accent }} />
                            {post.category}
                        </span>
                        {post.isNew && (
                            <span style={{
                                fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                                color: "var(--color-surface)", backgroundColor: "var(--color-sage)",
                                borderRadius: "999px", padding: "2px 8px",
                            }}>
                                new
                            </span>
                        )}
                    </div>

                    <h3 style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
                        fontWeight: 600,
                        lineHeight: 1.35,
                        letterSpacing: "-0.01em",
                        color: "var(--color-mist)",
                        marginBottom: 10,
                    }}>
                        {post.title}
                    </h3>

                    {/* Excerpt reveals on hover — collapsed height keeps the log feed compact by default */}
                    <div style={{
                        maxHeight: hovered ? "4.5rem" : 0,
                        opacity: hovered ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.35s ease, opacity 0.3s ease",
                    }}>
                        <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
                            {post.excerpt}
                        </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{post.date}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "12px", color: "var(--color-text-muted)" }}>
                            <Clock size={12} /> {post.readingTime} min read
                        </span>
                    </div>
                </div>

                {/* Arrow */}
                <motion.span
                    animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: accent, flexShrink: 0, alignSelf: "center" }}
                >
                    <ArrowRight size={18} />
                </motion.span>
            </Link>
        </motion.div>
    );
});

export function BlogPreviewSection() {
    return (
        <section className="section-gap relative" id="blog" style={{ background: "var(--color-surface)" }}>
            <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16">
                    <div className="lg:col-span-4">
                        <TerminalIntroPanel />
                    </div>

                    <div className="lg:col-span-8 flex flex-col">
                        {samplePosts.map((post, i) => (
                            <LogEntry key={post.slug} post={post} index={i} isLast={i === samplePosts.length - 1} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
