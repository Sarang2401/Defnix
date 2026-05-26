"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";
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
        "w-full px-5 py-3.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-[15px] text-white placeholder:text-[rgba(245,247,249,0.3)] focus:outline-none focus:border-[var(--color-accent)] focus:bg-[rgba(255,255,255,0.05)] transition-all duration-300 font-[var(--font-body)]";

    return (
        <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl"
                    >
                        <CheckCircle size={56} className="text-[var(--color-success)] mb-5 drop-shadow-[0_0_12px_rgba(40,200,64,0.4)]" />
                        <h3 className="text-2xl text-white mb-2 font-[var(--font-display)] font-semibold">
                            Message sent
                        </h3>
                        <p className="text-[15px] text-[rgba(245,247,249,0.6)]">
                            We&apos;ll respond within 1 business day.
                        </p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-8 text-sm font-semibold text-[var(--color-accent-bright)] hover:text-white transition-colors"
                        >
                            Send another message
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-[11px] font-mono text-[rgba(245,247,249,0.5)] uppercase tracking-widest mb-2.5 pl-1"
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
                                    className="block text-[11px] font-mono text-[rgba(245,247,249,0.5)] uppercase tracking-widest mb-2.5 pl-1"
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
                                className="block text-[11px] font-mono text-[rgba(245,247,249,0.5)] uppercase tracking-widest mb-2.5 pl-1"
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
                                className="block text-[11px] font-mono text-[rgba(245,247,249,0.5)] uppercase tracking-widest mb-2.5 pl-1"
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
                            <div className="flex items-center gap-2.5 text-[13px] text-[#ff5f57] bg-[rgba(255,95,87,0.1)] border border-[rgba(255,95,87,0.2)] p-3 rounded-xl">
                                <AlertCircle size={16} />
                                Something went wrong. Please try again or email us directly.
                            </div>
                        )}

                        <div className="pt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                disabled={status === "submitting"}
                                className="w-full"
                            >
                                {status === "submitting" ? "Sending..." : "Send Message"}
                                <Send size={16} />
                            </Button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
