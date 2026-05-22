"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  const headerHeight = useTransform(scrollY, [0, 90], [90, 70]);
  const headerBg = useTransform(scrollY, [0, 50], ["rgba(10, 10, 12, 0.4)", "rgba(10, 10, 12, 0.95)"]);
  const headerBorder = useTransform(scrollY, [0, 50], ["rgba(255,255,255,0)", "rgba(255,255,255,0.05)"]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.div style={{ scaleX }} className="scroll-progress bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]" />

      <motion.header
        style={{ height: headerHeight, backgroundColor: headerBg, borderBottomColor: headerBorder }}
        className="fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-2xl transition-colors duration-300"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)] text-sm font-bold text-white shadow-md">
              DX
            </div>
            <span className="font-[var(--font-display)] text-2xl font-bold tracking-tight text-white">Defnix</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link text-sm font-medium tracking-wide text-[var(--color-text-secondary)] hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/contact"
              className="group relative flex items-center justify-center overflow-hidden rounded-md bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <span className="relative z-10">Book Consultation</span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-[var(--color-text-secondary)] hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </>
  );
}
