import type { Metadata } from "next";
import * as motion from "framer-motion/client";
import { CaseStudiesList, FilterPills, CaseStudiesCtaButton, type CaseStudy } from "./CaseStudiesClient";

export const metadata: Metadata = {
    title: "Case Studies — Defnix",
    description: "Real-world results from our engineering engagements in SOC2 compliance, cloud security, and AI-driven security operations.",
};

const staticCaseStudies: CaseStudy[] = [
    {
        slug: "saas-soc2-compliance",
        client: "Seed-Stage SaaS Startup",
        industry: "B2B SaaS",
        title: "SOC2 Type II Readiness in 10 Weeks — First-Time Pass",
        challenge: "A seed-stage SaaS company needed SOC2 Type II certification to move forward with their first enterprise prospect. They had no formal compliance processes, minimal documentation, and a small engineering team already stretched thin with product work.",
        solution: "We conducted a control gap assessment across their AWS environment, built a set of tailored security policies, and implemented automated evidence collection for their core infrastructure. The team was guided through the entire audit preparation process.",
        results: [
            "Passed SOC2 Type II audit on the first attempt in 10 weeks",
            "Created and documented 12 security policies from scratch",
            "Automated evidence collection for key infrastructure controls",
            "Reduced ongoing compliance maintenance to a manageable weekly review",
        ],
        metric: "10 wk",
        metricLabel: "To SOC2 Type II",
        accentColor: "#84A98C",
        iconName: "ShieldCheck",
    },
    {
        slug: "startup-cloud-resilience",
        client: "Growing SaaS Platform",
        industry: "Cloud SaaS",
        title: "Disaster Recovery Setup for a Growing Platform",
        challenge: "A SaaS platform serving around 30 clients had no formal disaster recovery plan. Their infrastructure ran in a single availability zone with manual backup processes and no documented recovery procedures.",
        solution: "We designed and implemented a basic multi-AZ failover setup, created automated backup verification, and wrote incident response playbooks covering their most critical failure scenarios. Recovery procedures were documented and tested.",
        results: [
            "Established documented disaster recovery procedures for the first time",
            "Reduced estimated recovery time from unknown hours to under 30 minutes",
            "Implemented automated daily backup verification with alerting",
            "Created incident response playbooks for top 5 failure scenarios",
        ],
        metric: "<30m",
        metricLabel: "Recovery time",
        accentColor: "#52796F",
        iconName: "Cloud",
    },
    {
        slug: "security-alert-optimization",
        client: "Early-Stage Tech Company",
        industry: "Technology",
        title: "35% Reduction in Security Alert Noise via Automated Triage",
        challenge: "A small engineering team was managing security alerts manually, spending significant time each week investigating false positives from their monitoring tools. There was no structured process for triaging or escalating alerts.",
        solution: "We analyzed their existing alert patterns, configured automated filtering rules based on historical data, and built a structured triage workflow that categorized alerts by severity and relevance before they reached the team.",
        results: [
            "35% reduction in alerts requiring manual investigation",
            "Structured triage workflow reduced average response time significantly",
            "Built 8 automated investigation playbooks for common alert types",
            "Team reported spending less time on routine security tasks each week",
        ],
        metric: "35%",
        metricLabel: "Alert reduction",
        accentColor: "#CAD2C5",
        iconName: "Activity",
    },
    {
        slug: "cafe-website-melbourne",
        client: "Independent Cafe · Melbourne, AU",
        industry: "Food & Beverage",
        title: "From No Online Presence to Google Local Pack in 6 Weeks",
        challenge: "A cafe with two locations in Melbourne had no website and relied entirely on foot traffic and Instagram. Competitors with basic websites were appearing in local search results while this cafe was invisible online.",
        solution: "We built a mobile-first website with an online menu, Google Maps integration, click-to-call, and local SEO configured for 'best coffee near me' style searches. Google Business Profile was set up and optimised alongside the site.",
        results: [
            "Website live within 12 days of kickoff",
            "Appeared in Google local search results within 6 weeks",
            "Owner reported approximately 40% increase in new customer walk-ins over 3 months",
            "Online contact form generating regular enquiries for event bookings",
        ],
        metric: "12d",
        metricLabel: "To go live",
        accentColor: "#84A98C",
        iconName: "Globe",
    },
    {
        slug: "dental-clinic-booking-app",
        client: "Family Dental Practice · Austin, TX",
        industry: "Healthcare",
        title: "Booking App Reduced No-Shows by 30% for a Dental Practice",
        challenge: "A family dental practice was managing all appointments by phone, experiencing frequent no-shows and missed calls outside of business hours. Front desk staff were spending hours per week on scheduling and manual reminders.",
        solution: "We built a cross-platform iOS and Android booking app with automated SMS and email appointment reminders, online rescheduling, and a simple patient portal. Staff could manage the schedule through a companion admin dashboard.",
        results: [
            "No-show rate dropped from approximately 18% to around 12% within 2 months",
            "Over 60% of appointments now booked through the app without phone calls",
            "Front desk phone time for scheduling reduced by roughly 5 hours per week",
            "App Store and Google Play listings live within 10 weeks of project start",
        ],
        metric: "30%",
        metricLabel: "Fewer no-shows",
        accentColor: "#52796F",
        iconName: "Smartphone",
    },
    {
        slug: "creator-automation-pipeline",
        client: "Content Creator & Coach · London, UK",
        industry: "Creator Economy",
        title: "Automated Client Pipeline Saved 12+ Hours Per Week",
        challenge: "A UK-based content creator with a growing coaching business was manually responding to enquiries, scheduling discovery calls, sending invoices, and managing email follow-ups. Most of the week was spent on admin rather than creating content or coaching.",
        solution: "We built an end-to-end automation workflow using n8n: enquiry form submission triggered CRM entry, personalised email sequence, calendar booking link, and automatic invoice generation on payment.",
        results: [
            "Reclaimed 12+ hours per week previously spent on manual admin tasks",
            "Lead response time dropped from 24 hours to under 5 minutes via automated replies",
            "Discovery call bookings increased 20% in the first month after automation went live",
            "Zero missed follow-ups since workflows launched — previously a regular problem",
        ],
        metric: "12hr",
        metricLabel: "Saved per week",
        accentColor: "#84A98C",
        iconName: "Zap",
    },
];

