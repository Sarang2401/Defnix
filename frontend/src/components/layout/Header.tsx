"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import { MobileNav } from "./MobileNav";

const navLinks = [
    { href: "/solutions", label: "Solutions" },
    { href: "/blog", label: "Blog" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    // Shrink header: 80px → 52px
    const headerHeight = useTransform(scrollY, [0, 100], [80, 52]);
    const headerBg = useTransform(
        scrollY,
        [0, 50],
        ["rgba(10, 15, 28, 0)", "rgba(10, 15, 28, 0.85)"]
    );

    // Lock body scroll when mobile nav is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            <motion.header
                style={{
                    height: headerHeight,
                    backgroundColor: headerBg,
                }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[var(--color-border)] transition-colors"
            >
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded bg-[var(--color-accent)] flex items-center justify-center">
                            <span className="font-[var(--font-display)] text-[var(--color-bg-primary)] font-bold text-sm">
                                D
                            </span>
                        </div>
                        <span className="font-[var(--font-display)] text-[var(--color-text-primary)] font-bold text-xl tracking-tight">
                            defnix
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="font-[var(--font-body)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 tracking-wide"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link
                            href="/contact"
                            className="btn-trace px-5 py-2 rounded text-sm font-[var(--font-heading)] font-semibold text-[var(--color-accent)] border border-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-colors duration-200"
                        >
                            Book a Consultation
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="lg:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Navigation Overlay */}
            <MobileNav
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                links={navLinks}
            />
        </>
    );
}
