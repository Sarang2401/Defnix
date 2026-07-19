"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowRight, Zap, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect, memo } from "react";
import { solutionGroups, getSolutionsByGroup, type Solution } from "@/lib/solutions-data";

/* ── Animated terminal for the featured AI card ───── */
const terminalLines = [
    { text: "$ alert-triage --input=siem-stream", color: "var(--color-sage)", delay: 0 },
    { text: "> Analyzing 847 events...", color: "var(--color-mist)", delay: 0.6 },
    { text: "> [HIGH] Lateral movement detected · Host: ws-14", color: "var(--color-sage)", delay: 1.2 },
    { text: "> [LOW]  Port scan noise · Auto-suppressed", color: "var(--color-pine)", delay: 1.8 },
    { text: "> Enriching IOCs via threat intel feeds...", color: "var(--color-mist)", delay: 2.4 },
    { text: "> 1 actionable alert / 847 events. 99.9% filtered.", color: "var(--color-sage)", delay: 3.0 },
];

function FeaturedTerminal() {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        const timeoutIds: ReturnType<typeof setTimeout>[] = [];
        const scheduleCycle = () => {
            terminalLines.forEach((line, i) => {
                timeoutIds.push(
                    setTimeout(() => {
                        setVisibleLines((prev) => Math.max(prev, i + 1));
                    }, line.delay * 1000 + 600)
                );
            });
        };
        scheduleCycle();
        const interval = setInterval(() => {
            setVisibleLines(0);
            terminalLines.forEach((line, i) => {
                timeoutIds.push(
                    setTimeout(() => {
                        setVisibleLines((prev) => Math.max(prev, i + 1));
                    }, line.delay * 1000)
                );
            });
        }, 8000);
        return () => {
            clearInterval(interval);
            timeoutIds.forEach((id) => clearTimeout(id));
        };
    }, []);

    return (
        <div
            style={{
                background: "color-mix(in srgb, var(--color-neu-dark) 80%, transparent)",
                border: "1px solid color-mix(in srgb, var(--color-pine) 25%, transparent)",
                borderRadius: "10px",
                padding: "14px 16px",
                fontFamily: "'Courier New', monospace",
                fontSize: "11px",
                lineHeight: "1.7",
                flex: 1,
                overflow: "hidden",
                boxShadow: "inset 3px 3px 8px color-mix(in srgb, var(--color-neu-dark) 80%, transparent), inset -1px -1px 4px color-mix(in srgb, var(--color-neu-light) 20%, transparent)",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                {["var(--color-pine)", "var(--color-sage)", "var(--color-mist)"].map((c) => (
                    <span key={c} style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: c, opacity: 0.7, display: "inline-block" }} />
                ))}
                <span style={{ color: "color-mix(in srgb, var(--color-mist) 30%, transparent)", fontSize: "9px", letterSpacing: "0.1em", marginLeft: 4 }}>ai-triage.sh</span>
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
                        <span style={{ borderRight: "2px solid var(--color-sage)", marginLeft: 2, animation: "typing-cursor 1s step-end infinite" }} />
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
const HexIcon = memo(function HexIcon({ Icon, color }: { Icon: LucideIcon; color: string }) {
    return (
        <div
            style={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "color-mix(in srgb, var(--color-surface) 80%, transparent)",
                boxShadow: `3px 3px 8px color-mix(in srgb, var(--color-neu-dark) 80%, transparent), -2px -2px 6px color-mix(in srgb, var(--color-neu-light) 40%, transparent), 0 0 12px color-mix(in srgb, ${color} 13%, transparent)`,
                border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
                flexShrink: 0,
            }}
        >
            <Icon size={20} color={color} />
        </div>
    );
});

