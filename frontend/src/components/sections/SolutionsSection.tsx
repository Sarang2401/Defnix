"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Shield, Cloud, Brain, Globe, Smartphone, Workflow, ArrowRight, Terminal, Zap, Lock } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

interface Solution {
    icon: typeof Shield;
    title: string;
    subtitle: string;
    impact: string;
    impactValue: string;
    description: string;
    href: string;
    colSpan?: number;
    rowSpan?: number;
    featured?: boolean;
    accentColor?: string;
}

const solutions: Solution[] = [
    {
        icon: Shield,
        title: "SOC2 Failure Prevention",
        subtitle: "Compliance Readiness Engineering",
        impact: "Faster audit readiness",
        impactValue: "3×",
        description: "Control framework design, evidence automation, and audit workflows built into operations.",
        href: "/solutions/soc2-failure-prevention",
        colSpan: 2,
        rowSpan: 1,
        accentColor: "#84A98C",
    },
    {
        icon: Cloud,
        title: "Cloud Insurance",
        subtitle: "Risk Reduction & Incident Readiness",
        impact: "Reduced blast radius",
        impactValue: "90%",
        description: "Architecture hardening, disaster recovery, and monitoring for real resilience.",
        href: "/solutions/cloud-insurance",
        colSpan: 2,
        rowSpan: 1,
        accentColor: "#52796F",
    },
    {
        icon: Brain,
        title: "AI SOC Analyst",
        subtitle: "Security Automation",
        impact: "Faster threat triage",
        impactValue: "10×",
        description: "ML-powered alert triage and automated investigation pipelines.",
        href: "/solutions/ai-soc-analyst",
        colSpan: 2,
        rowSpan: 2,
        featured: true,
        accentColor: "#84A98C",
    },
    {
        icon: Globe,
        title: "Website Development",
        subtitle: "Conversion-First Websites",
        impact: "Better lead flow",
        impactValue: "+40%",
        description: "Performance-first sites built for search ranking and client conversion.",
        href: "/solutions/website-development",
        colSpan: 1,
        rowSpan: 1,
        accentColor: "#CAD2C5",
    },
    {
        icon: Smartphone,
        title: "Mobile Apps",
        subtitle: "Cross-Platform Builds",
        impact: "Faster MVP delivery",
        impactValue: "2wk",
        description: "iOS and Android apps with booking, notifications, and payments.",
        href: "/solutions/mobile-development",
        colSpan: 1,
        rowSpan: 1,
        accentColor: "#84A98C",
    },
    {
        icon: Workflow,
        title: "Business Automation",
        subtitle: "Workflow Engineering",
        impact: "Hours saved weekly",
        impactValue: "20h+",
        description: "Automation for onboarding, operations, and customer lifecycle.",
        href: "/solutions/business-automation",
        colSpan: 2,
        rowSpan: 1,
        accentColor: "#52796F",
    },
];

/* ── Animated terminal for featured AI card ───── */
const terminalLines = [
    { text: "$ alert-triage --input=siem-stream", color: "#84A98C", delay: 0 },
    { text: "> Analyzing 847 events...", color: "#CAD2C5", delay: 0.6 },
    { text: "> [HIGH] Lateral movement detected · Host: ws-14", color: "#84A98C", delay: 1.2 },
    { text: "> [LOW]  Port scan noise · Auto-suppressed", color: "#52796F", delay: 1.8 },
    { text: "> Enriching IOCs via threat intel feeds...", color: "#CAD2C5", delay: 2.4 },
    { text: "> 1 actionable alert / 847 events. 99.9% filtered.", color: "#84A98C", delay: 3.0 },
];

