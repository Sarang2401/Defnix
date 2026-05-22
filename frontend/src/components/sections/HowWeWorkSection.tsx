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
          <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent-secondary)] tracking-[0.2em] uppercase mb-4">
            How We Work
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)] mb-12">
            Diagnose. Architect. Deliver.
          </h2>
        </PageTransition>

        {/* Sideways Scroll Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-16 pt-6 -mx-6 px-6 lg:mx-0 lg:px-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {steps.map((step, index) => (
            <PageTransition key={step.name} delay={index * 0.08}>
              <div className="snap-center shrink-0 w-[85vw] sm:w-[480px] lg:w-[500px] h-full">
                <article className="card-glow rounded-2xl bg-[rgba(10,10,12,0.7)] backdrop-blur-xl border border-[var(--color-border)] p-12 h-full hover:border-[var(--color-accent)] transition-colors min-h-[380px] flex flex-col">
                  <p className="font-[var(--font-mono)] text-sm text-[var(--color-accent-secondary)] mb-6">{step.window}</p>
                  <h3 className="text-4xl font-semibold text-[var(--color-text-primary)] mb-6">{step.name}</h3>
                  <p className="text-lg text-[var(--color-text-secondary)] mb-8">{step.action}</p>
                  <p className="text-base text-[var(--color-text-muted)] border-t border-[var(--color-border)] pt-6 mt-auto">{step.outcome}</p>
                </article>
              </div>
            </PageTransition>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>
    </section>
  );
}
