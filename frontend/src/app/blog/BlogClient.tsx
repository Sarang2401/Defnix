"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Rss, Clock } from "lucide-react";
import { useMemo, useState } from "react";

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readingTime: string;
    tags: string[];
    featured?: boolean;
};

const categoryColors: Record<string, string> = {
    SOC2: "#84A98C",
    Compliance: "#84A98C",
    Engineering: "#52796F",
    "Cloud Security": "#52796F",
    "Disaster Recovery": "#52796F",
    AI: "#CAD2C5",
    "SOC Operations": "#CAD2C5",
    Automation: "#84A98C",
    IaC: "#52796F",
    DevSecOps: "#52796F",
    "CI/CD": "#84A98C",
    "Zero Trust": "#CAD2C5",
    Architecture: "#84A98C",
};

export function TagBadge({ tag }: { tag: string }) {
    const color = categoryColors[tag] || "#84A98C";
    return (
        <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: `${color}12`, border: `1px solid ${color}30`,
            borderRadius: "999px", padding: "3px 10px",
            boxShadow: `inset 1px 1px 3px rgba(30,43,49,0.5)`,
        }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: color, boxShadow: `0 0 4px ${color}` }} />
            <span style={{ fontSize: "10px", color, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{tag}</span>
        </div>
    );
}

export function ReadingTimeArc({ minutes }: { minutes: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={13} color="#84A98C" />
            <span style={{ fontSize: "12px", color: "rgba(202,210,197,0.6)", fontWeight: 500 }}>{minutes}</span>
        </div>
    );
}

export function BlogCategories({
    categories,
    active,
    onSelect,
}: {
    categories: string[];
    active: string;
    onSelect: (category: string) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
            role="group"
            aria-label="Filter articles by category"
        >
            {categories.map((cat) => (
                <button
                    key={cat}
                    type="button"
                    onClick={() => onSelect(cat)}
                    aria-pressed={active === cat}
                    className="blog-category-pill"
                    data-active={active === cat || undefined}
                    style={{
                        borderRadius: "999px",
                        border: "1px solid rgba(82,121,111,0.2)",
                        padding: "6px 16px", fontSize: "11px",
                        textTransform: "uppercase", letterSpacing: "0.12em",
                        fontWeight: 500,
                        cursor: "pointer",
                    }}
                >
                    {cat}
                </button>
            ))}
        </motion.div>
    );
}

/* ── Interactive category filter + results, shared client state ── */
export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
    const [active, setActive] = useState("All");

    const categories = useMemo(() => {
        const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
        return ["All", ...allTags.slice(0, 6)];
    }, [posts]);

    const filtered = useMemo(
        () => (active === "All" ? posts : posts.filter((p) => p.tags.includes(active))),
        [posts, active]
    );

    const featured = filtered[0] ? { ...filtered[0], featured: true } : null;
    const secondary = filtered.slice(1);

    return (
        <>
            <div style={{ marginBottom: 40 }}>
                <BlogCategories categories={categories} active={active} onSelect={setActive} />
            </div>

            {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(202,210,197,0.5)" }}>
                    No articles in <strong style={{ color: "#84A98C" }}>{active}</strong> yet — check back soon.
                </div>
            ) : (
                <>
                    {featured && <FeaturedPost post={featured} />}
                    <BlogPostsList posts={secondary} />
                </>
            )}
        </>
    );
}

