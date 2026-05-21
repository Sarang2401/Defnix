"use client";

import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-gap">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(159,176,200,0.22)] bg-[linear-gradient(120deg,rgba(17,213,255,0.12),rgba(6,9,15,0.9)_45%,rgba(17,213,255,0.08))] p-10 text-center lg:p-16">
          <p className="mb-3 font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">Final Step</p>
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl">Ready to turn this quarter into momentum?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-[var(--color-text-secondary)]">
            Book your free consultation and get a practical execution plan for security, product delivery, and automation wins.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" href="/contact">
              Book Free Consultation
              <ArrowRight size={18} />
            </Button>
            <Button variant="outline" size="lg" href="/case-studies">
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