/* ── Featured card (AI group) ──────────────────── */
function FeaturedCard({ solution }: { solution: Solution }) {
    const Icon = solution.icon;
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
        >
            <TiltBentoCard className="h-full">
                <Link
                    href={solution.href}
                    className="flex flex-col gap-0 h-full relative overflow-hidden group"
                    style={{
                        background: "linear-gradient(145deg, var(--color-secondary) 0%, var(--color-surface) 60%, var(--color-secondary) 100%)",
                        borderRadius: "20px",
                        border: "1px solid color-mix(in srgb, var(--color-pine) 35%, transparent)",
                        boxShadow: "8px 8px 20px var(--color-neu-dark), -4px -4px 12px var(--color-neu-light)",
                        padding: "28px",
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                        background: "linear-gradient(90deg, transparent, var(--color-sage), var(--color-pine), transparent)",
                        opacity: hovered ? 1 : 0.5,
                        transition: "opacity 0.3s ease",
                    }} />
                    <div style={{
                        position: "absolute", left: 0, right: 0, height: "1px",
                        background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-sage) 50%, transparent), transparent)",
                        animation: "scan-line 4s linear infinite",
                        pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", top: 0, right: 0, width: "120px", height: "120px",
                        background: "radial-gradient(circle at top right, color-mix(in srgb, var(--color-sage) 12%, transparent), transparent 70%)",
                        pointerEvents: "none",
                    }} />

                    <div className="flex items-start justify-between mb-5">
                        <HexIcon Icon={Icon} color="var(--color-sage)" />
                        <div style={{
                            display: "flex", alignItems: "center", gap: 6,
                            background: "color-mix(in srgb, var(--color-neu-dark) 60%, transparent)", borderRadius: "999px",
                            padding: "4px 12px",
                            boxShadow: "inset 2px 2px 5px color-mix(in srgb, var(--color-neu-dark) 80%, transparent), inset -1px -1px 4px color-mix(in srgb, var(--color-neu-light) 30%, transparent)",
                            border: "1px solid var(--color-border)",
                        }}>
                            <Zap size={10} color="var(--color-sage)" />
                            <span style={{ fontSize: "10px", color: "var(--color-sage)", letterSpacing: "0.1em", fontWeight: 500 }}>LIVE</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                                <span style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--color-sage)", lineHeight: 1, fontFamily: "var(--font-headline)" }}>
                                    {solution.metric}
                                </span>
                                <span style={{ fontSize: "11px", color: "color-mix(in srgb, var(--color-mist) 50%, transparent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                    {solution.metricLabel}
                                </span>
                            </div>

                            <h3 style={{ fontSize: "1.6rem", fontWeight: 600, color: "var(--color-mist)", marginBottom: 6, fontFamily: "var(--font-headline)" }}>
                                {solution.title}
                            </h3>
                            <p style={{ fontSize: "13px", color: "color-mix(in srgb, var(--color-mist) 50%, transparent)", marginBottom: 16 }}>{solution.subtitle}</p>
                            <p style={{ fontSize: "13.5px", color: "color-mix(in srgb, var(--color-mist) 60%, transparent)", lineHeight: 1.6 }}>
                                {solution.description}
                            </p>
                        </div>
                        <FeaturedTerminal />
                    </div>

                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "flex-end",
                        marginTop: 20, paddingTop: 14,
                        borderTop: "1px solid color-mix(in srgb, var(--color-pine) 15%, transparent)",
                    }}>
                        <motion.div
                            animate={{ x: hovered ? 4 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                display: "flex", alignItems: "center", gap: 6,
                                color: "var(--color-sage)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em",
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

/* ── Standard card (Security + Engineering groups) ── */
function SolutionCard({ solution, index }: { solution: Solution; index: number }) {
    const Icon = solution.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="h-full"
        >
            <TiltBentoCard className="h-full">
                <Link
                    href={solution.href}
                    className="solution-card flex flex-col gap-3 p-6 h-full relative overflow-hidden group shimmer-effect"
                    style={{
                        background: "linear-gradient(145deg, var(--color-secondary) 0%, var(--color-glass-mid) 100%)",
                        borderRadius: "18px",
                        border: "1px solid var(--color-border)",
                        boxShadow: "6px 6px 16px var(--color-neu-dark), -3px -3px 10px var(--color-neu-light)",
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ["--accent" as any]: solution.accentColor,
                    }}
                >
                    <div style={{
                        position: "absolute", top: 0, left: 0, bottom: 0, width: "3px",
                        background: `linear-gradient(to bottom, ${solution.accentColor}, transparent)`,
                        borderRadius: "18px 0 0 18px",
                        opacity: 0,
                        transition: "opacity 0.35s ease",
                    }} className="group-hover:opacity-100" />

                    <div className="flex items-center justify-between">
                        <HexIcon Icon={Icon} color={solution.accentColor} />
                        <div style={{
                            background: "color-mix(in srgb, var(--color-neu-dark) 70%, transparent)",
                            border: `1px solid color-mix(in srgb, ${solution.accentColor} 30%, transparent)`,
                            borderRadius: "999px",
                            padding: "3px 10px",
                            boxShadow: "inset 2px 2px 5px color-mix(in srgb, var(--color-neu-dark) 80%, transparent), inset -1px -1px 3px color-mix(in srgb, var(--color-neu-light) 30%, transparent)",
                        }}>
                            <span style={{ fontSize: "13px", fontWeight: 700, color: solution.accentColor, fontFamily: "var(--font-headline)" }}>
                                {solution.metric}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 style={{
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            color: "var(--color-mist)",
                            marginBottom: 3,
                            fontFamily: "var(--font-headline)",
                            lineHeight: 1.3,
                        }}>
                            {solution.title}
                        </h3>
                        <p style={{ fontSize: "11px", color: "color-mix(in srgb, var(--color-mist) 40%, transparent)", letterSpacing: "0.03em" }}>{solution.subtitle}</p>
                    </div>

                    <p style={{ fontSize: "13px", color: "color-mix(in srgb, var(--color-mist) 55%, transparent)", lineHeight: 1.6, flex: 1 }}>
                        {solution.description}
                    </p>

                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        paddingTop: 12, borderTop: "1px solid color-mix(in srgb, var(--color-pine) 12%, transparent)",
                        marginTop: "auto",
                    }}>
                        <span style={{ fontSize: "10px", color: "color-mix(in srgb, var(--color-mist) 35%, transparent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            {solution.metricLabel}
                        </span>
                        <div style={{
                            display: "flex", alignItems: "center", gap: 5,
                            color: solution.accentColor, fontSize: "11px",
                            transition: "gap 0.2s ease",
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

/* ── One group section (eyebrow + heading + card grid) ── */
function SolutionGroupBlock({ groupId, gridClass }: { groupId: "security" | "ai" | "engineering"; gridClass: string }) {
    const meta = solutionGroups.find((g) => g.id === groupId)!;
    const items = getSolutionsByGroup(groupId);

    return (
        <div className="mb-16 last:mb-0">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="mb-6"
            >
                <p className="eyebrow" style={{ marginBottom: 10 }}>
                    {meta.eyebrow}
                </p>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 style={{
                        fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                        fontWeight: 600,
                        color: "var(--color-mist)",
                        fontFamily: "var(--font-headline)",
                        letterSpacing: "-0.01em",
                    }}>
                        {meta.label}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--color-text-muted)", maxWidth: "48ch" }}>
                        {meta.description}
                    </p>
                </div>
            </motion.div>

            {groupId === "ai" ? (
                <FeaturedCard solution={items[0]} />
            ) : (
                <div className={gridClass}>
                    {items.map((solution, index) => (
                        <SolutionCard key={solution.slug} solution={solution} index={index} />
                    ))}
                </div>
            )}
        </div>
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
                <div style={{
                    position: "absolute", top: "-20%", right: "-10%", width: "120%", height: "80%",
                    background: "linear-gradient(135deg, color-mix(in srgb, var(--color-pine) 5%, transparent) 0%, transparent 100%)",
                    transform: "rotate(-12deg)",
                }} />

                <motion.div style={{
                    y: y1,
                    position: "absolute", top: "15%", left: "5%", width: "400px", height: "400px",
                    background: "color-mix(in srgb, var(--color-sage) 3%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--color-sage) 10%, transparent)",
                    borderRadius: "30px",
                    backdropFilter: "blur(40px)",
                    transform: "rotate(15deg)",
                }} />

                <motion.div style={{
                    y: y2,
                    position: "absolute", bottom: "10%", right: "10%", width: "500px", height: "300px",
                    background: "color-mix(in srgb, var(--color-pine) 3%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--color-pine) 10%, transparent)",
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
                    className="mb-16"
                >
                    <p className="eyebrow" style={{ marginBottom: 16 }}>
                        what we do
                    </p>
                    <h2 style={{
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 600,
                        color: "var(--color-mist)",
                        fontFamily: "var(--font-headline)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                        maxWidth: "22ch",
                    }}>
                        three disciplines.{" "}
                        <span className="text-gradient-sage">one</span> engineering studio.
                    </h2>
                </motion.div>

                {/* Security + AI operations — the security-engineering side */}
                <SolutionGroupBlock groupId="security" gridClass="grid grid-cols-1 md:grid-cols-2 gap-4" />
                <SolutionGroupBlock groupId="ai" gridClass="" />

                {/* Divider marks the shift from security/SecOps to product engineering */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "8px 0 40px" }}>
                    <hr className="divider-gradient flex-1" />
                    <span className="type-label" style={{ color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
                        apps &amp; development
                    </span>
                    <hr className="divider-gradient flex-1" />
                </div>

                {/* Websites, mobile, and automation — the product-engineering side */}
                <SolutionGroupBlock groupId="engineering" gridClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />
            </div>
        </section>
    );
}
