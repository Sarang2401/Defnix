import type { Metadata } from "next";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { Clock, Tag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Technical insights on SOC2 compliance, cloud security, and AI-driven security operations from the Defnix engineering team.",
};

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readingTime: string;
    tags: string[];
    featured?: boolean;
}

const staticPosts: BlogPost[] = [
    {
        slug: "why-73-percent-soc2-audits-fail",
        title: "Why 73% of SOC2 Audits Fail on the First Attempt — And How to Prevent It",
        excerpt:
            "A deep dive into the most common SOC2 failure patterns, the technical controls that auditors actually care about, and a systematic approach to preventing audit failures before they happen.",
        author: "Defnix Engineering",
        date: "2026-02-20",
        readingTime: "12 min read",
        tags: ["SOC2", "Compliance", "Engineering"],
        featured: true,
    },
    {
        slug: "cloud-insurance-engineering-discipline",
        title: "Cloud Insurance Is Not a Product — It's an Engineering Discipline",
        excerpt:
            "Why treating cloud resilience as a product purchase instead of an engineering practice leaves organizations exposed. Covers incident readiness, DR architecture, and blast radius engineering.",
        author: "Defnix Engineering",
        date: "2026-02-15",
        readingTime: "10 min read",
        tags: ["Cloud Security", "Disaster Recovery"],
    },
    {
        slug: "ai-augmented-soc-analyst",
        title: "The AI-Augmented SOC Analyst: Moving Beyond Alert Fatigue",
        excerpt:
            "How ML-powered alert triage and automated investigation runbooks are transforming security operations — and what it takes to implement them without disrupting your existing workflow.",
        author: "Defnix Engineering",
        date: "2026-02-10",
        readingTime: "14 min read",
        tags: ["AI", "SOC Operations", "Automation"],
    },
    {
        slug: "infrastructure-as-code-security-scanning",
        title: "IaC Security Scanning: Catching Misconfigurations Before They Ship",
        excerpt:
            "A practical guide to integrating infrastructure-as-code security scanning into your CI/CD pipeline using open-source tools like Checkov, tfsec, and KICS.",
        author: "Defnix Engineering",
        date: "2026-02-05",
        readingTime: "8 min read",
        tags: ["IaC", "DevSecOps", "CI/CD"],
    },
    {
        slug: "zero-trust-architecture-startups",
        title: "Zero Trust Architecture for Startups: A Pragmatic Approach",
        excerpt:
            "Zero trust doesn't require a Fortune 500 budget. Here's how startups can implement meaningful zero trust controls with the tools they already use.",
        author: "Defnix Engineering",
        date: "2026-01-28",
        readingTime: "11 min read",
        tags: ["Zero Trust", "Architecture"],
    },
];

async function getPosts(): Promise<BlogPost[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    try {
        const res = await fetch(`${apiUrl}/blog/posts?limit=20`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        return (data.posts || []).map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (p: any) => ({
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt || "",
                author: p.author?.name || "Defnix Engineering",
                date: p.publishedAt || p.createdAt,
                readingTime: `${p.readingTime || 5} min read`,
                tags: (p.tags || []).map((t: { name: string }) => t.name),
                featured: false,
            }),
        );
    } catch {
        return staticPosts;
    }
}

