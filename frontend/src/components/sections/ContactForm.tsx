"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { PageTransition } from "../ui/PageTransition";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });
    const [status, setStatus] = useState<FormStatus>("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
            const res = await fetch(`${apiUrl}/leads`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, source: "contact-page" }),
            });

            if (!res.ok) throw new Error("Submission failed");
            setStatus("success");
            setForm({ name: "", email: "", company: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    const inputClasses =
        "w-full px-4 py-3 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors font-[var(--font-body)]";

    if (status === "success") {
        return (
            <PageTransition>
                <div className="text-center py-12">
                    <CheckCircle size={48} className="text-[var(--color-success)] mx-auto mb-4" />
                    <h3 className="text-xl text-[var(--color-text-primary)] mb-2">
                        Message sent
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                        We&apos;ll respond within 1 business day.
                    </p>
                </div>
            </PageTransition>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-xs font-[var(--font-heading)] text-[var(--color-text-muted)] uppercase tracking-wider mb-2"
                    >
                        Name *
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-xs font-[var(--font-heading)] text-[var(--color-text-muted)] uppercase tracking-wider mb-2"
                    >
                        Email *
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className={inputClasses}
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="company"
                    className="block text-xs font-[var(--font-heading)] text-[var(--color-text-muted)] uppercase tracking-wider mb-2"
                >
                    Company
                </label>
                <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    className={inputClasses}
                />
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="block text-xs font-[var(--font-heading)] text-[var(--color-text-muted)] uppercase tracking-wider mb-2"
                >
                    Message *
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className={`${inputClasses} resize-none`}
                />
            </div>

            {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-[var(--color-danger)]">
                    <AlertCircle size={16} />
                    Something went wrong. Please try again or email us directly.
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === "submitting"}
                className="w-full sm:w-auto"
            >
                {status === "submitting" ? "Sending..." : "Send Message"}
                <Send size={16} />
            </Button>
        </form>
    );
}
