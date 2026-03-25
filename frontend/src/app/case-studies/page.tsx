import type { Metadata } from "next";
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
        slug: "saas-soc2-compliance",
        client: "Seed-Stage SaaS Startup",
        industry: "B2B SaaS",
        title: "SOC2 Type II Readiness in 10 Weeks — First-Time Pass",
        challenge:
            "A seed-stage SaaS company needed SOC2 Type II certification to move forward with their first enterprise prospect. They had no formal compliance processes, minimal documentation, and a small engineering team already stretched thin with product work.",
        solution:
            "We conducted a control gap assessment across their AWS environment, built a set of tailored security policies, and implemented automated evidence collection for their core infrastructure. The team was guided through the entire audit preparation process.",
        results: [
            "Passed SOC2 Type II audit on the first attempt in 10 weeks",
            "Created and documented 12 security policies from scratch",
            "Automated evidence collection for key infrastructure controls",
            "Reduced ongoing compliance maintenance to a manageable weekly review",
        ],
        metric: "10 wk",
        metricLabel: "To SOC2 Type II",
    },
    {
        slug: "startup-cloud-resilience",
        client: "Growing SaaS Platform",
        industry: "Cloud SaaS",
        title: "Disaster Recovery Setup for a Growing Platform",
        challenge:
            "A SaaS platform serving around 30 clients had no formal disaster recovery plan. Their infrastructure ran in a single availability zone with manual backup processes and no documented recovery procedures.",
        solution:
            "We designed and implemented a basic multi-AZ failover setup, created automated backup verification, and wrote incident response playbooks covering their most critical failure scenarios. Recovery procedures were documented and tested.",
        results: [
            "Established documented disaster recovery procedures for the first time",
            "Reduced estimated recovery time from unknown hours to under 30 minutes",
            "Implemented automated daily backup verification with alerting",
            "Created incident response playbooks for top 5 failure scenarios",
        ],
        metric: "<30min",
        metricLabel: "Recovery time",
    },
    {
        slug: "security-alert-optimization",
        client: "Early-Stage Tech Company",
        industry: "Technology",
        title: "35% Reduction in Security Alert Noise via Automated Triage",
        challenge:
            "A small engineering team was managing security alerts manually, spending significant time each week investigating false positives from their monitoring tools. There was no structured process for triaging or escalating alerts.",
        solution:
            "We analyzed their existing alert patterns, configured automated filtering rules based on historical data, and built a structured triage workflow that categorized alerts by severity and relevance before they reached the team.",
        results: [
            "35% reduction in alerts requiring manual investigation",
            "Structured triage workflow reduced average response time significantly",
            "Built 8 automated investigation playbooks for common alert types",
            "Team reported spending less time on routine security tasks each week",
        ],
        metric: "35%",
        metricLabel: "Alert reduction",
    },
    {
        slug: "cafe-website-melbourne",
        client: "Independent Cafe · Melbourne, AU",
        industry: "Food & Beverage",
        title: "From No Online Presence to Google Local Pack in 6 Weeks",
        challenge:
            "A cafe with two locations in Melbourne had no website and relied entirely on foot traffic and Instagram. Competitors with basic websites were appearing in local search results while this cafe was invisible online.",
        solution:
            "We built a mobile-first website with an online menu, Google Maps integration, click-to-call, and local SEO configured for 'best coffee near me' style searches. Google Business Profile was set up and optimised alongside the site.",
        results: [
            "Website live within 12 days of kickoff",
            "Appeared in Google local search results within 6 weeks",
            "Owner reported approximately 40% increase in new customer walk-ins over 3 months",
            "Online contact form generating regular enquiries for event bookings",
        ],
        metric: "12 days",
        metricLabel: "To go live",
    },
    {
        slug: "dental-clinic-booking-app",
        client: "Family Dental Practice · Austin, TX",
        industry: "Healthcare",
        title: "Booking App Reduced No-Shows by 30% for a Dental Practice",
        challenge:
            "A family dental practice was managing all appointments by phone, experiencing frequent no-shows and missed calls outside of business hours. Front desk staff were spending hours per week on scheduling and manual reminders.",
        solution:
            "We built a cross-platform iOS and Android booking app with automated SMS and email appointment reminders, online rescheduling, and a simple patient portal. Staff could manage the schedule through a companion admin dashboard.",
        results: [
            "No-show rate dropped from approximately 18% to around 12% within 2 months",
            "Over 60% of appointments now booked through the app without phone calls",
            "Front desk phone time for scheduling reduced by roughly 5 hours per week",
            "App Store and Google Play listings live within 10 weeks of project start",
        ],
        metric: "30%",
        metricLabel: "Fewer no-shows",
    },
    {
        slug: "creator-automation-pipeline",
        client: "Content Creator & Coach · London, UK",
        industry: "Personal Brand & Creator Economy",
        title: "Automated Client Pipeline Saved 12+ Hours Per Week",
        challenge:
            "A UK-based content creator with a growing coaching business was manually responding to enquiries, scheduling discovery calls, sending invoices, and managing email follow-ups. Most of the week was spent on admin rather than creating content or coaching.",
        solution:
            "We built an end-to-end automation workflow using n8n: enquiry form submission triggered CRM entry, personalised email sequence, calendar booking link, and automatic invoice generation on payment. Social media content was queued via a scheduling pipeline.",
        results: [
            "Reclaimed 12+ hours per week previously spent on manual admin tasks",
            "Lead response time dropped from 24 hours to under 5 minutes via automated replies",
            "Discovery call bookings increased 20% in the first month after automation went live",
            "Zero missed follow-ups since workflows launched — previously a regular problem",
        ],
        metric: "12hr",
        metricLabel: "Saved per week",
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
