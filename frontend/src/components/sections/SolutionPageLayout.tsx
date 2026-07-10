"use client";

import { PageTransition, StaggerContainer, staggerChild } from "../ui/PageTransition";
import { Breadcrumb } from "../ui/Breadcrumb";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import {
    ArrowRight, AlertTriangle, Users, Target, Cpu, Package, Handshake,
    Shield, Cloud, Brain, Globe, Smartphone, Workflow, Zap, type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    AlertTriangle, Users, Target, Cpu, Package, Handshake,
    Shield, Cloud, Brain, Globe, Smartphone, Workflow, Zap,
};

interface SectionBlock { iconName: string; title: string; content: string | string[]; }

interface SolutionPageProps {
    iconName: string; label: string; title: string; subtitle: string;
    sections: { problem: SectionBlock; audience: SectionBlock; risks: SectionBlock; approach: SectionBlock; capabilities: SectionBlock; deliverables: SectionBlock; engagement: SectionBlock; };
}

function renderContent(content: string | string[]) {
    if (typeof content === "string") {
        return <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{content}</p>;
    }
    return (
        <ul className="space-y-3">
            {content.map((item, i) => (
                <li key={i} className="flex items-start gap-3" style={{ color: "var(--color-text-secondary)" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--color-sage)" }} />
                    <span style={{ lineHeight: 1.7 }}>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function SectionCard({ section, index }: { section: SectionBlock; index: number }) {
    const Icon = iconMap[section.iconName] || AlertTriangle;
    return (
        <motion.div variants={staggerChild} className="card neu-flat rounded-xl p-8 lg:p-10">
            <div className="flex items-start gap-5">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--color-surface)", color: "var(--color-sage)" }}
                >
                    <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <p
                        className="type-label mb-1"
                        style={{ color: "var(--color-text-muted)", fontSize: "10px" }}
                    >
                        0{index + 1}
                    </p>
                    <h3
                        className="text-xl lg:text-2xl mb-4"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-mist)", fontWeight: 600 }}
                    >
                        {section.title}
                    </h3>
                    {renderContent(section.content)}
                </div>
            </div>
        </motion.div>
    );
}

export function SolutionPageLayout({ iconName, label, title, subtitle, sections }: SolutionPageProps) {
    const HeroIcon = iconMap[iconName] || Shield;
    const orderedSections: SectionBlock[] = [sections.problem, sections.audience, sections.risks, sections.approach, sections.capabilities, sections.deliverables, sections.engagement];

    return (
        <div className="pt-28 pb-20" style={{ backgroundColor: "var(--color-surface)" }}>
            <section className="max-w-4xl mx-auto px-6 mb-20">
                <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: title }]} />
                <PageTransition>
                    <div className="flex items-center gap-3 mb-6">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: "var(--color-secondary)", color: "var(--color-sage)" }}
                        >
                            <HeroIcon size={24} />
                        </div>
                        <span
                            className="type-label"
                            style={{ color: "var(--color-text-muted)", fontSize: "12px" }}
                        >
                            {label}
                        </span>
                    </div>
                </PageTransition>
                <PageTransition delay={0.1}>
                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl mb-6"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-mist)", fontWeight: 600, letterSpacing: "-0.02em" }}
                    >
                        {title}
                    </h1>
                </PageTransition>
                <PageTransition delay={0.2}>
                    <p
                        className="text-lg max-w-2xl"
                        style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}
                    >
                        {subtitle}
                    </p>
                </PageTransition>
            </section>
            <section className="max-w-4xl mx-auto px-6">
                <StaggerContainer className="space-y-6">
                    {orderedSections.map((section, index) => (<SectionCard key={section.title} section={section} index={index} />))}
                </StaggerContainer>
            </section>
            <section className="max-w-4xl mx-auto px-6 mt-20">
                <PageTransition>
                    <div
                        className="neu-raised-surface rounded-xl p-10 lg:p-14 text-center"
                        style={{ border: "1px solid var(--color-border)" }}
                    >
                        <h2
                            className="text-2xl sm:text-3xl mb-4"
                            style={{ fontFamily: "var(--font-headline)", color: "var(--color-mist)", fontWeight: 600 }}
                        >
                            ready to get started?
                        </h2>
                        <p
                            className="mx-auto mb-8"
                            style={{ color: "var(--color-text-secondary)", maxWidth: "48ch", lineHeight: "1.7", display: "block" }}
                        >
                            book a free 30-minute consultation. we&apos;ll assess your current posture and outline a clear path forward.
                        </p>
                        <Button variant="primary" size="lg" href="/contact">book a free consultation <ArrowRight size={18} /></Button>
                    </div>
                </PageTransition>
            </section>
        </div>
    );
}
