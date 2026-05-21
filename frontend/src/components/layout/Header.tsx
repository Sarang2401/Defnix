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

  const headerHeight = useTransform(scrollY, [0, 90], [84, 60]);
  const headerBg = useTransform(scrollY, [0, 50], ["rgba(6,9,15,0.3)", "rgba(6,9,15,0.9)"]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.div style={{ scaleX }} className="scroll-progress" />

      <motion.header
        style={{ height: headerHeight, backgroundColor: headerBg }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-[rgba(159,176,200,0.2)] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded border border-[rgba(17,213,255,0.45)] bg-[rgba(17,213,255,0.09)] text-sm font-bold text-[var(--color-accent)]">
              DX
            </div>
            <span className="font-[var(--font-display)] text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Defnix</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link text-sm tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/contact"
              className="btn-trace rounded border border-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)]"
            >
              Book Free Consultation
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </>
  );
}
