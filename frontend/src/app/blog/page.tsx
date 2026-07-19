import type { Metadata } from "next";
import * as motion from "framer-motion/client";
import {
    type BlogPost,
    BlogExplorer,
    NewsletterPillar
} from "./BlogClient";

export const metadata: Metadata = {
    title: "Blog — Defnix Engineering Insights",
    description: "Technical insights on SOC2 compliance, cloud security, and AI-driven security operations from the Defnix engineering team.",
};

const staticPosts: BlogPost[] = [
    {
        slug: "why-73-percent-soc2-audits-fail",
        title: "Why 73% of SOC2 Audits Fail on the First Attempt — And How to Prevent It",
        excerpt: "A deep dive into the most common SOC2 failure patterns, the technical controls that auditors actually care about, and a systematic approach to preventing audit failures before they happen.",
        author: "Defnix Engineering",
        date: "2026-02-20",
        readingTime: "12 min read",
        tags: ["SOC2", "Compliance", "Engineering"],
        featured: true,
    },
    {
        slug: "cloud-insurance-engineering-discipline",
        title: "Cloud Insurance Is Not a Product — It's an Engineering Discipline",
        excerpt: "Why treating cloud resilience as a product purchase instead of an engineering practice leaves organizations exposed. Covers incident readiness, DR architecture, and blast radius engineering.",
        author: "Defnix Engineering",
        date: "2026-02-15",
        readingTime: "10 min read",
        tags: ["Cloud Security", "Disaster Recovery"],
    },
    {
        slug: "ai-augmented-soc-analyst",
        title: "The AI-Augmented SOC Analyst: Moving Beyond Alert Fatigue",
        excerpt: "How ML-powered alert triage and automated investigation runbooks are transforming security operations — and what it takes to implement them without disrupting your existing workflow.",
        author: "Defnix Engineering",
        date: "2026-02-10",
        readingTime: "14 min read",
        tags: ["AI", "SOC Operations", "Automation"],
    },
    {
        slug: "infrastructure-as-code-security-scanning",
        title: "IaC Security Scanning: Catching Misconfigurations Before They Ship",
        excerpt: "A practical guide to integrating infrastructure-as-code security scanning into your CI/CD pipeline using open-source tools like Checkov, tfsec, and KICS.",
        author: "Defnix Engineering",
        date: "2026-02-05",
        readingTime: "8 min read",
        tags: ["IaC", "DevSecOps", "CI/CD"],
    },
    {
        slug: "zero-trust-architecture-startups",
        title: "Zero Trust Architecture for Startups: A Pragmatic Approach",
        excerpt: "Zero trust doesn't require a Fortune 500 budget. Here's how startups can implement meaningful zero trust controls with the tools they already use.",
        author: "Defnix Engineering",
        date: "2026-01-28",
        readingTime: "11 min read",
        tags: ["Zero Trust", "Architecture"],
    },
];

