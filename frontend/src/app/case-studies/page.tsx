import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import * as motion from "framer-motion/client";
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
    color: string;
}

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
        color: "#a78bfa"
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
        metric: "<30m",
        metricLabel: "Recovery time",
        color: "#22c55e"
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
        color: "#e879f9"
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
        metric: "12d",
        metricLabel: "To go live",
        color: "#f59e0b"
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
        color: "#06b6d4"
    },
    {
        slug: "creator-automation-pipeline",
        client: "Content Creator & Coach · London, UK",
        industry: "Creator Economy",
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
        color: "#ec4899"
    },
];

async function getCaseStudies(): Promise<CaseStudyShape[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    try {
        const res = await fetch(`${apiUrl}/case-studies`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("API error");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any[] = await res.json();
        return data.map((cs, i) => ({
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
            color: staticCaseStudies[i % staticCaseStudies.length].color,
        }));
    } catch {
        return staticCaseStudies;
    }
}

export default async function CaseStudiesPage() {
    const caseStudies = await getCaseStudies();
    
    return (
        <div className="pt-32 pb-20 relative overflow-hidden">
            {/* Background glow blobs */}
            <div className="blob-violet w-[800px] h-[800px] -top-60 -right-40 opacity-30 animate-float-slow" />
            <div className="blob-pink w-[600px] h-[600px] top-[40%] -left-60 opacity-20 animate-float-slow" style={{ animationDelay: "-4s" }} />

            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-[0.22em] uppercase mb-4">
                        Case Studies
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl mb-7 font-[var(--font-display)] leading-[1.05] tracking-tight">
                        Proof,
                        <br />
                        <span className="text-[rgba(245,247,249,0.4)]">
                            not promises.
                        </span>
                    </h1>
                    <p className="text-lg text-[rgba(245,247,249,0.6)] max-w-2xl leading-relaxed">
                        Delivery stories across security, web, mobile, and automation projects.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-2.5">
                        {["All", "Security", "Web", "Mobile", "Automation"].map((filter) => (
                            <button
                                key={filter}
                                className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md px-4 py-2 text-xs font-mono uppercase tracking-widest text-[rgba(245,247,249,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-200"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Case study list */}
            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="space-y-6">
                    {caseStudies.map((study, index) => {
                        const offset = index % 3;
                        return (
                            <motion.div
                                key={study.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`lg:w-[85%] ${offset === 1 ? "lg:ml-[7.5%]" : offset === 2 ? "lg:ml-[15%]" : ""}`}
                            >
                                <div
                                    className="rounded-3xl p-8 lg:p-12 transition-all duration-500 relative overflow-hidden"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.03)",
                                        backdropFilter: "blur(24px)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset"
                                    }}
                                >
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none" style={{ background: `radial-gradient(circle, ${study.color} 0%, transparent 70%)` }} />
                                    
                                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 relative z-10">
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span 
                                                    className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border"
                                                    style={{ color: study.color, background: `${study.color}10`, borderColor: `${study.color}25` }}
                                                >
                                                    <Building2 size={12} />
                                                    {study.industry}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-[rgba(255,255,255,0.2)]" />
                                                <span className="text-[11px] font-mono text-[rgba(245,247,249,0.4)] uppercase tracking-widest">
                                                    {study.client}
                                                </span>
                                            </div>

                                            <h2 className="text-3xl lg:text-[40px] text-white mb-8 font-[var(--font-display)] leading-[1.1] tracking-tight">
                                                {study.title}
                                            </h2>

                                            <div className="space-y-6 mb-10">
                                                <div>
                                                    <p className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,247,249,0.3)] mb-2">
                                                        Challenge
                                                    </p>
                                                    <p className="text-[16px] text-[rgba(245,247,249,0.6)] leading-relaxed">
                                                        {study.challenge}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,247,249,0.3)] mb-2">
                                                        Solution
                                                    </p>
                                                    <p className="text-[16px] text-[rgba(245,247,249,0.6)] leading-relaxed">
                                                        {study.solution}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-[10px] font-mono uppercase tracking-widest text-[rgba(245,247,249,0.3)] mb-4">
                                                    Results
                                                </p>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {study.results.map((result) => (
                                                        <li
                                                            key={result}
                                                            className="flex items-start gap-3 text-[15px] text-[rgba(245,247,249,0.7)]"
                                                        >
                                                            <TrendingUp size={16} className="mt-0.5 flex-shrink-0" style={{ color: study.color }} />
                                                            {result}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Metric Callout */}
                                        <div className="lg:w-48 flex-shrink-0 flex lg:flex-col items-center lg:items-end justify-center gap-3 pt-6 lg:pt-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderTopWidth: "1px", borderTopColor: "rgba(255,255,255,0.06)" }}>
                                            <span 
                                                className="text-6xl lg:text-[80px] font-bold font-[var(--font-display)] leading-none"
                                                style={{ color: study.color }}
                                            >
                                                {study.metric}
                                            </span>
                                            <span className="text-xs text-[rgba(245,247,249,0.4)] font-mono uppercase tracking-widest lg:text-right">
                                                {study.metricLabel}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 mt-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl sm:text-[40px] text-white mb-5 font-[var(--font-display)] tracking-tight font-bold">
                        Want results like these?
                    </h2>
                    <p className="text-[rgba(245,247,249,0.6)] max-w-lg mx-auto mb-10 text-[17px]">
                        Every engagement starts with a free assessment call.
                        Let&apos;s talk about your challenges.
                    </p>
                    <Button variant="primary" size="lg" href="/contact">
                        Book a Consultation
                        <ArrowRight size={17} />
                    </Button>
                </motion.div>
            </section>
        </div>
    );
}
