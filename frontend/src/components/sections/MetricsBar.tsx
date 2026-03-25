"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Metric {
    value: number;
    suffix: string;
    label: string;
}

const metrics: Metric[] = [
    { value: 100, suffix: "%", label: "Client Satisfaction" },
    { value: 6, suffix: "", label: "Solutions Offered" },
    { value: 2, suffix: "wk", label: "Avg. Delivery Time" },
    { value: 15, suffix: "+", label: "Projects Delivered" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
    const numberRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView || hasAnimated.current || !numberRef.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
            val: value,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                if (numberRef.current) {
                    numberRef.current.textContent = `${Math.round(obj.val)}${suffix}`;
                }
            },
        });
    }, [isInView, value, suffix]);

    return (
        <div ref={containerRef}>
            <span ref={numberRef} className="font-[var(--font-mono)] text-4xl lg:text-5xl font-bold gradient-text">
                0{suffix}
            </span>
        </div>
    );
}

export function MetricsBar() {
    return (
        <section className="section-gap relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                    className="glass-card rounded-2xl p-10 lg:p-14"
                >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {metrics.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="mb-3">
                                    <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                                </div>
                                <p className="text-sm text-[var(--color-text-muted)] font-[var(--font-mono)] uppercase tracking-wider">
                                    {metric.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
