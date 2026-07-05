"use client";

import Link from "next/link";
import { useState } from "react";

/* ─── Social icons (inline SVGs matching the reference HTML) ─── */
const LinkedInIcon = () => (
  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      clipRule="evenodd"
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
      fillRule="evenodd"
    />
  </svg>
);

const XIcon = () => (
  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = () => (
  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      fillRule="evenodd"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      clipRule="evenodd"
      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
      fillRule="evenodd"
    />
  </svg>
);

/* ─── Service tiles for the 2×2 grid ─────────────── */
const serviceTiles = [
  { label: "SOC2",     inverted: false },
  { label: "Cloud",    inverted: true  },
  { label: "AI",       inverted: false },
  { label: "Web/\nMobile", inverted: false },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      await fetch(`${apiUrl}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch { /* intentional */ }
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      style={{ backgroundColor: "var(--color-surface)" }}
      className="w-full border-t"
      aria-label="Site footer"
    >
      {/* ── Main grid ──────────────────────────────── */}
      <div
        className="max-w-7xl mx-auto grid grid-cols-12 gap-8"
        style={{ padding: "var(--spacing-xl)", borderColor: "var(--color-border)" }}
      >

        {/* ── Col 1-5: Newsletter ─────────────────── */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-start">
          <h2
            className="type-headline mb-4"
            style={{ color: "var(--color-mist)" }}
          >
            Stay in the loop
          </h2>
          <p
            className="type-body mb-10"
            style={{
              color: "var(--color-text-secondary)",
              maxWidth: "36ch",
            }}
          >
            Get updates on our latest case studies, security insights, and engineering notes.
          </p>

          {subscribed ? (
            <p
              className="type-label"
              style={{ color: "var(--color-sage)" }}
            >
              ✓ subscribed successfully
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: "420px",
                backgroundColor: "var(--color-secondary)",
                border: "1px solid var(--color-pine)",
                borderRadius: "var(--radius-pill)",
                padding: "6px 6px 6px 20px",
                gap: "8px",
                boxSizing: "border-box",
                transition: "border-color 0.2s ease",
              }}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = "var(--color-sage)")}
              onBlurCapture={(e) => (e.currentTarget.style.borderColor = "var(--color-pine)")}
            >
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: 1,
                  minWidth: 0,
                  backgroundColor: "transparent",
                  color: "var(--color-mist)",
                  border: "none",
                  outline: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-body-md)",
                  lineHeight: "1.5",
                }}
              />
              <button
                type="submit"
                style={{
                  flexShrink: 0,
                  backgroundColor: "var(--color-mist)",
                  color: "var(--color-surface)",
                  borderRadius: "var(--radius-pill)",
                  padding: "10px 24px",
                  fontFamily: "var(--font-label)",
                  fontSize: "var(--text-label-caps)",
                  fontWeight: "500",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-sage)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-mist)")}
              >
                Submit
              </button>
            </form>
          )}
        </div>

        {/* ── Col 6-8: Link columns ───────────────── */}
        <div
          className="col-span-12 md:col-span-3 grid grid-cols-2 gap-6 pl-8"
          style={{ borderLeft: "1px solid var(--color-border)" }}
        >
          {/* Solutions */}
          <div className="flex flex-col gap-4">
            <h3
              className="type-label mb-2"
              style={{ color: "var(--color-pine)" }}
            >
              Solutions
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/solutions/soc2-failure-prevention", label: "SOC2 Failure Prevention" },
                { href: "/solutions/cloud-insurance",         label: "Cloud Insurance" },
                { href: "/solutions/ai-soc-analyst",         label: "AI SOC Analyst" },
                { href: "/solutions/website-development",    label: "Website Development" },
                { href: "/solutions/mobile-development",     label: "Mobile App Development" },
                { href: "/solutions/business-automation",    label: "Business Automation" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-label"
                    style={{ color: "var(--color-text-secondary)", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-sage)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h3
              className="type-label mb-2"
              style={{ color: "var(--color-pine)" }}
            >
              Resources
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/blog",          label: "Blog" },
                { href: "/case-studies",  label: "Case Studies" },
                { href: "/about",         label: "About Us" },
                { href: "/contact",       label: "Get in Touch" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-label"
                    style={{ color: "var(--color-text-secondary)", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-sage)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Col 9-12: 2×2 Service tile grid ────── */}
        <div
          className="col-span-12 md:col-span-4 pl-8"
          style={{ borderLeft: "1px solid var(--color-border)" }}
        >
          <div className="grid grid-cols-2 gap-2" style={{ aspectRatio: "1 / 1" }}>
            {serviceTiles.map((tile) =>
              tile.inverted ? (
                /* Inverted tile — mist bg, surface text */
                <div
                  key={tile.label}
                  className="flex items-center justify-center text-center transition-colors duration-200"
                  style={{
                    backgroundColor: "var(--color-mist)",
                    borderRadius: "var(--radius-md)",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-sage)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-mist)")}
                >
                  <span
                    className="type-label"
                    style={{ color: "var(--color-surface)" }}
                  >
                    {tile.label}
                  </span>
                </div>
              ) : (
                /* Default tile — secondary bg */
                <div
                  key={tile.label}
                  className="flex items-center justify-center text-center transition-colors duration-200"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-pine)";
                    const span = e.currentTarget.querySelector("span");
                    if (span) span.style.color = "var(--color-sage)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    const span = e.currentTarget.querySelector("span");
                    if (span) span.style.color = "var(--color-mist)";
                  }}
                >
                  <span
                    className="type-label whitespace-pre-line leading-tight"
                    style={{ color: "var(--color-mist)", transition: "color 0.2s ease" }}
                  >
                    {tile.label}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Bottom bar (full-width) ──────────────── */}
        <div
          className="col-span-12 flex flex-col md:flex-row justify-between items-center gap-4 pt-8 mt-4"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          {/* Far left — studio name */}
          <div
            className="type-label"
            style={{ color: "var(--color-mist)", letterSpacing: "-0.02em" }}
          >
            defnix engineering studio
          </div>

          {/* Center — social icons */}
          <div className="flex gap-4">
            {[
              { Icon: LinkedInIcon, href: "#", label: "LinkedIn" },
              { Icon: XIcon,        href: "#", label: "X" },
              { Icon: GitHubIcon,   href: "#", label: "GitHub" },
              { Icon: InstagramIcon,href: "#", label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{ color: "var(--color-text-muted)", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-sage)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Far right — legal + copyright */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2 type-label" style={{ color: "var(--color-text-muted)" }}>
              {[
                { href: "/privacy-policy",   label: "Privacy Policy" },
                { href: "/terms-of-service", label: "Terms of Service" },
                { href: "/disclaimer",       label: "Disclaimer" },
              ].map((link, i, arr) => (
                <span key={link.href} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    style={{ transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-sage)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                  >
                    {link.label}
                  </Link>
                  {i < arr.length - 1 && <span>·</span>}
                </span>
              ))}
            </div>
            <div className="type-label" style={{ color: "var(--color-text-muted)" }}>
              © {new Date().getFullYear()} defnix engineering studio
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
