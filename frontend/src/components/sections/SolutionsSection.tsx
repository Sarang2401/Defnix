"use client";

import { motion } from "framer-motion";
import { Shield, Cloud, Brain, Globe, Smartphone, Workflow, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { ReactNode } from "react";

interface Solution {
  icon: ReactNode;
  title: string;
  subtitle: string;
  impact: string;
  description: string;
  href: string;
}

const solutions: Solution[] = [
  {
    icon: <Shield size={22} />,
    title: "SOC2 Failure Prevention",
    subtitle: "Compliance Readiness Engineering",
    impact: "Faster audit readiness with fewer last-minute surprises",
    description: "Control design, evidence automation, and audit workflows built into your operations.",
    href: "/solutions/soc2-failure-prevention",
  },
  {
    icon: <Cloud size={22} />,
    title: "Cloud Insurance",
    subtitle: "Cloud Risk Reduction",
    impact: "Reduced blast radius and stronger incident response",
    description: "Architecture hardening, DR planning, and monitoring systems for stable growth.",
    href: "/solutions/cloud-insurance",
  },
  {
    icon: <Brain size={22} />,
    title: "AI Enhanced SOC Analyst",
    subtitle: "AI Security Automation",
    impact: "Less alert noise and faster triage",
    description: "Automated investigation pipelines and escalation logic that help teams focus on real threats.",
    href: "/solutions/ai-soc-analyst",
  },
  {
    icon: <Globe size={22} />,
    title: "Website Development",
    subtitle: "Conversion Websites",
    impact: "Higher trust, better lead flow",
    description: "Performance-first websites engineered for ranking, clarity, and bookings.",
    href: "/solutions/website-development",
  },
  {
    icon: <Smartphone size={22} />,
    title: "Mobile App Development",
    subtitle: "Cross-Platform Product Builds",
    impact: "Faster MVP-to-market outcomes",
    description: "Reliable iOS and Android experiences with measurable business impact.",
    href: "/solutions/mobile-development",
  },
  {
    icon: <Workflow size={22} />,
    title: "Business Automation",
    subtitle: "n8n, Make, Zapier",
    impact: "Hours saved every week",
    description: "Workflow automation for onboarding, operations, and customer lifecycle tasks.",
    href: "/solutions/business-automation",
  },
];

export function SolutionsSection() {
  return (
    <section className="section-gap" id="solutions">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]"
        >
          What We Build
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl sm:text-4xl lg:text-5xl"
        >
          Execution-led services for serious growth.
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {solutions.map((solution, index) => (
            <motion.article
              key={solution.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="card-glow rounded-2xl bg-[var(--color-bg-surface)] p-7"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
                  {solution.icon}
                </div>
                <div>
                  <h3 className="text-lg text-[var(--color-text-primary)]">{solution.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)]">{solution.subtitle}</p>
                </div>
              </div>

              <p className="mb-2 text-sm font-medium text-[var(--color-accent)]">{solution.impact}</p>
              <p className="mb-5 text-sm text-[var(--color-text-secondary)]">{solution.description}</p>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" href={solution.href}>
                  Learn More <ArrowRight size={13} />
                </Button>
                <Button variant="ghost" size="sm" href="/contact" magnetic={false}>
                  Book Call
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
