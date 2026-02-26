import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageTransition } from "@/components/ui/PageTransition";
import { Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with the Defnix engineering team. Book a consultation for SOC2 compliance, cloud security, or AI-driven security operations.",
};

export default function ContactPage() {
    return (
        <div className="pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
                    {/* Left — Info */}
                    <div>
                        <PageTransition>
                            <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                                Contact Us
                            </p>
                        </PageTransition>
                        <PageTransition delay={0.1}>
                            <h1 className="text-4xl sm:text-5xl text-[var(--color-text-primary)] mb-6">
                                Let&apos;s talk about
                                <br />
                                <span className="text-[var(--color-text-secondary)]">
                                    your security.
                                </span>
                            </h1>
                        </PageTransition>
                        <PageTransition delay={0.2}>
                            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-10">
                                Whether you need SOC2 compliance engineering, cloud
                                resilience, or AI-driven security automation — we
                                start every engagement with a no-obligation
                                conversation. Tell us about your challenges.
                            </p>
                        </PageTransition>

                        <PageTransition delay={0.3}>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] flex-shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[var(--color-text-primary)] font-[var(--font-heading)] font-medium mb-0.5">
                                            Email
                                        </p>
                                        <p className="text-sm text-[var(--color-text-secondary)]">
                                            hello@defnix.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] flex-shrink-0">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[var(--color-text-primary)] font-[var(--font-heading)] font-medium mb-0.5">
                                            Response Time
                                        </p>
                                        <p className="text-sm text-[var(--color-text-secondary)]">
                                            Within 1 business day
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] flex-shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[var(--color-text-primary)] font-[var(--font-heading)] font-medium mb-0.5">
                                            Location
                                        </p>
                                        <p className="text-sm text-[var(--color-text-secondary)]">
                                            Remote-first · Serving clients globally
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PageTransition>
                    </div>

                    {/* Right — Form */}
                    <div>
                        <PageTransition delay={0.3}>
                            <div className="rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-8 lg:p-10">
                                <h2 className="text-xl text-[var(--color-text-primary)] mb-6">
                                    Send us a message
                                </h2>
                                <ContactForm />
                            </div>
                        </PageTransition>
                    </div>
                </div>
            </div>
        </div>
    );
}
