"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/case-studies", label: "Work" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div style={{ scaleX }} className="scroll-progress" />

      {/* ── Floating pill navbar container ─────────── */}
      <div className="fixed left-0 right-0 top-5 z-50 flex justify-center px-4 pointer-events-none">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between gap-4 px-5 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "navbar-glass shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-[var(--color-accent)] opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)] text-[10px] font-bold text-white tracking-widest shadow-[0_0_12px_rgba(124,58,237,0.5)]">
                DX
              </div>
            </div>
            <span className="font-[var(--font-display)] font-bold text-[16px] tracking-tight text-white">
              Defnix
            </span>
          </Link>

          {/* Desktop nav links — centered */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link px-4 py-2 rounded-xl hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="text-sm text-[rgba(245,247,249,0.5)] hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(124,58,237,0.65)] hover:-translate-y-px"
            >
              <span className="relative z-10">Book a Call</span>
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#7c3aed] to-[#e879f9]" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-[rgba(245,247,249,0.6)] hover:text-white lg:hidden rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-all"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </motion.header>
      </div>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={[...navLinks, { href: "/contact", label: "Contact" }]}
      />
    </>
  );
}
