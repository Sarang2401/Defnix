import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/sections/SolutionPageLayout";

export const metadata: Metadata = {
    title: "AI Enhanced SOC Analyst",
    description:
        "AI-driven security automation that eliminates alert fatigue. ML-powered triage, automated runbooks, and intelligent escalation for modern SOC teams.",
};

export default function AISocAnalystPage() {
    return (
        <SolutionPageLayout
            iconName="Brain"
            label="AI-Driven Security Automation"
            title="AI Enhanced SOC Analyst"
            subtitle="SOC teams waste 45% of their time on false positives. We build the ML pipelines and automation that let your analysts focus on threats that actually matter."
            sections={{
                problem: {
                    iconName: "AlertTriangle",
                    title: "The Problem",
                    content:
                        "Security Operations Centers are drowning. The average SOC receives 11,000+ alerts per day, and analysts spend nearly half their time investigating false positives. The result: alert fatigue, missed real threats, analyst burnout, and a security posture that degrades as your infrastructure grows. More tools don't fix this — they make it worse. What you need is an intelligence layer that separates signal from noise before it reaches a human.",
                },
                audience: {
                    iconName: "Users",
                    title: "Who This Is For",
                    content: [
                        "Security teams overwhelmed by alert volume from SIEM, EDR, and cloud monitoring tools",
                        "Organizations that can't hire fast enough to keep up with their threat surface growth",
                        "SOC managers looking to reduce mean-time-to-respond (MTTR) below 15 minutes",
                        "CISOs who need to demonstrate measurable improvements in security operations efficiency",
                    ],
                },
                risks: {
                    iconName: "AlertTriangle",
                    title: "Risks of Ignoring",
                    content: [
                        "Critical alerts buried under thousands of false positives — real threats go undetected",
                        "Analyst burnout leading to 30%+ annual turnover in security teams",
                        "Mean-time-to-respond measured in hours instead of minutes",
                        "Scaling costs become linear: every new system requires more human analysts",
                        "Regulatory penalties from delayed incident detection and response",
                    ],
                },
                approach: {
                    iconName: "Target",
                    title: "Our Approach",
                    content:
                        "We don't replace your SOC — we augment it. We analyze your existing alert patterns, train ML models on your historical data to identify true positive signals, and build automated triage pipelines that classify, enrich, and route alerts before an analyst touches them. Each automated runbook is designed as a decision tree with clear escalation thresholds: the AI handles the routine, your analysts handle the novel. The result is a SOC that gets smarter over time.",
                },
                capabilities: {
                    iconName: "Cpu",
                    title: "Technical Capabilities",
                    content: [
                        "ML-based alert classification trained on your historical SOC data",
                        "Automated alert enrichment with threat intelligence, asset context, and user behavior",
                        "Playbook-driven investigation automation for top 20 alert types",
                        "Intelligent escalation routing based on severity, asset criticality, and analyst expertise",
                        "False positive suppression with continuous feedback loop learning",
                        "SOC metrics dashboard: MTTR, false positive rate, analyst utilization, threat coverage",
                        "Integration with Splunk, Elastic, Sentinel, CrowdStrike, and major SOAR platforms",
                        "On-premises deployment option for regulated environments",
                    ],
                },
                deliverables: {
                    iconName: "Package",
                    title: "Deliverables",
                    content: [
                        "Alert landscape analysis with classification of current noise vs. signal ratio",
                        "Custom ML model trained on your alert history with documented accuracy metrics",
                        "Automated triage pipeline integrated with your existing SIEM/SOAR stack",
                        "20+ investigation playbooks covering your most common alert categories",
                        "SOC efficiency dashboard with real-time KPIs and trend analysis",
                        "Runbook for model retraining and performance monitoring",
                        "Analyst training documentation for working alongside AI triage",
                    ],
                },
                engagement: {
                    iconName: "Handshake",
                    title: "Engagement Model",
                    content:
                        "Engagements run 10-16 weeks. Phase 1 (2 weeks): data collection and alert landscape analysis. Phase 2 (4 weeks): model training and validation against historical incidents. Phase 3 (4-6 weeks): pipeline integration, playbook development, and shadow-mode testing. Phase 4 (2 weeks): go-live with analyst training and handoff. We include 3 months of post-deployment tuning to optimize model accuracy. Pricing is fixed per phase with clear success criteria.",
                },
            }}
        />
    );
}
