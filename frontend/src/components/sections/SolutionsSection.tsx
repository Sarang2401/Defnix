"use client";

import { motion } from "framer-motion";
import { Shield, Cloud, Brain, Globe, Smartphone, Workflow } from "lucide-react";
import { Button } from "../ui/Button";
import { StaggerContainer, staggerChild, PageTransition } from "../ui/PageTransition";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface Solution {
    icon: ReactNode;
    title: string;
    subtitle: string;
    risk: string;
    description: string;
    href: string;
}

const solutions: Solution[] = [
    {
        icon: <Shield size={24} />,
        title: "SOC2 Failure Prevention",
        subtitle: "Compliance Readiness Engineering",
        risk: "73% of companies fail their first SOC2 audit",
        description:
            "We engineer the controls, policies, and evidence pipelines before your auditor arrives. Not checkbox compliance — structural readiness.",
        href: "/solutions/soc2-failure-prevention",
    },
    {
        icon: <Cloud size={24} />,
        title: "Cloud Insurance",
        subtitle: "Cloud Risk Reduction & Incident Readiness",
        risk: "$4.45M average cost of a cloud data breach",
        description:
            "Architecture reviews, disaster recovery engineering, and incident response playbooks that reduce your blast radius to near-zero.",
        href: "/solutions/cloud-insurance",
    },
    {
        icon: <Brain size={24} />,
        title: "AI Enhanced SOC Analyst",
        subtitle: "AI-Driven Security Automation",
        risk: "SOC teams waste 45% of time on false positives",
        description:
            "ML-powered alert triage, automated runbooks, and intelligent escalation pipelines that let your security team focus on real threats.",
        href: "/solutions/ai-soc-analyst",
    },
    {
        icon: <Globe size={24} />,
        title: "Website Development",
        subtitle: "Websites for Small Businesses",
        risk: "46% of small businesses still have no website",
        description:
            "Fast, mobile-first websites for cafes, clinics, restaurants, and local businesses — built to rank on Google and convert local searches.",
        href: "/solutions/website-development",
    },
    {
        icon: <Smartphone size={24} />,
        title: "Mobile App Development",
        subtitle: "iOS & Android Apps",
        risk: "85% of consumers prefer apps for local services",
        description:
            "Cross-platform mobile apps with booking, push notifications, and payments — built for dental practices, restaurants, and service businesses.",
        href: "/solutions/mobile-development",
    },
    {
        icon: <Workflow size={24} />,
        title: "Business Automation",
        subtitle: "Workflow Automation with n8n, Make & Zapier",
        risk: "Teams lose 15+ hours/week to repetitive manual tasks",
        description:
            "Custom automation pipelines that handle lead follow-ups, onboarding, invoicing, and social posting — 24/7, without your involvement.",
        href: "/solutions/business-automation",
    },
];

export function SolutionsSection() {
    return (
        <section className="section-gap" id="solutions">
            <div className="max-w-7xl mx-auto px-6">
                <PageTransition>
                    <div className="mb-16">
                        <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                            What We Do
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
                            Six disciplines.
                            <br />
                            <span className="text-[var(--color-text-secondary)]">
                                One engineering studio.
                            </span>
                        </h2>
                    </div>
                </PageTransition>

                <StaggerContainer className="space-y-6">
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={solution.title}
                            variants={staggerChild}
                            className={`card-glow rounded-lg bg-[var(--color-bg-surface)] p-8 lg:p-10 ${
                                index % 3 === 1
                                    ? "lg:ml-16 lg:mr-0"
                                    : index % 3 === 2
                                        ? "lg:ml-32 lg:mr-0"
                                        : ""
                            }`}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                                {/* Icon + Meta */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)]">
                                        {solution.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-[var(--font-mono)] text-[10px] text-[var(--color-danger)] tracking-wider uppercase mb-2">
                                        ▲ {solution.risk}
                                    </p>
                                    <h3 className="text-xl lg:text-2xl text-[var(--color-text-primary)] mb-1">
                                        {solution.title}
                                    </h3>
                                    <p className="text-sm text-[var(--color-text-muted)] font-[var(--font-mono)] mb-4">
                                        {solution.subtitle}
                                    </p>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-2xl">
                                        {solution.description}
                                    </p>
                                    <Button variant="ghost" size="sm" href={solution.href}>
                                        Learn more <ArrowRight size={14} />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
