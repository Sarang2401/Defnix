"use client";

import { useEffect, useState } from "react";
import { fetchApiAuth } from "@/lib/api";
import { Mail, Clock } from "lucide-react";

interface Subscriber {
    id: string;
    email: string;
    subscribedAt: string;
    unsubscribedAt: string | null;
}

export default function AdminNewsletterPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchApiAuth<Subscriber[]>("newsletter/subscribers");
                setSubscribers(Array.isArray(data) ? data : []);
            } catch {
                setSubscribers([]);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const active = subscribers.filter((s) => !s.unsubscribedAt);
    const unsubscribed = subscribers.filter((s) => s.unsubscribedAt);

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#F1F5F9]">Newsletter</h1>
                <p className="text-sm text-[#94A3B8] mt-1">
                    {active.length} active subscriber{active.length !== 1 ? "s" : ""}
                    {unsubscribed.length > 0 && (
                        <span className="text-[#94A3B8]/60">
                            {" "}· {unsubscribed.length} unsubscribed
                        </span>
                    )}
                </p>
            </div>

            {/* Stat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                <div className="bg-[#111827] border border-[#1E293B] rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-md bg-[#2ECC71]/10 text-[#2ECC71] flex items-center justify-center">
                            <Mail size={18} />
                        </div>
                        <p className="text-xs text-[#94A3B8] uppercase font-mono tracking-wider">
                            Active
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-[#F1F5F9] font-mono">
                        {loading ? "—" : active.length}
                    </p>
                </div>
                <div className="bg-[#111827] border border-[#1E293B] rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-md bg-[#94A3B8]/10 text-[#94A3B8] flex items-center justify-center">
                            <Mail size={18} />
                        </div>
                        <p className="text-xs text-[#94A3B8] uppercase font-mono tracking-wider">
                            Unsubscribed
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-[#F1F5F9] font-mono">
                        {loading ? "—" : unsubscribed.length}
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#111827] border border-[#1E293B] rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#1E293B] text-left">
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider hidden md:table-cell">
                                Subscribed
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i}>
                                    <td className="px-5 py-4" colSpan={3}>
                                        <div className="h-4 bg-[#1E293B] rounded animate-pulse w-1/2" />
                                    </td>
                                </tr>
                            ))
                        ) : subscribers.length === 0 ? (
                            <tr>
                                <td className="px-5 py-10 text-center text-[#94A3B8]" colSpan={3}>
                                    No subscribers yet.
                                </td>
                            </tr>
                        ) : (
                            subscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-[#1E293B]/40 transition-colors">
                                    <td className="px-5 py-3.5 text-[#F1F5F9]">
                                        {sub.email}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span
                                            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${sub.unsubscribedAt
                                                    ? "bg-[#94A3B8]/10 text-[#94A3B8]"
                                                    : "bg-[#2ECC71]/10 text-[#2ECC71]"
                                                }`}
                                        >
                                            {sub.unsubscribedAt ? "Unsubscribed" : "Active"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-xs text-[#94A3B8] hidden md:table-cell">
                                        <span className="flex items-center gap-1">
                                            <Clock size={10} />
                                            {new Date(sub.subscribedAt).toLocaleDateString()}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
