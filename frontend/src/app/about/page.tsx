import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/Button";
import {
    ArrowRight,
    Shield,
    Code2,
    Target,
    Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "We are an engineering-focused team specializing in cloud security, compliance readiness, and AI-driven automation for modern startups.",
};

const values = [
    {
        icon: <Code2 size={22} />,
        title: "Engineering First",
        description:
            "We solve compliance and security problems with code, not with slide decks. Every deliverable is a working system, not a recommendation.",
    },
    {
        icon: <Target size={22} />,
        title: "Outcome Oriented",
        description:
            "We measure success by your results — audits passed, incidents prevented, response times reduced — not by hours billed.",
    },
    {
        icon: <Shield size={22} />,
        title: "Trust Through Transparency",
        description:
            "We document everything we build. When we leave, you own the entire system — the code, the runbooks, and the knowledge.",
    },
    {
        icon: <Lightbulb size={22} />,
        title: "Pragmatic Innovation",
        description:
            "We use AI and automation where they create real leverage, not as buzzwords. Every technical decision is grounded in measurable impact.",
    },
];

export default function AboutPage() {
    return (
        <div className="pt-28 pb-20">
            {/* Hero */}
            <section className="max-w-4xl mx-auto px-6 mb-24">
                <PageTransition>
                    <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                        About Defnix
                    </p>
                </PageTransition>
                <PageTransition delay={0.1}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text-primary)] mb-6">
                        We engineer the
                        <br />
                        security infrastructure
                        <br />
                        <span className="text-[var(--color-text-secondary)]">
                            that startups need.
                        </span>
                    </h1>
                </PageTransition>
                <PageTransition delay={0.2}>
                    <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                        We are an engineering-focused team specializing in cloud
                        security, compliance readiness, and AI-driven automation for
                        modern startups. We don&apos;t consult — we build.
                    </p>
                </PageTransition>
            </section>

            {/* Mission */}
            <section className="max-w-4xl mx-auto px-6 mb-24">
                <PageTransition>
                    <div className="rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-8 lg:p-12">
                        <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                            Our Mission
                        </p>
                        <h2 className="text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-4 leading-snug">
                            Make security engineering accessible to every startup
                            that ships software.
                        </h2>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                            Enterprise-grade security shouldn&apos;t require an
                            enterprise budget. We bring the tooling, automation, and
                            engineering discipline of large security teams to
                            startups with 5-50 engineers — at a fraction of the cost
                            of building it in-house.
                        </p>
                    </div>
                </PageTransition>
            </section>

            {/* Values */}
            <section className="max-w-4xl mx-auto px-6 mb-24">
                <PageTransition>
                    <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                        How We Work
                    </p>
                    <h2 className="text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-10">
                        Principles that guide
                        <br />
                        <span className="text-[var(--color-text-secondary)]">
                            every engagement.
                        </span>
                    </h2>
                </PageTransition>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {values.map((value, i) => (
                        <PageTransition key={value.title} delay={0.1 * i}>
                            <div className="card-glow rounded-lg bg-[var(--color-bg-surface)] p-6 h-full">
                                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)] mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg text-[var(--color-text-primary)] mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </PageTransition>
                    ))}
                </div>
            </section>

            {/* Numbers */}
            <section className="max-w-4xl mx-auto px-6 mb-24">
                <PageTransition>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {[
                            { value: "98%", label: "SOC2 pass rate" },
                            { value: "50+", label: "Engagements" },
                            { value: "<15min", label: "Avg MTTR achieved" },
                            { value: "12wk", label: "Avg time to SOC2" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl lg:text-4xl font-[var(--font-mono)] font-bold text-[var(--color-accent)] mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-[var(--color-text-muted)] font-[var(--font-mono)] uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </PageTransition>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6">
                <PageTransition>
                    <div className="rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-10 lg:p-14 text-center">
                        <h2 className="text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-4">
                            Let&apos;s build something secure.
                        </h2>
                        <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto mb-8">
                            Whether you need SOC2 certification, cloud resilience
                            engineering, or AI-driven security automation — we&apos;re
                            here to help.
                        </p>
                        <Button variant="primary" size="lg" href="/contact">
                            Get in Touch
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                </PageTransition>
            </section>
        </div>
    );
}
