"use client";

import Link from "next/link";
import { ArrowRight, Settings, Target, Shield, Lightbulb } from "lucide-react";

type Value = {
    title: string;
    description: string;
    accent: string;
    iconName: string;
};

const iconMap: Record<string, React.ElementType> = {
    Settings, Target, Shield, Lightbulb
};

export function ValueCard({ value }: { value: Value }) {
    const IconComponent = iconMap[value.iconName] || Settings;
    return (
        <div
            style={{
                borderRadius: "20px", padding: "28px", height: "100%",
                position: "relative", overflow: "hidden",
                background: "linear-gradient(145deg, #354F52, #2d4449)",
                border: "1px solid rgba(82,121,111,0.18)",
                boxShadow: "6px 6px 16px #1e2b31, -3px -3px 10px #3f5461",
                transition: "all 0.35s ease", cursor: "default",
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = `inset 4px 4px 10px #1e2b31, inset -2px -2px 7px #3f5461, 0 0 20px ${value.accent}12`;
                el.style.borderColor = `${value.accent}40`;
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "6px 6px 16px #1e2b31, -3px -3px 10px #3f5461";
                el.style.borderColor = "rgba(82,121,111,0.18)";
            }}
        >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${value.accent}60, transparent)`, borderRadius: "20px 20px 0 0" }} />

            <div style={{
                width: 48, height: 48, borderRadius: "14px",
                background: "linear-gradient(145deg, #2a3d45, #354F52)",
                border: `1px solid ${value.accent}30`,
                boxShadow: `3px 3px 8px #1e2b31, -2px -2px 6px #3f5461, 0 0 10px ${value.accent}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 18, fontSize: "20px",
            }}>
                <IconComponent size={22} color={value.accent} />
            </div>

            <h3 style={{ fontFamily: "var(--font-headline)", fontSize: "1.1rem", fontWeight: 700, color: "#CAD2C5", marginBottom: 10, letterSpacing: "-0.01em" }}>
                {value.title}
            </h3>
            <p style={{ fontSize: "13.5px", color: "rgba(202,210,197,0.55)", lineHeight: 1.7 }}>
                {value.description}
            </p>
        </div>
    );
}

export function AboutCtaButton() {
    return (
        <Link
            href="/contact"
            style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                backgroundColor: "#CAD2C5", color: "#2F3E46",
                borderRadius: "999px", padding: "14px 32px",
                fontFamily: "var(--font-label)", fontSize: "0.75rem",
                fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none",
                boxShadow: "4px 4px 12px #1e2b31, -2px -2px 8px #3f5461",
                transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#84A98C"; e.currentTarget.style.boxShadow = "inset 2px 2px 6px rgba(30,43,49,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#CAD2C5"; e.currentTarget.style.boxShadow = "4px 4px 12px #1e2b31, -2px -2px 8px #3f5461"; }}
        >
            get in touch <ArrowRight size={14} />
        </Link>
    );
}
