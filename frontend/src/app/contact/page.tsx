"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Mail, Sparkles, CheckCircle, AlertCircle, Send } from "lucide-react";

/* ── Neumorphic input field ──────────────────────────── */
function NeuField({
    id, label, type = "text", placeholder, value, onChange, required,
}: {
    id: string; label: string; type?: string;
    placeholder: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label htmlFor={id} style={{
                fontFamily: "var(--font-label)", fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: focused ? "#84A98C" : "rgba(202,210,197,0.5)",
                transition: "color 0.2s ease",
            }}>
                {label}{required && <span style={{ color: "#84A98C", marginLeft: 3 }}>*</span>}
            </label>
            <div style={{ position: "relative" }}>
                <input
                    id={id} name={id} type={type} placeholder={placeholder}
                    value={value} onChange={onChange}
                    required={required}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{
                        width: "100%",
                        background: focused
                            ? "linear-gradient(145deg, #253540, #2a3d45)"
                            : "linear-gradient(145deg, #2a3d45, #2F3E46)",
                        border: focused
                            ? `1px solid rgba(132,169,140,0.4)`
                            : "1px solid rgba(82,121,111,0.2)",
                        borderRadius: "12px",
                        color: "#CAD2C5",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        padding: "12px 16px",
                        outline: "none",
                        boxShadow: focused
                            ? `inset 3px 3px 8px #1e2b31, inset -2px -2px 5px #3a4e57, 0 0 0 1px rgba(132,169,140,0.15)`
                            : "3px 3px 8px #1e2b31, -1px -1px 5px #3f5461",
                        transition: "all 0.25s ease",
                    }}
                />
            </div>
        </div>
    );
}

/* ── Neumorphic textarea ─────────────────────────────── */
function NeuTextarea({
    id, label, placeholder, value, onChange, required, rows = 5,
}: {
    id: string; label: string; placeholder: string;
    value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean; rows?: number;
}) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label htmlFor={id} style={{
                fontFamily: "var(--font-label)", fontSize: "0.7rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: focused ? "#84A98C" : "rgba(202,210,197,0.5)",
                transition: "color 0.2s ease",
            }}>
                {label}{required && <span style={{ color: "#84A98C", marginLeft: 3 }}>*</span>}
            </label>
            <textarea
                id={id} name={id} rows={rows} placeholder={placeholder}
                value={value} onChange={onChange} required={required}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    width: "100%", resize: "none",
                    background: focused
                        ? "linear-gradient(145deg, #253540, #2a3d45)"
                        : "linear-gradient(145deg, #2a3d45, #2F3E46)",
                    border: focused
                        ? "1px solid rgba(132,169,140,0.4)"
                        : "1px solid rgba(82,121,111,0.2)",
                    borderRadius: "12px",
                    color: "#CAD2C5",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    padding: "12px 16px",
                    outline: "none",
                    boxShadow: focused
                        ? "inset 3px 3px 8px #1e2b31, inset -2px -2px 5px #3a4e57, 0 0 0 1px rgba(132,169,140,0.15)"
                        : "3px 3px 8px #1e2b31, -1px -1px 5px #3f5461",
                    transition: "all 0.25s ease",
                }}
            />
        </div>
    );
}

/* ── Service selector chips ──────────────────────────── */
const services = [
    "SOC2 Compliance", "Cloud Security", "AI SOC Analyst",
    "Website Dev", "Mobile App", "Business Automation",
];

