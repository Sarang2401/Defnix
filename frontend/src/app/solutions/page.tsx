import type { Metadata } from "next";
import { Shield, Cloud, Brain, Globe, Smartphone, Workflow, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import * as motion from "framer-motion/client";

export const metadata: Metadata = {
    title: "Solutions",
    description:
        "Security engineering, SOC2 compliance, cloud resilience, AI-driven automation, website development, mobile apps, and business workflow automation for startups and small businesses.",
};

const solutions = [
    {
        icon: <Shield size={22} />,
        title: "SOC2 Failure Prevention",
        subtitle: "Compliance Readiness Engineering",
        risk: "73% of companies fail their first SOC2 audit",
        description:
            "We engineer the controls, policies, and evidence pipelines before your auditor arrives. Not checkbox compliance — structural readiness that holds up under scrutiny.",
        href: "/solutions/soc2-failure-prevention",
        color: "#a78bfa",
        capabilities: [
            "Control gap analysis & remediation roadmap",
            "Evidence pipeline automation",
            "Policy documentation suite",
            "Auditor-ready architecture reviews",
        ],
    },
    {
        icon: <Cloud size={22} />,
        title: "Cloud Insurance",
        subtitle: "Cloud Risk Reduction & Incident Readiness",
        risk: "$4.45M average cost of a cloud data breach",
        description:
            "Architecture reviews, disaster recovery engineering, and incident response playbooks that reduce your blast radius to near-zero.",
        href: "/solutions/cloud-insurance",
        color: "#22c55e",
        capabilities: [
            "Multi-cloud architecture review",
            "Disaster recovery engineering",
            "Incident response playbooks",
            "Blast radius minimization",
        ],
    },
    {
        icon: <Brain size={22} />,
        title: "AI Enhanced SOC Analyst",
        subtitle: "AI-Driven Security Automation",
        risk: "SOC teams waste 45% of time on false positives",
        description:
            "ML-powered alert triage, automated runbooks, and intelligent escalation pipelines that let your security team focus on real threats.",
        href: "/solutions/ai-soc-analyst",
        color: "#e879f9",
        capabilities: [
            "ML-powered alert triage",
            "Automated investigation runbooks",
            "Intelligent escalation pipelines",
            "SOC productivity analytics",
        ],
    },
    {
        icon: <Globe size={22} />,
        title: "Website Development",
        subtitle: "Websites for Small Businesses",
        risk: "46% of small businesses still have no website",
        description:
            "Fast, mobile-first websites built to rank on Google and convert local searches into real customers — for cafes, clinics, restaurants, and local businesses across USA, UK, and Australia.",
        href: "/solutions/website-development",
        color: "#f59e0b",
        capabilities: [
            "Mobile-first responsive design",
            "Local SEO & Google Business optimisation",
            "Online booking & menu integration",
            "CMS setup for self-management",
        ],
    },
    {
        icon: <Smartphone size={22} />,
        title: "Mobile App Development",
        subtitle: "iOS & Android Apps",
        risk: "85% of consumers prefer apps for local services",
        description:
            "Cross-platform mobile apps with booking systems, push notifications, and payment integration — built for dental practices, restaurants, clinics, and service businesses.",
        href: "/solutions/mobile-development",
        color: "#06b6d4",
        capabilities: [
            "Cross-platform iOS & Android (React Native)",
            "Appointment booking & patient portals",
            "Push notifications & loyalty features",
            "App Store & Play Store publishing",
        ],
    },
    {
        icon: <Workflow size={22} />,
        title: "Business Automation",
        subtitle: "Workflow Automation with n8n, Make & Zapier",
        risk: "Teams lose 15+ hours/week to repetitive manual tasks",
        description:
            "Custom automation pipelines that handle lead follow-ups, onboarding, invoicing, and social media publishing — so your team focuses on work that actually moves the needle.",
        href: "/solutions/business-automation",
        color: "#ec4899",
        capabilities: [
            "n8n, Make & Zapier workflow design",
            "Lead capture & CRM automation",
            "Email sequences & client onboarding",
            "Invoice & payment automation",
        ],
    },
];

export default function SolutionsPage() {
    return (
        <div className="pt-32 pb-20 relative overflow-hidden">
            {/* Background blob glows */}
            <div className="blob-violet w-[800px] h-[800px] -top-60 -right-40 opacity-30 animate-float-slow" />
            <div className="blob-pink w-[600px] h-[600px] top-[40%] -left-60 opacity-20 animate-float-slow" style={{ animationDelay: "-4s" }} />

            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                >
                    <p className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-[0.22em] uppercase mb-4">
                        What We Do
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl mb-7 font-[var(--font-display)] leading-[1.05] tracking-tight">
                        Six disciplines.
                        <br />
                        <span className="text-[rgba(245,247,249,0.4)]">
                            One engineering studio.
                        </span>
                    </h1>
                    <p className="text-lg text-[rgba(245,247,249,0.6)] max-w-2xl leading-relaxed">
                        From SOC2 compliance to mobile apps to business automation —
                        we engineer the systems that help startups, small businesses,
                        and creators operate smarter and grow faster.
                    </p>
                </motion.div>
            </section>

            {/* Solution cards */}
            <section className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="space-y-6">
                    {solutions.map((solution, index) => {
                        const offset = index % 3;
                        return (
                            <motion.div
                                key={solution.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
                                className={`lg:w-[85%] ${offset === 1 ? "lg:ml-[7.5%]" : offset === 2 ? "lg:ml-[15%]" : ""}`}
                            >
                                <Link href={solution.href} className="block group">
                                    <div
                                        className="rounded-3xl p-8 lg:p-12 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden hover:bg-[rgba(255,255,255,0.05)] hover:[border-color:var(--hover-color)] hover:[box-shadow:var(--hover-shadow)]"
                                        style={{
                                            "--hover-color": `${solution.color}40`,
                                            "--hover-shadow": `0 1px 0 rgba(255,255,255,0.06) inset, 0 32px 80px -20px rgba(0,0,0,0.8), 0 0 50px -15px ${solution.color}30`,
                                            background: "rgba(255, 255, 255, 0.03)",
                                            backdropFilter: "blur(24px)",
                                            border: "1px solid rgba(255, 255, 255, 0.08)",
                                            boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset",
                                        } as React.CSSProperties}
                                    >
                                        <div className="flex flex-col lg:flex-row gap-10 relative z-10">
                                            {/* Left column */}
                                            <div className="flex-shrink-0 lg:w-[320px]">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div
                                                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500"
                                                        style={{
                                                            background: `${solution.color}15`,
                                                            color: solution.color,
                                                            border: `1px solid ${solution.color}30`
                                                        }}
                                                    >
                                                        {solution.icon}
                                                    </div>
                                                    <span className="font-mono text-[10px] text-[var(--color-warning)] tracking-widest uppercase bg-[rgba(245,158,11,0.1)] px-2.5 py-1 rounded-full border border-[rgba(245,158,11,0.2)]">
                                                        ▲ {solution.risk}
                                                    </span>
                                                </div>
                                                <h3 className="text-3xl font-bold text-white mb-2 font-[var(--font-display)] tracking-tight">
                                                    {solution.title}
                                                </h3>
                                                <p className="text-xs text-[rgba(245,247,249,0.4)] font-mono uppercase tracking-widest mt-3">
                                                    {solution.subtitle}
                                                </p>
                                            </div>

                                            {/* Right column */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[rgba(245,247,249,0.65)] text-lg leading-relaxed mb-8">
                                                    {solution.description}
                                                </p>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
                                                    {solution.capabilities.map((cap) => (
                                                        <li
                                                            key={cap}
                                                            className="flex items-start gap-3 text-[15px] text-[rgba(245,247,249,0.5)]"
                                                        >
                                                            <span
                                                                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                                style={{ background: solution.color }}
                                                            />
                                                            {cap}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <span
                                                    className="inline-flex items-center gap-2 text-[15px] font-semibold group-hover:gap-3 transition-all duration-300"
                                                    style={{ color: solution.color }}
                                                >
                                                    Learn more <ArrowRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="max-w-7xl mx-auto px-6 mt-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl sm:text-4xl text-white mb-5 font-[var(--font-display)]">
                        Not sure which solution fits?
                    </h2>
                    <p className="text-[rgba(245,247,249,0.6)] max-w-lg mx-auto mb-10 text-lg">
                        Book a 30-minute call. We&apos;ll understand your goals and
                        recommend the right approach — no pressure, no strings.
                    </p>
                    <Button variant="primary" size="lg" href="/contact">
                        Book Free Consultation
                        <ArrowRight size={17} />
                    </Button>
                </motion.div>
            </section>
        </div>
    );
}
