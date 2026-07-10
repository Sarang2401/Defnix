"use client";

import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useState, memo } from "react";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readingTime: number;
    date: string;
    image: string;
    isNew?: boolean;
}

const categoryColors: Record<string, { accent: string; bg: string }> = {
    "SOC2 Compliance": { accent: "var(--color-sage)", bg: "color-mix(in srgb, var(--color-sage) 8%, transparent)" },
    "Cloud Security": { accent: "var(--color-pine)", bg: "color-mix(in srgb, var(--color-pine) 8%, transparent)" },
    "AI & Automation": { accent: "var(--color-mist)", bg: "color-mix(in srgb, var(--color-mist) 6%, transparent)" },
};

const samplePosts: BlogPost[] = [
    {
        slug: "why-73-percent-soc2-audits-fail",
        title: "Why 73% of SOC2 Audits Fail on the First Attempt — And How to Prevent It",
        excerpt: "Deep dive into the most common SOC2 failure patterns, the technical controls that trip up engineering teams, and a systematic prevention framework.",
        category: "SOC2 Compliance",
        readingTime: 8,
        date: "Feb 2026",
        image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1200&q=80",
        isNew: true,
    },
    {
        slug: "cloud-insurance-engineering-discipline",
        title: "Cloud Insurance Is Not a Product — It's an Engineering Discipline",
        excerpt: "Covers cloud risk reduction, incident readiness engineering, and disaster recovery architecture.",
        category: "Cloud Security",
        readingTime: 7,
        date: "Feb 2026",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    },
    {
        slug: "ai-augmented-soc-analyst",
        title: "The AI-Augmented SOC Analyst: Moving Beyond Alert Fatigue",
        excerpt: "Explores AI-driven security operations, automated triage, and the future of SOC workflows.",
        category: "AI & Automation",
        readingTime: 9,
        date: "Feb 2026",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    },
];

/* ── Reading time arc ─────────────────────────── */
function ReadingArc({ minutes }: { minutes: number }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={13} color="var(--color-sage)" />
            <span style={{ fontSize: "12px", color: "color-mix(in srgb, var(--color-mist) 60%, transparent)", fontWeight: 500 }}>{minutes} min read</span>
        </div>
    );
}

/* ── Category badge ────────────────────────────── */
const CategoryBadge = memo(function CategoryBadge({ category }: { category: string }) {
    const colors = categoryColors[category] || { accent: "var(--color-sage)", bg: "color-mix(in srgb, var(--color-sage) 8%, transparent)" };
    return (
        <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: colors.bg,
            border: `1px solid ${colors.accent}30`,
            borderRadius: "999px",
            padding: "3px 10px",
            boxShadow: `inset 2px 2px 5px color-mix(in srgb, var(--color-neu-dark) 60%, transparent), inset -1px -1px 3px color-mix(in srgb, var(--color-neu-light) 20%, transparent)`,
        }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: colors.accent, boxShadow: `0 0 4px ${colors.accent}` }} />
            <span style={{ fontSize: "10px", color: colors.accent, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {category}
            </span>
        </div>
    );
});

