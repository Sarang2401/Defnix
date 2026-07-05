"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Testimonial {
    quote: string;
    name: string;
    title: string;
    company: string;
    rating?: number;
    initials: string;
    avatarColor: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Working with Defnix felt like adding a senior security engineer to our team. They helped us structure our compliance process properly from the start instead of scrambling before the audit.",
        name: "Engineering Lead",
        title: "VP Engineering",
        company: "Seed-Stage SaaS Startup",
        rating: 5,
        initials: "EL",
        avatarColor: "#84A98C",
    },
    {
        quote: "Their team was thorough and transparent throughout the engagement. They documented everything clearly and made sure we understood every control they implemented in our cloud setup.",
        name: "CTO",
        title: "Chief Technology Officer",
        company: "Early-Stage AI Company",
        rating: 5,
        initials: "CT",
        avatarColor: "#52796F",
    },
    {
        quote: "They built our cafe's website in under two weeks and it already shows up when people search for coffee shops in our area. Very happy with the result and the ongoing support.",
        name: "Owner",
        title: "Cafe Owner",
        company: "Independent Cafe",
        rating: 5,
        initials: "OW",
        avatarColor: "#CAD2C5",
    },
    {
        quote: "Defnix automated our entire client onboarding workflow — what used to take us 3 hours per client now happens automatically. Huge time saver for a small team like ours.",
        name: "Founder",
        title: "Agency Founder",
        company: "Digital Marketing Agency",
        rating: 5,
        initials: "FD",
        avatarColor: "#84A98C",
    },
];

