"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Linkedin, Twitter } from "lucide-react";

const footerSections = [
  {
    title: "Solutions",
    links: [
      { href: "/solutions/soc2-failure-prevention", label: "SOC2 Readiness" },
      { href: "/solutions/cloud-insurance",          label: "Cloud Security" },
      { href: "/solutions/ai-soc-analyst",           label: "AI SOC Analyst" },
      { href: "/solutions/website-development",      label: "Web Development" },
      { href: "/solutions/mobile-development",       label: "Mobile Apps" },
      { href: "/solutions/business-automation",      label: "Automation" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/case-studies", label: "Case Studies" },
      { href: "/blog",         label: "Insights" },
      { href: "/about",        label: "About" },
      { href: "/contact",      label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy",   label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/disclaimer",       label: "Disclaimer" },
    ],
  },
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
    } catch {}
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">

          {/* Brand col */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)] text-[10px] font-bold text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]">DX</div>
              <span className="font-[var(--font-display)] font-bold text-[16px] tracking-tight text-white">Defnix</span>
            </div>

            <p className="text-sm text-[rgba(245,247,249,0.4)] leading-relaxed mb-6 max-w-[260px]">
              Engineering studio building secure infrastructure, conversion products, and automation systems for startups.
            </p>

            {/* Social links */}
            <div className="flex gap-2.5 mb-8">
              {[
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Twitter,  href: "#", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-[rgba(245,247,249,0.4)] hover:text-white transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.15)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(124,58,237,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.09)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[rgba(245,247,249,0.3)] mb-3">No-spam updates</p>
              {subscribed ? (
                <p className="text-sm text-[var(--color-success)]">Subscribed! Thanks.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="founder@company.com"
                    className="flex-1 rounded-xl px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[rgba(245,247,249,0.25)] focus:outline-none min-w-0 transition-colors duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(124,58,237,0.45)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.09)")}
                  />
                  <button
                    type="submit"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-secondary)] transition-colors shadow-[0_0_12px_rgba(124,58,237,0.35)]"
                  >
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <p className="mb-4 text-xs font-mono uppercase tracking-widest text-[rgba(245,247,249,0.3)]">
                  {section.title}
                </p>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[rgba(245,247,249,0.45)] hover:text-white transition-colors duration-150"
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
        <div
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-7 text-xs text-[rgba(245,247,249,0.25)]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span>© {new Date().getFullYear()} Defnix. Built for conversion, speed, and trust.</span>
          <span className="font-mono">defnix.in</span>
        </div>
      </div>
    </footer>
  );
}
