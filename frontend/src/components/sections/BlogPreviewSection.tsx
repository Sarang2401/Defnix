"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "../ui/TiltCard";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readingTime: number;
    date: string;
    image: string;
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
        image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1200&q=80",
    },
    {
        slug: "cloud-insurance-engineering-discipline",
        title: "Cloud Insurance Is Not a Product — It's an Engineering Discipline",
        excerpt:
            "Covers cloud risk reduction, incident readiness engineering, and disaster recovery architecture.",
        category: "Cloud Security",
        readingTime: 7,
        date: "Feb 2026",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    },
    {
        slug: "ai-augmented-soc-analyst",
        title: "The AI-Augmented SOC Analyst: Moving Beyond Alert Fatigue",
        excerpt:
            "Explores AI-driven security operations, automated triage, and the future of SOC workflows.",
        category: "AI & Automation",
        readingTime: 9,
        date: "Feb 2026",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    },
];

export function BlogPreviewSection() {
    const featured = samplePosts[0];
    const secondary = samplePosts.slice(1);

    return (
        <section className="section-gap" id="blog">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-end justify-between mb-12">
                        <div>
                    <p className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-[0.22em] uppercase mb-4">
                            Technical Blog
                        </p>
                        <h2 className="text-3xl sm:text-4xl text-[var(--color-text-primary)] font-[var(--font-display)]">
                            Engineering insights
                        </h2>
                        </div>
                        <Link
                            href="/blog"
                            className="hidden sm:inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors link-hover-slide"
                        >
                            View all posts <ArrowRight size={14} />
                        </Link>
                    </div>
                </motion.div>

                {/* Editorial layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Featured post */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        <TiltCard tiltAmount={4} className="h-full block">
                            <Link
                                href={`/blog/${featured.slug}`}
                                className="block rounded-2xl p-14 h-full group relative overflow-hidden min-h-[450px] flex flex-col justify-end shadow-lg"
                            >
                                <img src={featured.image} alt={featured.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.4)] to-transparent" />

                                <div className="relative z-10">
                                    <p className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-widest uppercase mb-5 mt-2">
                                        {featured.category}
                                    </p>
                                    <h3 className="text-3xl lg:text-[44px] font-bold text-white group-hover:text-[var(--color-accent-bright)] transition-colors mb-5 leading-[1.08] font-[var(--font-display)] tracking-tight">
                                        {featured.title}
                                    </h3>
                                    <p className="text-base text-[rgba(245,247,249,0.7)] leading-relaxed mb-8">
                                        {featured.excerpt}
                                    </p>
                                    <div className="flex items-center gap-5 text-sm text-[rgba(245,247,249,0.45)] font-mono">
                                        <span>{featured.date}</span>
                                        <span className="flex items-center gap-2">
                                            <Clock size={14} /> {featured.readingTime} min read
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </TiltCard>
                    </motion.div>

                    {/* Secondary posts */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {secondary.map((post, i) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                className="flex-1"
                            >
                                <TiltCard tiltAmount={3} className="h-full block">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="block rounded-2xl group h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                                        style={{
                                          background: "rgba(255,255,255,0.04)",
                                          backdropFilter: "blur(20px)",
                                          border: "1px solid rgba(255,255,255,0.08)",
                                        }}
                                    >
                                        <div className="h-44 overflow-hidden relative">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <p className="font-mono text-[10px] text-[var(--color-accent-secondary)] tracking-widest uppercase mb-3">
                                                {post.category}
                                            </p>
                                            <h4 className="text-[17px] text-white font-bold group-hover:text-[var(--color-accent-bright)] transition-colors mb-4 leading-snug font-[var(--font-display)] tracking-tight">
                                                {post.title}
                                            </h4>
                                            <div className="flex items-center gap-4 text-xs text-[rgba(245,247,249,0.35)] mt-auto font-mono">
                                                <span>{post.date}</span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock size={13} /> {post.readingTime} min
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
