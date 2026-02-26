"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { PageTransition } from "../ui/PageTransition";

interface Metric {
    value: number;
    suffix: string;
    label: string;
}

const metrics: Metric[] = [
    { value: 98, suffix: "%", label: "SOC2 Pass Rate" },
    { value: 73, suffix: "%", label: "First-Audit Failure Prevention" },
    { value: 4.45, suffix: "M", label: "Avg. Breach Cost Mitigated" },
    { value: 45, suffix: "%", label: "SOC Alert Noise Reduced" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
    const [current, setCurrent] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        const duration = 1500;
        const startTime = Date.now();
        const isDecimal = value % 1 !== 0;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const next = eased * value;
            setCurrent(isDecimal ? parseFloat(next.toFixed(2)) : Math.floor(next));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value]);

    return (
        <span ref={ref} className="font-[var(--font-mono)] text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)]">
            {value % 1 !== 0 ? `$${current}` : current}
            <span className="text-[var(--color-accent)]">{suffix}</span>
        </span>
    );
}

export function MetricsBar() {
    return (
        <section className="relative border-y border-[var(--color-border)] bg-[var(--color-bg-surface)]">
            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
                <PageTransition>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                        {metrics.map((metric) => (
                            <div key={metric.label} className="text-center">
                                <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                                <p className="mt-2 text-xs text-[var(--color-text-muted)] font-[var(--font-heading)] uppercase tracking-wider">
                                    {metric.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </PageTransition>
            </div>
        </section>
    );
}