async function getPosts(): Promise<BlogPost[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    try {
        const res = await fetch(`${apiUrl}/blog/posts?limit=20`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (data.posts || []).map((p: any) => ({
            slug: p.slug, title: p.title, excerpt: p.excerpt || "",
            author: p.author?.name || "Defnix Engineering",
            date: p.publishedAt || p.createdAt,
            readingTime: `${p.readingTime || 5} min read`,
            tags: (p.tags || []).map((t: { name: string }) => t.name),
            featured: false,
        }));
    } catch {
        return staticPosts;
    }
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="pt-32 pb-20" style={{ backgroundColor: "var(--color-surface)", position: "relative", overflow: "hidden" }}>
            {/* Morphing blob background */}
            <div style={{ position: "absolute", top: -150, left: -100, width: "800px", height: "800px", zIndex: 0, opacity: 0.7, pointerEvents: "none" }}>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                    <path fill="color-mix(in srgb, var(--color-pine) 6%, transparent)" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18.1,96.4,-3C96,-12.1,89.2,-19.1,81.1,-26.6C73,-34.1,63.6,-42.2,52,-48.6C40.4,-55,26.6,-59.7,12.7,-64.1C-1.2,-68.5,-15.1,-72.6,-28.9,-71.4C-42.7,-70.2,-56.4,-63.7,-67.2,-53.8C-78,-43.9,-85.9,-30.6,-89.6,-16.5C-93.3,-2.4,-92.8,12.5,-86.7,25.6C-80.6,38.7,-68.9,50.1,-56,58.8C-43.1,67.5,-29.1,73.5,-14.8,76.6C-0.5,79.7,14,79.9,28,76.5C42,73.1,55.5,66.1,66.1,56.2C76.7,46.3,84.4,33.5,88.4,19.6C92.4,5.7,92.7,-9.3,87.6,-23.1C82.5,-36.9,72,-49.5,59.3,-58.5C46.6,-67.5,31.7,-72.9,16.5,-75.7C1.3,-78.5,-14.2,-78.7,-27.9,-74.6L44.7,-76.4Z">
                        <animate attributeName="d" dur="15s" repeatCount="indefinite"
                            values="
                            M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18.1,96.4,-3C96,-12.1,89.2,-19.1,81.1,-26.6C73,-34.1,63.6,-42.2,52,-48.6C40.4,-55,26.6,-59.7,12.7,-64.1C-1.2,-68.5,-15.1,-72.6,-28.9,-71.4C-42.7,-70.2,-56.4,-63.7,-67.2,-53.8C-78,-43.9,-85.9,-30.6,-89.6,-16.5C-93.3,-2.4,-92.8,12.5,-86.7,25.6C-80.6,38.7,-68.9,50.1,-56,58.8C-43.1,67.5,-29.1,73.5,-14.8,76.6C-0.5,79.7,14,79.9,28,76.5C42,73.1,55.5,66.1,66.1,56.2C76.7,46.3,84.4,33.5,88.4,19.6C92.4,5.7,92.7,-9.3,87.6,-23.1C82.5,-36.9,72,-49.5,59.3,-58.5C46.6,-67.5,31.7,-72.9,16.5,-75.7C1.3,-78.5,-14.2,-78.7,-27.9,-74.6L44.7,-76.4Z;
                            M43.7,-72.2C56.6,-64.8,67.6,-53.8,75.4,-41.2C83.2,-28.6,87.8,-14.3,87.7,-0.1C87.6,14.1,82.8,28.2,74.5,40.4C66.2,52.6,54.4,62.9,41.1,69.7C27.8,76.5,13.9,79.8,-0.1,80C-14.1,80.2,-28.2,77.3,-41,70.3C-53.8,63.3,-65.3,52.2,-73.2,39.3C-81.1,26.4,-85.4,11.7,-85.1,-2.9C-84.8,-17.5,-79.9,-32.1,-70.9,-43.6C-61.9,-55.1,-48.8,-63.5,-35,-70.2C-21.2,-76.9,-6.7,-81.9,7.6,-82.1C21.9,-82.3,30.8,-79.6,43.7,-72.2Z;
                            M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18.1,96.4,-3C96,-12.1,89.2,-19.1,81.1,-26.6C73,-34.1,63.6,-42.2,52,-48.6C40.4,-55,26.6,-59.7,12.7,-64.1C-1.2,-68.5,-15.1,-72.6,-28.9,-71.4C-42.7,-70.2,-56.4,-63.7,-67.2,-53.8C-78,-43.9,-85.9,-30.6,-89.6,-16.5C-93.3,-2.4,-92.8,12.5,-86.7,25.6C-80.6,38.7,-68.9,50.1,-56,58.8C-43.1,67.5,-29.1,73.5,-14.8,76.6C-0.5,79.7,14,79.9,28,76.5C42,73.1,55.5,66.1,66.1,56.2C76.7,46.3,84.4,33.5,88.4,19.6C92.4,5.7,92.7,-9.3,87.6,-23.1C82.5,-36.9,72,-49.5,59.3,-58.5C46.6,-67.5,31.7,-72.9,16.5,-75.7C1.3,-78.5,-14.2,-78.7,-27.9,-74.6L44.7,-76.4Z
                            "
                        />
                    </path>
                </svg>
            </div>

            {/* ── Header ─────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 mb-14 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <p className="eyebrow" style={{ marginBottom: 20 }}>technical blog</p>

                    <h1 style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                        fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em",
                        color: "var(--color-mist)", marginBottom: 20,
                    }}>
                        engineering{" "}
                        <span className="text-gradient-sage" style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontWeight: 500 }}>
                            insights.
                        </span>
                    </h1>

                    <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "color-mix(in srgb, var(--color-mist) 55%, transparent)", maxWidth: "55ch" }}>
                        deep technical articles on soc2 compliance, cloud security architecture,
                        and ai-driven security operations — written by engineers, for engineers.
                    </p>
                </motion.div>
            </section>

            {/* ── Posts (with interactive category filter) ──── */}
            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <BlogExplorer posts={posts} />

                {/* Newsletter / pillar CTA */}
                <NewsletterPillar />
            </section>
        </div>
    );
}
