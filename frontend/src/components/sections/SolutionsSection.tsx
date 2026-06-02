"use client";

import { motion } from "framer-motion";
import { Shield, Cloud, Brain, Globe, Smartphone, Workflow, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { ReactNode } from "react";
import { TiltCard } from "../ui/TiltCard";

interface Solution {
  icon: ReactNode;
  title: string;
  subtitle: string;
  impact: string;
  description: string;
  href: string;
  color: string;
}

const solutions: Solution[] = [
  {
    icon: <Shield size={18} />,
    title: "SOC2 Failure Prevention",
    subtitle: "Compliance Readiness Engineering",
    impact: "Faster audit readiness — fewer surprises",
    description: "We design your control framework, automate evidence collection, and build audit workflows directly into your operations — so your first audit is your cleanest one.",
    href: "/solutions/soc2-failure-prevention",
    color: "#a78bfa",
  },
  {
    icon: <Cloud size={18} />,
    title: "Cloud Insurance",
    subtitle: "Cloud Risk Reduction",
    impact: "Reduced blast radius & faster incident response",
    description: "Architecture hardening, disaster recovery planning, and monitoring systems that give your infrastructure real resilience — not just the appearance of it.",
    href: "/solutions/cloud-insurance",
    color: "#22c55e",
  },
  {
    icon: <Brain size={18} />,
    title: "AI Enhanced SOC Analyst",
    subtitle: "AI Security Automation",
    impact: "Less alert noise, faster threat triage",
    description: "Automated investigation pipelines and escalation logic that help your security team focus on real threats — not false positives.",
    href: "/solutions/ai-soc-analyst",
    color: "#e879f9",
  },
  {
    icon: <Globe size={18} />,
    title: "Website Development",
    subtitle: "Conversion-First Websites",
    impact: "Higher trust signals, better lead flow",
    description: "Performance-first websites built for search ranking, clarity, and client conversion. Not templates — engineered to work.",
    href: "/solutions/website-development",
    color: "#f59e0b",
  },
  {
    icon: <Smartphone size={18} />,
    title: "Mobile App Development",
    subtitle: "Cross-Platform Product Builds",
    impact: "Faster MVP-to-market delivery",
    description: "Reliable iOS and Android experiences with measurable business impact — from wireframe to App Store in weeks.",
    href: "/solutions/mobile-development",
    color: "#06b6d4",
  },
  {
    icon: <Workflow size={18} />,
    title: "Business Automation",
    subtitle: "n8n, Make, Zapier",
    impact: "Hours saved every single week",
    description: "Workflow automation for onboarding, client operations, and customer lifecycle tasks.",
    href: "/solutions/business-automation",
    color: "#ec4899",
  },
];

export function SolutionsSection() {
  return (
    <section className="section-gap" id="solutions">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4"
          >
            what we do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl text-white font-medium"
          >
            six disciplines. one engineering studio.
          </motion.h2>
        </div>

        <div className="space-y-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.05,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <TiltCard tiltAmount={5} className={`${index % 3 === 1
                  ? "lg:ml-16 lg:mr-0"
                  : index % 3 === 2
                    ? "lg:ml-32 lg:mr-0"
                    : ""
                }`}>
                <div className="card-glow rounded-xl bg-neutral-900/60 backdrop-blur-sm p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <motion.div
                        whileInView={{ rotate: [0, 360] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white"
                      >
                        {solution.icon}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-white/40 tracking-wider uppercase mb-2">
                        {solution.impact}
                      </p>
                      <h3 className="text-xl lg:text-2xl text-white mb-1">
                        {solution.title}
                      </h3>
                      <p className="text-sm text-white/40 mb-4">
                        {solution.subtitle}
                      </p>
                      <p className="text-white/70 leading-relaxed mb-6 max-w-2xl">
                        {solution.description}
                      </p>
                      <Button variant="ghost" size="sm" href={solution.href}>
                        learn more <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
