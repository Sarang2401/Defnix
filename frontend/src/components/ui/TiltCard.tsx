"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number;
    glareEnabled?: boolean;
}

export function TiltCard({
    children,
    className = "",
    tiltAmount = 10,
    glareEnabled = true,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltAmount, -tiltAmount]), {
        stiffness: 300,
        damping: 30,
    });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltAmount, tiltAmount]), {
        stiffness: 300,
        damping: 30,
    });

    const glareX = useTransform(mouseX, [0, 1], ["-30%", "130%"]);
    const glareY = useTransform(mouseY, [0, 1], ["-30%", "130%"]);

    function handleMouseMove(e: React.MouseEvent) {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    }

    function handleMouseLeave() {
        mouseX.set(0.5);
        mouseY.set(0.5);
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            className={`relative ${className}`}
        >
            {children}
            {glareEnabled && (
                <motion.div
                    className="pointer-events-none absolute inset-0 rounded-lg z-10"
                    style={{
                        background: `radial-gradient(circle at ${glareX}px ${glareY}px, rgba(0,212,255,0.06), transparent 60%)`,
                        opacity: 0.6,
                    }}
                />
            )}
        </motion.div>
    );
}
