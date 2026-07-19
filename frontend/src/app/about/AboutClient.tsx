"use client";

import Link from "next/link";
import { ArrowRight, Settings, Target, Shield, Lightbulb } from "lucide-react";

type Value = {
    title: string;
    description: string;
    iconName: string;
};

const iconMap: Record<string, React.ElementType> = {
    Settings, Target, Shield, Lightbulb
};

/* Rotating 3-token accent so the 4 value cards don't all lean on
   sage the way a single hardcoded accent-per-card used to. */
const accentRotation = ["var(--color-sage)", "var(--color-pine)", "var(--color-mist)"];

export function ValueCard({ value, index }: { value: Value; index: number }) {
    const IconComponent = iconMap[value.iconName] || Settings;
    const accent = accentRotation[index % accentRotation.length];

    return (
        <div
            className="neu-sol-card"
            style={{
                borderRadius: "20px", padding: "28px", height: "100%",
                position: "relative", overflow: "hidden",
                background: "linear-gradient(145deg, var(--color-secondary), var(--color-glass-mid))",
                border: "1px solid var(--color-border)",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ["--accent" as any]: accent,
            }}
        >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, color-mix(in srgb, ${accent} 60%, transparent), transparent)`, borderRadius: "20px 20px 0 0" }} />

            {/* Oversized ghost numeral — editorial index device */}
            <span style={{
                position: "absolute", top: 8, right: 20,
                fontFamily: "var(--font-headline)", fontSize: "3.5rem", fontWeight: 700,
                color: "color-mix(in srgb, var(--color-mist) 6%, transparent)",
                lineHeight: 1, userSelect: "none",
            }}>
                {String(index + 1).padStart(2, "0")}
            </span>

            <div style={{
                width: 48, height: 48, borderRadius: "14px",
                background: "linear-gradient(145deg, var(--color-glass-deep), var(--color-secondary))",
                border: `1px solid color-mix(in srgb, ${accent} 30%, transparent)`,
                boxShadow: `3px 3px 8px var(--color-neu-dark), -2px -2px 6px var(--color-neu-light), 0 0 10px color-mix(in srgb, ${accent} 15%, transparent)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 18, position: "relative", zIndex: 1,
            }}>
                <IconComponent size={22} color={accent} />
            </div>

            <h3 style={{ fontFamily: "var(--font-headline)", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-mist)", marginBottom: 10, letterSpacing: "-0.01em", position: "relative", zIndex: 1 }}>
                {value.title}
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", lineHeight: 1.7, position: "relative", zIndex: 1 }}>
                {value.description}
            </p>
        </div>
    );
}

export function AboutCtaButton() {
    return (
        <Link href="/contact" className="btn-primary" style={{ gap: 8 }}>
            book a free consultation <ArrowRight size={14} />
        </Link>
    );
}
