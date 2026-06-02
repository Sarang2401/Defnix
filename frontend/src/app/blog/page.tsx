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
        <Link href={`/blog/${post.slug}`} className="block group mb-6">
            <div className="card-glow rounded-xl bg-neutral-900 p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] text-white tracking-wider uppercase px-3 py-1 rounded-full bg-white/10">
                        featured
                    </span>
                    <span className="text-xs text-white/40">
                        {new Date(post.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium mb-4 group-hover:text-white/80 transition-colors duration-200">
                    {post.title}
                </h2>

                <p className="text-white/60 leading-relaxed mb-6 max-w-3xl">
                    {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm text-white/40">
                        <Clock size={14} />
                        {post.readingTime}
                    </div>
                    <div className="flex gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 text-xs text-white/40"
                            >
                                <Tag size={10} />
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="ml-auto inline-flex items-center gap-2 text-sm text-white/70 font-medium group-hover:gap-3 group-hover:text-white transition-all duration-200">
                        read article <ArrowRight size={14} />
                    </span>
                </div>
            </div>
        </Link>
    );
}

function CompactPost({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="block group">
            <div className="card-glow rounded-xl bg-neutral-900 p-6">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-white/40">
                        {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                    <span className="text-xs text-white/40 flex items-center gap-1">
                        <Clock size={12} />
                        {post.readingTime}
                    </span>
                </div>
                <h3 className="text-lg text-white mb-2 group-hover:text-white/70 transition-colors duration-200 leading-snug">
                    {post.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed line-clamp-2">
                    {post.excerpt}
                </p>
                <div className="mt-3 flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] text-white/30 uppercase tracking-wider"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}

export default async function BlogPage() {
    const posts = await getPosts();
    const categories = ["All", ...new Set(posts.flatMap((post) => post.tags).slice(0, 6))];

    const featured = posts[0] ? { ...posts[0], featured: true } : null;
    const secondary = posts.slice(1);

    return (
        <div className="pt-32 pb-20">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 mb-16">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4"
                >
                    technical blog
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl text-white font-medium mb-6"
                >
                    engineering
                    <br />
                    <span className="text-white/50">insights.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-white/60 max-w-2xl leading-relaxed mb-8"
                >
                    deep technical articles on soc2 compliance, cloud security
                    architecture, and ai-driven security operations — written by
                    engineers, for engineers.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap gap-2.5"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all duration-200"
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>
            </section>

            {/* Editorial layout */}
            <section className="max-w-7xl mx-auto px-6">
                {featured && <FeaturedPost post={featured} />}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {secondary.map((post) => (
                        <CompactPost key={post.slug} post={post} />
                    ))}
                </div>

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 rounded-2xl bg-neutral-900/60 backdrop-blur-sm border border-white/10 p-10"
                >
                    <h3 className="text-2xl text-white font-medium mb-3">get engineering insights — no spam</h3>
                    <p className="text-white/60 mb-8">subscribe via the contact page and we&apos;ll share practical security, cloud, and automation playbooks.</p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/blog/pillars/soc2-compliance" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/60 hover:text-white hover:border-white/20 transition-all duration-200">SOC2 Pillar</Link>
                        <Link href="/blog/pillars/cloud-security-for-startups" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/60 hover:text-white hover:border-white/20 transition-all duration-200">Cloud Pillar</Link>
                        <Link href="/blog/pillars/business-automation" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-white/60 hover:text-white hover:border-white/20 transition-all duration-200">Automation Pillar</Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
