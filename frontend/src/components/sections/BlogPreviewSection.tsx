"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageTransition } from "../ui/PageTransition";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readingTime: number;
    date: string;
}

// Placeholder posts — will be replaced with API data
const samplePosts: BlogPost[] = [
    {
        slug: "why-73-percent-soc2-audits-fail",
        title: "Why 73% of SOC2 Audits Fail on the First Attempt — And How to Prevent It",
        excerpt:
            "Deep dive into the most common SOC2 failure patterns, the technical controls that trip up engineering teams, and a systematic prevention framework.",
        category: "SOC2 Compliance",
        readingTime: 8,
        date: "Feb 2026",
    },
    {
        slug: "cloud-insurance-engineering-discipline",
        title: "Cloud Insurance Is Not a Product — It's an Engineering Discipline",
        excerpt:
            "Covers cloud risk reduction, incident readiness engineering, and disaster recovery architecture.",
        category: "Cloud Security",
        readingTime: 7,
        date: "Feb 2026",
    },
    {
        slug: "ai-augmented-soc-analyst",
        title: "The AI-Augmented SOC Analyst: Moving Beyond Alert Fatigue",
        excerpt:
            "Explores AI-driven security operations, automated triage, and the future of SOC workflows.",
        category: "AI & Automation",
        readingTime: 9,
        date: "Feb 2026",
    },
];

export function BlogPreviewSection() {
    const featured = samplePosts[0];
    const secondary = samplePosts.slice(1);

    return (
        <section className="section-gap" id="blog">
            <div className="max-w-7xl mx-auto px-6">
                <PageTransition>
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                                Technical Blog
                            </p>
                            <h2 className="text-3xl sm:text-4xl text-[var(--color-text-primary)]">
                                Engineering insights
                            </h2>
                        </div>
                        <Link
                            href="/blog"
                            className="hidden sm:inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                        >
                            View all posts <ArrowRight size={14} />
                        </Link>
                    </div>
                </PageTransition>

                {/* Editorial layout: 1 featured + secondary compact */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Featured post — large */}
                    <PageTransition delay={0.1} className="lg:col-span-3">
                        <Link
                            href={`/blog/${featured.slug}`}
                            className="card-glow block rounded-lg bg-[var(--color-bg-surface)] p-8 h-full group"
                        >
                            <p className="font-[var(--font-mono)] text-[10px] text-[var(--color-accent)] tracking-wider uppercase mb-4">
                                {featured.category}
                            </p>
                            <h3 className="text-xl lg:text-2xl text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors mb-4 leading-tight">
                                {featured.title}
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                {featured.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                                <span>{featured.date}</span>
                                <span className="flex items-center gap-1">
                                    <Clock size={12} /> {featured.readingTime} min read
                                </span>
                            </div>
                        </Link>
                    </PageTransition>

                    {/* Secondary posts — compact list */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {secondary.map((post, i) => (
                            <PageTransition key={post.slug} delay={0.2 + i * 0.08}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="card-glow block rounded-lg bg-[var(--color-bg-surface)] p-6 group"
                                >
                                    <p className="font-[var(--font-mono)] text-[10px] text-[var(--color-accent)] tracking-wider uppercase mb-2">
                                        {post.category}
                                    </p>
                                    <h4 className="text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors mb-2 leading-snug">
                                        {post.title}
                                    </h4>
                                    <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                                        <span>{post.date}</span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} /> {post.readingTime} min
                                        </span>
                                    </div>
                                </Link>
                            </PageTransition>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