async function getCaseStudies(): Promise<CaseStudy[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    try {
        const res = await fetch(`${apiUrl}/case-studies`, { next: { revalidate: 60 } });
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
            results: typeof cs.results === "string" ? cs.results.split("\n").filter(Boolean) : Array.isArray(cs.results) ? cs.results : [],
            metric: staticCaseStudies[i % staticCaseStudies.length]?.metric || "",
            metricLabel: staticCaseStudies[i % staticCaseStudies.length]?.metricLabel || "",
            accentColor: staticCaseStudies[i % staticCaseStudies.length]?.accentColor || "#84A98C",
            iconName: staticCaseStudies[i % staticCaseStudies.length]?.iconName || "Zap",
        }));
    } catch {
        return staticCaseStudies;
    }
}

export default async function CaseStudiesPage() {
    const caseStudies = await getCaseStudies();

    return (
        <div className="pt-32 pb-20" style={{ backgroundColor: "var(--color-surface)", position: "relative", overflow: "hidden" }}>
            {/* Angular stepped background */}
            <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "100%", zIndex: 0, opacity: 0.8, pointerEvents: "none" }}>
                <svg viewBox="0 0 800 1000" preserveAspectRatio="none" width="100%" height="100%">
                    <path d="M 800 0 L 800 1000 L 400 1000 L 400 800 L 200 800 L 200 500 L 0 500 L 0 200 L 800 0" fill="url(#angularGrad1)" />
                    <path d="M 800 200 L 800 1000 L 600 1000 L 600 700 L 400 700 L 400 300 L 800 200" fill="url(#angularGrad2)" />
                    <defs>
                        <linearGradient id="angularGrad1" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(82,121,111,0.06)" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                        <linearGradient id="angularGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(132,169,140,0.04)" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* ── Header ─────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <div className="animate-pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#52796F", boxShadow: "0 0 8px rgba(82,121,111,0.8)" }} />
                        <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#52796F", fontWeight: 500 }}>case studies</p>
                    </div>

                    <h1 style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "clamp(3rem, 8vw, 6rem)",
                        fontWeight: 700, lineHeight: 1.05,
                        letterSpacing: "-0.04em", color: "#CAD2C5", marginBottom: 20,
                    }}>
                        proof,{" "}
                        <span style={{ color: "rgba(202,210,197,0.3)" }}>not promises.</span>
                    </h1>

                    <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(202,210,197,0.55)", maxWidth: "52ch", marginBottom: 32 }}>
                        delivery stories across security, web, mobile, and automation projects.
                    </p>

                    {/* Filter pills */}
                    <FilterPills />
                </motion.div>
            </section>

            {/* ── Case study list ─────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <CaseStudiesList studies={caseStudies} />
            </section>

            {/* ── CTA ──────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 mt-28 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        borderRadius: "24px", textAlign: "center",
                        padding: "clamp(40px, 6vw, 64px)",
                        position: "relative", overflow: "hidden",
                        background: "linear-gradient(145deg, #354F52, #2F3E46, #354F52)",
                        border: "1px solid rgba(82,121,111,0.22)",
                        boxShadow: "8px 8px 22px #1e2b31, -4px -4px 14px #3f5461",
                    }}
                >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(132,169,140,0.5), transparent)" }} />
                    <div style={{ position: "absolute", top: "-40px", left: "-40px", width: 200, height: 200, background: "radial-gradient(circle, rgba(82,121,111,0.12), transparent 70%)", filter: "blur(30px)", animation: "float-orb-a 12s ease-in-out infinite" }} />

                    <div style={{ position: "relative", zIndex: 10 }}>
                        <h2 style={{
                            fontFamily: "var(--font-headline)",
                            fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em",
                            background: "linear-gradient(135deg, #CAD2C5, #84A98C)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            marginBottom: 16,
                        }}>want results like these?</h2>
                        <p style={{ fontSize: "15px", color: "rgba(202,210,197,0.55)", lineHeight: 1.7, maxWidth: "48ch", margin: "0 auto 32px" }}>
                            every engagement starts with a free assessment call. let&apos;s talk about your challenges.
                        </p>
                        <CaseStudiesCtaButton />
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
