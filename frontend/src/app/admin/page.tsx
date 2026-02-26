"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchApiAuth } from "@/lib/api";
import {
    FileText,
    Users,
    Mail,
    BarChart3,
    ArrowRight,
    Clock,
} from "lucide-react";

interface DashboardData {
    totalPosts: number;
    totalLeads: number;
    totalSubscribers: number;
    totalEvents: number;
    recentLeads: Array<{
        id: string;
        name: string;
        email: string;
        company: string | null;
        status: string;
        createdAt: string;
    }>;
}

export default function AdminDashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [blogRes, leadsRes, subsRes, analyticsRes] = await Promise.all([
                    fetchApiAuth<{ posts: unknown[]; total: number }>("blog/admin/posts?limit=1").catch(() => ({ posts: [], total: 0 })),
                    fetchApiAuth<{ leads: DashboardData["recentLeads"]; total: number }>("leads?limit=5").catch(() => ({ leads: [], total: 0 })),
                    fetchApiAuth<Array<{ id: string }>>("newsletter/subscribers").catch(() => []),
                    fetchApiAuth<{ totalEvents: number; eventTypes: Record<string, number> }>("analytics/summary").catch(() => ({ totalEvents: 0, eventTypes: {} })),
                ]);
                setData({
                    totalPosts: blogRes.total,
                    totalLeads: leadsRes.total,
                    totalSubscribers: Array.isArray(subsRes) ? subsRes.length : 0,
                    totalEvents: analyticsRes.totalEvents,
                    recentLeads: leadsRes.leads,
                });
            } catch {
                // Fallback if API unreachable
                setData({
                    totalPosts: 0,
                    totalLeads: 0,
                    totalSubscribers: 0,
                    totalEvents: 0,
                    recentLeads: [],
                });
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const statCards = data
        ? [
            { label: "Blog Posts", value: data.totalPosts, icon: FileText, href: "/admin/blog", color: "#00D4FF" },
            { label: "Leads", value: data.totalLeads, icon: Users, href: "/admin/leads", color: "#2ECC71" },
            { label: "Subscribers", value: data.totalSubscribers, icon: Mail, href: "/admin/newsletter", color: "#F59E0B" },
            { label: "Events", value: data.totalEvents, icon: BarChart3, href: "/admin/analytics", color: "#8B5CF6" },
        ]
        : [];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#F1F5F9]">Dashboard</h1>
                <p className="text-sm text-[#94A3B8] mt-1">
                    Overview of your platform activity
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="bg-[#111827] border border-[#1E293B] rounded-lg p-5 animate-pulse h-28"
                        />
                    ))}
                </div>
            ) : (
                <>
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        {statCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <Link
                                    key={card.label}
                                    href={card.href}
                                    className="bg-[#111827] border border-[#1E293B] rounded-lg p-5 hover:border-[#00D4FF]/30 transition-colors group"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div
                                            className="w-9 h-9 rounded-md flex items-center justify-center"
                                            style={{ backgroundColor: `${card.color}15`, color: card.color }}
                                        >
                                            <Icon size={18} />
                                        </div>
                                        <ArrowRight
                                            size={14}
                                            className="text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                    <p className="text-2xl font-bold text-[#F1F5F9] font-mono">
                                        {card.value}
                                    </p>
                                    <p className="text-xs text-[#94A3B8] mt-0.5">
                                        {card.label}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Recent Leads */}
                    <div className="bg-[#111827] border border-[#1E293B] rounded-lg">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E293B]">
                            <h2 className="text-sm font-semibold text-[#F1F5F9]">
                                Recent Leads
                            </h2>
                            <Link
                                href="/admin/leads"
                                className="text-xs text-[#00D4FF] hover:underline"
                            >
                                View all →
                            </Link>
                        </div>
                        {data && data.recentLeads.length > 0 ? (
                            <div className="divide-y divide-[#1E293B]">
                                {data.recentLeads.map((lead) => (
                                    <div
                                        key={lead.id}
                                        className="px-5 py-3.5 flex items-center gap-4"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-[#F1F5F9] truncate">
                                                {lead.name}
                                            </p>
                                            <p className="text-xs text-[#94A3B8] truncate">
                                                {lead.email}
                                                {lead.company ? ` · ${lead.company}` : ""}
                                            </p>
                                        </div>
                                        <span
                                            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${lead.status === "new"
                                                    ? "bg-[#00D4FF]/10 text-[#00D4FF]"
                                                    : lead.status === "contacted"
                                                        ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                                                        : lead.status === "qualified"
                                                            ? "bg-[#2ECC71]/10 text-[#2ECC71]"
                                                            : lead.status === "converted"
                                                                ? "bg-[#8B5CF6]/10 text-[#8B5CF6]"
                                                                : "bg-[#94A3B8]/10 text-[#94A3B8]"
                                                }`}
                                        >
                                            {lead.status}
                                        </span>
                                        <span className="text-[10px] text-[#94A3B8] flex items-center gap-1">
                                            <Clock size={10} />
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-5 py-10 text-center text-sm text-[#94A3B8]">
                                No leads yet. They&apos;ll appear here once visitors submit the contact form.
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