/* ── Contact form ────────────────────────────────────── */
function ContactFormInline() {
    const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [btnHovered, setBtnHovered] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const toggleService = (s: string) => {
        setSelectedServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
            const res = await fetch(`${apiUrl}/leads`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, services: selectedServices, source: "contact-page" }),
            });
            if (!res.ok) throw new Error();
            setStatus("success");
            setForm({ name: "", email: "", company: "", message: "" });
            setSelectedServices([]);
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ padding: "56px 0", textAlign: "center" }}
            >
                <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "linear-gradient(145deg, #2a3d45, #354F52)",
                    border: "1px solid rgba(132,169,140,0.3)",
                    boxShadow: "4px 4px 12px #1e2b31, -2px -2px 8px #3f5461, 0 0 20px rgba(132,169,140,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                }}>
                    <CheckCircle size={28} color="#84A98C" />
                </div>
                <h3 style={{ fontFamily: "var(--font-headline)", fontSize: "1.4rem", color: "#CAD2C5", marginBottom: 8 }}>
                    message sent!
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(202,210,197,0.5)", lineHeight: 1.6 }}>
                    we&apos;ll get back within one business day.
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Service chips */}
            <div>
                <p style={{
                    fontFamily: "var(--font-label)", fontSize: "0.7rem", fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "rgba(202,210,197,0.4)", marginBottom: 12,
                }}>
                    I&apos;m interested in
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {services.map((s) => {
                        const active = selectedServices.includes(s);
                        return (
                            <button key={s} type="button" onClick={() => toggleService(s)} style={{
                                borderRadius: "999px",
                                padding: "6px 14px",
                                fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase",
                                fontFamily: "var(--font-label)", fontWeight: 500,
                                cursor: "pointer", border: "none", transition: "all 0.2s ease",
                                background: active
                                    ? "linear-gradient(145deg, #2a3d45, #354F52)"
                                    : "linear-gradient(145deg, #354F52, #2d4449)",
                                color: active ? "#84A98C" : "rgba(202,210,197,0.45)",
                                boxShadow: active
                                    ? `inset 2px 2px 6px #1e2b31, inset -1px -1px 4px #3f5461, 0 0 8px rgba(132,169,140,0.15)`
                                    : "2px 2px 6px #1e2b31, -1px -1px 4px #3f5461",
                                outline: active ? "1px solid rgba(132,169,140,0.3)" : "none",
                            }}>
                                {s}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <NeuField id="name" label="Name" placeholder="Jane Doe" value={form.name} onChange={handleChange} required />
                <NeuField id="email" label="Email" type="email" placeholder="jane@company.com" value={form.email} onChange={handleChange} required />
            </div>

            {/* Company */}
            <NeuField id="company" label="Company (optional)" placeholder="Acme Corp" value={form.company} onChange={handleChange} />

            {/* Message */}
            <NeuTextarea id="message" label="Message" placeholder="Tell us about your project..." value={form.message} onChange={handleChange} required />

            {/* Error */}
            {status === "error" && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(202,210,197,0.5)", fontSize: "13px" }}>
                    <AlertCircle size={14} />
                    something went wrong. please try again or email us directly.
                </div>
            )}

            {/* Submit */}
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 4 }}>
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        backgroundColor: btnHovered ? "#84A98C" : "#CAD2C5",
                        color: "#2F3E46",
                        borderRadius: "999px", padding: "14px 32px",
                        fontFamily: "var(--font-label)", fontSize: "0.75rem",
                        fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                        border: "none", cursor: "pointer",
                        boxShadow: btnHovered
                            ? "inset 2px 2px 6px rgba(30,43,49,0.2), 0 0 20px rgba(132,169,140,0.25)"
                            : "5px 5px 14px #1e2b31, -2px -2px 8px #3f5461",
                        transform: btnHovered ? "scale(0.98)" : "scale(1)",
                        transition: "all 0.25s ease",
                        opacity: status === "submitting" ? 0.7 : 1,
                    }}
                >
                    {status === "submitting" ? "sending..." : "send message"}
                    <Send size={13} />
                </button>
            </div>
        </form>
    );
}

/* ── Info chip ───────────────────────────────────────── */
function InfoChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 18px", borderRadius: "14px",
            background: "linear-gradient(145deg, #2a3d45, #2F3E46)",
            border: "1px solid rgba(82,121,111,0.2)",
            boxShadow: "inset 2px 2px 6px #1e2b31, inset -1px -1px 4px #3f5461",
        }}>
            <div style={{
                width: 34, height: 34, borderRadius: "10px", flexShrink: 0,
                background: "linear-gradient(145deg, #354F52, #2d4449)",
                border: "1px solid rgba(82,121,111,0.22)",
                boxShadow: "2px 2px 5px #1e2b31, -1px -1px 3px #3f5461",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(202,210,197,0.35)", marginBottom: 2, fontWeight: 600 }}>{label}</p>
                <p style={{ fontSize: "13px", color: "#CAD2C5" }}>{value}</p>
            </div>
        </div>
    );
}

