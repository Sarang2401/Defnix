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
    SOC2: "var(--color-sage)",
    Compliance: "var(--color-sage)",
    Engineering: "var(--color-pine)",
    "Cloud Security": "var(--color-pine)",
    "Disaster Recovery": "var(--color-pine)",
    AI: "var(--color-mist)",
    "SOC Operations": "var(--color-mist)",
    Automation: "var(--color-sage)",
    IaC: "var(--color-pine)",
    DevSecOps: "var(--color-pine)",
    "CI/CD": "var(--color-sage)",
    "Zero Trust": "var(--color-mist)",
    Architecture: "var(--color-sage)",
};

export function TagBadge({ tag }: { tag: string }) {
    const color = categoryColors[tag] || "var(--color-sage)";
    return (
        <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: `${color}12`, border: `1px solid ${color}30`,
            borderRadius: "999px", padding: "3px 10px",
            boxShadow: `inset 1px 1px 3px color-mix(in srgb, var(--color-neu-dark) 50%, transparent)`,
        }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: color, boxShadow: `0 0 4px ${color}` }} />
            <span style={{ fontSize: "10px", color, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{tag}</span>
        </div>
    );
}

export function ReadingTimeArc({ minutes }: { minutes: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={13} color="var(--color-sage)" />
            <span style={{ fontSize: "12px", color: "color-mix(in srgb, var(--color-mist) 60%, transparent)", fontWeight: 500 }}>{minutes}</span>
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
                        border: "1px solid color-mix(in srgb, var(--color-pine) 20%, transparent)",
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
                <div style={{ textAlign: "center", padding: "60px 20px", color: "color-mix(in srgb, var(--color-mist) 50%, transparent)" }}>
                    No articles in <strong style={{ color: "var(--color-sage)" }}>{active}</strong> yet — check back soon.
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
                <div className="blog-featured-card" style={{
                    borderRadius: "22px", padding: "clamp(28px, 4vw, 44px)",
                    position: "relative", overflow: "hidden",
                    background: "linear-gradient(145deg, var(--color-secondary), var(--color-glass-mid))",
                }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, var(--color-sage), var(--color-pine), transparent)" }} />
                    <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle at top right, color-mix(in srgb, var(--color-sage) 8%, transparent), transparent 65%)", pointerEvents: "none" }} />

                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 5,
                                background: "color-mix(in srgb, var(--color-sage) 15%, transparent)",
                                border: "1px solid color-mix(in srgb, var(--color-sage) 30%, transparent)",
                                borderRadius: "999px", padding: "4px 12px",
                            }}>
                                <Rss size={10} color="var(--color-sage)" />
                                <span style={{ fontSize: "10px", color: "var(--color-sage)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Featured</span>
                            </div>
                            <span style={{ fontSize: "12px", color: "color-mix(in srgb, var(--color-mist) 40%, transparent)" }}>
                                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </span>
                        </div>
                        <ReadingTimeArc minutes={post.readingTime} />
                    </div>

                    <h2 style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "clamp(1.4rem, 3vw, 2.25rem)",
                        fontWeight: 700, color: "var(--color-mist)",
                        letterSpacing: "-0.02em", lineHeight: 1.2,
                        marginBottom: 14, maxWidth: "28ch",
                        transition: "color 0.3s ease",
                    }}>
                        {post.title}
                    </h2>

                    <p style={{ fontSize: "14.5px", color: "color-mix(in srgb, var(--color-mist) 55%, transparent)", lineHeight: 1.75, maxWidth: "64ch", marginBottom: 24 }}>
                        {post.excerpt}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {post.tags.map((tag) => <TagBadge key={tag} tag={tag} />)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-sage)", fontSize: "13px", fontWeight: 500 }}
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
                    background: "linear-gradient(145deg, var(--color-secondary), var(--color-glass-mid))",
                }}
                    className="blog-secondary-card"
                >
                    <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "3px", background: `linear-gradient(to bottom, ${categoryColors[post.tags[0]] || "var(--color-sage)"}70, transparent)`, borderRadius: "18px 0 0 18px" }} />

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                        <span style={{ fontSize: "11px", color: "color-mix(in srgb, var(--color-mist) 40%, transparent)" }}>
                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        <ReadingTimeArc minutes={post.readingTime} />
                    </div>

                    <h3 style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "1rem", fontWeight: 700,
                        color: "var(--color-mist)", lineHeight: 1.4,
                        letterSpacing: "-0.01em", marginBottom: 12,
                        flex: 1, transition: "color 0.3s ease",
                    }}>
                        {post.title}
                    </h3>

                    <p style={{ fontSize: "12.5px", color: "color-mix(in srgb, var(--color-mist) 45%, transparent)", lineHeight: 1.65, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
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
                background: "linear-gradient(145deg, var(--color-glass-mid), var(--color-surface))",
                border: "1px solid color-mix(in srgb, var(--color-pine) 18%, transparent)",
                boxShadow: "inset 4px 4px 12px var(--color-neu-dark), inset -2px -2px 8px var(--color-neu-light)",
            }}
        >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-pine) 40%, transparent), transparent)" }} />

            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
                <div style={{ padding: "8px", borderRadius: "10px", background: "color-mix(in srgb, var(--color-pine) 15%, transparent)", border: "1px solid color-mix(in srgb, var(--color-pine) 20%, transparent)", boxShadow: "2px 2px 5px var(--color-neu-dark)" }}>
                    <BookOpen size={16} color="var(--color-sage)" />
                </div>
                <div>
                    <h3 style={{ fontFamily: "var(--font-headline)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-mist)", marginBottom: 8 }}>
                        get engineering insights — no spam
                    </h3>
                    <p style={{ fontSize: "13.5px", color: "color-mix(in srgb, var(--color-mist) 50%, transparent)", lineHeight: 1.65, maxWidth: "52ch" }}>
                        subscribe via the contact page and we&apos;ll share practical security, cloud, and automation playbooks.
                    </p>
                </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["SOC2 Pillar", "Cloud Pillar", "Automation Pillar"].map((pillar) => (
                    <Link key={pillar} href="/blog" className="blog-pillar-link" style={{
                        borderRadius: "12px",
                        background: "color-mix(in srgb, var(--color-secondary) 30%, transparent)", padding: "8px 16px",
                        fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em",
                        textDecoration: "none",
                        boxShadow: "2px 2px 6px var(--color-neu-dark), -1px -1px 4px var(--color-neu-light)",
                    }}
                    >
                        {pillar}
                    </Link>
                ))}
            </div>
        </motion.div>
    );
}
