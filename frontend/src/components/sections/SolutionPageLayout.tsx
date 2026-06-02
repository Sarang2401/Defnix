"use client";

import { PageTransition, StaggerContainer, staggerChild } from "../ui/PageTransition";
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
        return <p className="text-white/60 leading-relaxed">{content}</p>;
    }
    return (
        <ul className="space-y-3">
            {content.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                </li>
            ))}
        </ul>
    );
}

function SectionCard({ section, index }: { section: SectionBlock; index: number }) {
    const Icon = iconMap[section.iconName] || AlertTriangle;
    return (
        <motion.div variants={staggerChild} className="card-glow rounded-xl bg-neutral-900 p-8 lg:p-10">
            <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white flex-shrink-0">
                    <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-white/40 tracking-wider uppercase mb-1">0{index + 1}</p>
                    <h3 className="text-xl lg:text-2xl text-white mb-4">{section.title}</h3>
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
        <div className="pt-28 pb-20">
            <section className="max-w-4xl mx-auto px-6 mb-20">
                <PageTransition>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white">
                            <HeroIcon size={24} />
                        </div>
                        <span className="text-xs text-white/40 tracking-[0.2em] uppercase">{label}</span>
                    </div>
                </PageTransition>
                <PageTransition delay={0.1}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-medium mb-6">{title}</h1>
                </PageTransition>
                <PageTransition delay={0.2}>
                    <p className="text-lg text-white/60 max-w-2xl leading-relaxed">{subtitle}</p>
                </PageTransition>
            </section>
            <section className="max-w-4xl mx-auto px-6">
                <StaggerContainer className="space-y-6">
                    {orderedSections.map((section, index) => (<SectionCard key={section.title} section={section} index={index} />))}
                </StaggerContainer>
            </section>
            <section className="max-w-4xl mx-auto px-6 mt-20">
                <PageTransition>
                    <div className="rounded-xl bg-neutral-900 border border-white/10 p-10 lg:p-14 text-center">
                        <h2 className="text-2xl sm:text-3xl text-white font-medium mb-4">ready to get started?</h2>
                        <p className="text-white/60 max-w-lg mx-auto mb-8">book a no-obligation consultation call. we&apos;ll assess your current posture and outline a clear path forward.</p>
                        <Button variant="primary" size="lg" href="/contact">book a consultation <ArrowRight size={18} /></Button>
                    </div>
                </PageTransition>
            </section>
        </div>
    );
}
