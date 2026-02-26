"use client";

import { Button } from "../ui/Button";
import { PageTransition } from "../ui/PageTransition";
import { ArrowRight } from "lucide-react";

export function CTASection() {
    return (
        <section className="section-gap">
            <div className="max-w-7xl mx-auto px-6">
                <PageTransition>
                    <div className="rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-border)] p-12 lg:p-20 text-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)] mb-6">
                            Ready to engineer your
                            <br />
                            <span className="text-[var(--color-accent)]">security posture</span>?
                        </h2>
                        <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto mb-10">
                            Book a free technical consultation. We&apos;ll scope your compliance
                            gaps, cloud risks, and security pipeline — no sales pitch.
                        </p>
                        <Button variant="primary" size="lg" href="/contact">
                            Book a Consultation
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                </PageTransition>
            </div>
        </section>
    );
}
