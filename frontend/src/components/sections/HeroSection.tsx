"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { ParticleGrid } from "../ui/ParticleGrid";
import { Marquee } from "../ui/Marquee";
import { TextReveal } from "../ui/TextReveal";

// Terminal data lines
const terminalLines = [
    { prefix: "SCAN", text: "soc2.controls.access_control", status: "PASS", color: "var(--color-success)" },
    { prefix: "SCAN", text: "soc2.controls.encryption_at_rest", status: "PASS", color: "var(--color-success)" },
    { prefix: "SCAN", text: "soc2.controls.incident_response", status: "WARN", color: "#FBBF24" },
    { prefix: "SCAN", text: "cloud.vpc.security_groups", status: "PASS", color: "var(--color-success)" },
    { prefix: "SCAN", text: "cloud.iam.mfa_enforcement", status: "FAIL", color: "var(--color-danger)" },
    { prefix: "BUILD", text: "web.nextjs.cafe_website", status: "DEPLOY", color: "var(--color-accent)" },
    { prefix: "BUILD", text: "mobile.react_native.booking_app", status: "LIVE", color: "var(--color-success)" },
    { prefix: "AUTO", text: "n8n.workflow.lead_pipeline", status: "ACTIVE", color: "var(--color-accent)" },
    { prefix: "SCAN", text: "soc2.controls.vendor_management", status: "PASS", color: "var(--color-success)" },
    { prefix: "BUILD", text: "web.seo.local_search_config", status: "DONE", color: "var(--color-success)" },
];

const marqueeKeywords = [
    "Security", "Cloud", "AI", "Web Development", "Mobile Apps", "Automation",
    "SOC2", "n8n", "React Native", "Next.js", "GSAP", "Compliance",
];

function TerminalMotif() {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState("");

    const updateTime = useCallback(() => {
        setCurrentTime(new Date().toISOString().slice(11, 19));
    }, []);

    useEffect(() => {
        const initTimer = setTimeout(() => {
            updateTime();
        }, 0);
        const timer = setInterval(updateTime, 1000);
        return () => {
            clearTimeout(initTimer);
            clearInterval(timer);
        };
    }, [updateTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleLines((prev) => {
                if (prev >= terminalLines.length) return 0;
                return prev + 1;
            });
        }, 600);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative w-full max-w-md overflow-hidden rounded-xl glass-card"
        >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgba(0,212,255,0.1)] bg-[rgba(10,15,28,0.8)]">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-danger)] opacity-60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] opacity-60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-success)] opacity-60" />
                </div>
                <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-text-muted)] ml-2">
                    defnix-engine — {currentTime}
                </span>
            </div>

            {/* Terminal body */}
            <div className="relative p-4 terminal-scan min-h-[280px]">
                <div className="space-y-1.5">
                    {terminalLines.slice(0, visibleLines).map((line, i) => (
                        <motion.div
                            key={`${line.text}-${i}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 font-[var(--font-mono)] text-[11px]"
                        >
                            <span className="text-[var(--color-text-muted)]">[{line.prefix}]</span>
                            <span className="text-[var(--color-text-secondary)] flex-1 truncate">
                                {line.text}
                            </span>
                            <span
                                className="font-semibold text-[10px] px-1.5 py-0.5 rounded"
                                style={{
                                    color: line.color,
                                    backgroundColor: `color-mix(in srgb, ${line.color} 15%, transparent)`,
                                }}
                            >
                                {line.status}
                            </span>
                        </motion.div>
                    ))}
                    {/* Blinking cursor */}
                    <div className="flex items-center gap-1 mt-2">
                        <span className="text-[var(--color-accent)] font-[var(--font-mono)] text-[11px]">
                            $
                        </span>
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-2 h-4 bg-[var(--color-accent)]"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function HeroSection() {
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Animated gradient blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="hero-blob hero-blob-1" />
                <div className="hero-blob hero-blob-2" />
                <div className="hero-blob hero-blob-3" />
            </div>

            {/* Particle grid canvas */}
            <div className="absolute inset-0">
                <ParticleGrid />
            </div>

            {/* Radial gradient overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-bg-primary)_70%)] pointer-events-none" />

            {/* Main content */}
            <motion.div
                style={{ y: heroY, opacity: heroOpacity }}
                className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Copy */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-6"
                        >
                            Engineering Studio — Security · Cloud · Web · Mobile · AI
                        </motion.p>

                        <TextReveal
                            as="h1"
                            className="text-5xl sm:text-6xl lg:text-7xl text-[var(--color-text-primary)] mb-6"
                            stagger={0.06}
                        >
                            We engineer what others outsource.
                        </TextReveal>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-lg text-[var(--color-text-secondary)] max-w-lg mb-8 leading-relaxed"
                        >
                            From SOC2 compliance to mobile apps to business automation —
                            we build the systems that help startups and small businesses
                            operate smarter and grow faster.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button variant="primary" size="lg" href="/contact">
                                Book a Consultation
                                <ArrowRight size={18} />
                            </Button>
                            <Button variant="outline" size="lg" href="/solutions">
                                Explore Solutions
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right — Terminal Motif */}
                    <div className="hidden lg:flex justify-end">
                        <TerminalMotif />
                    </div>
                </div>
            </motion.div>

            {/* Infinite scrolling marquee at bottom of hero */}
            <div className="relative z-10 mt-auto pb-8 pt-20">
                <div className="gradient-divider mb-8" />
                <Marquee speed={35} className="opacity-40">
                    {marqueeKeywords.map((keyword) => (
                        <span
                            key={keyword}
                            className="font-[var(--font-display)] text-sm tracking-[0.15em] uppercase text-[var(--color-text-muted)] mx-8 whitespace-nowrap"
                        >
                            {keyword}
                            <span className="mx-8 text-[var(--color-accent)] opacity-50">✦</span>
                        </span>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
