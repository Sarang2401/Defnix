import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SOC2 Compliance Pillar",
  description: "Hub for SOC2 readiness articles, checklists, and engineering playbooks.",
};

export default function Soc2PillarPage() {
  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-6">
      <h1 className="text-4xl text-[var(--color-text-primary)] mb-4">SOC2 Compliance Pillar</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Foundational resources for passing SOC2 audits with engineering-first controls and evidence automation.</p>
      <div className="space-y-3">
        <Link href="/blog/why-73-percent-soc2-audits-fail" className="block rounded border border-[var(--color-border)] p-4 hover:border-[var(--color-border-hover)]">Why 73% of SOC2 Audits Fail</Link>
        <Link href="/solutions/soc2-failure-prevention" className="block rounded border border-[var(--color-border)] p-4 hover:border-[var(--color-border-hover)]">SOC2 Failure Prevention Solution</Link>
      </div>
    </div>
  );
}