export function FeaturedPost({ post }: { post: BlogPost }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            style={{ marginBottom: 24 }}
        >
            <Link href={`/blog/${post.slug}`} className="block group">
                <div style={{
                    borderRadius: "22px", padding: "clamp(28px, 4vw, 44px)",
                    position: "relative", overflow: "hidden",
                    background: "linear-gradient(145deg, #354F52, #2d4449)",
                    border: "1px solid rgba(82,121,111,0.22)",
                    boxShadow: "8px 8px 22px #1e2b31, -4px -4px 14px #3f5461",
                    transition: "all 0.35s ease",
                }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "inset 4px 4px 12px #1e2b31, inset -2px -2px 8px #3f5461, 0 0 28px rgba(132,169,140,0.08)"; e.currentTarget.style.borderColor = "rgba(132,169,140,0.35)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "8px 8px 22px #1e2b31, -4px -4px 14px #3f5461"; e.currentTarget.style.borderColor = "rgba(82,121,111,0.22)"; }}
                >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #84A98C, #52796F, transparent)" }} />
                    <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle at top right, rgba(132,169,140,0.08), transparent 65%)", pointerEvents: "none" }} />

                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 5,
                                background: "rgba(132,169,140,0.15)",
                                border: "1px solid rgba(132,169,140,0.3)",
                                borderRadius: "999px", padding: "4px 12px",
                            }}>
                                <Rss size={10} color="#84A98C" />
                                <span style={{ fontSize: "10px", color: "#84A98C", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Featured</span>
                            </div>
                            <span style={{ fontSize: "12px", color: "rgba(202,210,197,0.4)" }}>
                                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </span>
                        </div>
                        <ReadingTimeArc minutes={post.readingTime} />
                    </div>

                    <h2 style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "clamp(1.4rem, 3vw, 2.25rem)",
                        fontWeight: 700, color: "#CAD2C5",
                        letterSpacing: "-0.02em", lineHeight: 1.2,
                        marginBottom: 14, maxWidth: "28ch",
                        transition: "color 0.3s ease",
                    }}>
                        {post.title}
                    </h2>

                    <p style={{ fontSize: "14.5px", color: "rgba(202,210,197,0.55)", lineHeight: 1.75, maxWidth: "64ch", marginBottom: 24 }}>
                        {post.excerpt}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {post.tags.map((tag) => <TagBadge key={tag} tag={tag} />)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#84A98C", fontSize: "13px", fontWeight: 500 }}
                            className="group-hover:gap-2 transition-all"
                        >
                            read article <ArrowRight size={13} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export function PostCard({ post, index }: { post: BlogPost; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
        >
            <Link href={`/blog/${post.slug}`} className="block h-full group">
                <div style={{
                    borderRadius: "18px", padding: "24px",
                    height: "100%", display: "flex", flexDirection: "column",
                    position: "relative", overflow: "hidden",
                    background: "linear-gradient(145deg, #354F52, #2d4449)",
                    border: "1px solid rgba(82,121,111,0.15)",
                    boxShadow: "6px 6px 16px #1e2b31, -3px -3px 10px #3f5461",
                    transition: "all 0.35s ease",
                }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "inset 3px 3px 8px #1e2b31, inset -2px -2px 6px #3f5461"; e.currentTarget.style.borderColor = "rgba(132,169,140,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "6px 6px 16px #1e2b31, -3px -3px 10px #3f5461"; e.currentTarget.style.borderColor = "rgba(82,121,111,0.15)"; }}
                >
                    <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "3px", background: `linear-gradient(to bottom, ${categoryColors[post.tags[0]] || "#84A98C"}70, transparent)`, borderRadius: "18px 0 0 18px" }} />

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                        <span style={{ fontSize: "11px", color: "rgba(202,210,197,0.4)" }}>
                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        <ReadingTimeArc minutes={post.readingTime} />
                    </div>

                    <h3 style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "1rem", fontWeight: 700,
                        color: "#CAD2C5", lineHeight: 1.4,
                        letterSpacing: "-0.01em", marginBottom: 12,
                        flex: 1, transition: "color 0.3s ease",
                    }}>
                        {post.title}
                    </h3>

                    <p style={{ fontSize: "12.5px", color: "rgba(202,210,197,0.45)", lineHeight: 1.65, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {post.excerpt}
                    </p>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
                        {post.tags.slice(0, 2).map((tag) => <TagBadge key={tag} tag={tag} />)}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export function BlogPostsList({ posts }: { posts: BlogPost[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
            ))}
        </div>
    );
}

export function NewsletterPillar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
                marginTop: 24, borderRadius: "20px",
                padding: "clamp(28px, 4vw, 40px)",
                position: "relative", overflow: "hidden",
                background: "linear-gradient(145deg, #2d4449, #2F3E46)",
                border: "1px solid rgba(82,121,111,0.18)",
                boxShadow: "inset 4px 4px 12px #1e2b31, inset -2px -2px 8px #3f5461",
            }}
        >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(82,121,111,0.4), transparent)" }} />

            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
                <div style={{ padding: "8px", borderRadius: "10px", background: "rgba(82,121,111,0.15)", border: "1px solid rgba(82,121,111,0.2)", boxShadow: "2px 2px 5px #1e2b31" }}>
                    <BookOpen size={16} color="#84A98C" />
                </div>
                <div>
                    <h3 style={{ fontFamily: "var(--font-headline)", fontSize: "1.25rem", fontWeight: 700, color: "#CAD2C5", marginBottom: 8 }}>
                        get engineering insights — no spam
                    </h3>
                    <p style={{ fontSize: "13.5px", color: "rgba(202,210,197,0.5)", lineHeight: 1.65, maxWidth: "52ch" }}>
                        subscribe via the contact page and we&apos;ll share practical security, cloud, and automation playbooks.
                    </p>
                </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["SOC2 Pillar", "Cloud Pillar", "Automation Pillar"].map((pillar) => (
                    <Link key={pillar} href="/blog" style={{
                        borderRadius: "12px", border: "1px solid rgba(82,121,111,0.2)",
                        background: "rgba(53,79,82,0.3)", padding: "8px 16px",
                        fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em",
                        color: "rgba(202,210,197,0.55)", textDecoration: "none",
                        boxShadow: "2px 2px 6px #1e2b31, -1px -1px 4px #3f5461",
                        transition: "all 0.2s ease",
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#84A98C"; e.currentTarget.style.borderColor = "rgba(132,169,140,0.3)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(202,210,197,0.55)"; e.currentTarget.style.borderColor = "rgba(82,121,111,0.2)"; }}
                    >
                        {pillar}
                    </Link>
                ))}
            </div>
        </motion.div>
    );
}
