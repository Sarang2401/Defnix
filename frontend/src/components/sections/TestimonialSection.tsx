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
            "Working with Defnix felt like adding a senior security engineer to our team. They helped us structure our compliance process properly from the start instead of scrambling before the audit.",
        name: "Engineering Lead",
        title: "VP Engineering",
        company: "Seed-Stage SaaS Startup",
    },
    {
        quote:
            "Their team was thorough and transparent throughout the engagement. They documented everything clearly and made sure we understood every control they implemented in our cloud setup.",
        name: "CTO",
        title: "Chief Technology Officer",
        company: "Early-Stage AI Company",
    },
    {
        quote:
            "They built our cafe's website in under two weeks and it already shows up when people search for coffee shops in our area. Very happy with the result and the ongoing support.",
        name: "Owner",
        title: "Cafe Owner",
        company: "Independent Cafe · Melbourne, AU",
    },
    {
        quote:
            "Defnix automated our entire client onboarding workflow — what used to take us 3 hours per client now happens automatically. Huge time saver for a small team like ours.",
        name: "Founder",
        title: "Agency Founder",
        company: "Digital Marketing Agency · London, UK",
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
                        What clients say
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
