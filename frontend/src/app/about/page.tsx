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
                    <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4">
                        about defnix
                    </p>
                </PageTransition>
                <PageTransition delay={0.1}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-medium mb-6">
                        we engineer the
                        <br />
                        security infrastructure
                        <br />
                        <span className="text-white/50">
                            that startups need.
                        </span>
                    </h1>
                </PageTransition>
                <PageTransition delay={0.2}>
                    <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                        we are an engineering-focused team that builds across cloud
                        security, compliance readiness, ai automation, website development,
                        and mobile apps — for startups and small businesses worldwide.
                        we don&apos;t consult — we build.
                    </p>
                </PageTransition>
            </section>

            {/* Mission */}
            <section className="max-w-4xl mx-auto px-6 mb-24">
                <PageTransition>
                    <div className="rounded-xl bg-neutral-900 border border-white/10 p-8 lg:p-12">
                        <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4">
                            our mission
                        </p>
                        <h2 className="text-2xl sm:text-3xl text-white font-medium mb-4 leading-snug">
                            make great engineering accessible to every startup and
                            small business that has real problems to solve.
                        </h2>
                        <p className="text-white/60 leading-relaxed max-w-2xl">
                            whether you need soc2 compliance, cloud security, ai-driven
                            automation, a website that wins local search, or a mobile app
                            your customers actually love — we build it. no consultants,
                            no slide decks. just engineering that works.
                        </p>
                    </div>
                </PageTransition>
            </section>

            {/* Values */}
            <section className="max-w-4xl mx-auto px-6 mb-24">
                <PageTransition>
                    <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4">
                        how we work
                    </p>
                    <h2 className="text-2xl sm:text-3xl text-white font-medium mb-10">
                        principles that guide
                        <br />
                        <span className="text-white/50">
                            every engagement.
                        </span>
                    </h2>
                </PageTransition>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {values.map((value, i) => (
                        <PageTransition key={value.title} delay={0.1 * i}>
                            <div className="card-glow rounded-xl bg-neutral-900 p-6 h-full">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg text-white mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed">
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
                            { value: "100%", label: "Client satisfaction" },
                            { value: "15+", label: "Projects delivered" },
                            { value: "<1hr", label: "Avg response time" },
                            { value: "2wk", label: "Avg delivery time" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl lg:text-4xl font-medium text-white mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-white/40 uppercase tracking-wider">
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
                    <div className="rounded-xl bg-neutral-900 border border-white/10 p-10 lg:p-14 text-center">
                        <h2 className="text-2xl sm:text-3xl text-white font-medium mb-4">
                            let&apos;s build something secure.
                        </h2>
                        <p className="text-white/60 max-w-lg mx-auto mb-8">
                            whether you need soc2 certification, cloud resilience
                            engineering, or ai-driven security automation — we&apos;re
                            here to help.
                        </p>
                        <Button variant="primary" size="lg" href="/contact">
                            get in touch
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                </PageTransition>
            </section>
        </div>
    );
}
