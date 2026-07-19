"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion, useInView, animate } from "framer-motion";
import { getStat } from "@/lib/stats-data";

const satisfactionStat = getStat("satisfaction");
const projectsStat = getStat("projects");
const deliveryStat = getStat("delivery-time");
const countriesStat = getStat("countries");

/* ── Animated Number — driven by framer-motion's animate(),
   a single shared timeline engine instead of one hand-rolled
   requestAnimationFrame loop per instance ───────────────── */
const AnimatedNumber = memo(function AnimatedNumber({
    value,
    suffix,
    prefix = "",
    color,
    animate: shouldAnimate,
}: {
    value: number;
    suffix: string;
    prefix?: string;
    color: string;
    animate: boolean;
}) {
    const [displayed, setDisplayed] = useState(0);

    useEffect(() => {
        if (!shouldAnimate) return;
        const controls = animate(0, value, {
            duration: 1.6,
            ease: [0.33, 1, 0.68, 1],
            onUpdate: (latest) => setDisplayed(Math.round(latest)),
        });
        return () => controls.stop();
    }, [shouldAnimate, value]);

    return (
        <span style={{
            fontFamily: "var(--font-headline)",
            color,
            transition: "color 0.3s ease",
        }}>
            {prefix}{displayed}{suffix}
        </span>
    );
});

function AbstractAvatars() {
    const colors = [
        "linear-gradient(135deg, var(--color-sage), var(--color-pine))",
        "linear-gradient(135deg, var(--color-pine), var(--color-surface))",
        "linear-gradient(135deg, var(--color-mist), var(--color-sage))",
    ];
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {colors.map((bg, i) => (
                <div key={i} style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: bg,
                    border: "3px solid var(--color-glass-deep)",
                    marginLeft: i > 0 ? -14 : 0,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    position: "relative",
                    zIndex: 3 - i,
                }} />
            ))}
        </div>
    );
}

const AnimatedBarChart = memo(function AnimatedBarChart({ animate: shouldAnimate }: { animate: boolean }) {
    const bars = [0.4, 0.6, 0.5, 0.8, 0.7, 1.0];
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 48 }}>
            {bars.map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: shouldAnimate ? h * 48 : 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    style={{
                        width: 14,
                        borderRadius: "6px 6px 0 0",
                        background: "linear-gradient(to top, var(--color-pine), var(--color-sage))",
                        boxShadow: "0 0 8px color-mix(in srgb, var(--color-sage) 30%, transparent)",
                    }}
                />
            ))}
        </div>
    );
});

