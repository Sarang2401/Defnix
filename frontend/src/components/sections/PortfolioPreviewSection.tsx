import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageTransition } from "../ui/PageTransition";
import { TiltCard } from "../ui/TiltCard";

const studies = [
  {
    title: "SaaS Startup achieved SOC2 Type I in 8 weeks",
    service: "Security",
    metric: "8 weeks to audit readiness",
  },
  {
    title: "Local cafe website reached #1 for coffee shop in Melbourne",
    service: "Web",
    metric: "#1 local ranking",
  },
  {
    title: "Agency reduced onboarding from 3 hours to near zero",
    service: "Automation",
    metric: "~3 hours saved per client",
  },
  {
    title: "Dental booking app generated 200+ bookings in month one",
    service: "Mobile",
    metric: "200+ bookings in 30 days",
  },
];

export function PortfolioPreviewSection() {
  return (
    <section className="section-gap border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <PageTransition>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                Portfolio Preview
              </p>
              <h2 className="text-3xl sm:text-4xl text-[var(--color-text-primary)]">Proof, not promises.</h2>
            </div>
            <Link href="/case-studies" className="hidden sm:inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">
              View all case studies <ArrowRight size={14} />
            </Link>
          </div>
        </PageTransition>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {studies.map((study, index) => (
            <PageTransition key={study.title} delay={index * 0.06}>
              <TiltCard tiltAmount={6} className="h-full block">
                <article className="card-glow rounded-xl bg-[rgba(9,9,11,0.7)] border border-[rgba(255,255,255,0.05)] backdrop-blur-xl p-6 h-full flex flex-col justify-between hover:border-[rgba(255,255,255,0.15)] transition-colors">
                  <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-accent-secondary)]">{study.service}</span>
                  <h3 className="text-base text-[var(--color-text-primary)] mt-3 mb-3 leading-snug">{study.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{study.metric}</p>
                </article>
              </TiltCard>
            </PageTransition>
          ))}
        </div>
      </div>
    </section>
  );
}
