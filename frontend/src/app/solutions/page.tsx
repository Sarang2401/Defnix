import type { Metadata } from "next";
import { Shield, Cloud, Brain, ArrowRight } from "lucide-react";
import { PageTransition, StaggerContainer } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Engineering Solutions",
    description:
        "SOC2 compliance readiness, cloud risk reduction, and AI-driven security operations — engineered for startups that ship fast.",
};

const solutions = [
    {
        icon: <Shield size={28} />,
        title: "SOC2 Failure Prevention",
        subtitle: "Compliance Readiness Engineering",
        risk: "73% of companies fail their first SOC2 audit",
        description:
            "We engineer the controls, policies, and evidence pipelines before your auditor arrives. Not checkbox compliance — structural readiness that holds up under scrutiny.",
        href: "/solutions/soc2-failure-prevention",
        capabilities: [
            "Control gap analysis & remediation roadmap",
            "Evidence pipeline automation",
            "Policy documentation suite",
            "Auditor-ready architecture reviews",
        ],
    },
    {
        icon: <Cloud size={28} />,
        title: "Cloud Insurance",
        subtitle: "Cloud Risk Reduction & Incident Readiness",
        risk: "$4.45M average cost of a cloud data breach",
        description:
            "Architecture reviews, disaster recovery engineering, and incident response playbooks that reduce your blast radius to near-zero.",
        href: "/solutions/cloud-insurance",
        capabilities: [
            "Multi-cloud architecture review",
            "Disaster recovery engineering",
            "Incident response playbooks",
            "Blast radius minimization",
        ],
    },
    {
        icon: <Brain size={28} />,
        title: "AI Enhanced SOC Analyst",
        subtitle: "AI-Driven Security Automation",
        risk: "SOC teams waste 45% of time on false positives",
        description:
            "ML-powered alert triage, automated runbooks, and intelligent escalation pipelines that let your security team focus on real threats.",
        href: "/solutions/ai-soc-analyst",
        capabilities: [
            "ML-powered alert triage",
            "Automated investigation runbooks",
            "Intelligent escalation pipelines",
            "SOC productivity analytics",
        ],
    },
];

function SolutionCard({
    solution,
    index,
}: {
    solution: (typeof solutions)[0];
    index: number;
}) {
    return (
        <Link href={solution.href} className="block group">
            <div
                className={`card-glow rounded-lg bg-[var(--color-bg-surface)] p-8 lg:p-10 transition-all duration-300 ${index === 1 ? "lg:ml-12" : index === 2 ? "lg:ml-24" : ""
                    }`}
            >
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column */}
                    <div className="flex-shrink-0 lg:w-80">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)]">
                                {solution.icon}
                            </div>
                            <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-danger)] tracking-wider uppercase">
                                ▲ {solution.risk}
                            </span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl text-[var(--color-text-primary)] mb-1">
                            {solution.title}
                        </h3>
                        <p className="text-sm text-[var(--color-text-muted)] font-[var(--font-mono)]">
                            {solution.subtitle}
                        </p>
                    </div>

                    {/* Right column */}
                    <div className="flex-1 min-w-0">
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                            {solution.description}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                            {solution.capabilities.map((cap) => (
                                <li
                                    key={cap}
                                    className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]"
                                >
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                    {cap}
                                </li>
                            ))}
                        </ul>
                        <span className="inline-flex items-center gap-2 text-sm text-[var(--color-accent)] font-[var(--font-heading)] font-medium group-hover:gap-3 transition-all duration-200">
                            Learn more <ArrowRight size={14} />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function SolutionsPage() {
    return (
        <div className="pt-28 pb-20">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-6 mb-20">
                <PageTransition>
                    <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                        Engineering Solutions
                    </p>
                </PageTransition>
                <PageTransition delay={0.1}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text-primary)] mb-6">
                        Three problems.
                        <br />
                        <span className="text-[var(--color-text-secondary)]">
                            Three engineering solutions.
                        </span>
                    </h1>
                </PageTransition>
                <PageTransition delay={0.2}>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                        We don&apos;t sell software. We engineer the infrastructure,
                        controls, and automation that make your organization
                        audit-ready, incident-resilient, and operationally sharp.
                    </p>
                </PageTransition>
            </section>

            {/* Solution cards */}
            <section className="max-w-7xl mx-auto px-6">
                <StaggerContainer className="space-y-8">
                    {solutions.map((solution, index) => (
                        <SolutionCard
                            key={solution.title}
                            solution={solution}
                            index={index}
                        />
                    ))}
                </StaggerContainer>
            </section>

            {/* Bottom CTA */}
            <section className="max-w-7xl mx-auto px-6 mt-24">
                <PageTransition>
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-4">
                            Not sure which solution fits?
                        </h2>
                        <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto mb-8">
                            Book a 30-minute assessment call. We&apos;ll map your current
                            security posture and recommend next steps — no strings.
                        </p>
                        <Button variant="primary" size="lg" href="/contact">
                            Book a Free Assessment
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                </PageTransition>
            </section>
        </div>
    );
}