/* ── Star Rating ─────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
    return (
        <div style={{ display: "flex", gap: 3 }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={14}
                    fill={i < rating ? "#84A98C" : "transparent"}
                    color={i < rating ? "#84A98C" : "rgba(202,210,197,0.15)"}
                />
            ))}
        </div>
    );
}

/* ── Avatar bubble ───────────────────────────── */
function Avatar({ initials, color }: { initials: string; color: string }) {
    return (
        <div style={{ position: "relative", flexShrink: 0 }}>
            {/* Avatar circle */}
            <div style={{
                width: 48, height: 48,
                borderRadius: "50%",
                background: `linear-gradient(135deg, rgba(47,62,70,0.95), rgba(53,79,82,0.95))`,
                border: `1.5px solid ${color}50`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `3px 3px 8px #1e2b31, -2px -2px 6px #3f5461`,
                fontFamily: "var(--font-headline)",
                fontWeight: 600,
                fontSize: "14px",
                color: color,
                letterSpacing: "0.05em",
            }}>
                {initials}
            </div>
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
        enter: (dir: number) => ({
            x: dir > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 50 : -50,
            opacity: 0,
        }),
    };

    const activeItem = testimonials[activeIndex];

    return (
        <section
            className="section-gap relative"
            style={{ 
                overflow: "hidden", 
                background: "linear-gradient(180deg, var(--color-surface) 0%, #1e2b31 50%, var(--color-surface) 100%)" 
            }}
        >
            {/* Background Glow */}
            <div style={{
                position: "absolute", top: "50%", right: "-10%", transform: "translateY(-50%)",
                width: "800px", height: "800px",
                background: "radial-gradient(circle, rgba(132,169,140,0.04) 0%, transparent 65%)",
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
                        <h2 style={{
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            fontWeight: 700,
                            color: "#CAD2C5",
                            fontFamily: "var(--font-headline)",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            marginBottom: 24,
                        }}>
                            Our Customers Love What We Do
                        </h2>
                        
                        <p style={{
                            fontSize: "16px",
                            color: "rgba(202,210,197,0.6)",
                            lineHeight: 1.8,
                            marginBottom: 40,
                            maxWidth: "480px"
                        }}>
                            Our customers love our services! Read their reviews to discover why they're raving about our engineering quality, support, and overall experience. Join the satisfied ranks today!
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                            <Link href="/contact" style={{
                                padding: "14px 28px",
                                borderRadius: "12px",
                                background: "rgba(132,169,140,0.1)",
                                border: "1px solid #84A98C",
                                color: "#CAD2C5",
                                fontSize: "14px",
                                fontWeight: 600,
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 12px rgba(132,169,140,0.1)",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(132,169,140,0.2)")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "rgba(132,169,140,0.1)")}
                            >
                                Start Project
                            </Link>

                            <Link href="/case-studies" style={{
                                padding: "14px 28px",
                                borderRadius: "12px",
                                background: "#2F3E46",
                                border: "1px solid rgba(202,210,197,0.1)",
                                color: "#CAD2C5",
                                fontSize: "14px",
                                fontWeight: 500,
                                transition: "all 0.3s ease",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.background = "#354F52")}
                            onMouseOut={(e) => (e.currentTarget.style.background = "#2F3E46")}
                            >
                                View Case Studies
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Interactive Testimonial Card */}
                    <div className="relative">
                        {/* Navigation Arrows (Top Right) */}
                        <div style={{
                            display: "flex", justifyContent: "flex-end", gap: 24, marginBottom: 20
                        }}>
                            <button onClick={handlePrev} style={{ color: "rgba(202,210,197,0.4)", transition: "color 0.3s ease", cursor: "pointer" }}
                                onMouseOver={(e) => (e.currentTarget.style.color = "#CAD2C5")}
                                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(202,210,197,0.4)")}
                            >
                                <ArrowLeft strokeWidth={1.5} size={32} />
                            </button>
                            <button onClick={handleNext} style={{ color: "rgba(202,210,197,0.4)", transition: "color 0.3s ease", cursor: "pointer" }}
                                onMouseOver={(e) => (e.currentTarget.style.color = "#CAD2C5")}
                                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(202,210,197,0.4)")}
                            >
                                <ArrowRight strokeWidth={1.5} size={32} />
                            </button>
                        </div>

                        {/* The Card Container */}
                        <div style={{
                            borderRadius: "24px",
                            background: "linear-gradient(145deg, #2d4449, #18262E)",
                            border: "1px solid rgba(82,121,111,0.2)",
                            boxShadow: "10px 10px 30px rgba(0,0,0,0.3), -4px -4px 15px rgba(255,255,255,0.02)",
                            padding: "48px 40px",
                            position: "relative",
                            minHeight: "360px",
                            overflow: "hidden",
                        }}>
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    style={{ height: "100%", display: "flex", flexDirection: "column" }}
                                >
                                    {/* Oversized Quote Mark */}
                                    <div style={{
                                        fontSize: "72px", lineHeight: 0.8,
                                        fontFamily: "Georgia, serif",
                                        color: "rgba(132,169,140,0.15)",
                                        marginBottom: 24,
                                        userSelect: "none",
                                    }}>
                                        &ldquo;
                                    </div>

                                    {/* Testimonial Quote */}
                                    <p style={{
                                        fontSize: "18px",
                                        color: "rgba(202,210,197,0.85)",
                                        lineHeight: 1.7,
                                        flex: 1,
                                    }}>
                                        {activeItem.quote}
                                    </p>

                                    {/* Author & Rating Row */}
                                    <div style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40, flexWrap: "wrap", gap: 20
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                            <Avatar initials={activeItem.initials} color={activeItem.avatarColor} />
                                            <div>
                                                <p style={{
                                                    fontSize: "15px", fontWeight: 600, color: "#CAD2C5",
                                                    fontFamily: "var(--font-headline)", letterSpacing: "0.01em",
                                                }}>
                                                    {activeItem.name}
                                                </p>
                                                <p style={{ fontSize: "13px", color: "rgba(202,210,197,0.4)", marginTop: 2 }}>
                                                    {activeItem.title} of <span style={{ color: "#52796F" }}>{activeItem.company}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <StarRating rating={activeItem.rating || 5} />
                                            <span style={{ fontSize: "14px", fontWeight: 600, color: "#CAD2C5" }}>
                                                {(activeItem.rating || 5).toFixed(1)}
                                            </span>
                                        </div>
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
