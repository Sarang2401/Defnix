"use client";

import { PageTransition } from "../ui/PageTransition";

const steps = [
  {
    name: "Diagnose",
    window: "Week 1-2",
    action: "Audit your current stack, controls, and operational bottlenecks.",
    outcome: "A prioritized engineering roadmap with clear risk and ROI signals.",
  },
  {
    name: "Architect",
    window: "Week 2-3",
    action: "Design resilient systems, automation workflows, and compliance controls.",
    outcome: "A build plan that balances speed, security, and maintainability.",
  },
  {
    name: "Deliver",
    window: "Week 3+",
    action: "Ship implementations, evidence pipelines, and operating runbooks.",
    outcome: "Measurable outcomes: faster audits, safer cloud posture, less manual work.",
  },
];

export function HowWeWorkSection() {
  return (
    <section className="section-gap border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <PageTransition>
          <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
            How We Work
          </p>
          <h2 className="text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-12">
            Diagnose. Architect. Deliver.
          </h2>
        </PageTransition>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <PageTransition key={step.name} delay={index * 0.08}>
              <article className="card-glow rounded-lg bg-[var(--color-bg-surface)] p-7 h-full">
                <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] mb-3">{step.window}</p>
                <h3 className="text-xl text-[var(--color-text-primary)] mb-3">{step.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">{step.action}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{step.outcome}</p>
              </article>
            </PageTransition>
          ))}
        </div>
      </div>
    </section>
  );
}
