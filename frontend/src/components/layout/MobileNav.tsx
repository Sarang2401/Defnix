"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

const overlayVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

const navVariants = {
  open: { x: 0, opacity: 1 },
  closed: { x: "100%", opacity: 0 },
};

const linkVariants = {
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.06, duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
  closed: { opacity: 0, y: 20 },
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
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Full-screen nav panel */}
          <motion.nav
            variants={navVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[70] bg-black flex flex-col"
          >
            {/* Header area */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 256 256"
                  className="h-5 w-5"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
                </svg>
                <span className="text-white text-sm font-normal tracking-tight">
                  defnix
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white transition-colors"
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
                    className="text-3xl text-white hover:text-white/70 transition-colors duration-200"
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
                  className="block w-full text-center py-4 rounded-full bg-white text-black font-medium text-lg hover:bg-neutral-200 transition-colors"
                >
                  get started
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
