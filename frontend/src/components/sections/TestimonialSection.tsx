"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Marquee } from "../ui/Marquee";

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

function TestimonialCard({ item }: { item: Testimonial }) {
    return (
        <div className="flex-shrink-0 w-[400px] md:w-[450px]">
            <div className="rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-white/8 p-8 h-full flex flex-col mx-3 group hover:border-white/20 transition-all duration-400">
                <Quote
                    size={24}
                    className="text-white/20 mb-4 group-hover:text-white/40 transition-opacity"
                />
                <p className="text-white/60 leading-relaxed flex-1 mb-6 text-sm">
                    &ldquo;{item.quote}&rdquo;
                </p>
                <div className="border-t border-white/10 pt-4">
                    <p className="text-sm text-white font-medium">
                        {item.name}
                    </p>
                    <p className="text-xs text-white/40">
                        {item.title}, {item.company}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function TestimonialSection() {
    return (
        <section className="section-gap" style={{ overflow: "clip" }}>
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4"
                >
                    client feedback
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-3xl sm:text-4xl text-white font-medium"
                >
                    what clients say
                </motion.h2>
            </div>

            {/* Auto-scrolling testimonial carousel */}
            <Marquee speed={50} pauseOnHover={true}>
                {testimonials.map((item) => (
                    <TestimonialCard key={item.company} item={item} />
                ))}
            </Marquee>

            {/* Second row scrolling opposite direction */}
            <div className="mt-6">
                <Marquee speed={45} direction="right" pauseOnHover={true}>
                    {[...testimonials].reverse().map((item) => (
                        <TestimonialCard key={`rev-${item.company}`} item={item} />
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
