import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Clock, Tag, User, Share2, Twitter, Linkedin } from "lucide-react";
import { BlogEnhancements } from "@/components/sections/BlogEnhancements";
import { CopyLinkButton } from "@/components/ui/CopyLinkButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

/* ---------- Types ---------- */
interface PostShape {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readingTime: string;
    tags: string[];
    content: string;
}

/* ---------- Server-side data fetching ---------- */
async function getPost(slug: string): Promise<PostShape | null> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    try {
        const res = await fetch(`${apiUrl}/blog/posts/${slug}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("not found");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p: any = await res.json();
        return {
            title: p.title,
            excerpt: p.excerpt || "",
            author: p.author?.name || "Defnix Engineering",
            date: p.publishedAt || p.createdAt,
            readingTime: `${p.readingTime || 5} min read`,
            tags: (p.tags || []).map((t: { name: string }) => t.name),
            content: p.content || "",
        };
    } catch {
        // API unreachable — fall back to static content
        return staticPosts[slug] || null;
    }
}

// Static blog content (fallback when API is unreachable)
const staticPosts: Record<string, PostShape> = {
    "why-73-percent-soc2-audits-fail": {
        title: "Why 73% of SOC2 Audits Fail on the First Attempt — And How to Prevent It",
        excerpt:
            "A deep dive into the most common SOC2 failure patterns, the technical controls that auditors actually care about, and how to prevent failures.",
        author: "Defnix Engineering",
        date: "2026-02-20",
        readingTime: "12 min read",
        tags: ["SOC2", "Compliance", "Engineering"],
        content: `## The State of SOC2 Compliance

SOC2 compliance has become the de facto standard for B2B SaaS companies. Yet despite its ubiquity, a staggering 73% of companies fail their first SOC2 audit. This isn't because SOC2 is impossibly difficult — it's because most organizations fundamentally misunderstand what auditors are looking for.

The problem isn't documentation. It's architecture.

## The Five Most Common Failure Patterns

### 1. Access Control Gaps

The most frequent finding in failed SOC2 audits is inadequate access control. This doesn't mean you don't have access controls — it means you can't *prove* they work consistently. Auditors look for:

- Automated access provisioning tied to HR onboarding/offboarding
- Regular access reviews with documented evidence of revocations
- Principle of least privilege enforcement with measurable compliance rates
- Multi-factor authentication on all production systems

### 2. Change Management Theater

Many startups confuse "we use GitHub" with "we have change management." A proper change management process requires documented approval workflows, pre-deployment security checks, rollback procedures, and post-deployment verification — all with audit trails.

### 3. Monitoring Without Response

Having CloudWatch dashboards doesn't satisfy the monitoring control. Auditors want to see: defined alert thresholds, documented escalation procedures, evidence of alerts being investigated, and mean-time-to-response metrics.

### 4. Vendor Management Blind Spots

If you use Stripe, AWS, Datadog, or any third-party service that touches customer data, you need documented vendor risk assessments. Most startups skip this entirely.

### 5. Incident Response Untested

Having an incident response plan in a Notion doc doesn't count. Auditors look for evidence of tabletop exercises, post-incident reviews, and demonstrated improvements from past incidents.

## The Engineering Approach to SOC2

The fundamental shift is treating compliance as an engineering problem, not a documentation exercise.

### Evidence Pipeline Automation

Instead of manually collecting screenshots before each audit, build automated evidence collection pipelines:

\`\`\`
# Example: Automated access review evidence
├── collectors/
│   ├── aws_iam_collector.py      # Daily IAM policy snapshots
│   ├── github_access_collector.py # Weekly repo permission audits
│   └── okta_user_collector.py    # Real-time provisioning logs
├── storage/
│   └── evidence_store.py         # Immutable evidence archive
└── reports/
    └── access_review_report.py   # Monthly review generation
\`\`\`

### Policy-as-Code

Keep your security policies in version control alongside your infrastructure code. When your infrastructure changes, your policies update automatically. When an auditor asks about your encryption policy, you can show them the exact Terraform module that enforces it.

### Continuous Compliance Monitoring

Don't wait for an audit to discover gaps. Build dashboards that show real-time compliance posture across all trust services criteria. This turns the audit from a high-stakes test into a routine review of data you already have.

## Prevention Checklist

Before your next audit, verify these technical controls are not just documented but *automated and continuously monitored*:

1. **Access Control**: Automated provisioning, quarterly reviews with evidence, MFA everywhere
2. **Change Management**: Code review requirements, deployment approval workflows, rollback procedures
3. **Monitoring**: Defined thresholds, escalation procedures, MTTR tracking
4. **Vendor Management**: Risk assessments for all data processors, annual reviews
5. **Incident Response**: Tested playbooks, documented exercises, improvement evidence
6. **Encryption**: At-rest and in-transit enforcement with automated compliance checks
7. **Business Continuity**: Tested DR procedures with documented RTO/RPO

## Conclusion

SOC2 doesn't have to be a scramble. When you treat compliance as an engineering problem — building automated controls, continuous monitoring, and evidence pipelines into your infrastructure from the start — the audit becomes a formality, not a crisis.

The companies that pass on the first attempt aren't the ones with the best documentation. They're the ones with the best engineering.`,
    },
    "cloud-insurance-engineering-discipline": {
        title: "Cloud Insurance Is Not a Product — It's an Engineering Discipline",
        excerpt:
            "Why treating cloud resilience as a product purchase instead of an engineering practice leaves organizations exposed.",
        author: "Defnix Engineering",
        date: "2026-02-15",
        readingTime: "10 min read",
        tags: ["Cloud Security", "Disaster Recovery"],
        content: `## The Insurance Metaphor

When we talk about "cloud insurance," we don't mean a policy you buy from an insurer. We mean engineering your infrastructure so that when — not if — something fails, the blast radius is contained, recovery is automated, and your customers never notice.

## The Cost of Unpreparedness

The average cloud data breach costs $4.45 million. But the real cost isn't the breach itself — it's the cascade of failures that follow when your organization doesn't have tested recovery procedures, documented runbooks, or practiced incident response.

## Engineering Resilience

True cloud resilience is built on three pillars:

### 1. Blast Radius Minimization

Every system should be designed with failure boundaries. Network segmentation, service mesh isolation, and data compartmentalization ensure that when one component fails, the failure doesn't propagate.

### 2. Automated Recovery

Manual recovery procedures are recovery procedures that won't work at 3 AM when your on-call engineer is half-asleep. Automated failover, self-healing infrastructure, and tested backup restoration are the foundation of reliable recovery.

### 3. Practiced Response

Incident response is a skill, not a document. Regular tabletop exercises, chaos engineering tests, and post-incident reviews build the organizational muscle memory needed to respond effectively under pressure.

## Conclusion

Cloud insurance isn't something you buy — it's something you build. And like all engineering, it requires continuous investment, testing, and improvement.`,
    },
    "ai-augmented-soc-analyst": {
        title: "The AI-Augmented SOC Analyst: Moving Beyond Alert Fatigue",
        excerpt:
            "How ML-powered alert triage and automated investigation runbooks are transforming security operations.",
        author: "Defnix Engineering",
        date: "2026-02-10",
        readingTime: "14 min read",
        tags: ["AI", "SOC Operations", "Automation"],
        content: `## The Alert Fatigue Crisis

The average Security Operations Center receives over 11,000 alerts per day. Of those, roughly 45% are false positives. Security analysts — expensive, skilled professionals — spend nearly half their time investigating noise.

This isn't sustainable.

## The AI Augmentation Approach

The key insight is that AI shouldn't replace SOC analysts — it should handle the routine so analysts can focus on the novel. An effective AI augmentation layer provides three capabilities:

### 1. Intelligent Triage

ML models trained on historical alert data can classify incoming alerts with high accuracy. The goal isn't 100% automation — it's routing the right alerts to the right humans with the right context.

### 2. Automated Enrichment

Before an analyst sees an alert, the AI layer enriches it with relevant context: threat intelligence lookups, asset criticality scores, user behavior baselines, and historical incident data. This reduces investigation time from minutes to seconds.

### 3. Playbook Execution

For well-understood alert types, automated playbooks can execute investigation and remediation steps without human intervention. Each playbook includes clear escalation criteria: if the automation encounters something unexpected, it escalates to a human immediately.

## Implementation Reality

Deploying AI in a SOC isn't as simple as installing a product. It requires careful data preparation, model training on your specific alert patterns, integration testing with your existing tools, and a gradual rollout with extensive human oversight.

The organizations seeing real results are the ones treating this as an engineering project, not a procurement decision.

## Measuring Success

The key metrics for AI-augmented SOC operations:

- **False Positive Reduction Rate**: Target 60%+ reduction in false positive alerts reaching analysts
- **Mean Time to Respond (MTTR)**: Target sub-15-minute MTTR for high-severity alerts
- **Analyst Utilization**: Analysts spending 80%+ of time on genuine investigations
- **Coverage**: ML triage covering 90%+ of total alert volume

## Conclusion

AI isn't going to replace your SOC team. But it will determine whether your SOC team spends their time on threats that matter or drowns in noise. The organizations that get this right will have a fundamental advantage in security posture — and analyst retention.`,
    },
};

