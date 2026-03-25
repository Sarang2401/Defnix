"use client";

import { ReactNode } from "react";

interface MarqueeProps {
    children: ReactNode;
    speed?: number;
    direction?: "left" | "right";
    className?: string;
    pauseOnHover?: boolean;
}

export function Marquee({
    children,
    speed = 30,
    direction = "left",
    className = "",
    pauseOnHover = true,
}: MarqueeProps) {
    const animDirection = direction === "left" ? "marquee-left" : "marquee-right";

    return (
        <div
            className={`marquee-container overflow-hidden ${pauseOnHover ? "marquee-hover-pause" : ""} ${className}`}
        >
            <div
                className={`marquee-track ${animDirection}`}
                style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
            >
                <div className="marquee-content">{children}</div>
                <div className="marquee-content" aria-hidden="true">{children}</div>
                <div className="marquee-content" aria-hidden="true">{children}</div>
            </div>
        </div>
    );
}
