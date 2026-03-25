"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
}

export function ParticleGrid({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);

    const init = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        // Create grid of particles
        const spacing = 60;
        const particles: Particle[] = [];
        for (let x = 0; x < rect.width; x += spacing) {
            for (let y = 0; y < rect.height; y += spacing) {
                particles.push({
                    x: x + spacing / 2,
                    y: y + spacing / 2,
                    baseX: x + spacing / 2,
                    baseY: y + spacing / 2,
                    vx: 0,
                    vy: 0,
                    size: 1.5,
                    alpha: 0.15 + Math.random() * 0.1,
                });
            }
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        init();
        window.addEventListener("resize", init);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        const animate = () => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            const mouse = mouseRef.current;
            const connectionDist = 120;
            const interactionDist = 150;

            particlesRef.current.forEach((p) => {
                // Mouse interaction — repel slightly
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < interactionDist) {
                    const force = (interactionDist - dist) / interactionDist;
                    p.vx -= (dx / dist) * force * 0.5;
                    p.vy -= (dy / dist) * force * 0.5;
                }

                // Spring back to base position
                p.vx += (p.baseX - p.x) * 0.03;
                p.vy += (p.baseY - p.y) * 0.03;
                p.vx *= 0.92;
                p.vy *= 0.92;
                p.x += p.vx;
                p.y += p.vy;

                // Draw particle
                const proximity = dist < interactionDist ? 1 - dist / interactionDist : 0;
                const alpha = p.alpha + proximity * 0.5;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size + proximity * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
                ctx.fill();
            });

            // Draw connections
            const particles = particlesRef.current;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < connectionDist) {
                        const alpha = (1 - dist / connectionDist) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", init);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [init]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
            style={{ zIndex: 0 }}
        />
    );
}