// Fallback content for slugs without full content
const defaultPost = {
    title: "Article",
    excerpt: "This article is coming soon.",
    author: "Defnix Engineering",
    date: "2026-02-01",
    readingTime: "5 min read",
    tags: ["Engineering"],
    content: "Full article content coming soon. Check back later for the complete article.",
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

const pillarLinks = [
    { label: "SOC2 Compliance Pillar", href: "/blog/pillars/soc2-compliance" },
    { label: "Cloud Security Pillar", href: "/blog/pillars/cloud-security-for-startups" },
    { label: "Business Automation Pillar", href: "/blog/pillars/business-automation" },
    { label: "Website Development Pillar", href: "/blog/pillars/website-development-small-business" },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    return {
        title: post?.title || "Blog",
        description: post?.excerpt || "Defnix Engineering Blog",
    };
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const post = (await getPost(slug)) || { ...defaultPost, title: slug.replace(/-/g, " ") };
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        author: {
            "@type": "Person",
            name: post.author,
        },
        publisher: {
            "@type": "Organization",
            name: "Defnix",
            url: "https://defnix.in",
        },
        datePublished: post.date,
        mainEntityOfPage: `https://defnix.in/blog/${slug}`,
    };

    const slugify = (value: string) =>
        value.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
    const headings = post.content
        .split("\n")
        .filter((line) => line.startsWith("## ") || line.startsWith("### "))
        .map((line) => ({
            text: line.replace(/^###?\s/, "").trim(),
            level: line.startsWith("### ") ? 3 as const : 2 as const,
            id: slugify(line.replace(/^###?\s/, "").trim()),
        }));
    const lowerTags = post.tags.map((tag) => tag.toLowerCase());
    const serviceLinks = [
        ...(lowerTags.some((t) => t.includes("soc2") || t.includes("compliance"))
            ? [{ label: "SOC2 Failure Prevention", href: "/solutions/soc2-failure-prevention" }]
            : []),
        ...(lowerTags.some((t) => t.includes("cloud") || t.includes("disaster"))
            ? [{ label: "Cloud Insurance", href: "/solutions/cloud-insurance" }]
            : []),
        ...(lowerTags.some((t) => t.includes("ai") || t.includes("automation") || t.includes("soc"))
            ? [{ label: "AI Enhanced SOC Analyst", href: "/solutions/ai-soc-analyst" }]
            : []),
    ];

    // Simple markdown-like rendering for content
    const renderContent = (content: string) => {
        const lines = content.split("\n");
        const elements: React.ReactNode[] = [];
        let inCodeBlock = false;
        let codeLines: string[] = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Code blocks
            if (line.startsWith("```")) {
                if (inCodeBlock) {
                    elements.push(
                        <pre
                            key={`code-${i}`}
                            className="rounded-xl p-5 overflow-x-auto my-6"
                            style={{ backgroundColor: "var(--color-secondary)", border: "1px solid var(--color-border)" }}
                        >
                            <code className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                                {codeLines.join("\n")}
                            </code>
                        </pre>
                    );
                    codeLines = [];
                    inCodeBlock = false;
                } else {
                    inCodeBlock = true;
                }
                continue;
            }

            if (inCodeBlock) {
                codeLines.push(line);
                continue;
            }

            // Headings
            if (line.startsWith("## ")) {
                const text = line.slice(3);
                elements.push(
                    <h2
                        key={i}
                        className="text-2xl sm:text-3xl font-medium mt-12 mb-4"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-mist)" }}
                    >
                        {text}
                    </h2>
                );
            } else if (line.startsWith("### ")) {
                const text = line.slice(4);
                elements.push(
                    <h3
                        key={i}
                        className="text-xl font-medium mt-8 mb-3"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-mist)" }}
                    >
                        {text}
                    </h3>
                );
            }
            // Lists
            else if (line.startsWith("- ")) {
                elements.push(
                    <li
                        key={i}
                        className="flex items-start gap-3 leading-relaxed ml-1"
                        style={{ color: "var(--color-text-secondary)" }}
                    >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--color-sage)" }} />
                        <span>{line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}</span>
                    </li>
                );
            }
            // Numbered lists
            else if (/^\d+\.\s/.test(line)) {
                const text = line.replace(/^\d+\.\s/, "");
                elements.push(
                    <li
                        key={i}
                        className="leading-relaxed ml-5 list-decimal"
                        style={{ color: "var(--color-text-secondary)" }}
                    >
                        {text.replace(/\*\*(.*?)\*\*/g, "$1")}
                    </li>
                );
            }
            // Paragraphs
            else if (line.trim()) {
                // Handle inline code
                const rendered = line.replace(
                    /`([^`]+)`/g,
                    '<code style="color: var(--color-mist); background: color-mix(in srgb, var(--color-sage) 12%, transparent);" class="text-sm px-1.5 py-0.5 rounded">$1</code>'
                );
                elements.push(
                    <p
                        key={i}
                        className="leading-relaxed my-4"
                        style={{ color: "var(--color-text-secondary)" }}
                        dangerouslySetInnerHTML={{ __html: rendered }}
                    />
                );
            }
        }

        return elements;
    };

    return (
        <div className="pt-28 pb-20">
            <article className="max-w-3xl mx-auto px-6">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                />
                <BlogEnhancements headings={headings} />
                <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
                {/* Back link */}
                <PageTransition>
                    <Link
                        href="/blog"
                        className="footer-link inline-flex items-center gap-2 text-sm mb-8"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        <ArrowLeft size={14} />
                        back to blog
                    </Link>
                </PageTransition>

                {/* Header */}
                <PageTransition delay={0.1}>
                    <div className="mb-10">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1 text-xs tracking-wider uppercase px-3 py-1 rounded-full"
                                    style={{ color: "var(--color-sage)", backgroundColor: "color-mix(in srgb, var(--color-sage) 12%, transparent)" }}
                                >
                                    <Tag size={10} />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-medium mb-6 leading-tight"
                            style={{ fontFamily: "var(--font-headline)", color: "var(--color-mist)" }}
                        >
                            {post.title}
                        </h1>

                        <div
                            className="flex flex-wrap items-center gap-4 text-sm pb-8"
                            style={{ color: "var(--color-text-muted)", borderBottom: "1px solid var(--color-border)" }}
                        >
                            <span className="flex items-center gap-1.5">
                                <User size={14} />
                                {post.author}
                            </span>
                            <span>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {post.readingTime}
                            </span>
                        </div>
                    </div>
                </PageTransition>

                {/* Content */}
                <PageTransition delay={0.2}>
                    <div className="prose-defnix">{renderContent(post.content)}</div>
                </PageTransition>

                <PageTransition delay={0.25}>
                    <div className="mt-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6">
                        <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Author</p>
                        <h3 className="text-lg text-[var(--color-text-primary)]">{post.author}</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">Engineering Team at Defnix</p>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-accent)]">
                            LinkedIn Profile
                        </a>
                    </div>
                </PageTransition>

                {/* Share + CTA */}
                <PageTransition delay={0.3}>
                    <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--color-border)" }}>
                        {/* Share buttons */}
                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-sm flex items-center gap-2" style={{ color: "var(--color-text-muted)" }}>
                                <Share2 size={14} />
                                share
                            </span>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tint-sage-hover w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                style={{ backgroundColor: "var(--color-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
                            >
                                <Twitter size={14} />
                            </a>
                            <a
                                href={`https://linkedin.com/sharing/share-offsite/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tint-sage-hover w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                style={{ backgroundColor: "var(--color-secondary)", border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
                            >
                                <Linkedin size={14} />
                            </a>
                            <CopyLinkButton url={`https://defnix.in/blog/${slug}`} />
                        </div>

                        <div className="mb-10">
                            <h3 className="text-lg text-[var(--color-text-primary)] mb-3">Related posts</h3>
                            <div className="flex flex-wrap gap-2">
                                {Object.keys(staticPosts)
                                    .filter((key) => key !== slug)
                                    .slice(0, 3)
                                    .map((related) => (
                                        <Link key={related} href={`/blog/${related}`} className="rounded border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">
                                            {staticPosts[related].title}
                                        </Link>
                                    ))}
                            </div>
                        </div>

                        <div className="mb-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
                            <h3 className="text-lg text-[var(--color-text-primary)] mb-3">Read next</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {serviceLinks.length > 0 ? serviceLinks.map((item) => (
                                    <Link key={item.href} href={item.href} className="rounded border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">
                                        {item.label}
                                    </Link>
                                )) : (
                                    <Link href="/solutions" className="rounded border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">
                                        Explore Solutions
                                    </Link>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {pillarLinks.map((item) => (
                                    <Link key={item.href} href={item.href} className="rounded border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="neu-raised-surface rounded-xl p-8 text-center" style={{ border: "1px solid var(--color-border)" }}>
                            <h3 className="text-xl font-medium mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--color-mist)" }}>
                                need help implementing this?
                            </h3>
                            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--color-text-secondary)" }}>
                                our engineering team can help you build the controls,
                                automation, and infrastructure discussed in this article.
                            </p>
                            <Button variant="primary" size="md" href="/contact">
                                book a free consultation
                            </Button>
                        </div>
                    </div>
                </PageTransition>
            </article>
        </div>
    );
}
