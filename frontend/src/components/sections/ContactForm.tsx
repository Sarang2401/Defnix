"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
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
        "w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors";

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center py-12">
                    <CheckCircle size={48} className="text-white mx-auto mb-4" />
                    <h3 className="text-xl text-white mb-2">
                        message sent
                    </h3>
                    <p className="text-sm text-white/60">
                        we&apos;ll respond within 1 business day.
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-xs text-white/40 uppercase tracking-wider mb-2"
                    >
                        name *
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="jane doe"
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-xs text-white/40 uppercase tracking-wider mb-2"
                    >
                        email *
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
                    className="block text-xs text-white/40 uppercase tracking-wider mb-2"
                >
                    company
                </label>
                <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="acme inc."
                    className={inputClasses}
                />
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="block text-xs text-white/40 uppercase tracking-wider mb-2"
                >
                    message *
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="tell us about your project..."
                    className={`${inputClasses} resize-none`}
                />
            </div>

            {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-white/60">
                    <AlertCircle size={16} />
                    something went wrong. please try again or email us directly.
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === "submitting"}
                className="w-full sm:w-auto"
            >
                {status === "submitting" ? "sending..." : "send message"}
                <Send size={16} />
            </Button>
        </form>
    );
}
