import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cloud Security Pillar",
  description: "Hub for cloud resilience, risk reduction, and incident readiness.",
};

export default function CloudPillarPage() {
  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-6">
      <h1 className="text-4xl text-[var(--color-text-primary)] mb-4">Cloud Security for Startups</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Practical engineering guidance on architecture hardening, DR, and incident response.</p>
      <div className="space-y-3">
        <Link href="/blog/cloud-insurance-engineering-discipline" className="block rounded border border-[var(--color-border)] p-4 hover:border-[var(--color-border-hover)]">Cloud Insurance Is Not a Product</Link>
        <Link href="/solutions/cloud-insurance" className="block rounded border border-[var(--color-border)] p-4 hover:border-[var(--color-border-hover)]">Cloud Insurance Solution</Link>
      </div>
    </div>
  );
}
