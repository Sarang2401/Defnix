import type { LucideIcon } from "lucide-react";
import { Shield, Cloud, Brain, Globe, Smartphone, Workflow } from "lucide-react";

/**
 * Single source of truth for the 6 services. Every place that lists
 * services (homepage bento, /solutions listing, footer) imports from
 * here instead of hardcoding copy — see CLAUDE.md "Data conventions".
 */

export type SolutionGroup = "security" | "ai" | "engineering";

export interface Solution {
    slug: string;
    icon: LucideIcon;
    title: string;
    subtitle: string;
    risk: string;
    description: string;
    href: string;
    capabilities: string[];
    accentColor: string;
    metric: string;
    metricLabel: string;
    group: SolutionGroup;
}

export interface SolutionGroupMeta {
    id: SolutionGroup;
    label: string;
    eyebrow: string;
    description: string;
}

export const solutionGroups: SolutionGroupMeta[] = [
    {
        id: "security",
        label: "Security & Compliance",
        eyebrow: "01 — security",
        description: "Control frameworks, cloud resilience, and incident readiness built into your operations.",
    },
    {
        id: "ai",
        label: "AI-Powered Operations",
        eyebrow: "02 — ai",
        description: "Machine-learning-driven security automation that cuts noise and speeds up response.",
    },
    {
        id: "engineering",
        label: "Product Engineering",
        eyebrow: "03 — engineering",
        description: "Websites, mobile apps, and workflow automation engineered to grow your business.",
    },
];

export const solutions: Solution[] = [
    {
        slug: "soc2-failure-prevention",
        icon: Shield,
        title: "SOC2 Failure Prevention",
        subtitle: "Compliance Readiness Engineering",
        risk: "73% of companies fail their first SOC2 audit",
        description: "We engineer the controls, policies, and evidence pipelines before your auditor arrives.",
        href: "/solutions/soc2-failure-prevention",
        capabilities: [
            "Control gap analysis & remediation roadmap",
            "Evidence pipeline automation",
            "Policy documentation suite",
            "Auditor-ready architecture reviews",
        ],
        accentColor: "var(--color-sage)",
        metric: "3×",
        metricLabel: "Faster audit readiness",
        group: "security",
    },
    {
        slug: "cloud-insurance",
        icon: Cloud,
        title: "Cloud Insurance",
        subtitle: "Risk Reduction & Incident Readiness",
        risk: "$4.45M average cost of a cloud data breach",
        description: "Architecture hardening, disaster recovery, and monitoring for real resilience.",
        href: "/solutions/cloud-insurance",
        capabilities: [
            "Multi-cloud architecture review",
            "Disaster recovery engineering",
            "Incident response playbooks",
            "Blast radius minimization",
        ],
        accentColor: "var(--color-pine)",
        metric: "90%",
        metricLabel: "Reduced blast radius",
        group: "security",
    },
    {
        slug: "ai-soc-analyst",
        icon: Brain,
        title: "AI Enhanced SOC Analyst",
        subtitle: "Security Automation",
        risk: "SOC teams waste 45% of time on false positives",
        description: "ML-powered alert triage and automated investigation pipelines cut noise to signal.",
        href: "/solutions/ai-soc-analyst",
        capabilities: [
            "ML-powered alert triage",
            "Automated investigation runbooks",
            "Intelligent escalation pipelines",
            "SOC productivity analytics",
        ],
        accentColor: "var(--color-sage)",
        metric: "10×",
        metricLabel: "Faster threat triage",
        group: "ai",
    },
    {
        slug: "website-development",
        icon: Globe,
        title: "Website Development",
        subtitle: "Conversion-First Websites",
        risk: "46% of small businesses still have no website",
        description: "Fast, mobile-first websites built to rank on Google and convert local searches.",
        href: "/solutions/website-development",
        capabilities: [
            "Mobile-first responsive design",
            "Local SEO & Google Business optimisation",
            "Online booking & menu integration",
            "CMS setup for self-management",
        ],
        accentColor: "var(--color-mist)",
        metric: "+40%",
        metricLabel: "Better lead flow",
        group: "engineering",
    },
    {
        slug: "mobile-development",
        icon: Smartphone,
        title: "Mobile App Development",
        subtitle: "Cross-Platform Builds",
        risk: "85% of consumers prefer apps for local services",
        description: "iOS and Android apps with booking, notifications, and payments, shipped fast.",
        href: "/solutions/mobile-development",
        capabilities: [
            "Cross-platform iOS & Android (React Native)",
            "Appointment booking & patient portals",
            "Push notifications & loyalty features",
            "App Store & Play Store publishing",
        ],
        accentColor: "var(--color-sage)",
        metric: "2wk",
        metricLabel: "MVP to market",
        group: "engineering",
    },
    {
        slug: "business-automation",
        icon: Workflow,
        title: "Business Automation",
        subtitle: "Workflow Engineering",
        risk: "Teams lose 15+ hours/week to repetitive manual tasks",
        description: "Automation pipelines that handle lead follow-ups, onboarding, and invoicing.",
        href: "/solutions/business-automation",
        capabilities: [
            "n8n, Make & Zapier workflow design",
            "Lead capture & CRM automation",
            "Email sequences & client onboarding",
            "Invoice & payment automation",
        ],
        accentColor: "var(--color-pine)",
        metric: "20h+",
        metricLabel: "Saved per week",
        group: "engineering",
    },
];

export function getSolutionsByGroup(group: SolutionGroup): Solution[] {
    return solutions.filter((s) => s.group === group);
}
