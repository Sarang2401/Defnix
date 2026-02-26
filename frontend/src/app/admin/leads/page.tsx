"use client";

import { useEffect, useState } from "react";
import { fetchApiAuth } from "@/lib/api";
import { Clock } from "lucide-react";

interface Lead {
    id: string;
    name: string;
    email: string;
    company: string | null;
    message: string;
    source: string | null;
    status: string;
    createdAt: string;
}

const statuses = ["new", "contacted", "qualified", "converted", "closed"];

const statusColors: Record<string, string> = {
    new: "bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/20",
    contacted: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20",
    qualified: "bg-[#2ECC71]/10 text-[#2ECC71] border-[#2ECC71]/20",
    converted: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20",
    closed: "bg-[#94A3B8]/10 text-[#94A3B8] border-[#94A3B8]/20",
};

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const limit = 15;

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const res = await fetchApiAuth<{ leads: Lead[]; total: number }>(
                    `leads?page=${page}&limit=${limit}`,
                );
                setLeads(res.leads);
                setTotal(res.total);
            } catch {
                setLeads([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [page]);

    async function updateStatus(id: string, newStatus: string) {
        try {
            await fetchApiAuth(`leads/${id}/status`, {
                method: "PATCH",
                body: JSON.stringify({ status: newStatus }),
            });
            setLeads((prev) =>
                prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)),
            );
        } catch {
            alert("Failed to update status.");
        }
    }

    const totalPages = Math.ceil(total / limit);

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#F1F5F9]">Leads</h1>
                <p className="text-sm text-[#94A3B8] mt-1">
                    {total} lead{total !== 1 ? "s" : ""} captured
                </p>
            </div>

            {/* Table */}
            <div className="bg-[#111827] border border-[#1E293B] rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#1E293B] text-left">
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                                Contact
                            </th>
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider hidden lg:table-cell">
                                Company
                            </th>
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider hidden md:table-cell">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i}>
                                    <td className="px-5 py-4" colSpan={4}>
                                        <div className="h-4 bg-[#1E293B] rounded animate-pulse w-2/3" />
                                    </td>
                                </tr>
                            ))
                        ) : leads.length === 0 ? (
                            <tr>
                                <td className="px-5 py-10 text-center text-[#94A3B8]" colSpan={4}>
                                    No leads yet. They&apos;ll appear here once visitors submit the contact form.
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <>
                                    <tr
                                        key={lead.id}
                                        className="hover:bg-[#1E293B]/40 transition-colors cursor-pointer"
                                        onClick={() =>
                                            setExpandedId(expandedId === lead.id ? null : lead.id)
                                        }
                                    >
                                        <td className="px-5 py-3.5">
                                            <p className="text-[#F1F5F9] font-medium">
                                                {lead.name}
                                            </p>
                                            <p className="text-xs text-[#94A3B8]">
                                                {lead.email}
                                            </p>
                                        </td>
                                        <td className="px-5 py-3.5 text-[#94A3B8] hidden lg:table-cell">
                                            {lead.company || "—"}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <select
                                                value={lead.status}
                                                onClick={(e) => e.stopPropagation()}
                                                onChange={(e) =>
                                                    updateStatus(lead.id, e.target.value)
                                                }
                                                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border appearance-none cursor-pointer ${statusColors[lead.status] || statusColors.new}`}
                                                style={{ backgroundColor: "transparent" }}
                                            >
                                                {statuses.map((s) => (
                                                    <option key={s} value={s} className="bg-[#111827] text-[#F1F5F9]">
                                                        {s}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-[#94A3B8] hidden md:table-cell">
                                            <span className="flex items-center gap-1">
                                                <Clock size={10} />
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                    </tr>
                                    {expandedId === lead.id && (
                                        <tr key={`${lead.id}-detail`}>
                                            <td
                                                colSpan={4}
                                                className="px-5 py-4 bg-[#0A0F1C]/50"
                                            >
                                                <p className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-2">
                                                    Message
                                                </p>
                                                <p className="text-sm text-[#F1F5F9] leading-relaxed whitespace-pre-wrap">
                                                    {lead.message}
                                                </p>
                                                {lead.source && (
                                                    <p className="text-xs text-[#94A3B8] mt-2">
                                                        Source: {lead.source}
                                                    </p>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 text-xs text-[#94A3B8] bg-[#111827] border border-[#1E293B] rounded hover:text-[#F1F5F9] disabled:opacity-40 transition-colors"
                    >
                        Previous
                    </button>
                    <span className="text-xs text-[#94A3B8] font-mono">
                        {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 text-xs text-[#94A3B8] bg-[#111827] border border-[#1E293B] rounded hover:text-[#F1F5F9] disabled:opacity-40 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
