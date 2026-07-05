"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ── Animated Number ─────────────────────────────── */
function AnimatedNumber({
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
        let start: number | null = null;
        const duration = 1600;
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const t = Math.min(elapsed / duration, 1);
            setDisplayed(Math.round(ease(t) * value));
            if (t < 1) requestAnimationFrame(step);
        };
        const frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
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
}

function Pill({ text, color = "#84A98C" }: { text: string; color?: string }) {
    return (
        <div style={{
            background: "rgba(132,169,140, 0.15)",
            border: "1px solid rgba(132,169,140, 0.3)",
            borderRadius: "999px",
            padding: "4px 10px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <span style={{ color, fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em" }}>
                {text}
            </span>
        </div>
    );
}

function AbstractAvatars() {
    const colors = [
        "linear-gradient(135deg, #84A98C, #52796F)",
        "linear-gradient(135deg, #52796F, #2F3E46)",
        "linear-gradient(135deg, #CAD2C5, #84A98C)",
    ];
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {colors.map((bg, i) => (
                <div key={i} style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: bg,
                    border: "3px solid #18262E",
                    marginLeft: i > 0 ? -14 : 0,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    position: "relative",
                    zIndex: 3 - i,
                }} />
            ))}
        </div>
    );
}

function AnimatedBarChart({ animate }: { animate: boolean }) {
    const bars = [0.4, 0.6, 0.5, 0.8, 0.7, 1.0];
    return (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 48 }}>
            {bars.map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: animate ? h * 48 : 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                    style={{
                        width: 14,
                        borderRadius: "6px 6px 0 0",
                        background: "linear-gradient(to top, #52796F, #84A98C)",
                        boxShadow: "0 0 8px rgba(132,169,140,0.3)",
                    }}
                />
            ))}
        </div>
    );
}

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
                                background: "linear-gradient(145deg, #2d4449, #18262E)",
                                border: "1px solid rgba(82,121,111,0.2)",
                                boxShadow: "inset 2px 2px 8px #3f5461, 8px 8px 20px #111a20",
                                padding: "32px",
                                position: "relative",
                                overflow: "hidden",
                                minHeight: "220px",
                            }}
                        >
                            <AbstractAvatars />
                            <div className="mt-8">
                                <div style={{ fontSize: "2.8rem", fontWeight: 700, lineHeight: 1.1, textShadow: "0 2px 10px rgba(202,210,197,0.2)" }}>
                                    <AnimatedNumber value={100} suffix="%" color="#CAD2C5" animate={isInView} />
                                </div>
                                <p style={{ fontSize: "13.5px", color: "rgba(202,210,197,0.5)", marginTop: 6, fontWeight: 500 }}>
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
                                background: "linear-gradient(145deg, #2d4449, #18262E)",
                                border: "1px solid rgba(82,121,111,0.2)",
                                boxShadow: "inset 2px 2px 8px #3f5461, 8px 8px 20px #111a20",
                                padding: "32px",
                                position: "relative",
                                overflow: "hidden",
                                minHeight: "220px",
                            }}
                        >
                            <p style={{ fontSize: "13.5px", color: "rgba(202,210,197,0.5)", fontWeight: 500, marginBottom: 8 }}>
                                Projects Shipped
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                                <div style={{ fontSize: "2.4rem", fontWeight: 700, lineHeight: 1, textShadow: "0 2px 10px rgba(132,169,140,0.2)" }}>
                                    <AnimatedNumber value={15} suffix="+" color="#84A98C" animate={isInView} />
                                </div>
                                <Pill text="on time" color="#84A98C" />
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
                            background: "linear-gradient(145deg, #18262E, #2d4449)",
                            border: "1px solid rgba(82,121,111,0.2)",
                            boxShadow: "inset 2px 2px 8px #3f5461, 8px 8px 24px #111a20",
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
                                        <stop offset="0%" stopColor="#2F3E46" />
                                        <stop offset="100%" stopColor="#18262E" />
                                    </linearGradient>
                                    
                                    <linearGradient id="grad-mid" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#52796F" />
                                        <stop offset="100%" stopColor="#354F52" />
                                    </linearGradient>

                                    <linearGradient id="grad-top" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#CAD2C5" />
                                        <stop offset="100%" stopColor="#84A98C" />
                                    </linearGradient>
                                </defs>

                                {/* Bottom Disc */}
                                <motion.g
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ellipse cx="400" cy="450" rx="320" ry="130" fill="url(#grad-bottom)" filter="url(#shadow-2)" transform="rotate(-10 400 450)" />
                                    {/* Disc edge highlight */}
                                    <ellipse cx="400" cy="448" rx="320" ry="130" fill="none" stroke="rgba(202,210,197,0.1)" strokeWidth="3" transform="rotate(-10 400 450)" />
                                </motion.g>

                                {/* Middle Disc */}
                                <motion.g
                                    animate={{ y: [5, -5, 5] }}
                                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                >
                                    <ellipse cx="380" cy="320" rx="280" ry="110" fill="url(#grad-mid)" filter="url(#shadow-1)" transform="rotate(-5 380 320)" />
                                    <ellipse cx="380" cy="318" rx="280" ry="110" fill="none" stroke="rgba(202,210,197,0.2)" strokeWidth="3" transform="rotate(-5 380 320)" />
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
                                    background: "rgba(24, 38, 46, 0.65)",
                                    backdropFilter: "blur(12px)",
                                    WebkitBackdropFilter: "blur(12px)",
                                    border: "1px solid rgba(202,210,197,0.15)",
                                    borderRadius: "20px",
                                    padding: "24px 32px",
                                    boxShadow: "0 12px 32px rgba(0,0,0,0.3)",
                                    pointerEvents: "auto",
                                }}
                            >
                                <p style={{ fontSize: "13.5px", color: "rgba(202,210,197,0.7)", fontWeight: 500, marginBottom: 8 }}>
                                    Avg. Delivery
                                </p>
                                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                    <div style={{ fontSize: "2.4rem", fontWeight: 700, lineHeight: 1, color: "#CAD2C5" }}>
                                        <AnimatedNumber value={2} suffix=" wk" color="#CAD2C5" animate={isInView} />
                                    </div>
                                    <Pill text="30% faster" color="#CAD2C5" />
                                </div>
                            </motion.div>

                            {/* Bottom Right Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                style={{
                                    background: "rgba(24, 38, 46, 0.75)",
                                    backdropFilter: "blur(16px)",
                                    WebkitBackdropFilter: "blur(16px)",
                                    border: "1px solid rgba(202,210,197,0.15)",
                                    borderRadius: "20px",
                                    padding: "24px 32px",
                                    boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                                    pointerEvents: "auto",
                                    width: "100%",
                                    maxWidth: "340px",
                                }}
                            >
                                <p style={{ fontSize: "13.5px", color: "rgba(202,210,197,0.7)", fontWeight: 500, marginBottom: 8 }}>
                                    Countries Served
                                </p>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                    <div style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1, color: "#84A98C" }}>
                                        <AnimatedNumber value={12} suffix="+" color="#84A98C" animate={isInView} />
                                    </div>
                                    <Pill text="Global" color="#84A98C" />
                                </div>
                                
                                {/* Horizontal Progress Bar */}
                                <div style={{ height: 6, background: "rgba(82,121,111,0.2)", borderRadius: 3, overflow: "hidden" }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: isInView ? "85%" : 0 }}
                                        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                                        style={{
                                            height: "100%",
                                            background: "linear-gradient(90deg, #52796F, #84A98C)",
                                            borderRadius: 3,
                                        }}
                                    />
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
