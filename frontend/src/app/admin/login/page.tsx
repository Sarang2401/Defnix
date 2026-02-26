"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Shield } from "lucide-react";

export default function AdminLoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Brand */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] mb-4">
                        <Shield size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-[#F1F5F9] tracking-tight">
                        Def<span className="text-[#00D4FF]">nix</span> Admin
                    </h1>
                    <p className="text-sm text-[#94A3B8] mt-1">
                        Sign in to manage your platform
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="rounded-md bg-[#FF4757]/10 border border-[#FF4757]/30 px-4 py-3 text-sm text-[#FF4757]">
                            {error}
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors"
                            placeholder="admin@defnix.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#00D4FF] text-[#0A0F1C] font-semibold py-2.5 rounded-md text-sm hover:bg-[#00D4FF]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
                    >
                        {loading ? "Signing in…" : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