/* ── Featured post card ───────────────────────── */
function FeaturedCard({ post }: { post: BlogPost }) {
    const [hovered, setHovered] = useState(false);
    const colors = categoryColors[post.category] || { accent: "var(--color-sage)", bg: "color-mix(in srgb, var(--color-sage) 8%, transparent)" };

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="block h-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{
                height: "100%",
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                border: `1px solid ${hovered ? "color-mix(in srgb, var(--color-sage) 35%, transparent)" : "var(--color-border)"}`,
                boxShadow: hovered
                    ? `8px 8px 24px var(--color-neu-dark), -4px -4px 14px var(--color-neu-light), 0 0 30px color-mix(in srgb, var(--color-sage) 8%, transparent)`
                    : `6px 6px 18px var(--color-neu-dark), -3px -3px 12px var(--color-neu-light)`,
                transition: "all 0.4s ease",
                minHeight: "420px",
            }}>
                {/* Background image with overlay */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: hovered ? "brightness(0.35)" : "brightness(0.25)",
                    transition: "filter 0.4s ease",
                }} />

                {/* Gradient overlays */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, var(--color-surface) 40%, color-mix(in srgb, var(--color-surface) 40%, transparent) 70%, transparent 100%)",
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--color-surface) 60%, transparent), transparent 60%)`,
                }} />

                {/* Animated top accent line */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                    background: `linear-gradient(90deg, ${colors.accent}, transparent)`,
                    opacity: hovered ? 1 : 0.5,
                    transition: "opacity 0.3s ease",
                }} />

                {/* Content */}
                <div style={{
                    position: "relative", zIndex: 10,
                    height: "100%", display: "flex", flexDirection: "column",
                    padding: "28px",
                }}>
                    {/* Top row */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "auto" }}>
                        <CategoryBadge category={post.category} />
                        {post.isNew && (
                            <div style={{
                                display: "flex", alignItems: "center", gap: 5,
                                background: "color-mix(in srgb, var(--color-sage) 15%, transparent)", border: "1px solid color-mix(in srgb, var(--color-sage) 30%, transparent)",
                                borderRadius: "999px", padding: "3px 10px",
                            }}>
                                <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "var(--color-sage)" }} className="animate-pulse-dot" />
                                <span style={{ fontSize: "10px", color: "var(--color-sage)", fontWeight: 600, letterSpacing: "0.1em" }}>NEW</span>
                            </div>
                        )}
                    </div>

                    {/* Bottom content */}
                    <div style={{ marginTop: "auto" }}>
                        <h3 style={{
                            fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
                            fontWeight: 600,
                            color: hovered ? "var(--color-mist)" : "color-mix(in srgb, var(--color-mist) 90%, transparent)",
                            fontFamily: "var(--font-headline)",
                            lineHeight: 1.3,
                            marginBottom: 12,
                            letterSpacing: "-0.01em",
                            transition: "color 0.3s ease",
                        }}>
                            {post.title}
                        </h3>
                        <p style={{
                            fontSize: "13px",
                            color: hovered ? "color-mix(in srgb, var(--color-mist) 65%, transparent)" : "var(--color-text-muted)",
                            lineHeight: 1.65,
                            marginBottom: 20,
                            transition: "color 0.3s ease",
                        }}>
                            {post.excerpt}
                        </p>

                        <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            paddingTop: 16,
                            borderTop: "1px solid var(--color-border)",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <span style={{ fontSize: "11px", color: "color-mix(in srgb, var(--color-mist) 40%, transparent)" }}>{post.date}</span>
                                <ReadingArc minutes={post.readingTime} />
                            </div>
                            <motion.div
                                animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.6 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    display: "flex", alignItems: "center", gap: 6,
                                    color: "var(--color-sage)", fontSize: "12px", fontWeight: 500,
                                }}
                            >
                                Read article <ArrowRight size={13} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

/* ── Secondary post card ──────────────────────── */
function SecondaryCard({ post, index }: { post: BlogPost; index: number }) {
    const [hovered, setHovered] = useState(false);
    const colors = categoryColors[post.category] || { accent: "var(--color-sage)", bg: "color-mix(in srgb, var(--color-sage) 8%, transparent)" };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
            className="flex-1"
        >
            <Link
                href={`/blog/${post.slug}`}
                className="block h-full"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div style={{
                    borderRadius: "18px",
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(145deg, var(--color-secondary), var(--color-glass-mid))",
                    border: `1px solid ${hovered ? "color-mix(in srgb, var(--color-pine) 40%, transparent)" : "color-mix(in srgb, var(--color-pine) 15%, transparent)"}`,
                    boxShadow: hovered
                        ? `inset 3px 3px 8px var(--color-neu-dark), inset -2px -2px 6px var(--color-neu-light), 0 0 20px color-mix(in srgb, var(--color-pine) 8%, transparent)`
                        : `5px 5px 14px var(--color-neu-dark), -2px -2px 8px var(--color-neu-light)`,
                    padding: "22px",
                    transition: "all 0.35s ease",
                    display: "flex", flexDirection: "column", gap: 14,
                    height: "100%",
                }}>
                    {/* Animated left accent border */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, bottom: 0, width: "3px",
                        background: `linear-gradient(to bottom, ${colors.accent}, transparent)`,
                        borderRadius: "18px 0 0 18px",
                        transition: "opacity 0.35s ease",
                        opacity: hovered ? 1 : 0.4,
                    }} />

                    {/* Top shimmer line */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                        background: hovered
                            ? `linear-gradient(90deg, transparent, ${colors.accent}40, transparent)`
                            : "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-pine) 15%, transparent), transparent)",
                        transition: "all 0.35s ease",
                    }} />

                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                        <CategoryBadge category={post.category} />
                        <div style={{
                            background: "color-mix(in srgb, var(--color-neu-dark) 70%, transparent)",
                            border: "1px solid color-mix(in srgb, var(--color-pine) 15%, transparent)",
                            borderRadius: "8px",
                            padding: "4px 8px",
                            boxShadow: "inset 2px 2px 4px color-mix(in srgb, var(--color-neu-dark) 80%, transparent)",
                            flexShrink: 0,
                        }}>
                            <span style={{ fontSize: "10px", color: "color-mix(in srgb, var(--color-mist) 35%, transparent)" }}>{post.date}</span>
                        </div>
                    </div>

                    <h4 style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: hovered ? "var(--color-mist)" : "color-mix(in srgb, var(--color-mist) 80%, transparent)",
                        fontFamily: "var(--font-headline)",
                        lineHeight: 1.4,
                        letterSpacing: "-0.01em",
                        transition: "color 0.3s ease",
                        flex: 1,
                    }}>
                        {post.title}
                    </h4>

                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        paddingTop: 12, borderTop: "1px solid color-mix(in srgb, var(--color-pine) 12%, transparent)",
                        marginTop: "auto",
                    }}>
                        <ReadingArc minutes={post.readingTime} />
                        <motion.div
                            animate={{ x: hovered ? 4 : 0 }}
                            style={{ display: "flex", alignItems: "center", gap: 5, color: colors.accent, fontSize: "11px" }}
                        >
                            Read <ArrowRight size={11} />
                        </motion.div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export function BlogPreviewSection() {
    const featured = samplePosts[0];
    const secondary = samplePosts.slice(1);

    return (
        <section className="section-gap relative" id="blog" style={{ background: "var(--color-surface)", position: "relative" }}>
            {/* Torn Paper Edge (Top) */}
            <div style={{ position: "absolute", top: -1, left: 0, right: 0, zIndex: 5, overflow: "hidden", lineHeight: 0, transform: "rotate(180deg)" }}>
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: "block", width: "calc(100% + 1.3px)", height: "40px" }}>
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="var(--color-neu-dark)" style={{ fill: "var(--color-surface)" }}></path>
                </svg>
            </div>

            {/* Dot grid bg */}
            <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between" }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                                <div style={{
                                    width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--color-pine)",
                                    boxShadow: "0 0 8px color-mix(in srgb, var(--color-pine) 80%, transparent)",
                                }} className="animate-pulse-dot" />
                                <p style={{
                                    fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
                                    color: "var(--color-pine)", fontWeight: 500,
                                }}>
                                    technical blog
                                </p>
                            </div>
                            <h2 style={{
                                fontSize: "clamp(2rem, 4vw, 3rem)",
                                fontWeight: 600,
                                color: "var(--color-mist)",
                                fontFamily: "var(--font-headline)",
                                letterSpacing: "-0.02em",
                            }}>
                                engineering <span style={{ color: "var(--color-sage)" }}>insights</span>
                            </h2>
                        </div>

                        <Link
                            href="/blog"
                            className="hidden sm:flex items-center gap-2 group"
                            style={{
                                padding: "8px 18px",
                                borderRadius: "999px",
                                border: "1px solid color-mix(in srgb, var(--color-pine) 25%, transparent)",
                                color: "color-mix(in srgb, var(--color-mist) 55%, transparent)",
                                fontSize: "12px",
                                fontWeight: 500,
                                letterSpacing: "0.05em",
                                boxShadow: "3px 3px 8px var(--color-neu-dark), -2px -2px 6px var(--color-neu-light)",
                                transition: "all 0.25s ease",
                                textDecoration: "none",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = "var(--color-sage)";
                                e.currentTarget.style.borderColor = "color-mix(in srgb, var(--color-sage) 35%, transparent)";
                                e.currentTarget.style.boxShadow = "inset 2px 2px 5px var(--color-neu-dark), inset -1px -1px 3px var(--color-neu-light)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = "color-mix(in srgb, var(--color-mist) 55%, transparent)";
                                e.currentTarget.style.borderColor = "color-mix(in srgb, var(--color-pine) 25%, transparent)";
                                e.currentTarget.style.boxShadow = "3px 3px 8px var(--color-neu-dark), -2px -2px 6px var(--color-neu-light)";
                            }}
                        >
                            <BookOpen size={13} />
                            view all posts <ArrowRight size={12} />
                        </Link>
                    </div>
                </motion.div>

                {/* Editorial layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5" style={{ minHeight: "420px" }}>
                    {/* Featured post */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        <FeaturedCard post={featured} />
                    </motion.div>

                    {/* Secondary posts */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        {secondary.map((post, i) => (
                            <SecondaryCard key={post.slug} post={post} index={i} />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA row */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex items-center justify-center sm:hidden"
                >
                    <Link
                        href="/blog"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            color: "var(--color-sage)", fontSize: "13px", fontWeight: 500,
                        }}
                    >
                        View all posts <ArrowRight size={13} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
