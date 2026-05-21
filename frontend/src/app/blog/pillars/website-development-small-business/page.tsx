import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Development Pillar",
  description: "Hub for SEO-ready website engineering and conversion architecture for SMBs.",
};

export default function WebsitePillarPage() {
  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-6">
      <h1 className="text-4xl text-[var(--color-text-primary)] mb-4">Website Development for Small Business</h1>
      <p className="text-[var(--color-text-secondary)] mb-8">Guides on site performance, search visibility, and conversion-focused builds.</p>
      <div className="space-y-3">
        <Link href="/case-studies" className="block rounded border border-[var(--color-border)] p-4 hover:border-[var(--color-border-hover)]">View Website Case Studies</Link>
        <Link href="/contact" className="block rounded border border-[var(--color-border)] p-4 hover:border-[var(--color-border-hover)]">Book Free Consultation</Link>
      </div>
    </div>
  );
}
