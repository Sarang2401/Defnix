"use client";

/**
 * MobileNav
 *
 * Dedicated mobile navigation component.
 * Renders a bottom-anchored sheet on small screens with all nav links,
 * the Defnix logo, and a LET'S TALK CTA.
 *
 * Used by: LayoutContent.tsx for screens ≤ 768px.
 * For the desktop slide-in overlay (triggered by the MENU tongue),
 * see NavOverlay.tsx.
 */

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const mobileNavItems = [
  { href: "/",             label: "Home"         },
  { href: "/solutions",    label: "Solutions"    },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog",         label: "Blog"         },
  { href: "/about",        label: "About Us"     },
  { href: "/contact",      label: "Contact"      },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mob-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              backgroundColor: "rgba(18,28,34,0.75)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Slide-up sheet from bottom */}
          <motion.div
            key="mob-sheet"
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 70,
              backgroundColor: "#19272f",
              borderTop: "1px solid rgba(82,121,111,0.25)",
              borderRadius: "18px 18px 0 0",
              paddingBottom: "env(safe-area-inset-bottom, 16px)",
            }}
          >
            {/* Handle bar */}
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
              <div style={{
                width: 36, height: 3, borderRadius: 99,
                backgroundColor: "rgba(202,210,197,0.2)",
              }} />
            </div>

            {/* Logo row */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 20px 14px",
              borderBottom: "1px solid rgba(82,121,111,0.15)",
            }}>
              <div style={{ position: "relative", width: 110, height: 34 }}>
                <Image
                  src="/logo-defnix.png"
                  alt="Defnix"
                  fill
                  style={{
                    objectFit: "contain",
                    objectPosition: "left center",
                    filter: "invert(1) hue-rotate(180deg) saturate(0.75) brightness(1.05)",
                  }}
                />
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  backgroundColor: "rgba(82,121,111,0.12)",
                  border: "1px solid rgba(82,121,111,0.25)",
                  borderRadius: 999,
                  padding: "5px 14px",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#CAD2C5",
                  cursor: "pointer",
                }}
              >
                Close ×
              </button>
            </div>

            {/* Nav links */}
            {mobileNavItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 + i * 0.04 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "15px 20px",
                    borderBottom: "1px solid rgba(82,121,111,0.1)",
                    textDecoration: "none",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(82,121,111,0.08)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <span style={{ color: "rgba(202,210,197,0.25)", fontSize: "1rem", lineHeight: 1 }}>→</span>
                  <span style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#CAD2C5",
                  }}>
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* LET'S TALK CTA */}
            <div style={{ padding: "16px 20px" }}>
              <Link
                href="/contact"
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#CAD2C5",
                  color: "#19272f",
                  borderRadius: 10,
                  padding: "12px",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Let&apos;s Talk
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
