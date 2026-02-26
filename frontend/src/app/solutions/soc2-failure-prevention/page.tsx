import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/sections/SolutionPageLayout";

export const metadata: Metadata = {
    title: "SOC2 Failure Prevention",
    description:
        "Compliance readiness engineering that ensures you pass your SOC2 audit on the first attempt. Control gap analysis, evidence automation, and auditor-ready architecture.",
};

export default function SOC2Page() {
    return (
        <SolutionPageLayout
            iconName="Shield"
            label="Compliance Readiness Engineering"
            title="SOC2 Failure Prevention"
            subtitle="73% of companies fail their first SOC2 audit. We engineer the controls, policies, and evidence pipelines before your auditor arrives — so you don't."
            sections={{
                problem: {
                    iconName: "AlertTriangle",
                    title: "The Problem",
                    content:
                        "Most startups treat SOC2 as a checkbox exercise. They hire a consultant three months before the audit, scramble to document controls that don't exist, and fail. The real problem isn't the audit — it's the gap between how your infrastructure actually works and how it needs to work. That gap costs 6-12 months and hundreds of thousands of dollars when discovered too late.",
                },
                audience: {
                    iconName: "Users",
                    title: "Who This Is For",
                    content: [
                        "B2B SaaS companies preparing for their first SOC2 Type II audit",
                        "Startups whose enterprise sales pipeline is blocked by compliance requirements",
                        "Engineering teams that need to build compliance into their CI/CD pipeline, not bolt it on",
                        "CTOs who need to demonstrate security maturity to investors or board members",
                    ],
                },
                risks: {
                    iconName: "AlertTriangle",
                    title: "Risks of Ignoring",
                    content: [
                        "Lost enterprise deals worth $100K+ each due to missing SOC2 certification",
                        "6-12 month audit delays when gaps are discovered during Type II observation period",
                        "Engineering time burned on ad-hoc compliance work instead of product development",
                        "Reputational damage if audit failures become known to prospects or partners",
                        "Increasing insurance premiums and inability to qualify for cyber liability coverage",
                    ],
                },
                approach: {
                    iconName: "Target",
                    title: "Our Approach",
                    content:
                        "We treat compliance as an engineering problem, not a documentation exercise. We start with a comprehensive audit of your current infrastructure, identify every control gap against the Trust Services Criteria, and build a prioritized remediation roadmap. Then we engineer the actual controls — automated evidence collection, access review pipelines, change management workflows — directly into your existing toolchain. When your auditor arrives, the evidence is already there.",
                },
                capabilities: {
                    iconName: "Cpu",
                    title: "Technical Capabilities",
                    content: [
                        "Automated control gap analysis against all 5 Trust Services Criteria",
                        "Evidence pipeline engineering with continuous collection from AWS, GCP, Azure",
                        "Policy-as-code frameworks that keep documentation in sync with infrastructure",
                        "Automated access review workflows integrated with your identity provider",
                        "Change management automation via GitHub/GitLab CI/CD pipeline integration",
                        "Continuous monitoring dashboards for real-time compliance posture visibility",
                        "Vendor risk assessment frameworks and third-party management tooling",
                    ],
                },
                deliverables: {
                    iconName: "Package",
                    title: "Deliverables",
                    content: [
                        "Comprehensive control gap assessment report with severity ratings",
                        "Prioritized remediation roadmap with estimated effort and timeline",
                        "Full SOC2 policy documentation suite (15+ policies, customized to your org)",
                        "Automated evidence collection pipelines for all applicable controls",
                        "Pre-audit readiness review with mock auditor walkthrough",
                        "Post-certification maintenance runbook for ongoing compliance",
                    ],
                },
                engagement: {
                    iconName: "Handshake",
                    title: "Engagement Model",
                    content:
                        "Typical engagement runs 8-16 weeks. We start with a 2-week deep-dive assessment, deliver the gap analysis and roadmap, then work alongside your engineering team to implement controls in 4-week sprints. We stay engaged through your audit period to handle auditor questions and evidence requests. Fixed-fee pricing with clear milestones — no open-ended retainers.",
                },
            }}
        />
    );
}
