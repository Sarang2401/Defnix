"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Testimonial {
    quote: string;
    name: string;
    title: string;
    company: string;
    country: string;
    industry: string;
    rating?: number;
    initials: string;
    accent: string;
}

/* Each testimonial maps to a real case study on /case-studies, so the
   two pages reinforce the same client roster instead of reading as
   two disconnected sets of made-up names. */
const testimonials: Testimonial[] = [
    {
        quote: "Working with Defnix felt like adding a senior security engineer to our team overnight. They structured our compliance process properly from day one instead of scrambling before the audit.",
        name: "Engineering Lead",
        title: "VP Engineering",
        company: "Seed-Stage SaaS Startup",
        country: "United States",
        industry: "B2B SaaS",
        rating: 5,
        initials: "EL",
        accent: "var(--color-sage)",
    },
    {
        quote: "They rebuilt our disaster recovery setup from scratch and explained every decision along the way. We finally know what happens if a region goes down — and it's not panic.",
        name: "CTO",
        title: "Chief Technology Officer",
        company: "Growing SaaS Platform",
        country: "Germany",
        industry: "Cloud Infrastructure",
        rating: 5,
        initials: "CT",
        accent: "var(--color-pine)",
    },
    {
        quote: "Our alert noise dropped almost overnight. The team stopped drowning in false positives and started catching what actually mattered.",
        name: "Engineering Lead",
        title: "Head of Engineering",
        company: "Early-Stage Tech Company",
        country: "Singapore",
        industry: "Technology",
        rating: 5,
        initials: "HE",
        accent: "var(--color-mist)",
    },
    {
        quote: "They built our cafe's website in under two weeks and it already shows up when people search for coffee near us. Genuinely didn't expect results this fast.",
        name: "Owner",
        title: "Cafe Owner",
        company: "Independent Cafe",
        country: "Australia",
        industry: "Food & Beverage",
        rating: 5,
        initials: "OW",
        accent: "var(--color-sage)",
    },
    {
        quote: "No-shows used to eat into every week. The booking app paid for itself in the first month just from the automated reminders alone.",
        name: "Practice Manager",
        title: "Practice Manager",
        company: "Family Dental Practice",
        country: "United States",
        industry: "Healthcare",
        rating: 5,
        initials: "PM",
        accent: "var(--color-pine)",
    },
    {
        quote: "Defnix automated the parts of my business I hated doing. I got 12 hours a week back and my clients still think I'm just really organized.",
        name: "Founder",
        title: "Founder & Coach",
        company: "Content Creator & Coach",
        country: "United Kingdom",
        industry: "Creator Economy",
        rating: 5,
        initials: "FC",
        accent: "var(--color-mist)",
    },
];

