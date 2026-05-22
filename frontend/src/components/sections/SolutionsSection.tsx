"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cloud, Brain, Globe, Smartphone, Workflow, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { TiltCard } from "../ui/TiltCard";
import { ReactNode } from "react";
import { PageTransition } from "../ui/PageTransition";

interface Solution {
  icon: ReactNode;
  title: string;
  subtitle: string;
  impact: string;
  description: string;
  href: string;
  image: string;
}

const solutions: Solution[] = [
  {
    icon: <Shield size={22} />,
    title: "SOC2 Failure Prevention",
    subtitle: "Compliance Readiness Engineering",
    impact: "Faster audit readiness with fewer surprises",
    description: "Control design, evidence automation, and audit workflows built into your operations.",
    href: "/solutions/soc2-failure-prevention",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <Cloud size={22} />,
    title: "Cloud Insurance",
    subtitle: "Cloud Risk Reduction",
    impact: "Reduced blast radius & faster response",
    description: "Architecture hardening, DR planning, and monitoring systems for stable growth.",
    href: "/solutions/cloud-insurance",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <Brain size={22} />,
    title: "AI Enhanced SOC Analyst",
    subtitle: "AI Security Automation",
    impact: "Less alert noise and faster triage",
    description: "Automated investigation pipelines and escalation logic that help teams focus on real threats.",
    href: "/solutions/ai-soc-analyst",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <Globe size={22} />,
    title: "Website Development",
    subtitle: "Conversion Websites",
    impact: "Higher trust, better lead flow",
    description: "Performance-first websites engineered for ranking, clarity, and client bookings.",
    href: "/solutions/website-development",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <Smartphone size={22} />,
    title: "Mobile App Development",
    subtitle: "Cross-Platform Product Builds",
    impact: "Faster MVP-to-market outcomes",
    description: "Reliable iOS and Android experiences with measurable business impact.",
    href: "/solutions/mobile-development",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: <Workflow size={22} />,
    title: "Business Automation",
    subtitle: "n8n, Make, Zapier",
    impact: "Hours saved every single week",
    description: "Workflow automation for onboarding, operations, and customer lifecycle tasks.",
    href: "/solutions/business-automation",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
];

export function SolutionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % solutions.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + solutions.length) % solutions.length);
  };

  return (
    <section className="section-gap overflow-hidden" id="solutions">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <PageTransition>
          <p className="mb-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-accent-secondary)] text-center lg:text-left">
            What We Build
          </p>
          <h2 className="mb-12 text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)] text-center lg:text-left">
            Execution-led services for serious growth.
          </h2>
        </PageTransition>

        {/* Mobile View (Grid Layout) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:hidden mt-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="h-full"
            >
              <TiltCard tiltAmount={4} className="h-full block">
                <article className="card-glow rounded-xl h-full flex flex-col bg-[rgba(10,10,12,0.7)] backdrop-blur-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors overflow-hidden shadow-sm">
                  <img src={solution.image} alt={solution.title} className="w-full h-40 object-cover" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--color-accent-dim)] bg-[var(--color-accent-dim)] text-[var(--color-accent)] shadow-sm">
                        {solution.icon}
                      </div>
                      <div>
                        <h3 className="text-lg text-white font-semibold leading-tight">{solution.title}</h3>
                        <p className="text-[10px] uppercase tracking-wider text-[var(--color-accent-secondary)] mt-1">{solution.subtitle}</p>
                      </div>
                    </div>

                    <p className="mb-2 text-xs font-semibold text-[var(--color-accent)]">{solution.impact}</p>
                    <p className="mb-6 text-sm text-[var(--color-text-secondary)] flex-1">{solution.description}</p>

                    <div className="flex gap-2 mt-auto">
                      <Button variant="outline" size="sm" href={solution.href}>
                        Learn More <ArrowRight size={13} />
                      </Button>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Desktop View (3D Queue Carousel) */}
        <div className="hidden lg:block relative mt-16 h-[600px]">
          <div className="relative w-full h-full flex justify-center items-center">
            <AnimatePresence initial={false}>
              {solutions.map((solution, index) => {
                // Calculate cyclic offset
                const total = solutions.length;
                let offset = index - activeIndex;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                const isActive = offset === 0;
                const absOffset = Math.abs(offset);
                const direction = Math.sign(offset); // 1 = right, -1 = left

                // Calculate transforms
                const xOffset = direction * absOffset * 280;
                const scale = 1 - absOffset * 0.12; // 1, 0.88, 0.76
                const zIndex = 30 - absOffset * 10; // 30, 20, 10
                
                let opacity = 0;
                if (absOffset === 0) opacity = 1;
                if (absOffset === 1) opacity = 0.5;
                if (absOffset === 2) opacity = 0.15;

                return (
                  <motion.div
                    key={solution.title}
                    className="absolute top-1/2 left-1/2 w-[540px] h-auto origin-center -ml-[270px] -mt-[260px]"
                    initial={false}
                    animate={{
                      x: xOffset,
                      scale: scale,
                      zIndex: zIndex,
                      opacity: opacity,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1], // Custom bouncy ease out
                    }}
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                  >
                    <TiltCard tiltAmount={isActive ? 6 : 0} className="w-full">
                      <article className="card-glow rounded-2xl flex flex-col bg-[rgba(10,10,12,0.9)] backdrop-blur-2xl border border-[var(--color-border)] transition-colors shadow-2xl h-[520px] overflow-hidden">
                        <img src={solution.image} alt={solution.title} className="w-full h-56 object-cover" />
                        <div className="p-10 flex flex-col flex-1">
                          <div className="mb-6 flex items-center gap-5">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-accent-dim)] bg-[var(--color-accent-dim)] text-[var(--color-accent)] shadow-sm">
                              {solution.icon}
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white leading-tight">{solution.title}</h3>
                              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-secondary)] mt-1.5">{solution.subtitle}</p>
                            </div>
                          </div>

                          <p className="mb-3 text-sm font-semibold text-[var(--color-accent)]">{solution.impact}</p>
                          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed flex-1">{solution.description}</p>

                          <div className="flex gap-4 mt-auto">
                            <Button variant="outline" size="lg" href={solution.href}>
                               View Solution <ArrowRight size={16} />
                            </Button>
                          </div>
                        </div>
                      </article>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Cursors */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 lg:px-12 pointer-events-none z-50">
             <button 
                onClick={handlePrev} 
                className="pointer-events-auto h-14 w-14 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-lg flex justify-center items-center text-white hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--color-accent)] transition-all hover:scale-110 active:scale-95"
             >
                <ChevronLeft size={24} />
             </button>
             <button 
                onClick={handleNext} 
                className="pointer-events-auto h-14 w-14 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-lg flex justify-center items-center text-white hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--color-accent)] transition-all hover:scale-110 active:scale-95"
             >
                <ChevronRight size={24} />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}
