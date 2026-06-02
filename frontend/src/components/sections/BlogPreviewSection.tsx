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
                            <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4">
                                technical blog
                            </p>
                            <h2 className="text-3xl sm:text-4xl text-white font-medium">
                                engineering insights
                            </h2>
                        </div>
                        <Link
                            href="/blog"
                            className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors link-hover-slide"
                        >
                            view all posts <ArrowRight size={14} />
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
                                className="block rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-white/8 p-8 h-full group relative overflow-hidden"
                            >
                                {/* Gradient accent bar */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                <p className="text-[10px] text-white/40 tracking-wider uppercase mb-4 mt-2">
                                    {featured.category}
                                </p>
                                <h3 className="text-xl lg:text-2xl text-white group-hover:text-white/80 transition-colors mb-4 leading-tight">
                                    {featured.title}
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed mb-6">
                                    {featured.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-white/40">
                                    <span>{featured.date}</span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} /> {featured.readingTime} min read
                                    </span>
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
                                        className="block rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-white/8 p-6 group"
                                    >
                                        <p className="text-[10px] text-white/40 tracking-wider uppercase mb-2">
                                            {post.category}
                                        </p>
                                        <h4 className="text-base text-white group-hover:text-white/80 transition-colors mb-2 leading-snug">
                                            {post.title}
                                        </h4>
                                        <div className="flex items-center gap-4 text-xs text-white/40">
                                            <span>{post.date}</span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} /> {post.readingTime} min
                                            </span>
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
