"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { PageTransition } from "../ui/PageTransition";
import { ArrowRight } from "lucide-react";

// Simulated terminal data lines for the motif
const terminalLines = [
    { prefix: "SCAN", text: "soc2.controls.access_control", status: "PASS", color: "var(--color-success)" },
    { prefix: "SCAN", text: "soc2.controls.encryption_at_rest", status: "PASS", color: "var(--color-success)" },
    { prefix: "SCAN", text: "soc2.controls.incident_response", status: "WARN", color: "#FBBF24" },
    { prefix: "SCAN", text: "cloud.vpc.security_groups", status: "PASS", color: "var(--color-success)" },
    { prefix: "SCAN", text: "cloud.iam.mfa_enforcement", status: "FAIL", color: "var(--color-danger)" },
    { prefix: "SCAN", text: "soc2.controls.change_management", status: "PASS", color: "var(--color-success)" },
    { prefix: "SCAN", text: "ai.soc.alert_triage_pipeline", status: "ACTIVE", color: "var(--color-accent)" },
    { prefix: "SCAN", text: "cloud.monitoring.log_integrity", status: "PASS", color: "var(--color-success)" },
    { prefix: "SCAN", text: "soc2.controls.vendor_management", status: "PASS", color: "var(--color-success)" },
    { prefix: "SCAN", text: "cloud.backup.disaster_recovery", status: "WARN", color: "#FBBF24" },
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
        <div className="relative w-full max-w-md overflow-hidden rounded border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-danger)] opacity-60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FBBF24] opacity-60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-success)] opacity-60" />
                </div>
                <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-text-muted)] ml-2">
                    defnix-scanner — {currentTime}
                </span>
            </div>

            {/* Terminal body with scan line */}
            <div className="relative p-4 terminal-scan min-h-[260px]">
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
        </div>
    );
}

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center pt-20">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Copy */}
                    <div>
                        <PageTransition>
                            <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-6">
                                Engineering Studio — Security & Cloud
                            </p>
                        </PageTransition>

                        <PageTransition delay={0.1}>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl text-[var(--color-text-primary)] mb-6">
                                We engineer the
                                <br />
                                <span className="text-[var(--color-accent)]">infrastructure</span>
                                <br />
                                others audit.
                            </h1>
                        </PageTransition>

                        <PageTransition delay={0.2}>
                            <p className="text-lg text-[var(--color-text-secondary)] max-w-lg mb-8 leading-relaxed">
                                SOC2 compliance readiness, cloud risk reduction, and AI-driven
                                security operations — engineered for startups that ship fast
                                and sleep well.
                            </p>
                        </PageTransition>

                        <PageTransition delay={0.3}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="primary" size="lg" href="/contact">
                                    Book a Consultation
                                    <ArrowRight size={18} />
                                </Button>
                                <Button variant="outline" size="lg" href="/solutions">
                                    Explore Solutions
                                </Button>
                            </div>
                        </PageTransition>
                    </div>

                    {/* Right — Terminal Motif */}
                    <PageTransition delay={0.4} className="hidden lg:flex justify-end">
                        <TerminalMotif />
                    </PageTransition>
                </div>
            </div>
        </section>
    );
}
