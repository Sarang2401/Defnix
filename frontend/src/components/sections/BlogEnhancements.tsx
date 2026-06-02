"use client";

import { useEffect, useState } from "react";

interface BlogEnhancementsProps {
  headings: { id: string; text: string; level: 2 | 3 }[];
}

export function BlogEnhancements({ headings }: BlogEnhancementsProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const next = total > 0 ? (doc.scrollTop / total) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, next)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[80] h-0.5 bg-[var(--color-border)]">
        <div className="h-full bg-[var(--color-accent)]" style={{ width: `${progress}%` }} />
      </div>

      {headings.length > 0 && (
        <aside className="my-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
          <p className="mb-3 font-[var(--font-mono)] text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Table of contents</p>
          <div className="space-y-2">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`block text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] ${heading.level === 3 ? "pl-4" : ""}`}
              >
                {heading.text}
              </a>
            ))}
          </div>
        </aside>
      )}
    </>
  );
}