function FeaturedTerminal() {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        terminalLines.forEach((line, i) => {
            setTimeout(() => {
                setVisibleLines((prev) => Math.max(prev, i + 1));
            }, line.delay * 1000 + 600);
        });
        const interval = setInterval(() => {
            setVisibleLines(0);
            terminalLines.forEach((line, i) => {
                setTimeout(() => {
                    setVisibleLines((prev) => Math.max(prev, i + 1));
                }, line.delay * 1000);
            });
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                background: "rgba(30,43,49,0.8)",
                border: "1px solid rgba(82,121,111,0.25)",
                borderRadius: "10px",
                padding: "14px 16px",
                fontFamily: "'Courier New', monospace",
                fontSize: "11px",
                lineHeight: "1.7",
                flex: 1,
                overflow: "hidden",
                boxShadow: "inset 3px 3px 8px rgba(30,43,49,0.8), inset -1px -1px 4px rgba(63,84,97,0.2)",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                {["#52796F", "#84A98C", "#CAD2C5"].map((c) => (
                    <span key={c} style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: c, opacity: 0.7, display: "inline-block" }} />
                ))}
                <span style={{ color: "rgba(202,210,197,0.3)", fontSize: "9px", letterSpacing: "0.1em", marginLeft: 4 }}>ai-triage.sh</span>
            </div>
            {terminalLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: line.color, marginBottom: 2 }}
                >
                    {line.text}
                    {i === visibleLines - 1 && (
                        <span style={{ borderRight: "2px solid #84A98C", marginLeft: 2, animation: "typing-cursor 1s step-end infinite" }} />
                    )}
                </motion.div>
            ))}
        </div>
    );
}

/* ── Tilt card wrapper ─────────────────────────── */
function TiltBentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { stiffness: 150, damping: 20 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={ref}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ── Hex icon badge ────────────────────────────── */
function HexIcon({ Icon, color }: { Icon: typeof Shield; color: string }) {
    return (
        <div
            style={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(47,62,70,0.8)",
                boxShadow: `3px 3px 8px rgba(30,43,49,0.8), -2px -2px 6px rgba(63,84,97,0.4), 0 0 12px ${color}22`,
                border: `1px solid ${color}33`,
                flexShrink: 0,
            }}
        >
            <Icon size={20} color={color} />
        </div>
    );
}

