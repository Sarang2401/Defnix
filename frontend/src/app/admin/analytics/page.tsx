"use client";

import { useEffect, useState } from "react";
import { fetchApiAuth } from "@/lib/api";
import { BarChart3, TrendingUp } from "lucide-react";

interface AnalyticsSummary {
    totalEvents: number;
    eventTypes: Record<string, number>;
}

export default function AdminAnalyticsPage() {
    const [data, setData] = useState<AnalyticsSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetchApiAuth<AnalyticsSummary>("analytics/summary");
                setData(res);
            } catch {
                setData({ totalEvents: 0, eventTypes: {} });
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const eventEntries = data
        ? Object.entries(data.eventTypes).sort(([, a], [, b]) => b - a)
        : [];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#F1F5F9]">Analytics</h1>
                <p className="text-sm text-[#94A3B8] mt-1">
                    Event tracking overview
                </p>
            </div>

            {/* Total */}
            <div className="bg-[#111827] border border-[#1E293B] rounded-lg p-6 mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-md bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center">
                        <BarChart3 size={18} />
                    </div>
                    <p className="text-xs text-[#94A3B8] uppercase font-mono tracking-wider">
                        Total Events Tracked
                    </p>
                </div>
                <p className="text-3xl font-bold text-[#F1F5F9] font-mono">
                    {loading ? "—" : data?.totalEvents.toLocaleString()}
                </p>
            </div>

            {/* Event Breakdown */}
            <div className="bg-[#111827] border border-[#1E293B] rounded-lg overflow-hidden">
                <div className="px-5 py-4 border-b border-[#1E293B]">
                    <h2 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
                        <TrendingUp size={16} className="text-[#00D4FF]" />
                        Events by Type
                    </h2>
                </div>

                {loading ? (
                    <div className="p-5 space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-8 bg-[#1E293B] rounded animate-pulse" />
                        ))}
                    </div>
                ) : eventEntries.length === 0 ? (
                    <div className="px-5 py-10 text-center text-sm text-[#94A3B8]">
                        No events tracked yet. Events will appear once users interact with the site.
                    </div>
                ) : (
                    <div className="divide-y divide-[#1E293B]">
                        {eventEntries.map(([type, count]) => {
                            const maxCount = eventEntries[0]?.[1] || 1;
                            const pct = (count / maxCount) * 100;
                            return (
                                <div key={type} className="px-5 py-3.5">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm text-[#F1F5F9] font-mono">
                                            {type}
                                        </span>
                                        <span className="text-xs text-[#94A3B8] font-mono">
                                            {count.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-[#1E293B] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#00D4FF] rounded-full transition-all duration-500"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