function FeaturedPost({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="block group mb-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl p-10 lg:p-14 relative overflow-hidden transition-all duration-500 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(124,58,237,0.3)] hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_32px_80px_-20px_rgba(0,0,0,0.6)]"
                style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset"
                }}
            >
                {/* Subtle radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.1),transparent_60%)] pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="font-mono text-[10px] text-[var(--color-accent-bright)] tracking-widest uppercase px-3 py-1.5 rounded-full border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.1)] shadow-[0_0_12px_rgba(124,58,237,0.3)]">
                            Featured
                        </span>
                        <span className="text-[13px] text-[rgba(245,247,249,0.4)] font-mono">
                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                    </div>

                    <h2 className="text-3xl lg:text-[44px] text-white mb-6 font-[var(--font-display)] leading-[1.08] tracking-tight group-hover:text-[var(--color-accent-bright)] transition-colors duration-300">
                        {post.title}
                    </h2>

                    <p className="text-[17px] text-[rgba(245,247,249,0.65)] leading-relaxed mb-10 max-w-4xl">
                        {post.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="flex items-center gap-2 text-[13px] text-[rgba(245,247,249,0.4)] font-mono">
                            <Clock size={14} />
                            {post.readingTime}
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {post.tags.map((tag) => (
                                <span key={tag} className="flex items-center gap-1.5 text-[11px] text-[rgba(245,247,249,0.4)] font-mono uppercase tracking-widest">
                                    <Tag size={10} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <span className="ml-auto inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--color-accent-bright)] group-hover:gap-3 transition-all duration-300">
                            Read article <ArrowRight size={16} />
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

function CompactPost({ post, index }: { post: BlogPost; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link href={`/blog/${post.slug}`} className="block group h-full">
                <div
                    className="rounded-2xl p-8 h-full flex flex-col transition-all duration-400 relative overflow-hidden hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(124,58,237,0.3)] hover:-translate-y-[3px] hover:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_20px_40px_-10px_rgba(0,0,0,0.4)]"
                    style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset"
                    }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-[12px] text-[rgba(245,247,249,0.4)] font-mono">
                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[rgba(255,255,255,0.15)]" />
                        <span className="text-[12px] text-[rgba(245,247,249,0.4)] flex items-center gap-1.5 font-mono">
                            <Clock size={12} />
                            {post.readingTime}
                        </span>
                    </div>

                    <h3 className="text-xl text-white mb-3 font-[var(--font-display)] font-semibold leading-[1.25] group-hover:text-[var(--color-accent-bright)] transition-colors duration-300">
                        {post.title}
                    </h3>
                    
                    <p className="text-[15px] text-[rgba(245,247,249,0.6)] leading-relaxed mb-6 line-clamp-3 flex-1">
                        {post.excerpt}
                    </p>

                    <div className="mt-auto pt-5 flex gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        {post.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] text-[var(--color-accent-secondary)] font-mono uppercase tracking-widest bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] px-2 py-1 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default async function BlogPage() {
    const posts = await getPosts();
    const categories = ["All", ...new Set(posts.flatMap((post) => post.tags).slice(0, 6))];

    const featured = posts[0] ? { ...posts[0], featured: true } : null;
    const secondary = posts.slice(1);

    return (
        <div className="pt-32 pb-20 relative overflow-hidden">
            {/* Background blob glows */}
            <div className="blob-violet w-[800px] h-[800px] -top-60 -right-40 opacity-30 animate-float-slow" />
            <div className="blob-pink w-[600px] h-[600px] top-[40%] -left-60 opacity-20 animate-float-slow" style={{ animationDelay: "-4s" }} />

            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-[0.22em] uppercase mb-4">
                        Technical Blog
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl mb-7 font-[var(--font-display)] leading-[1.05] tracking-tight">
                        Engineering
                        <br />
                        <span className="text-[rgba(245,247,249,0.4)]">
                            insights.
                        </span>
                    </h1>
                    <p className="text-lg text-[rgba(245,247,249,0.65)] max-w-2xl leading-relaxed mb-10">
                        Deep technical articles on SOC2 compliance, cloud security
                        architecture, and AI-driven security operations — written by
                        engineers, for engineers.
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md px-4 py-2 text-xs font-mono uppercase tracking-widest text-[rgba(245,247,249,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-200"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Editorial layout */}
            <section className="max-w-7xl mx-auto px-6 relative z-10">
                {featured && <FeaturedPost post={featured} />}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {secondary.map((post, i) => (
                        <CompactPost key={post.slug} post={post} index={i} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 rounded-3xl p-10 relative overflow-hidden"
                    style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset"
                    }}
                >
                    <h3 className="text-2xl text-white mb-3 font-[var(--font-display)] font-bold">Get engineering insights — no spam</h3>
                    <p className="text-[16px] text-[rgba(245,247,249,0.6)] mb-8">Subscribe via the contact page and we&apos;ll share practical security, cloud, and automation playbooks.</p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/blog/pillars/soc2-compliance" className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-2 text-xs font-mono uppercase tracking-widest text-[rgba(245,247,249,0.6)] hover:text-[var(--color-accent-bright)] hover:border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.1)] transition-all duration-200">SOC2 Pillar</Link>
                        <Link href="/blog/pillars/cloud-security-for-startups" className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-2 text-xs font-mono uppercase tracking-widest text-[rgba(245,247,249,0.6)] hover:text-[var(--color-accent-bright)] hover:border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.1)] transition-all duration-200">Cloud Pillar</Link>
                        <Link href="/blog/pillars/business-automation" className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-2 text-xs font-mono uppercase tracking-widest text-[rgba(245,247,249,0.6)] hover:text-[var(--color-accent-bright)] hover:border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.1)] transition-all duration-200">Automation Pillar</Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