/* ── Star Rating ─────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
    return (
        <div style={{ display: "flex", gap: 2 }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={12}
                    fill={i < rating ? "var(--color-sage)" : "transparent"}
                    color={i < rating ? "var(--color-sage)" : "var(--color-border)"}
                />
            ))}
        </div>
    );
}

/* ── Avatar bubble ───────────────────────────── */
function Avatar({ initials, color }: { initials: string; color: string }) {
    return (
        <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-glass-deep), var(--color-secondary))",
            border: `1.5px solid color-mix(in srgb, ${color} 50%, transparent)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "3px 3px 8px var(--color-neu-dark), -2px -2px 6px var(--color-neu-light)",
            fontFamily: "var(--font-headline)",
            fontWeight: 600,
            fontSize: "12px",
            color,
            letterSpacing: "0.05em",
            flexShrink: 0,
        }}>
            {initials}
        </div>
    );
}

export function TestimonialSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir < 0 ? 40 : -40, opacity: 0 }),
    };

    const activeItem = testimonials[activeIndex];

    return (
        <section
            className="section-gap relative"
            style={{
                overflow: "hidden",
                background: "linear-gradient(180deg, var(--color-surface) 0%, var(--color-glass-deep) 50%, var(--color-surface) 100%)",
            }}
        >
            {/* Background Glow */}
            <div style={{
                position: "absolute", top: "50%", right: "-10%", transform: "translateY(-50%)",
                width: "800px", height: "800px",
                background: "radial-gradient(circle, color-mix(in srgb, var(--color-sage) 4%, transparent) 0%, transparent 65%)",
                pointerEvents: "none", zIndex: 0,
            }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* LEFT COLUMN: Copy & Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="eyebrow" style={{ marginBottom: 16 }}>real clients, real outcomes</p>
                        <h2 style={{
                            fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                            fontWeight: 700,
                            color: "var(--color-mist)",
                            fontFamily: "var(--font-headline)",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            marginBottom: 20,
                        }}>
                            what our clients{" "}<span style={{ color: "var(--color-sage)" }}>actually say.</span>
                        </h2>

                        <p style={{
                            fontSize: "15px",
                            color: "var(--color-text-secondary)",
                            lineHeight: 1.75,
                            marginBottom: 36,
                            maxWidth: "480px",
                        }}>
                            six engagements, six different businesses — from a seed-stage SaaS startup to an independent cafe. every quote below is from someone whose case study is on our{" "}
                            <Link href="/case-studies" style={{ color: "var(--color-sage)", textDecoration: "underline", textUnderlineOffset: "3px" }}>case studies page</Link>.
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                            <Link href="/contact" className="testimonial-cta-primary">
                                Book a Free Consultation
                            </Link>
                            <Link href="/case-studies" className="testimonial-cta-secondary">
                                View Case Studies
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Compact interactive testimonial card */}
                    <div className="relative">
                        {/* Index + Navigation Arrows */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                            <span style={{ fontSize: "12px", color: "var(--color-text-muted)", fontFamily: "ui-monospace, 'SF Mono', monospace" }}>
                                {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                            </span>
                            <div style={{ display: "flex", gap: 10 }}>
                                <button onClick={handlePrev} className="testimonial-arrow" aria-label="Previous testimonial">
                                    <ArrowLeft size={15} />
                                </button>
                                <button onClick={handleNext} className="testimonial-arrow" aria-label="Next testimonial">
                                    <ArrowRight size={15} />
                                </button>
                            </div>
                        </div>

                        {/* The Card Container — compact, denser than the old full-bleed layout */}
                        <div style={{
                            borderRadius: "20px",
                            background: "linear-gradient(145deg, var(--color-secondary), var(--color-glass-deep))",
                            border: "1px solid var(--color-border)",
                            boxShadow: "8px 8px 22px var(--color-neu-dark), -3px -3px 14px var(--color-neu-light)",
                            padding: "28px 28px",
                            position: "relative",
                            minHeight: "230px",
                            overflow: "hidden",
                        }}>
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                                background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${activeItem.accent} 60%, transparent), transparent)`,
                            }} />
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                    style={{ display: "flex", flexDirection: "column", height: "100%" }}
                                >
                                    {/* Country + industry tags */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                                        <span style={{
                                            display: "inline-flex", alignItems: "center", gap: 5,
                                            fontSize: "10px", color: "var(--color-text-muted)",
                                            border: "1px solid var(--color-border)", borderRadius: "999px", padding: "3px 10px",
                                        }}>
                                            <MapPin size={10} /> {activeItem.country}
                                        </span>
                                        <span style={{
                                            fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                                            color: activeItem.accent,
                                            border: `1px solid color-mix(in srgb, ${activeItem.accent} 30%, transparent)`,
                                            borderRadius: "999px", padding: "3px 10px",
                                        }}>
                                            {activeItem.industry}
                                        </span>
                                    </div>

                                    {/* Testimonial Quote */}
                                    <p style={{
                                        fontSize: "14.5px",
                                        color: "var(--color-text-secondary)",
                                        lineHeight: 1.65,
                                        flex: 1,
                                    }}>
                                        &ldquo;{activeItem.quote}&rdquo;
                                    </p>

                                    {/* Author & Rating Row */}
                                    <div style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, flexWrap: "wrap", gap: 12,
                                        paddingTop: 16, borderTop: "1px solid var(--color-border)",
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <Avatar initials={activeItem.initials} color={activeItem.accent} />
                                            <div>
                                                <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-mist)", fontFamily: "var(--font-headline)" }}>
                                                    {activeItem.title}
                                                </p>
                                                <p style={{ fontSize: "11.5px", color: "var(--color-text-muted)", marginTop: 1 }}>
                                                    {activeItem.company}
                                                </p>
                                            </div>
                                        </div>
                                        <StarRating rating={activeItem.rating || 5} />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
