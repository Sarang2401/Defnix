"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { motion } from "framer-motion";

/* ── Barcode decoration ─────────────────────────────── */
function BarcodeLines() {
    return (
        <svg
            width="44"
            height="16"
            viewBox="0 0 44 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {[0, 3, 5, 9, 12, 14, 18, 21, 23, 27, 30, 32, 36, 39, 42].map((x) => (
                <rect
                    key={x}
                    x={x}
                    y={0}
                    width={x % 9 === 0 ? 2 : 1}
                    height={16}
                    fill="var(--color-mist)"
                    opacity={0.3}
                />
            ))}
        </svg>
    );
}

/* ── Underline form field ───────────────────────────── */
function FormField({
    id,
    label,
    type = "text",
    placeholder,
}: {
    id: string;
    label: string;
    type?: string;
    placeholder: string;
}) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
                htmlFor={id}
                style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-mist)",
                }}
            >
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: focused
                        ? "1px solid var(--color-mist)"
                        : "1px solid rgba(202,210,197,0.2)",
                    color: "var(--color-mist)",
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    padding: "8px 0",
                    outline: "none",
                    width: "100%",
                    transition: "border-color 0.2s ease",
                }}
            />
        </div>
    );
}

/* ── Contact form ───────────────────────────────────── */
function ContactFormInline() {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [btnHovered, setBtnHovered] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div
                style={{
                    padding: "48px 0",
                    textAlign: "center",
                    fontFamily: "var(--font-body)",
                    color: "var(--color-sage)",
                    fontSize: "1rem",
                }}
            >
                ✓ Message sent — we&apos;ll get back within one business day.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Name + Email */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "32px",
                }}
            >
                <FormField id="name" label="NAME" placeholder="Jane Doe" />
                <FormField id="email" label="EMAIL" type="email" placeholder="jane@company.com" />
            </div>

            {/* Company */}
            <FormField id="company" label="COMPANY (OPTIONAL)" placeholder="Acme Corp" />

            {/* Message textarea */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label
                    htmlFor="message"
                    style={{
                        fontFamily: "var(--font-label)",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-mist)",
                    }}
                >
                    MESSAGE
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="How can we help you?"
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    style={{
                        background: "transparent",
                        border: "none",
                        borderBottom: focusedField === "message"
                            ? "1px solid var(--color-mist)"
                            : "1px solid rgba(202,210,197,0.2)",
                        color: "var(--color-mist)",
                        fontFamily: "var(--font-body)",
                        fontSize: "1rem",
                        lineHeight: "1.6",
                        padding: "8px 0",
                        outline: "none",
                        resize: "none",
                        width: "100%",
                        transition: "border-color 0.2s ease",
                    }}
                />
            </div>

            {/* Submit */}
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "8px" }}>
                <button
                    type="submit"
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: btnHovered ? "var(--color-sage)" : "var(--color-mist)",
                        color: "var(--color-surface)",
                        borderRadius: "var(--radius-pill)",
                        padding: "14px 32px",
                        fontFamily: "var(--font-label)",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease",
                    }}
                >
                    SEND MESSAGE
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </form>
    );
}

/* ── Page ───────────────────────────────────────────── */
export default function ContactPage() {
    const [emailHovered, setEmailHovered] = useState(false);

    return (
        <main
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundColor: "var(--color-secondary)",
                paddingTop: "120px",
                paddingBottom: "80px",
                paddingLeft: "clamp(24px, 5vw, 64px)",
                paddingRight: "clamp(24px, 5vw, 64px)",
            }}
        >
            <div
                className="w-full mx-auto grid grid-cols-1 md:grid-cols-2"
                style={{ maxWidth: "1100px", gap: "clamp(48px, 8vw, 120px)" }}
            >
                {/* ── Left: Context ──────────────────────────────── */}
                <motion.div
                    className="flex flex-col justify-center"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h1
                        style={{
                            fontFamily: "var(--font-headline)",
                            fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                            fontWeight: 600,
                            lineHeight: 1.1,
                            color: "var(--color-mist)",
                            marginBottom: "16px",
                        }}
                    >
                        Let&apos;s talk.
                    </h1>

                    <p
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "1rem",
                            lineHeight: 1.6,
                            color: "rgba(202,210,197,0.75)",
                            maxWidth: "38ch",
                            marginBottom: "64px",
                        }}
                    >
                        Tell us what you&apos;re building — we&apos;ll get back within one business day.
                    </p>

                    <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "32px" }}>
                        <div style={{ marginBottom: "20px" }}>
                            <span
                                style={{
                                    display: "block",
                                    fontFamily: "var(--font-label)",
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "var(--color-text-muted)",
                                    marginBottom: "8px",
                                }}
                            >
                                DIRECT INQUIRIES
                            </span>
                            <a
                                href="mailto:hello@defnix.com"
                                onMouseEnter={() => setEmailHovered(true)}
                                onMouseLeave={() => setEmailHovered(false)}
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "1rem",
                                    color: "var(--color-mist)",
                                    fontWeight: 500,
                                    textDecoration: "none",
                                    opacity: emailHovered ? 0.7 : 1,
                                    transition: "opacity 0.2s ease",
                                }}
                            >
                                hello@defnix.com
                            </a>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <BarcodeLines />
                            <span
                                style={{
                                    fontFamily: "var(--font-label)",
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "var(--color-mist)",
                                }}
                            >
                                BENGALURU, INDIA
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* ── Right: Form ────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                    <div
                        style={{
                            backgroundColor: "rgba(47,62,70,0.4)",
                            border: "1px solid var(--color-border)",
                            borderRadius: "12px",
                            padding: "clamp(24px, 4vw, 40px)",
                        }}
                    >
                        <ContactFormInline />
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
