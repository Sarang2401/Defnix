"use client";

import { useEffect, useState } from "react";
import { fetchApiAuth } from "@/lib/api";
import { Plus, Edit, Trash2, X, Save } from "lucide-react";

interface CaseStudy {
    id: string;
    title: string;
    slug: string;
    client: string | null;
    industry: string | null;
    challenge: string;
    solution: string;
    results: string;
    coverImage: string | null;
    publishedAt: string | null;
    createdAt: string;
}

const emptyForm = {
    title: "",
    slug: "",
    client: "",
    industry: "",
    challenge: "",
    solution: "",
    results: "",
    coverImage: "",
};

export default function AdminCaseStudiesPage() {
    const [items, setItems] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        setLoading(true);
        try {
            const data = await fetchApiAuth<CaseStudy[]>("case-studies");
            setItems(Array.isArray(data) ? data : []);
        } catch {
            setItems([]);
        } finally {
            setLoading(false);
        }
    }

    function openCreate() {
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(true);
        setError("");
    }

    function openEdit(cs: CaseStudy) {
        setForm({
            title: cs.title,
            slug: cs.slug,
            client: cs.client || "",
            industry: cs.industry || "",
            challenge: cs.challenge,
            solution: cs.solution,
            results: cs.results,
            coverImage: cs.coverImage || "",
        });
        setEditingId(cs.id);
        setShowForm(true);
        setError("");
    }

    function update(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSaving(true);
        try {
            if (editingId) {
                await fetchApiAuth(`case-studies/${editingId}`, {
                    method: "PUT",
                    body: JSON.stringify(form),
                });
            } else {
                await fetchApiAuth("case-studies", {
                    method: "POST",
                    body: JSON.stringify(form),
                });
            }
            setShowForm(false);
            loadData();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string, title: string) {
        if (!confirm(`Delete "${title}"?`)) return;
        try {
            await fetchApiAuth(`case-studies/${id}`, { method: "DELETE" });
            setItems((prev) => prev.filter((cs) => cs.id !== id));
        } catch {
            alert("Failed to delete.");
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#F1F5F9]">Case Studies</h1>
                    <p className="text-sm text-[#94A3B8] mt-1">
                        {items.length} case stud{items.length !== 1 ? "ies" : "y"}
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-[#00D4FF] text-[#0A0F1C] font-semibold px-4 py-2 rounded-md text-sm hover:bg-[#00D4FF]/90 transition-colors"
                >
                    <Plus size={16} />
                    New Case Study
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-[#111827] border border-[#1E293B] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-[#F1F5F9]">
                                {editingId ? "Edit" : "New"} Case Study
                            </h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {error && (
                            <div className="rounded-md bg-[#FF4757]/10 border border-[#FF4757]/30 px-4 py-3 text-sm text-[#FF4757] mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-[#94A3B8] mb-1">Title *</label>
                                    <input required value={form.title} onChange={(e) => update("title", e.target.value)} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#94A3B8] mb-1">Slug *</label>
                                    <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#94A3B8] mb-1">Client</label>
                                    <input value={form.client} onChange={(e) => update("client", e.target.value)} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs text-[#94A3B8] mb-1">Industry</label>
                                    <input value={form.industry} onChange={(e) => update("industry", e.target.value)} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-[#94A3B8] mb-1">Challenge *</label>
                                <textarea required value={form.challenge} onChange={(e) => update("challenge", e.target.value)} rows={3} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] transition-colors resize-y" />
                            </div>
                            <div>
                                <label className="block text-xs text-[#94A3B8] mb-1">Solution *</label>
                                <textarea required value={form.solution} onChange={(e) => update("solution", e.target.value)} rows={3} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] transition-colors resize-y" />
                            </div>
                            <div>
                                <label className="block text-xs text-[#94A3B8] mb-1">Results *</label>
                                <textarea required value={form.results} onChange={(e) => update("results", e.target.value)} rows={3} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] transition-colors resize-y" />
                            </div>
                            <div>
                                <label className="block text-xs text-[#94A3B8] mb-1">Cover Image URL</label>
                                <input value={form.coverImage} onChange={(e) => update("coverImage", e.target.value)} className="w-full bg-[#0A0F1C] border border-[#1E293B] rounded-md px-3 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] transition-colors" />
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <button type="submit" disabled={saving} className="flex items-center gap-2 bg-[#00D4FF] text-[#0A0F1C] font-semibold px-4 py-2 rounded-md text-sm hover:bg-[#00D4FF]/90 disabled:opacity-50 transition-colors">
                                    <Save size={15} />
                                    {saving ? "Saving…" : editingId ? "Update" : "Create"}
                                </button>
                                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-[#94A3B8] hover:text-[#F1F5F9] transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="bg-[#111827] border border-[#1E293B] rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#1E293B] text-left">
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider">Title</th>
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider hidden md:table-cell">Client</th>
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider hidden lg:table-cell">Industry</th>
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <tr key={i}>
                                    <td className="px-5 py-4" colSpan={4}>
                                        <div className="h-4 bg-[#1E293B] rounded animate-pulse w-1/2" />
                                    </td>
                                </tr>
                            ))
                        ) : items.length === 0 ? (
                            <tr>
                                <td className="px-5 py-10 text-center text-[#94A3B8]" colSpan={4}>
                                    No case studies yet.
                                </td>
                            </tr>
                        ) : (
                            items.map((cs) => (
                                <tr key={cs.id} className="hover:bg-[#1E293B]/40 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <p className="text-[#F1F5F9] font-medium">{cs.title}</p>
                                        <p className="text-xs text-[#94A3B8] font-mono">/{cs.slug}</p>
                                    </td>
                                    <td className="px-5 py-3.5 text-[#94A3B8] hidden md:table-cell">{cs.client || "—"}</td>
                                    <td className="px-5 py-3.5 text-[#94A3B8] hidden lg:table-cell">{cs.industry || "—"}</td>
                                    <td className="px-5 py-3.5 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button onClick={() => openEdit(cs)} className="p-1.5 text-[#94A3B8] hover:text-[#00D4FF] transition-colors" title="Edit">
                                                <Edit size={15} />
                                            </button>
                                            <button onClick={() => handleDelete(cs.id, cs.title)} className="p-1.5 text-[#94A3B8] hover:text-[#FF4757] transition-colors" title="Delete">
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
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
