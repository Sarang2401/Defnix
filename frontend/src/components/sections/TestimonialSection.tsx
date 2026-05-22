"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
    quote: string;
    name: string;
    title: string;
    company: string;
}

const testimonials: Testimonial[] = [
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
        <section className="section-gap relative" id="testimonials">
            <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-[var(--font-mono)] text-xs text-[var(--color-accent-secondary)] tracking-[0.2em] uppercase mb-4"
                >
                    Client Feedback
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text-primary)]"
                >
                    Proof of execution.
                </motion.h2>
            </div>

            <div className="max-w-5xl mx-auto px-6 pb-32">
                {testimonials.map((item, index) => {
                    // Stacking calculations
                    const topOffset = `calc(120px + ${index * 30}px)`;
                    const zIndex = index;
                    
                    return (
                        <motion.div
                            key={index}
                            className="sticky"
                            style={{ top: topOffset, zIndex }}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="glass-card rounded-3xl p-10 sm:p-16 mb-12 sm:mb-16 border border-[var(--color-border)] bg-[rgba(10,10,12,0.95)] shadow-xl hover:border-[var(--color-accent)] transition-all duration-500">
                                <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-accent-dim)] bg-[var(--color-accent-dim)] text-[var(--color-accent)] shadow-sm">
                                            <Quote size={36} />
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1">
                                        <p className="text-[var(--color-text-primary)] text-2xl sm:text-3xl md:text-4xl leading-[1.3] md:leading-[1.3] mb-12 font-[var(--font-display)] font-medium">
                                            &ldquo;{item.quote}&rdquo;
                                        </p>
                                        
                                        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-8">
                                            <div>
                                                <p className="text-lg text-[var(--color-text-primary)] font-semibold mb-1">
                                                    {item.name}
                                                </p>
                                                <p className="text-base text-[var(--color-text-secondary)]">
                                                    {item.title}, {item.company}
                                                </p>
                                            </div>
                                            <div className="hidden sm:block text-[var(--color-accent-secondary)] font-[var(--font-mono)] text-sm uppercase tracking-widest">
                                                0{index + 1}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
