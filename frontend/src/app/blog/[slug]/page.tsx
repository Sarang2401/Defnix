import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Clock, Tag, User, Share2, Twitter, Linkedin } from "lucide-react";

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
                            className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg p-5 overflow-x-auto my-6"
                        >
                            <code className="font-[var(--font-mono)] text-sm text-[var(--color-text-secondary)]">
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
                elements.push(
                    <h2
                        key={i}
                        className="text-2xl sm:text-3xl text-[var(--color-text-primary)] mt-12 mb-4"
                    >
                        {line.slice(3)}
                    </h2>
                );
            } else if (line.startsWith("### ")) {
                elements.push(
                    <h3
                        key={i}
                        className="text-xl text-[var(--color-text-primary)] mt-8 mb-3"
                    >
                        {line.slice(4)}
                    </h3>
                );
            }
            // Lists
            else if (line.startsWith("- ")) {
                elements.push(
                    <li
                        key={i}
                        className="flex items-start gap-3 text-[var(--color-text-secondary)] leading-relaxed ml-1"
                    >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
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
                        className="text-[var(--color-text-secondary)] leading-relaxed ml-5 list-decimal"
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
                    '<code class="font-mono text-[var(--color-accent)] text-sm bg-[var(--color-bg-primary)] px-1.5 py-0.5 rounded">$1</code>'
                );
                elements.push(
                    <p
                        key={i}
                        className="text-[var(--color-text-secondary)] leading-relaxed my-4"
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
                {/* Back link */}
                <PageTransition>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-8"
                    >
                        <ArrowLeft size={14} />
                        Back to blog
                    </Link>
                </PageTransition>

                {/* Header */}
                <PageTransition delay={0.1}>
                    <div className="mb-10">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1 text-xs text-[var(--color-accent)] font-[var(--font-mono)] tracking-wider uppercase px-2 py-1 rounded bg-[var(--color-accent-dim)]"
                                >
                                    <Tag size={10} />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)] mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)] pb-8 border-b border-[var(--color-border)]">
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

                {/* Share + CTA */}
                <PageTransition delay={0.3}>
                    <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
                        {/* Share buttons */}
                        <div className="flex items-center gap-4 mb-10">
                            <span className="text-sm text-[var(--color-text-muted)] flex items-center gap-2">
                                <Share2 size={14} />
                                Share
                            </span>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors"
                            >
                                <Twitter size={14} />
                            </a>
                            <a
                                href={`https://linkedin.com/sharing/share-offsite/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors"
                            >
                                <Linkedin size={14} />
                            </a>
                        </div>

                        {/* CTA */}
                        <div className="rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-8 text-center">
                            <h3 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Need help implementing this?
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
                                Our engineering team can help you build the controls,
                                automation, and infrastructure discussed in this article.
                            </p>
                            <Button variant="primary" size="md" href="/contact">
                                Book a Consultation
                            </Button>
                        </div>
                    </div>
                </PageTransition>
            </article>
        </div>
    );
}
