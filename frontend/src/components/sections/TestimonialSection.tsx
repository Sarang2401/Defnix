"use client";

import { PageTransition } from "../ui/PageTransition";
import { Quote } from "lucide-react";

interface Testimonial {
    quote: string;
    name: string;
    title: string;
    company: string;
}

const placeholders: Testimonial[] = [
    {
        quote:
            "Defnix took us from zero SOC2 readiness to passing our audit in under 8 weeks. Their engineering-first approach meant we didn't just check boxes — we built real controls.",
        name: "Engineering Lead",
        title: "VP Engineering",
        company: "Series A SaaS Startup",
    },
    {
        quote:
            "Their cloud insurance engagement uncovered three critical misconfigurations in our AWS infrastructure that our internal team had missed for months.",
        name: "CTO",
        title: "Chief Technology Officer",
        company: "AI Platform Company",
    },
];

export function TestimonialSection() {
    return (
        <section className="section-gap border-t border-[var(--color-border)]">
            <div className="max-w-7xl mx-auto px-6">
                <PageTransition>
                    <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                        Client Feedback
                    </p>
                    <h2 className="text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-12">
                        What teams say
                    </h2>
                </PageTransition>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {placeholders.map((item, i) => (
                        <PageTransition key={item.company} delay={i * 0.1}>
                            <div className="card-glow rounded-lg bg-[var(--color-bg-surface)] p-8 h-full flex flex-col">
                                <Quote
                                    size={24}
                                    className="text-[var(--color-accent)] opacity-40 mb-4"
                                />
                                <p className="text-[var(--color-text-secondary)] leading-relaxed flex-1 mb-6">
                                    &ldquo;{item.quote}&rdquo;
                                </p>
                                <div className="border-t border-[var(--color-border)] pt-4">
                                    <p className="text-sm text-[var(--color-text-primary)] font-medium">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-[var(--color-text-muted)]">
                                        {item.title}, {item.company}
                                    </p>
                                </div>
                            </div>
                        </PageTransition>
                    ))}
                </div>
            </div>
        </section>
    );
}
