import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Business Automation Pillar",
  description: "Hub for workflow automation with n8n, Make, and AI-assisted operations.",
};

export default function AutomationPillarPage() {
  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-6">
      <h1 className="text-4xl text-[var(--color-text-primary)] mb-4">Business Automation Pillar</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Automation strategies to eliminate repetitive ops work and improve team throughput.</p>
      <div className="space-y-3">
        <Link href="/blog/ai-augmented-soc-analyst" className="block rounded border border-[var(--color-border)] p-4 hover:border-[var(--color-border-hover)]">AI-Augmented SOC Analyst</Link>
        <Link href="/solutions/ai-soc-analyst" className="block rounded border border-[var(--color-border)] p-4 hover:border-[var(--color-border-hover)]">AI SOC Solution</Link>
      </div>
    </div>
  );
}