/* ── Page ───────────────────────────────────────────── */
export default function ContactPage() {
    return (
        <main style={{
            backgroundColor: "var(--color-surface)",
            minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px",
            position: "relative",
        }}>
            {/* Diagonal split tone background */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                    <polygon points="0,0 100,0 100,100" fill="rgba(82,121,111,0.03)" />
                    <polygon points="0,0 100,100 0,100" fill="rgba(132,169,140,0.015)" />
                    <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(82,121,111,0.08)" strokeWidth="0.2" />
                </svg>
            </div>

            {/* Floating orbs */}
            <div style={{ position: "fixed", top: "20%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(82,121,111,0.07), transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0, animation: "float-orb-a 14s ease-in-out infinite" }} />
            <div style={{ position: "fixed", bottom: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(132,169,140,0.06), transparent 70%)", filter: "blur(50px)", pointerEvents: "none", zIndex: 0, animation: "float-orb-b 18s ease-in-out infinite" }} />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

                    {/* ── Left panel ─────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
                    >
                        {/* Eyebrow pill */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 7,
                            background: "rgba(30,43,49,0.5)",
                            border: "1px solid rgba(82,121,111,0.2)",
                            borderRadius: "999px", padding: "6px 14px",
                            boxShadow: "3px 3px 8px #1e2b31, -2px -2px 5px #3f5461",
                            marginBottom: 24, width: "fit-content",
                        }}>
                            <Sparkles size={11} color="#84A98C" />
                            <span style={{ fontSize: "10px", color: "#84A98C", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
                                free consultation
                            </span>
                        </div>

                        <h1 style={{
                            fontFamily: "var(--font-headline)",
                            fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
                            fontWeight: 700, lineHeight: 1.08,
                            letterSpacing: "-0.03em", color: "#CAD2C5", marginBottom: 16,
                        }}>
                            let&apos;s talk.
                        </h1>

                        <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(202,210,197,0.6)", maxWidth: "40ch", marginBottom: 40 }}>
                            tell us what you&apos;re building — we&apos;ll get back within one business day
                            with a tailored plan.
                        </p>

                        {/* Info chips */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
                            <InfoChip icon={<Mail size={14} color="#84A98C" />} label="Direct inquiries" value="hello@defnix.com" />
                            <InfoChip icon={<MapPin size={14} color="#52796F" />} label="Location" value="Bengaluru, India" />
                        </div>

                        {/* Promise items */}
                        <div style={{
                            padding: "20px 24px", borderRadius: "16px",
                            background: "linear-gradient(145deg, #2a3d45, #2F3E46)",
                            border: "1px solid rgba(82,121,111,0.18)",
                            boxShadow: "inset 3px 3px 8px #1e2b31, inset -2px -2px 5px #3f5461",
                        }}>
                            <p style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(202,210,197,0.3)", marginBottom: 14, fontWeight: 600 }}>what to expect</p>
                            {[
                                "Response within 1 business day",
                                "30-min discovery call — no pressure",
                                "Tailored recommendation for your goals",
                            ].map((item) => (
                                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                    <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#84A98C", boxShadow: "0 0 5px rgba(132,169,140,0.6)", flexShrink: 0 }} />
                                    <span style={{ fontSize: "13px", color: "rgba(202,210,197,0.6)" }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Right: form ────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                    >
                        <div style={{
                            borderRadius: "24px",
                            padding: "clamp(28px, 5vw, 44px)",
                            position: "relative", overflow: "hidden",
                            background: "linear-gradient(145deg, #354F52, #2d4449)",
                            border: "1px solid rgba(82,121,111,0.22)",
                            boxShadow: "8px 8px 24px #1e2b31, -4px -4px 16px #3f5461",
                        }}>
                            {/* Top accent */}
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #84A98C, #52796F, transparent)" }} />
                            {/* Corner glow */}
                            <div style={{ position: "absolute", top: 0, right: 0, width: 160, height: 160, background: "radial-gradient(circle at top right, rgba(132,169,140,0.08), transparent 65%)", pointerEvents: "none" }} />

                            <ContactFormInline />
                        </div>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
