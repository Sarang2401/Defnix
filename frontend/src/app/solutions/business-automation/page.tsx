import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/sections/SolutionPageLayout";

export const metadata: Metadata = {
    title: "Business Automation & Workflows",
    description:
        "Custom automation workflows using n8n, Make, and Zapier. Eliminate repetitive tasks, automate lead follow-ups, and save 10+ hours per week for your team or personal brand.",
};

export default function BusinessAutomationPage() {
    return (
        <SolutionPageLayout
            iconName="Workflow"
            label="Business Automation & Workflows"
            title="Stop Doing Manually What a Workflow Can Do Automatically"
            subtitle="Teams and creators lose 15 or more hours every week to repetitive tasks — email follow-ups, lead management, social media posting, invoicing. We build custom automation pipelines using n8n, Make, and Zapier that run 24/7 so you don't have to."
            sections={{
                problem: {
                    iconName: "AlertTriangle",
                    title: "The Problem",
                    content:
                        "Every hour you spend copy-pasting data between tools, manually following up with leads, or scheduling posts is an hour not spent on the work that actually grows your business. Startups burn engineering bandwidth on internal admin. Content creators spend more time managing their business than creating content. Small agencies lose deals because follow-ups happen too slowly. The tools to automate all of this already exist — the problem is knowing how to connect them properly.",
                },
                audience: {
                    iconName: "Users",
                    title: "Who This Is For",
                    content: [
                        "Startups and small teams spending too much time on internal operations and admin",
                        "Content creators and influencers managing business enquiries, sponsorships, and client relationships",
                        "Marketing agencies that need to scale client workflows without hiring more people",
                        "E-commerce businesses looking to automate order processing, returns, and customer communication",
                        "Coaches, consultants, and solo entrepreneurs who need systems that work while they sleep",
                    ],
                },
                risks: {
                    iconName: "AlertTriangle",
                    title: "Cost of Manual Processes",
                    content: [
                        "Slow lead response times directly reduce conversion — studies show responding within 5 minutes vs 30 minutes is a 21x difference in qualification rate",
                        "Manual data entry errors create downstream problems that take hours to untangle",
                        "Missed follow-ups and forgotten tasks mean revenue left on the table every week",
                        "Scaling manual processes requires hiring — automation lets you grow revenue without growing headcount proportionally",
                        "Founder time is the most valuable resource in an early-stage business — wasting it on admin is expensive",
                    ],
                },
                approach: {
                    iconName: "Target",
                    title: "Our Approach",
                    content:
                        "We start by auditing your current workflow — mapping out exactly where time is being lost and which tasks are the highest-value automation targets. Then we design and build workflows using the right tool for each use case: n8n for complex multi-step pipelines, Make for visual no-code integrations, or Zapier for quick tool connections. Every automation we build is documented, tested, and handed over with monitoring in place so you always know what's running and why.",
                },
                capabilities: {
                    iconName: "Cpu",
                    title: "What We Automate",
                    content: [
                        "Lead capture and CRM entry — from form fills, DMs, or email enquiries into your CRM automatically",
                        "Email sequence automation — follow-up sequences triggered by actions, not manual scheduling",
                        "Social media scheduling and cross-platform publishing pipelines",
                        "Invoice generation and payment follow-up workflows",
                        "Calendar booking and appointment confirmation flows",
                        "Customer onboarding sequences — documents, welcome emails, task assignments",
                        "Reporting and analytics — automated weekly summaries from your key tools",
                        "n8n, Make (Integromat), Zapier, and custom webhook integrations",
                    ],
                },
                deliverables: {
                    iconName: "Package",
                    title: "What You Get",
                    content: [
                        "Custom automation workflows built and deployed in your tools",
                        "Workflow documentation so your team understands what runs and why",
                        "Monitoring setup with error alerts so you know if something breaks",
                        "30-day optimisation period — we tune workflows based on real usage",
                        "Handover training session so your team can maintain and extend workflows",
                        "Time-savings report showing hours recovered per week",
                    ],
                },
                engagement: {
                    iconName: "Handshake",
                    title: "Engagement Model",
                    content:
                        "Most automation projects are completed in 1 to 3 weeks depending on complexity. We start with a workflow audit call, map the automation plan, build and test in parallel, then hand over with training. Fixed-price projects for defined scope. For ongoing automation work — new workflows, tool integrations, and monthly optimisation — we offer retainer packages. No lock-in, cancel any time.",
                },
            }}
        />
    );
}
