import type { Metadata } from "next";
import * as motion from "framer-motion/client";
import { SolutionsList, SolutionsCtaButton, type Solution } from "./SolutionsClient";

export const metadata: Metadata = {
    title: "Solutions — Defnix",
    description: "Security engineering, SOC2 compliance, cloud resilience, AI-driven automation, website development, mobile apps, and business workflow automation.",
};

const solutions: Solution[] = [
    {
        iconName: "Shield",
        title: "SOC2 Failure Prevention",
        subtitle: "Compliance Readiness Engineering",
        risk: "73% of companies fail their first SOC2 audit",
        description: "We engineer the controls, policies, and evidence pipelines before your auditor arrives.",
        href: "/solutions/soc2-failure-prevention",
        capabilities: ["Control gap analysis & remediation roadmap", "Evidence pipeline automation", "Policy documentation suite", "Auditor-ready architecture reviews"],
        accentColor: "#84A98C",
        metric: "3×",
        metricLabel: "Faster audit readiness",
    },
    {
        iconName: "Cloud",
        title: "Cloud Insurance",
        subtitle: "Cloud Risk Reduction & Incident Readiness",
        risk: "$4.45M average cost of a cloud data breach",
        description: "Architecture reviews, disaster recovery engineering, and incident response playbooks.",
        href: "/solutions/cloud-insurance",
        capabilities: ["Multi-cloud architecture review", "Disaster recovery engineering", "Incident response playbooks", "Blast radius minimization"],
        accentColor: "#52796F",
        metric: "90%",
        metricLabel: "Reduced blast radius",
    },
    {
        iconName: "Brain",
        title: "AI Enhanced SOC Analyst",
        subtitle: "AI-Driven Security Automation",
        risk: "SOC teams waste 45% of time on false positives",
        description: "ML-powered alert triage, automated runbooks, and intelligent escalation pipelines.",
        href: "/solutions/ai-soc-analyst",
        capabilities: ["ML-powered alert triage", "Automated investigation runbooks", "Intelligent escalation pipelines", "SOC productivity analytics"],
        accentColor: "#84A98C",
        metric: "10×",
        metricLabel: "Faster threat triage",
    },
    {
        iconName: "Globe",
        title: "Website Development",
        subtitle: "Websites for Small Businesses",
        risk: "46% of small businesses still have no website",
        description: "Fast, mobile-first websites built to rank on Google and convert local searches.",
        href: "/solutions/website-development",
        capabilities: ["Mobile-first responsive design", "Local SEO & Google Business optimisation", "Online booking & menu integration", "CMS setup for self-management"],
        accentColor: "#CAD2C5",
        metric: "+40%",
        metricLabel: "Better lead flow",
    },
    {
        iconName: "Smartphone",
        title: "Mobile App Development",
        subtitle: "iOS & Android Apps",
        risk: "85% of consumers prefer apps for local services",
        description: "Cross-platform mobile apps with booking, push notifications, and payments.",
        href: "/solutions/mobile-development",
        capabilities: ["Cross-platform iOS & Android (React Native)", "Appointment booking & patient portals", "Push notifications & loyalty features", "App Store & Play Store publishing"],
        accentColor: "#84A98C",
        metric: "2wk",
        metricLabel: "MVP to market",
    },
    {
        iconName: "Workflow",
        title: "Business Automation",
        subtitle: "Workflow Automation with n8n, Make & Zapier",
        risk: "Teams lose 15+ hours/week to repetitive manual tasks",
        description: "Custom automation pipelines that handle lead follow-ups, onboarding, and invoicing.",
        href: "/solutions/business-automation",
        capabilities: ["n8n, Make & Zapier workflow design", "Lead capture & CRM automation", "Email sequences & client onboarding", "Invoice & payment automation"],
        accentColor: "#52796F",
        metric: "20h+",
        metricLabel: "Saved per week",
    },
];

export default function SolutionsPage() {
    return (
        <div className="pt-28 pb-20" style={{ backgroundColor: "var(--color-surface)", position: "relative", overflow: "hidden" }}>
            {/* Technical Isometric Grid Background */}
            <div style={{ position: "absolute", top: -100, right: -200, width: "1200px", height: "800px", zIndex: 0, opacity: 0.4, pointerEvents: "none", transform: "rotateX(60deg) rotateZ(-45deg)" }}>
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="isometricGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(132,169,140,0.15)" strokeWidth="1"/>
                            <rect width="60" height="60" fill="rgba(82,121,111,0.02)"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#isometricGrid)" />
                </svg>
            </div>
            {/* Soft fade for grid */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 20%, var(--color-surface) 70%)", pointerEvents: "none", zIndex: 0 }} />

            {/* ── Header ─────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#52796F", boxShadow: "0 0 8px rgba(82,121,111,0.8)" }} className="animate-pulse-dot" />
                        <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#52796F", fontWeight: 500 }}>what we do</p>
                    </div>
                    <h1 style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                        fontWeight: 700, lineHeight: 1.08,
                        letterSpacing: "-0.03em", color: "#CAD2C5", marginBottom: 20,
                    }}>
                        six disciplines.{" "}
                        <span style={{ background: "linear-gradient(135deg, #84A98C, #CAD2C5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>one</span>{" "}engineering studio.
                    </h1>
                    <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(202,210,197,0.55)", maxWidth: "56ch" }}>
                        from soc2 compliance to mobile apps to business automation — we engineer the systems that help startups and small businesses grow faster.
                    </p>
                </motion.div>
            </section>

            {/* ── Solutions list (client) ─────────────── */}
            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <SolutionsList solutions={solutions} />
            </section>

            {/* ── Bottom CTA ─────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 mt-24 relative z-10">
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
                    <div style={{ position: "absolute", bottom: "-40px", right: "-40px", width: 180, height: 180, background: "radial-gradient(circle, rgba(132,169,140,0.1), transparent 70%)", filter: "blur(30px)", animation: "float-orb-b 15s ease-in-out infinite" }} />

                    <div style={{ position: "relative", zIndex: 10 }}>
                        <h2 style={{
                            fontFamily: "var(--font-headline)",
                            fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em",
                            background: "linear-gradient(135deg, #CAD2C5, #84A98C)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            marginBottom: 16,
                        }}>
                            not sure which solution fits?
                        </h2>
                        <p style={{ fontSize: "15px", color: "rgba(202,210,197,0.55)", lineHeight: 1.7, maxWidth: "48ch", margin: "0 auto 32px" }}>
                            book a 30-minute call. we&apos;ll understand your goals and recommend the right approach.
                        </p>
                        <SolutionsCtaButton />
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
