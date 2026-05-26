"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.nav
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="fixed inset-x-4 top-4 z-[70] rounded-2xl overflow-hidden"
            style={{
              background: "rgba(8, 8, 16, 0.95)",
              backdropFilter: "blur(24px)", willChange: "transform, backdrop-filter", transform: "translateZ(0)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(124,58,237,0.2)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(255,255,255,0.07)]">
              <span className="font-[var(--font-display)] font-bold text-[16px] text-white tracking-tight">Defnix</span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-[rgba(245,247,249,0.5)] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 space-y-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, duration: 0.22 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center px-4 py-3 rounded-xl text-[rgba(245,247,249,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.06)] text-[15px] font-medium transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="p-4 border-t border-[rgba(255,255,255,0.07)]"
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-[15px] text-white bg-[var(--color-accent)] shadow-[0_0_24px_rgba(124,58,237,0.5)] hover:shadow-[0_0_32px_rgba(124,58,237,0.7)] transition-shadow duration-300"
              >
                Book Free Consultation
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
