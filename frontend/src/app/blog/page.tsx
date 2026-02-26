import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition, StaggerContainer } from "@/components/ui/PageTransition";
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

/* ---------- Static fallback data (used when API is unreachable) ---------- */

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

/* ---------- Server-side data fetching ---------- */

async function getPosts(): Promise<BlogPost[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    try {
        const res = await fetch(`${apiUrl}/blog/posts?limit=20`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        // Map API response to our BlogPost shape
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
        // API unreachable — use static fallback
        return staticPosts;
    }
}

/* ---------- Components ---------- */

function FeaturedPost({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="block group">
            <div className="card-glow rounded-lg bg-[var(--color-bg-surface)] p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-accent)] tracking-wider uppercase px-2 py-1 rounded bg-[var(--color-accent-dim)]">
                        Featured
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                        {new Date(post.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[var(--color-text-primary)] mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-200">
                    {post.title}
                </h2>

                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-3xl">
                    {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
                        <Clock size={14} />
                        {post.readingTime}
                    </div>
                    <div className="flex gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] font-[var(--font-mono)]"
                            >
                                <Tag size={10} />
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="ml-auto inline-flex items-center gap-2 text-sm text-[var(--color-accent)] font-[var(--font-heading)] font-medium group-hover:gap-3 transition-all duration-200">
                        Read article <ArrowRight size={14} />
                    </span>
                </div>
            </div>
        </Link>
    );
}

function CompactPost({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="block group">
            <div className="card-glow rounded-lg bg-[var(--color-bg-surface)] p-6">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-[var(--color-text-muted)]">
                        {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                        <Clock size={12} />
                        {post.readingTime}
                    </span>
                </div>
                <h3 className="text-lg text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-200 leading-snug">
                    {post.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
                    {post.excerpt}
                </p>
                <div className="mt-3 flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] text-[var(--color-text-muted)] font-[var(--font-mono)] uppercase tracking-wider"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}

/* ---------- Page ---------- */

export default async function BlogPage() {
    const posts = await getPosts();

    // First post is featured, rest are secondary
    const featured = posts[0] ? { ...posts[0], featured: true } : null;
    const secondary = posts.slice(1);

    return (
        <div className="pt-28 pb-20">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 mb-16">
                <PageTransition>
                    <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                        Technical Blog
                    </p>
                </PageTransition>
                <PageTransition delay={0.1}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text-primary)] mb-6">
                        Engineering
                        <br />
                        <span className="text-[var(--color-text-secondary)]">
                            insights.
                        </span>
                    </h1>
                </PageTransition>
                <PageTransition delay={0.2}>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                        Deep technical articles on SOC2 compliance, cloud security
                        architecture, and AI-driven security operations — written by
                        engineers, for engineers.
                    </p>
                </PageTransition>
            </section>

            {/* Editorial layout: featured + secondary */}
            <section className="max-w-7xl mx-auto px-6">
                {/* Featured post */}
                {featured && (
                    <PageTransition className="mb-8">
                        <FeaturedPost post={featured} />
                    </PageTransition>
                )}

                {/* Secondary posts — 2-column on desktop */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {secondary.map((post) => (
                        <CompactPost key={post.slug} post={post} />
                    ))}
                </StaggerContainer>
            </section>
        </div>
    );
}
