"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
    children: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "p" | "span";
    delay?: number;
    stagger?: number;
}

export function TextReveal({
    children,
    className = "",
    as: Tag = "h2",
    delay = 0,
    stagger = 0.05,
}: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const words = el.querySelectorAll(".word-reveal");

        gsap.set(words, { y: 80, opacity: 0 });

        gsap.to(words, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger,
            delay,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === el) t.kill();
            });
        };
    }, [children, delay, stagger]);

    const words = children.split(" ");

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <Tag className={className} style={{ margin: 0 }}>
                {words.map((word, i) => (
                    <span
                        key={`${word}-${i}`}
                        className="word-reveal inline-block mr-[0.3em]"
                        style={{ willChange: "transform, opacity" }}
                    >
                        {word}
                    </span>
                ))}
            </Tag>
        </div>
    );
}
