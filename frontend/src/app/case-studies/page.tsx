import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition, StaggerContainer } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Building2, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
    title: "Case Studies",
    description:
        "Real-world results from our engineering engagements in SOC2 compliance, cloud security, and AI-driven security operations.",
};

interface CaseStudyShape {
    slug: string;
    client: string;
    industry: string;
    title: string;
    challenge: string;
    solution: string;
    results: string[];
    metric: string;
    metricLabel: string;
}

/* ---------- Static fallback ---------- */
const staticCaseStudies: CaseStudyShape[] = [
    {
        slug: "fintech-soc2-compliance",
        client: "Series B Fintech Startup",
        industry: "Financial Technology",
        title: "SOC2 Type II in 12 Weeks — First-Time Pass",
        challenge:
            "A Series B fintech company needed SOC2 Type II certification to close a $2M enterprise deal but had zero compliance infrastructure. Their audit was scheduled in 14 weeks.",
        solution:
            "We deployed automated evidence collection pipelines across their AWS infrastructure, built 17 security policies from scratch with policy-as-code enforcement, and implemented continuous control monitoring with real-time dashboards.",
        results: [
            "First-time SOC2 Type II pass in 12 weeks",
            "94% of evidence collection fully automated",
            "$2M enterprise deal closed within 2 weeks of certification",
            "Ongoing compliance maintenance reduced to 4 hours/month",
        ],
        metric: "12 weeks",
        metricLabel: "To SOC2 Type II",
    },
    {
        slug: "saas-cloud-resilience",
        client: "Mid-Stage SaaS Platform",
        industry: "Enterprise SaaS",
        title: "99.99% Uptime After Multi-Region DR Engineering",
        challenge:
            "A SaaS platform serving 500+ enterprise clients experienced a 6-hour outage from a single-AZ failure. Their DR procedures were untested, and recovery was entirely manual.",
        solution:
            "We re-architected their infrastructure for multi-AZ active-active failover, built automated DR procedures with verified RTO/RPO targets, and implemented chaos engineering tests on a quarterly cadence.",
        results: [
            "Zero unplanned downtime in 8 months post-engagement",
            "RTO reduced from 6 hours to 4 minutes",
            "Automated failover tested monthly via chaos engineering",
            "Insurance premium reduced 35% after resilience audit",
        ],
        metric: "99.99%",
        metricLabel: "Uptime achieved",
    },
    {
        slug: "ai-soc-transformation",
        client: "Cybersecurity Vendor",
        industry: "Cybersecurity",
        title: "67% Reduction in SOC Alert Volume via ML Triage",
        challenge:
            "A cybersecurity vendor's internal SOC was processing 8,000+ alerts daily with a 52% false positive rate. Analyst burnout was driving 40% annual turnover.",
        solution:
            "We trained custom ML models on 18 months of historical alert data, built automated triage pipelines integrated with their Splunk SIEM, and deployed 24 investigation playbooks covering their top alert categories.",
        results: [
            "67% reduction in alerts reaching human analysts",
            "False positive rate dropped from 52% to 11%",
            "MTTR reduced from 45 minutes to 8 minutes for P1 alerts",
            "Analyst turnover dropped to 12% in the first year",
        ],
        metric: "67%",
        metricLabel: "Alert reduction",
    },
];

/* ---------- Server-side data fetching ---------- */
async function getCaseStudies(): Promise<CaseStudyShape[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    try {
        const res = await fetch(`${apiUrl}/case-studies`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("API error");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any[] = await res.json();
        return data.map((cs) => ({
            slug: cs.slug,
            client: cs.client || "Enterprise Client",
            industry: cs.industry || "Technology",
            title: cs.title,
            challenge: cs.challenge || "",
            solution: cs.solution || "",
            results: typeof cs.results === "string"
                ? cs.results.split("\n").filter(Boolean)
                : Array.isArray(cs.results) ? cs.results : [],
            metric: "",
            metricLabel: "",
        }));
    } catch {
        return staticCaseStudies;
    }
}

export default async function CaseStudiesPage() {
    const caseStudies = await getCaseStudies();
    return (
        <div className="pt-28 pb-20">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 mb-16">
                <PageTransition>
                    <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                        Case Studies
                    </p>
                </PageTransition>
                <PageTransition delay={0.1}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text-primary)] mb-6">
                        Real results.
                        <br />
                        <span className="text-[var(--color-text-secondary)]">
                            Real engineering.
                        </span>
                    </h1>
                </PageTransition>
                <PageTransition delay={0.2}>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                        Detailed breakdowns of how we&apos;ve helped organizations
                        achieve compliance, build resilience, and automate security
                        operations.
                    </p>
                </PageTransition>
            </section>

            {/* Case study cards */}
            <section className="max-w-7xl mx-auto px-6">
                <StaggerContainer className="space-y-8">
                    {caseStudies.map((study, index) => (
                        <div
                            key={study.slug}
                            className={`card-glow rounded-lg bg-[var(--color-bg-surface)] overflow-hidden ${index === 1 ? "lg:ml-10" : index === 2 ? "lg:ml-20" : ""
                                }`}
                        >
                            <div className="p-8 lg:p-10">
                                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                                    {/* Left - content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-[var(--font-mono)]">
                                                <Building2 size={12} />
                                                {study.industry}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                                            <span className="text-xs text-[var(--color-text-muted)]">
                                                {study.client}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl lg:text-3xl text-[var(--color-text-primary)] mb-4">
                                            {study.title}
                                        </h2>

                                        <div className="space-y-4 mb-6">
                                            <div>
                                                <p className="text-xs text-[var(--color-text-muted)] font-[var(--font-mono)] uppercase tracking-wider mb-1">
                                                    Challenge
                                                </p>
                                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                                    {study.challenge}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-[var(--color-text-muted)] font-[var(--font-mono)] uppercase tracking-wider mb-1">
                                                    Solution
                                                </p>
                                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                                    {study.solution}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs text-[var(--color-text-muted)] font-[var(--font-mono)] uppercase tracking-wider mb-2">
                                                Results
                                            </p>
                                            <ul className="space-y-2">
                                                {study.results.map((result) => (
                                                    <li
                                                        key={result}
                                                        className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                                                    >
                                                        <TrendingUp size={14} className="text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                                                        {result}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Right - metric highlight */}
                                    <div className="lg:w-48 flex-shrink-0 flex lg:flex-col items-center lg:items-end justify-center gap-2">
                                        <span className="text-5xl lg:text-6xl font-[var(--font-mono)] font-bold text-[var(--color-accent)]">
                                            {study.metric}
                                        </span>
                                        <span className="text-xs text-[var(--color-text-muted)] font-[var(--font-mono)] uppercase tracking-wider lg:text-right">
                                            {study.metricLabel}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </StaggerContainer>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 mt-24">
                <PageTransition>
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-4">
                            Want results like these?
                        </h2>
                        <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto mb-8">
                            Every engagement starts with a free assessment call.
                            Let&apos;s talk about your challenges.
                        </p>
                        <Button variant="primary" size="lg" href="/contact">
                            Book a Consultation
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                </PageTransition>
            </section>
        </div>
    );
}
