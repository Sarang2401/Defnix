"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const footerSections = [
    {
        title: "Solutions",
        links: [
            { href: "/solutions/soc2-failure-prevention", label: "SOC2 Failure Prevention" },
            { href: "/solutions/cloud-insurance", label: "Cloud Insurance" },
            { href: "/solutions/ai-soc-analyst", label: "AI SOC Analyst" },
        ],
    },
    {
        title: "Resources",
        links: [
            { href: "/blog", label: "Blog" },
            { href: "/case-studies", label: "Case Studies" },
            { href: "/about", label: "About Us" },
        ],
    },
    {
        title: "Legal",
        links: [
            { href: "/privacy-policy", label: "Privacy Policy" },
            { href: "/terms-of-service", label: "Terms of Service" },
            { href: "/disclaimer", label: "Disclaimer" },
        ],
    },
];

export function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
            await fetch(`${apiUrl}/newsletter/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            setSubscribed(true);
            setEmail("");
        } catch {
            // Silently fail — newsletter is non-critical
        }
    };

    return (
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                {/* Top grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded bg-[var(--color-accent)] flex items-center justify-center">
                                <span className="font-[var(--font-display)] text-[var(--color-bg-primary)] font-bold text-xs">
                                    D
                                </span>
                            </div>
                            <span className="font-[var(--font-display)] text-[var(--color-text-primary)] font-bold text-lg tracking-tight">
                                defnix
                            </span>
                        </Link>
                        <p className="text-sm text-[var(--color-text-secondary)] max-w-xs leading-relaxed mb-6">
                            Engineering studio specializing in SOC2 compliance, cloud security,
                            and AI-driven security operations for modern startups.
                        </p>

                        {/* Newsletter */}
                        <div>
                            <p className="text-xs font-[var(--font-heading)] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">
                                Newsletter
                            </p>
                            {subscribed ? (
                                <p className="text-sm text-[var(--color-success)]">
                                    ✓ Subscribed successfully
                                </p>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="flex-1 px-3 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-3 py-2 bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded hover:opacity-90 transition-opacity"
                                        aria-label="Subscribe"
                                    >
                                        <ArrowRight size={16} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <p className="text-xs font-[var(--font-heading)] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
                                {section.title}
                            </p>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-[var(--color-text-muted)]">
                        © {new Date().getFullYear()} Defnix. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy-policy"
                            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms-of-service"
                            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/contact"
                            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