export function MetricsBar() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-80px" });

    return (
        <section className="section-gap relative" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-6 lg:col-span-1">
                        {/* Top Left Card: Client Satisfaction */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                            className="flex-1 flex flex-col justify-between"
                            style={{
                                borderRadius: "24px",
                                background: "linear-gradient(145deg, var(--color-glass-mid), var(--color-glass-deep))",
                                border: "1px solid var(--color-border)",
                                boxShadow: "inset 2px 2px 8px var(--color-neu-light), 8px 8px 20px #111a20",
                                padding: "32px",
                                position: "relative",
                                overflow: "hidden",
                                minHeight: "220px",
                            }}
                        >
                            <AbstractAvatars />
                            <div className="mt-8">
                                <div style={{ fontSize: "2.8rem", fontWeight: 700, lineHeight: 1.1, textShadow: "0 2px 10px color-mix(in srgb, var(--color-mist) 20%, transparent)" }}>
                                    <AnimatedNumber value={satisfactionStat.value} suffix={satisfactionStat.suffix} color="var(--color-mist)" animate={isInView} />
                                </div>
                                <p style={{ fontSize: "13.5px", color: "color-mix(in srgb, var(--color-mist) 50%, transparent)", marginTop: 6, fontWeight: 500 }}>
                                    across all engagements
                                </p>
                            </div>
                        </motion.div>

                        {/* Bottom Left Card: Projects Shipped */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex-1 flex flex-col justify-between"
                            style={{
                                borderRadius: "24px",
                                background: "linear-gradient(145deg, color-mix(in srgb, var(--color-pine) 16%, var(--color-glass-mid)), var(--color-glass-deep))",
                                border: "1px solid color-mix(in srgb, var(--color-pine) 25%, var(--color-border))",
                                boxShadow: "inset 2px 2px 8px var(--color-neu-light), 8px 8px 20px #111a20",
                                padding: "32px",
                                position: "relative",
                                overflow: "hidden",
                                minHeight: "220px",
                            }}
                        >
                            <div>
                                <div style={{ fontSize: "2.4rem", fontWeight: 700, lineHeight: 1, textShadow: "0 2px 10px color-mix(in srgb, var(--color-sage) 20%, transparent)" }}>
                                    <AnimatedNumber value={projectsStat.value} suffix={projectsStat.suffix} color="var(--color-sage)" animate={isInView} />
                                </div>
                                <p style={{ fontSize: "13.5px", color: "color-mix(in srgb, var(--color-mist) 50%, transparent)", marginTop: 6, fontWeight: 500 }}>
                                    projects shipped, on time
                                </p>
                            </div>
                            <AnimatedBarChart animate={isInView} />
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Large Showcase Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 relative"
                        style={{
                            borderRadius: "24px",
                            background: "linear-gradient(145deg, var(--color-glass-deep), var(--color-glass-mid))",
                            border: "1px solid var(--color-border)",
                            boxShadow: "inset 2px 2px 8px var(--color-neu-light), 8px 8px 24px #111a20",
                            padding: "32px",
                            overflow: "hidden",
                            minHeight: "460px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {/* 3D Abstract Background Art */}
                        <div style={{ position: "absolute", inset: -100, pointerEvents: "none", zIndex: 0 }}>
                            <svg viewBox="0 0 800 600" style={{ width: "100%", height: "100%" }}>
                                <defs>
                                    <filter id="shadow-1" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="25" stdDeviation="20" floodColor="#0d1519" floodOpacity="0.8" />
                                    </filter>
                                    <filter id="shadow-2" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="30" stdDeviation="25" floodColor="#0a1013" floodOpacity="0.9" />
                                    </filter>
                                    
                                    <linearGradient id="grad-bottom" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="var(--color-surface)" />
                                        <stop offset="100%" stopColor="var(--color-glass-deep)" />
                                    </linearGradient>
                                    
                                    <linearGradient id="grad-mid" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="var(--color-pine)" />
                                        <stop offset="100%" stopColor="var(--color-secondary)" />
                                    </linearGradient>

                                    <linearGradient id="grad-top" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="var(--color-mist)" />
                                        <stop offset="100%" stopColor="var(--color-sage)" />
                                    </linearGradient>
                                </defs>

                                {/* Bottom Disc */}
                                <motion.g
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ellipse cx="400" cy="450" rx="320" ry="130" fill="url(#grad-bottom)" filter="url(#shadow-2)" transform="rotate(-10 400 450)" />
                                    {/* Disc edge highlight */}
                                    <ellipse cx="400" cy="448" rx="320" ry="130" fill="none" stroke="color-mix(in srgb, var(--color-mist) 10%, transparent)" strokeWidth="3" transform="rotate(-10 400 450)" />
                                </motion.g>

                                {/* Middle Disc */}
                                <motion.g
                                    animate={{ y: [5, -5, 5] }}
                                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                >
                                    <ellipse cx="380" cy="320" rx="280" ry="110" fill="url(#grad-mid)" filter="url(#shadow-1)" transform="rotate(-5 380 320)" />
                                    <ellipse cx="380" cy="318" rx="280" ry="110" fill="none" stroke="color-mix(in srgb, var(--color-mist) 20%, transparent)" strokeWidth="3" transform="rotate(-5 380 320)" />
                                </motion.g>

                                {/* Top Disc */}
                                <motion.g
                                    animate={{ y: [-8, 8, -8] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                >
                                    <ellipse cx="430" cy="180" rx="250" ry="100" fill="url(#grad-top)" filter="url(#shadow-1)" transform="rotate(5 430 180)" />
                                    <ellipse cx="430" cy="178" rx="250" ry="100" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" transform="rotate(5 430 180)" />
                                </motion.g>
                            </svg>
                        </div>

                        {/* Floating Cards overlay container */}
                        <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between items-end z-10 pointer-events-none">
                            
                            {/* Top Right Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                style={{
                                    background: "color-mix(in srgb, var(--color-glass-deep) 65%, transparent)",
                                    backdropFilter: "blur(12px)",
                                    WebkitBackdropFilter: "blur(12px)",
                                    border: "1px solid color-mix(in srgb, var(--color-mist) 15%, transparent)",
                                    borderRadius: "20px",
                                    padding: "24px 32px",
                                    boxShadow: "0 12px 32px rgba(0,0,0,0.3)",
                                    pointerEvents: "auto",
                                }}
                            >
                                <div style={{ fontSize: "2.4rem", fontWeight: 700, lineHeight: 1, color: "var(--color-mist)" }}>
                                    <AnimatedNumber value={deliveryStat.value} suffix={deliveryStat.suffix} color="var(--color-mist)" animate={isInView} />
                                </div>
                                <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", fontWeight: 500, marginTop: 6 }}>
                                    average delivery — 30% faster than typical agency timelines
                                </p>
                            </motion.div>

                            {/* Bottom Right Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                style={{
                                    background: "linear-gradient(145deg, color-mix(in srgb, var(--color-pine) 65%, var(--color-glass-deep)), color-mix(in srgb, var(--color-pine) 25%, var(--color-glass-deep)))",
                                    backdropFilter: "blur(16px)",
                                    WebkitBackdropFilter: "blur(16px)",
                                    border: "1px solid color-mix(in srgb, var(--color-pine) 60%, transparent)",
                                    borderRadius: "20px",
                                    padding: "24px 32px",
                                    boxShadow: "0 12px 32px rgba(0,0,0,0.4), 0 0 30px color-mix(in srgb, var(--color-pine) 20%, transparent)",
                                    pointerEvents: "auto",
                                    width: "100%",
                                    maxWidth: "340px",
                                }}
                            >
                                <div style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1, color: "var(--color-mist)" }}>
                                    <AnimatedNumber value={countriesStat.value} suffix={countriesStat.suffix} color="var(--color-mist)" animate={isInView} />
                                </div>
                                <p style={{ fontSize: "13.5px", color: "color-mix(in srgb, var(--color-mist) 85%, transparent)", fontWeight: 500, marginTop: 6 }}>
                                    countries served globally
                                </p>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
