import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/sections/SolutionPageLayout";

export const metadata: Metadata = {
    title: "Cloud Insurance",
    description:
        "Cloud risk reduction and incident readiness engineering. Architecture reviews, disaster recovery, and incident response playbooks that reduce your blast radius to near-zero.",
};

export default function CloudInsurancePage() {
    return (
        <SolutionPageLayout
            iconName="Cloud"
            label="Cloud Risk Reduction & Incident Readiness"
            title="Cloud Insurance"
            subtitle="The average cloud data breach costs $4.45M. We engineer the architecture, runbooks, and recovery systems that turn catastrophic incidents into contained events."
            sections={{
                problem: {
                    iconName: "AlertTriangle",
                    title: "The Problem",
                    content:
                        "Cloud infrastructure fails. Not if — when. The difference between a 5-minute incident and a 5-day outage is preparation. Most startups deploy fast and worry about resilience later, leaving blast radii wide open, recovery procedures undocumented, and incident response ad-hoc. When a real incident hits, the cost isn't just downtime — it's lost customer trust, regulatory exposure, and engineering time that should have been spent building product.",
                },
                audience: {
                    iconName: "Users",
                    title: "Who This Is For",
                    content: [
                        "SaaS companies running production workloads on AWS, GCP, or Azure",
                        "Engineering teams that have outgrown their initial cloud architecture",
                        "Organizations that need to demonstrate disaster recovery capability to clients or insurers",
                        "CTOs who know their infrastructure has single points of failure but haven't had time to fix them",
                    ],
                },
                risks: {
                    iconName: "AlertTriangle",
                    title: "Risks of Ignoring",
                    content: [
                        "$4.45M average cost of a cloud data breach (IBM, 2023)",
                        "Extended downtime from untested disaster recovery procedures",
                        "Compliance violations from inadequate logging and monitoring",
                        "Customer churn from SLA breaches during preventable outages",
                        "Inability to obtain or renew cyber liability insurance coverage",
                    ],
                },
                approach: {
                    iconName: "Target",
                    title: "Our Approach",
                    content:
                        "We start with a comprehensive architecture review — mapping your entire cloud footprint, identifying single points of failure, blast radius exposure, and recovery gaps. Then we engineer solutions: multi-AZ failover, automated backup verification, network segmentation, and incident response playbooks tailored to your specific infrastructure. Every change is tested with controlled chaos engineering exercises to validate it works under pressure.",
                },
                capabilities: {
                    iconName: "Cpu",
                    title: "Technical Capabilities",
                    content: [
                        "Multi-cloud architecture review and risk assessment (AWS, GCP, Azure)",
                        "Blast radius analysis and network segmentation engineering",
                        "Automated disaster recovery with verified RTO/RPO targets",
                        "Incident response playbook development with tabletop exercises",
                        "Chaos engineering frameworks for controlled failure testing",
                        "Infrastructure-as-code security scanning and drift detection",
                        "Cost-optimized high availability architecture design",
                        "24/7 monitoring and alerting pipeline architecture",
                    ],
                },
                deliverables: {
                    iconName: "Package",
                    title: "Deliverables",
                    content: [
                        "Cloud architecture risk assessment with heat-mapped threat model",
                        "Disaster recovery plan with documented and tested RTO/RPO targets",
                        "Incident response playbooks for top 10 failure scenarios",
                        "Network segmentation and blast radius reduction implementation",
                        "Automated backup verification system with alerting",
                        "Chaos engineering test suite with quarterly run schedule",
                        "Executive-ready risk reduction report for insurance and board reviews",
                    ],
                },
                engagement: {
                    iconName: "Handshake",
                    title: "Engagement Model",
                    content:
                        "Engagements typically span 6-12 weeks. We begin with a 1-week architecture deep-dive, followed by a prioritized remediation plan. Implementation happens in 2-week sprints, with each sprint concluding in a validated chaos engineering test. We offer ongoing quarterly reviews to adapt your resilience posture as your infrastructure evolves. Pricing is milestone-based with a clear scope document.",
                },
            }}
        />
    );
}
