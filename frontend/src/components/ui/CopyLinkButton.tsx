"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";

interface CopyLinkButtonProps {
  url: string;
}

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-xs text-[var(--color-accent)]"
      aria-label="Copy article link"
    >
      <Link2 size={12} />
      {copied ? "Copied" : "Copy Link"}
    </button>
  );
}
