"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
    links: { href: string; label: string }[];
}

const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
};

const navVariants = {
    closed: { x: "100%" },
    open: { x: 0 },
};

const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.1 + i * 0.06, duration: 0.3 },
    }),
};

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Full-screen nav panel */}
                    <motion.nav
                        variants={navVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-[70] bg-[var(--color-bg-primary)] flex flex-col"
                    >
                        {/* Header area */}
                        <div className="flex items-center justify-between px-6 h-20 border-b border-[var(--color-border)]">
                            <span className="font-[var(--font-display)] text-[var(--color-text-primary)] font-bold text-xl tracking-tight">
                                defnix
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex-1 flex flex-col justify-center px-8 gap-6">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    variants={linkVariants}
                                    initial="closed"
                                    animate="open"
                                    custom={i}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="font-[var(--font-display)] text-3xl text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA at bottom */}
                        <div className="px-8 pb-12">
                            <motion.div
                                variants={linkVariants}
                                initial="closed"
                                animate="open"
                                custom={links.length}
                            >
                                <Link
                                    href="/contact"
                                    onClick={onClose}
                                    className="block w-full text-center py-4 rounded border border-[var(--color-accent)] text-[var(--color-accent)] font-[var(--font-heading)] font-semibold text-lg hover:bg-[var(--color-accent-dim)] transition-colors"
                                >
                                    Book a Consultation
                                </Link>
                            </motion.div>
                        </div>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    );
}
