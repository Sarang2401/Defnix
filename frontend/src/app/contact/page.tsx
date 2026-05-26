import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import * as motion from "framer-motion/client";
import { Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with the Defnix engineering team. Book a consultation for SOC2 compliance, cloud security, or AI-driven security operations.",
};

export default function ContactPage() {
    return (
        <div className="pt-32 pb-20 relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="blob-violet w-[600px] h-[600px] top-20 -left-20 opacity-30 animate-float-slow" />
            <div className="blob-pink w-[500px] h-[500px] bottom-0 -right-40 opacity-20 animate-float-slow" style={{ animationDelay: "-3s" }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column: Info */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="font-mono text-xs text-[var(--color-accent-secondary)] tracking-[0.22em] uppercase mb-4">
                                Contact Us
                            </p>
                            <h1 className="text-4xl sm:text-5xl lg:text-[56px] text-white mb-6 font-[var(--font-display)] leading-[1.05] tracking-tight">
                                Book your
                                <br />
                                <span className="text-[rgba(245,247,249,0.4)]">
                                    free engineering consultation.
                                </span>
                            </h1>
                            <p className="text-lg text-[rgba(245,247,249,0.65)] leading-relaxed mb-10 max-w-md">
                                No spam, no hard sell — just a focused 20-minute call to understand your current setup and next steps.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-14">
                                <a
                                    href="mailto:hello@defnix.com"
                                    className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md px-5 py-2.5 text-sm font-medium text-[rgba(245,247,249,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-200"
                                >
                                    Email us
                                </a>
                                <a
                                    href="https://wa.me/910000000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md px-5 py-2.5 text-sm font-medium text-[rgba(245,247,249,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-200"
                                >
                                    WhatsApp
                                </a>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.25)] flex items-center justify-center text-[var(--color-accent-bright)] flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[15px] text-white font-[var(--font-display)] font-semibold mb-1">Email</p>
                                        <p className="text-[15px] text-[rgba(245,247,249,0.5)]">hello@defnix.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.25)] flex items-center justify-center text-[var(--color-accent-bright)] flex-shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[15px] text-white font-[var(--font-display)] font-semibold mb-1">Response Time</p>
                                        <p className="text-[15px] text-[rgba(245,247,249,0.5)]">Within 1 business day</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.25)] flex items-center justify-center text-[var(--color-accent-bright)] flex-shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[15px] text-white font-[var(--font-display)] font-semibold mb-1">Location</p>
                                        <p className="text-[15px] text-[rgba(245,247,249,0.5)]">Remote-first — Serving clients globally</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Form */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="rounded-3xl p-8 lg:p-12 relative overflow-hidden"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                backdropFilter: "blur(24px)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 1px 0 rgba(255,255,255,0.06) inset, 0 32px 80px -20px rgba(0,0,0,0.6)"
                            }}
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.12),transparent_60%)] pointer-events-none" />
                            
                            <div className="relative z-10">
                                <h2 className="text-2xl text-white mb-3 font-[var(--font-display)] font-bold">Send us a message</h2>
                                <p className="text-[15px] text-[rgba(245,247,249,0.5)] mb-8">
                                    Share your use case and we will reply with suggested next steps.
                                </p>
                                <ContactForm />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
