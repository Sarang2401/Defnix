"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const footerSections = [
  {
    title: "Solutions",
    links: [
      { href: "/solutions/soc2-failure-prevention", label: "SOC2 Readiness" },
      { href: "/solutions/cloud-insurance", label: "Cloud Security" },
      { href: "/solutions/ai-soc-analyst", label: "AI SOC" },
      { href: "/solutions/website-development", label: "Web Development" },
      { href: "/solutions/mobile-development", label: "Mobile Apps" },
      { href: "/solutions/business-automation", label: "Automation" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/case-studies", label: "Case Studies" },
      { href: "/blog", label: "Engineering Insights" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
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
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribed(false);
    }
  };

  return (
    <footer className="border-t border-[rgba(159,176,200,0.2)] bg-[rgba(6,9,15,0.85)]">
      <div className="mx-auto max-w-7xl px-6 pb-9 pt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded border border-[rgba(17,213,255,0.45)] bg-[rgba(17,213,255,0.09)] text-sm font-bold text-[var(--color-accent)]">DX</div>
              <span className="font-[var(--font-display)] text-xl font-bold">Defnix</span>
            </div>
            <p className="mb-6 max-w-sm text-sm text-[var(--color-text-secondary)]">
              We build secure digital infrastructure for startups and small businesses - from compliance systems to customer-facing products.
            </p>
            <Link href="/contact" className="mb-6 inline-flex items-center gap-2 rounded border border-[var(--color-accent)] px-4 py-2 text-sm text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)]">
              Book Free Consultation <ArrowRight size={14} />
            </Link>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)]">No-spam updates</p>
              {subscribed ? (
                <p className="text-sm text-[var(--color-success)]">Subscribed successfully.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="founder@company.com"
                    className="flex-1 rounded border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)]"
                  />
                  <button type="submit" className="rounded bg-[var(--color-accent)] px-3 text-[var(--color-bg-primary)]">
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">{section.title}</p>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Trust</p>
            <ul className="space-y-2.5 text-sm text-[var(--color-text-secondary)]">
              <li>Fast response within 24h</li>
              <li>Clear fixed-scope milestones</li>
              <li>Execution-first delivery model</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[rgba(159,176,200,0.18)] pt-5 text-xs text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} Defnix. Built for conversion, speed, and trust.
        </div>
      </div>
    </footer>
  );
}