function BentoCard({ solution, index }: { solution: Solution; index: number }) {
    const Icon = solution.icon;
    const [hovered, setHovered] = useState(false);
    const colSpanClass = solution.colSpan === 2 ? "lg:col-span-2" : "lg:col-span-1";
    const rowSpanClass = solution.rowSpan === 2 ? "lg:row-span-2" : "";

    const variants = {
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    if (solution.featured) {
        return (
            <motion.div
                variants={variants}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
                className={`${colSpanClass} ${rowSpanClass}`}
            >
                <TiltBentoCard className="h-full">
                    <Link
                        href={solution.href}
                        className="flex flex-col gap-0 h-full relative overflow-hidden group"
                        style={{
                            background: "linear-gradient(145deg, #354F52 0%, #2F3E46 60%, #354F52 100%)",
                            borderRadius: "20px",
                            border: "1px solid rgba(82,121,111,0.35)",
                            boxShadow: "8px 8px 20px #1e2b31, -4px -4px 12px #3f5461",
                            padding: "28px",
                        }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        {/* Animated top accent border */}
                        <div style={{
                            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                            background: "linear-gradient(90deg, transparent, #84A98C, #52796F, transparent)",
                            opacity: hovered ? 1 : 0.5,
                            transition: "opacity 0.3s ease",
                        }} />

                        {/* Scan line animation */}
                        <div style={{
                            position: "absolute", left: 0, right: 0, height: "1px",
                            background: "linear-gradient(90deg, transparent, rgba(132,169,140,0.5), transparent)",
                            animation: "scan-line 4s linear infinite",
                            pointerEvents: "none",
                        }} />

                        {/* Corner glow */}
                        <div style={{
                            position: "absolute", top: 0, right: 0, width: "120px", height: "120px",
                            background: "radial-gradient(circle at top right, rgba(132,169,140,0.12), transparent 70%)",
                            pointerEvents: "none",
                        }} />

                        <div className="flex items-start justify-between mb-5">
                            <HexIcon Icon={Icon} color="#84A98C" />
                            <div style={{
                                display: "flex", alignItems: "center", gap: 6,
                                background: "rgba(30,43,49,0.6)", borderRadius: "999px",
                                padding: "4px 12px",
                                boxShadow: "inset 2px 2px 5px rgba(30,43,49,0.8), inset -1px -1px 4px rgba(63,84,97,0.3)",
                                border: "1px solid rgba(82,121,111,0.2)",
                            }}>
                                <Zap size={10} color="#84A98C" />
                                <span style={{ fontSize: "10px", color: "#84A98C", letterSpacing: "0.1em", fontWeight: 500 }}>LIVE</span>
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                            <span style={{ fontSize: "2.5rem", fontWeight: 700, color: "#84A98C", lineHeight: 1, fontFamily: "var(--font-headline)" }}>
                                {solution.impactValue}
                            </span>
                            <span style={{ fontSize: "11px", color: "rgba(202,210,197,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                {solution.impact}
                            </span>
                        </div>

                        <h3 style={{ fontSize: "1.35rem", fontWeight: 600, color: "#CAD2C5", marginBottom: 4, fontFamily: "var(--font-headline)" }}>
                            {solution.title}
                        </h3>
                        <p style={{ fontSize: "12px", color: "rgba(202,210,197,0.45)", marginBottom: 16 }}>{solution.subtitle}</p>

                        <FeaturedTerminal />

                        <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            marginTop: 16, paddingTop: 14,
                            borderTop: "1px solid rgba(82,121,111,0.15)",
                        }}>
                            <p style={{ fontSize: "13px", color: "rgba(202,210,197,0.55)", lineHeight: 1.5, maxWidth: "60%" }}>
                                {solution.description}
                            </p>
                            <motion.div
                                animate={{ x: hovered ? 4 : 0 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    display: "flex", alignItems: "center", gap: 6,
                                    color: "#84A98C", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Learn more <ArrowRight size={13} />
                            </motion.div>
                        </div>
                    </Link>
                </TiltBentoCard>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={variants}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            className={`${colSpanClass} ${rowSpanClass}`}
        >
            <TiltBentoCard className="h-full">
                <Link
                    href={solution.href}
                    className="flex flex-col gap-3 p-6 h-full relative overflow-hidden group shimmer-effect"
                    style={{
                        background: "linear-gradient(145deg, #354F52 0%, #2d4449 100%)",
                        borderRadius: "18px",
                        border: "1px solid rgba(82,121,111,0.2)",
                        boxShadow: `6px 6px 16px #1e2b31, -3px -3px 10px #3f5461`,
                        transition: "all 0.35s ease",
                        position: "relative",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `inset 4px 4px 10px #1e2b31, inset -2px -2px 8px #3f5461, 0 0 20px ${solution.accentColor}15`;
                        e.currentTarget.style.borderColor = `${solution.accentColor}40`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "6px 6px 16px #1e2b31, -3px -3px 10px #3f5461";
                        e.currentTarget.style.borderColor = "rgba(82,121,111,0.2)";
                    }}
                >
                    {/* Accent left border strip */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, bottom: 0, width: "3px",
                        background: `linear-gradient(to bottom, ${solution.accentColor}80, transparent)`,
                        borderRadius: "18px 0 0 18px",
                        opacity: 0,
                        transition: "opacity 0.35s ease",
                    }} className="group-hover:opacity-100" />

                    <div className="flex items-center justify-between">
                        <HexIcon Icon={Icon} color={solution.accentColor || "#84A98C"} />
                        {/* Impact metric pill */}
                        <div style={{
                            background: "rgba(30,43,49,0.7)",
                            border: `1px solid ${solution.accentColor}33`,
                            borderRadius: "999px",
                            padding: "3px 10px",
                            boxShadow: "inset 2px 2px 5px rgba(30,43,49,0.8), inset -1px -1px 3px rgba(63,84,97,0.3)",
                        }}>
                            <span style={{ fontSize: "13px", fontWeight: 700, color: solution.accentColor, fontFamily: "var(--font-headline)" }}>
                                {solution.impactValue}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 style={{
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            color: "#CAD2C5",
                            marginBottom: 3,
                            fontFamily: "var(--font-headline)",
                            lineHeight: 1.3,
                        }}>
                            {solution.title}
                        </h3>
                        <p style={{ fontSize: "11px", color: "rgba(202,210,197,0.4)", letterSpacing: "0.03em" }}>{solution.subtitle}</p>
                    </div>

                    <p style={{ fontSize: "13px", color: "rgba(202,210,197,0.55)", lineHeight: 1.6, flex: 1 }}>
                        {solution.description}
                    </p>

                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        paddingTop: 12, borderTop: "1px solid rgba(82,121,111,0.12)",
                        marginTop: "auto",
                    }}>
                        <span style={{ fontSize: "10px", color: "rgba(202,210,197,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            {solution.impact}
                        </span>
                        <div style={{
                            display: "flex", alignItems: "center", gap: 5,
                            color: "#84A98C", fontSize: "11px",
                            transition: "gap 0.2s ease, color 0.2s ease",
                        }}
                            className="group-hover:gap-2"
                        >
                            Learn more <ArrowRight size={11} />
                        </div>
                    </div>
                </Link>
            </TiltBentoCard>
        </motion.div>
    );
}

export function SolutionsSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

    return (
        <section ref={containerRef} className="section-gap relative overflow-clip" id="solutions" style={{ backgroundColor: "var(--color-surface)" }}>
            {/* Split-diagonal background base */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
                {/* Large angled stripe */}
                <div style={{
                    position: "absolute", top: "-20%", right: "-10%", width: "120%", height: "80%",
                    background: "linear-gradient(135deg, rgba(82,121,111,0.05) 0%, transparent 100%)",
                    transform: "rotate(-12deg)",
                }} />
                
                {/* Floating frosted glass panes */}
                <motion.div style={{
                    y: y1,
                    position: "absolute", top: "15%", left: "5%", width: "400px", height: "400px",
                    background: "rgba(132, 169, 140, 0.03)",
                    border: "1px solid rgba(132, 169, 140, 0.1)",
                    borderRadius: "30px",
                    backdropFilter: "blur(40px)",
                    transform: "rotate(15deg)",
                }} />
                
                <motion.div style={{
                    y: y2,
                    position: "absolute", bottom: "10%", right: "10%", width: "500px", height: "300px",
                    background: "rgba(82, 121, 111, 0.03)",
                    border: "1px solid rgba(82, 121, 111, 0.1)",
                    borderRadius: "40px",
                    backdropFilter: "blur(60px)",
                    transform: "rotate(-8deg)",
                }} />
            </div>

            <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div style={{
                            width: 6, height: 6, borderRadius: "50%", backgroundColor: "#52796F",
                            boxShadow: "0 0 8px rgba(82,121,111,0.8)",
                        }} className="animate-pulse-dot" />
                        <p style={{
                            fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
                            color: "#52796F", fontWeight: 500,
                        }}>
                            what we do
                        </p>
                    </div>
                    <h2 style={{
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 600,
                        color: "#CAD2C5",
                        fontFamily: "var(--font-headline)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                        maxWidth: "14ch",
                    }}>
                        six disciplines.{" "}
                        <span style={{ color: "#84A98C" }}>one</span> engineering studio.
                    </h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    style={{ gridAutoRows: "minmax(220px, auto)" }}
                >
                    {solutions.map((solution, index) => (
                        <BentoCard key={solution.title} solution={solution} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}