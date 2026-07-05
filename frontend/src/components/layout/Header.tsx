"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/solutions",    label: "solutions" },
  { href: "/blog",         label: "blog" },
  { href: "/case-studies", label: "case studies" },
  { href: "/about",        label: "about" },
  { href: "/contact",      label: "contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 pt-6">
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? "opacity-95" : "opacity-100"
          }`}
        >
          {/* Left pill — Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 backdrop-blur rounded-full pl-4 pr-6 py-3"
            style={{
              backgroundColor: "var(--color-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            <svg
              viewBox="0 0 256 256"
              className="h-5 w-5"
              fill="var(--color-mist)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
            </svg>
            <span
              className="type-label"
              style={{ color: "var(--color-mist)" }}
            >
              defnix
            </span>
          </Link>

          {/* Center pill — Desktop Nav Links */}
          <div
            className="hidden md:flex items-center gap-1 backdrop-blur rounded-full px-3 py-2"
            style={{
              backgroundColor: "var(--color-secondary)",
              border: "1px solid var(--color-border)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="type-label px-5 py-2 rounded-full transition-colors duration-200"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-sage)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-primary hidden md:inline-flex"
            >
              get started
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={[...navLinks, { href: "/contact", label: "Contact" }]}
      />
    </>
  );
}
