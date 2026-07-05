"use client";

import Link from "next/link";
import { ArrowRight, Clock, BookOpen, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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
    "SOC2 Compliance": { accent: "#84A98C", bg: "rgba(132,169,140,0.08)" },
    "Cloud Security": { accent: "#52796F", bg: "rgba(82,121,111,0.08)" },
    "AI & Automation": { accent: "#CAD2C5", bg: "rgba(202,210,197,0.06)" },
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
            <Clock size={13} color="#84A98C" />
            <span style={{ fontSize: "12px", color: "rgba(202,210,197,0.6)", fontWeight: 500 }}>{minutes} min read</span>
        </div>
    );
}

/* ── Category badge ────────────────────────────── */
function CategoryBadge({ category }: { category: string }) {
    const colors = categoryColors[category] || { accent: "#84A98C", bg: "rgba(132,169,140,0.08)" };
    return (
        <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: colors.bg,
            border: `1px solid ${colors.accent}30`,
            borderRadius: "999px",
            padding: "3px 10px",
            boxShadow: `inset 2px 2px 5px rgba(30,43,49,0.6), inset -1px -1px 3px rgba(63,84,97,0.2)`,
        }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: colors.accent, boxShadow: `0 0 4px ${colors.accent}` }} />
            <span style={{ fontSize: "10px", color: colors.accent, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {category}
            </span>
        </div>
    );
}

/* ── Featured post card ───────────────────────── */
function FeaturedCard({ post }: { post: BlogPost }) {
    const [hovered, setHovered] = useState(false);
    const colors = categoryColors[post.category] || { accent: "#84A98C", bg: "rgba(132,169,140,0.08)" };

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
                border: `1px solid ${hovered ? "rgba(132,169,140,0.35)" : "rgba(82,121,111,0.2)"}`,
                boxShadow: hovered
                    ? `8px 8px 24px #1e2b31, -4px -4px 14px #3f5461, 0 0 30px rgba(132,169,140,0.08)`
                    : `6px 6px 18px #1e2b31, -3px -3px 12px #3f5461`,
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
                    background: "linear-gradient(to top, #2F3E46 40%, rgba(47,62,70,0.4) 70%, transparent 100%)",
                }} />
                <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(135deg, rgba(47,62,70,0.6), transparent 60%)`,
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
                                background: "rgba(132,169,140,0.15)", border: "1px solid rgba(132,169,140,0.3)",
                                borderRadius: "999px", padding: "3px 10px",
                            }}>
                                <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#84A98C" }} className="animate-pulse-dot" />
                                <span style={{ fontSize: "10px", color: "#84A98C", fontWeight: 600, letterSpacing: "0.1em" }}>NEW</span>
                            </div>
                        )}
                    </div>

                    {/* Bottom content */}
                    <div style={{ marginTop: "auto" }}>
                        <h3 style={{
                            fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
                            fontWeight: 600,
                            color: hovered ? "#CAD2C5" : "rgba(202,210,197,0.9)",
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
                            color: hovered ? "rgba(202,210,197,0.65)" : "rgba(202,210,197,0.45)",
                            lineHeight: 1.65,
                            marginBottom: 20,
                            transition: "color 0.3s ease",
                        }}>
                            {post.excerpt}
                        </p>

                        <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            paddingTop: 16,
                            borderTop: "1px solid rgba(82,121,111,0.2)",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <span style={{ fontSize: "11px", color: "rgba(202,210,197,0.4)" }}>{post.date}</span>
                                <ReadingArc minutes={post.readingTime} />
                            </div>
                            <motion.div
                                animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.6 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    display: "flex", alignItems: "center", gap: 6,
                                    color: "#84A98C", fontSize: "12px", fontWeight: 500,
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
    const colors = categoryColors[post.category] || { accent: "#84A98C", bg: "rgba(132,169,140,0.08)" };

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
                    background: "linear-gradient(145deg, #354F52, #2d4449)",
                    border: `1px solid ${hovered ? "rgba(82,121,111,0.4)" : "rgba(82,121,111,0.15)"}`,
                    boxShadow: hovered
                        ? `inset 3px 3px 8px #1e2b31, inset -2px -2px 6px #3f5461, 0 0 20px rgba(82,121,111,0.08)`
                        : `5px 5px 14px #1e2b31, -2px -2px 8px #3f5461`,
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
                            : "linear-gradient(90deg, transparent, rgba(82,121,111,0.15), transparent)",
                        transition: "all 0.35s ease",
                    }} />

                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                        <CategoryBadge category={post.category} />
                        <div style={{
                            background: "rgba(30,43,49,0.7)",
                            border: "1px solid rgba(82,121,111,0.15)",
                            borderRadius: "8px",
                            padding: "4px 8px",
                            boxShadow: "inset 2px 2px 4px rgba(30,43,49,0.8)",
                            flexShrink: 0,
                        }}>
                            <span style={{ fontSize: "10px", color: "rgba(202,210,197,0.35)" }}>{post.date}</span>
                        </div>
                    </div>

                    <h4 style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: hovered ? "#CAD2C5" : "rgba(202,210,197,0.8)",
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
                        paddingTop: 12, borderTop: "1px solid rgba(82,121,111,0.12)",
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
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(30,43,49,1)" style={{ fill: "var(--color-surface)" }}></path>
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
                                    width: 6, height: 6, borderRadius: "50%", backgroundColor: "#52796F",
                                    boxShadow: "0 0 8px rgba(82,121,111,0.8)",
                                }} className="animate-pulse-dot" />
                                <p style={{
                                    fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
                                    color: "#52796F", fontWeight: 500,
                                }}>
                                    technical blog
                                </p>
                            </div>
                            <h2 style={{
                                fontSize: "clamp(2rem, 4vw, 3rem)",
                                fontWeight: 600,
                                color: "#CAD2C5",
                                fontFamily: "var(--font-headline)",
                                letterSpacing: "-0.02em",
                            }}>
                                engineering <span style={{ color: "#84A98C" }}>insights</span>
                            </h2>
                        </div>

                        <Link
                            href="/blog"
                            className="hidden sm:flex items-center gap-2 group"
                            style={{
                                padding: "8px 18px",
                                borderRadius: "999px",
                                border: "1px solid rgba(82,121,111,0.25)",
                                color: "rgba(202,210,197,0.55)",
                                fontSize: "12px",
                                fontWeight: 500,
                                letterSpacing: "0.05em",
                                boxShadow: "3px 3px 8px #1e2b31, -2px -2px 6px #3f5461",
                                transition: "all 0.25s ease",
                                textDecoration: "none",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#84A98C";
                                e.currentTarget.style.borderColor = "rgba(132,169,140,0.35)";
                                e.currentTarget.style.boxShadow = "inset 2px 2px 5px #1e2b31, inset -1px -1px 3px #3f5461";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = "rgba(202,210,197,0.55)";
                                e.currentTarget.style.borderColor = "rgba(82,121,111,0.25)";
                                e.currentTarget.style.boxShadow = "3px 3px 8px #1e2b31, -2px -2px 6px #3f5461";
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
                            color: "#84A98C", fontSize: "13px", fontWeight: 500,
                        }}
                    >
                        View all posts <ArrowRight size={13} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
