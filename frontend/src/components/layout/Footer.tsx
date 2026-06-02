"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Music2, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const footerSections = [
    {
        title: "Solutions",
        links: [
            { href: "/solutions/soc2-failure-prevention", label: "SOC2 Failure Prevention" },
            { href: "/solutions/cloud-insurance", label: "Cloud Insurance" },
            { href: "/solutions/ai-soc-analyst", label: "AI SOC Analyst" },
            { href: "/solutions/website-development", label: "Website Development" },
            { href: "/solutions/mobile-development", label: "Mobile App Development" },
            { href: "/solutions/business-automation", label: "Business Automation" },
        ],
    },
    {
        title: "Resources",
        links: [
            { href: "/blog", label: "Blog" },
            { href: "/case-studies", label: "Case Studies" },
            { href: "/about", label: "About Us" },
            { href: "/contact", label: "Get in Touch" },
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

const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Music2, href: "#", label: "Music" },
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
        } catch { }
        setSubscribed(true);
        setEmail("");
    };

    return (
        <footer className="relative">
            {/* Background video for footer area */}
            <div className="absolute inset-0 overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4"
                />
                {/* Dark overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Footer content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-8">
                {/* Liquid Glass Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="liquid-glass w-full rounded-3xl p-6 md:p-10 text-white/70"
                >
                    {/* Top grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
                        {/* Brand column */}
                        <div className="md:col-span-5">
                            <Link href="/" className="inline-flex items-center gap-3 mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 256 256"
                                    fill="currentColor"
                                    className="text-white"
                                >
                                    <path d="M 4.688 136 C 68.373 136 120 187.627 120 251.312 C 120 252.883 119.967 254.445 119.905 256 L 0 256 L 0 136.096 C 1.555 136.034 3.117 136 4.688 136 Z M 251.312 136 C 252.883 136 254.445 136.034 256 136.096 L 256 256 L 136.095 256 C 136.032 254.438 136.001 252.875 136 251.312 C 136 187.627 187.627 136 251.312 136 Z M 119.905 0 C 119.967 1.555 120 3.117 120 4.688 C 120 68.373 68.373 120 4.687 120 C 3.117 120 1.555 119.967 0 119.905 L 0 0 Z M 256 119.905 C 254.445 119.967 252.883 120 251.312 120 C 187.627 120 136 68.373 136 4.687 C 136 3.117 136.033 1.555 136.095 0 L 256 0 Z" />
                                </svg>
                                <span className="text-xl text-white font-medium">
                                    DEFNIX
                                </span>
                            </Link>
                            <p className="text-sm leading-relaxed max-w-sm mb-6">
                                defnix provides premium engineering solutions for cloud security,
                                compliance, ai automation, and digital products — shared with
                                startups and businesses worldwide.
                            </p>

                            {/* Newsletter */}
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-widest mb-3 font-medium">
                                    newsletter
                                </p>
                                {subscribed ? (
                                    <p className="text-sm text-white">
                                        ✓ subscribed successfully
                                    </p>
                                ) : (
                                    <form onSubmit={handleSubscribe} className="flex gap-2">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="px-4 py-2.5 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
                                            aria-label="Subscribe"
                                        >
                                            <ArrowRight size={16} />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Link columns */}
                        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                            {footerSections.map((section) => (
                                <div key={section.title}>
                                    <p className="text-sm uppercase tracking-wider text-white font-medium mb-4">
                                        {section.title}
                                    </p>
                                    <ul className="space-y-2">
                                        {section.links.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="text-xs text-white/60 hover:text-white transition-colors duration-200"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                        <p className="text-[10px] uppercase tracking-widest opacity-50">
                            © {new Date().getFullYear()} defnix engineering studio
                        </p>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase tracking-widest opacity-50">
                                connect:
                            </span>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Bottom legal links outside glass */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-[10px] text-white/30 uppercase tracking-widest">
                    <Link href="/privacy-policy" className="hover:text-white/60 transition-colors">
                        privacy
                    </Link>
                    <Link href="/terms-of-service" className="hover:text-white/60 transition-colors">
                        terms
                    </Link>
                    <Link href="/contact" className="hover:text-white/60 transition-colors">
                        contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}
