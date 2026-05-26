import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import * as motion from "framer-motion/client";
import { ArrowRight, Shield, Code2, Target, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us",
    description: "We are an engineering-focused team specializing in cloud security, compliance readiness, and AI-driven automation for modern startups.",
};

const values = [
    {
        icon: <Code2 size={20} />,
        title: "Engineering First",
        description: "We solve compliance and security problems with code, not with slide decks. Every deliverable is a working system, not a recommendation.",
        color: "#a78bfa"
    },
    {
        icon: <Target size={20} />,
        title: "Outcome Oriented",
        description: "We measure success by your results — audits passed, incidents prevented, response times reduced — not by hours billed.",
        color: "#e879f9"
    },
    {
        icon: <Shield size={20} />,
        title: "Trust Through Transparency",
        description: "We document everything we build. When we leave, you own the entire system — the code, the runbooks, and the knowledge.",
        color: "#22c55e"
    },
    {
        icon: <Lightbulb size={20} />,
        title: "Pragmatic Innovation",
        description: "We use AI and automation where they create real leverage, not as buzzwords. Every technical decision is grounded in measurable impact.",
        color: "#f59e0b"
    },
];

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20 relative overflow-hidden">
            {/* Background blob glows */}
            <div className="blob-violet w-[700px] h-[700px] -top-40 -right-40 opacity-30 animate-float-slow" />
            <div className="blob-pink w-[500px] h-[500px] top-[30%] -left-40 opacity-20 animate-float-slow" style={{ animationDelay: "-3s" }} />

            {/* Hero */}
            <section className="max-w-4xl mx-auto px-6 mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-[0.22em] uppercase mb-4">
                        About Defnix
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white mb-7 font-[var(--font-display)] leading-[1.05] tracking-tight">
                        We engineer the
                        <br />
                        security infrastructure
                        <br />
                        <span className="text-[rgba(245,247,249,0.4)]">
                            that startups need.
                        </span>
                    </h1>
                    <p className="text-lg text-[rgba(245,247,249,0.65)] max-w-2xl leading-relaxed">
                        We are an engineering-focused team that builds across cloud
                        security, compliance readiness, AI automation, website development,
                        and mobile apps — for startups and small businesses worldwide.
                        We don&apos;t consult — we build.
                    </p>
                </motion.div>
            </section>

            {/* Mission (Glassmorphic panel) */}
            <section className="max-w-4xl mx-auto px-6 mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl p-10 lg:p-16 relative overflow-hidden"
                    style={{
                        background: "rgba(255, 255, 255, 0.04)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 32px 80px -20px rgba(0,0,0,0.7)"
                    }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(124,58,237,0.15),transparent_60%)] pointer-events-none" />
                    <p className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-[0.22em] uppercase mb-5 relative z-10">
                        Our Mission
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-[40px] text-white mb-6 leading-tight font-[var(--font-display)] tracking-tight relative z-10">
                        Make great engineering accessible to every startup and
                        small business that has real problems to solve.
                    </h2>
                    <p className="text-[rgba(245,247,249,0.6)] leading-relaxed max-w-2xl text-[17px] relative z-10">
                        Whether you need SOC2 compliance, cloud security, AI-driven
                        automation, a website that wins local search, or a mobile app
                        your customers actually love — we build it. No consultants,
                        no slide decks. Just engineering that works.
                    </p>
                </motion.div>
            </section>

            {/* Founders */}
            <section className="max-w-4xl mx-auto px-6 mb-24 relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-[0.22em] uppercase mb-6"
                >
                    Founders
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                        { name: "Founder 1", role: "Security Engineer" },
                        { name: "Founder 2", role: "Cloud & Product Engineer" },
                    ].map((founder, i) => (
                        <motion.div
                            key={founder.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                backdropFilter: "blur(16px)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 1px 0 rgba(255,255,255,0.05) inset"
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.background = "rgba(255,255,255,0.05)";
                                el.style.borderColor = "rgba(124,58,237,0.35)";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget;
                                el.style.background = "rgba(255,255,255,0.03)";
                                el.style.borderColor = "rgba(255,255,255,0.08)";
                            }}
                        >
                            <div className="h-40 rounded-xl mb-5 flex items-center justify-center text-xs text-[rgba(245,247,249,0.3)] font-mono border border-dashed border-[rgba(255,255,255,0.1)] group-hover:border-[rgba(124,58,237,0.4)] transition-colors">
                                Add real founder photo
                            </div>
                            <h3 className="text-xl text-white font-[var(--font-display)] font-semibold tracking-tight">{founder.name}</h3>
                            <p className="text-sm text-[rgba(245,247,249,0.5)] mt-1">{founder.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="max-w-4xl mx-auto px-6 mb-28 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-[0.22em] uppercase mb-4">
                        How We Work
                    </p>
                    <h2 className="text-3xl sm:text-4xl text-white mb-10 font-[var(--font-display)]">
                        Principles that guide
                        <br />
                        <span className="text-[rgba(245,247,249,0.4)]">
                            every engagement.
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {values.map((value, i) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="rounded-2xl p-8 h-full transition-all duration-300"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                backdropFilter: "blur(16px)",
                                border: "1px solid rgba(255,255,255,0.08)"
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget;
                                el.style.background = "rgba(255,255,255,0.05)";
                                el.style.borderColor = `${value.color}40`;
                                el.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget;
                                el.style.background = "rgba(255,255,255,0.03)";
                                el.style.borderColor = "rgba(255,255,255,0.08)";
                                el.style.transform = "translateY(0)";
                            }}
                        >
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-colors"
                                style={{
                                    background: `${value.color}15`,
                                    color: value.color,
                                    border: `1px solid ${value.color}30`
                                }}
                            >
                                {value.icon}
                            </div>
                            <h3 className="text-xl text-white mb-3 font-[var(--font-display)] font-semibold">{value.title}</h3>
                            <p className="text-[15px] text-[rgba(245,247,249,0.6)] leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 40px 100px -30px rgba(0,0,0,0.8)"
                    }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(124,58,237,0.2),transparent_65%)] pointer-events-none" />
                    <div className="bg-grid absolute inset-0 opacity-40 pointer-events-none" />
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-[40px] text-white mb-5 font-[var(--font-display)] font-bold tracking-tight">
                            Let&apos;s build something secure.
                        </h2>
                        <p className="text-[rgba(245,247,249,0.6)] max-w-lg mx-auto mb-10 text-lg">
                            Whether you need SOC2 certification, cloud resilience
                            engineering, or AI-driven security automation — we&apos;re
                            here to help.
                        </p>
                        <Button variant="primary" size="lg" href="/contact">
                            Get in Touch
                            <ArrowRight size={17} />
                        </Button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
