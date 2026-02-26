"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchApiAuth } from "@/lib/api";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface PostData {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    coverImage: string | null;
    status: "draft" | "published" | "archived";
    seoTitle: string | null;
    seoDescription: string | null;
}

export default function EditBlogPostPage() {
    const router = useRouter();
    const params = useParams();
    const postId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "",
        content: "",
        excerpt: "",
        coverImage: "",
        status: "draft" as string,
        seoTitle: "",
        seoDescription: "",
    });

    useEffect(() => {
        async function load() {
            try {
                // Fetch all admin posts and find the one with matching ID
                const res = await fetchApiAuth<{ posts: PostData[]; total: number }>(
                    "blog/admin/posts?limit=100",
                );
                const post = res.posts.find((p) => p.id === postId);
                if (post) {
                    setForm({
                        title: post.title,
                        content: post.content,
                        excerpt: post.excerpt || "",
                        coverImage: post.coverImage || "",
                        status: post.status,
                        seoTitle: post.seoTitle || "",
                        seoDescription: post.seoDescription || "",
                    });
                }
            } catch {
                setError("Failed to load post.");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [postId]);

    function update(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSaving(true);
        try {
            await fetchApiAuth(`blog/posts/${postId}`, {
                method: "PUT",
                body: JSON.stringify(form),
            });
            router.push("/admin/blog");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update post");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="max-w-3xl">
                <div className="h-8 bg-[#1E293B] rounded animate-pulse w-1/3 mb-6" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-12 bg-[#1E293B] rounded animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/blog"
                    className="p-2 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
                >
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[#F1F5F9]">Edit Post</h1>
                    <p className="text-sm text-[#94A3B8] mt-0.5">
                        Update post details
                    </p>
                </div>
            </div>

            {error && (
                <div className="rounded-md bg-[#FF4757]/10 border border-[#FF4757]/30 px-4 py-3 text-sm text-[#FF4757] mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5">
                        Title *
                    </label>
                    <input
                        required
                        value={form.title}
                        onChange={(e) => update("title", e.target.value)}
                        className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5">
                        Content * <span className="normal-case text-[#94A3B8]/60">(Markdown supported)</span>
                    </label>
                    <textarea
                        required
                        value={form.content}
                        onChange={(e) => update("content", e.target.value)}
                        rows={18}
                        className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-3 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors font-mono leading-relaxed resize-y"
                    />
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5">
                        Excerpt
                    </label>
                    <textarea
                        value={form.excerpt}
                        onChange={(e) => update("excerpt", e.target.value)}
                        rows={3}
                        className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-3 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors resize-y"
                    />
                </div>

                {/* Cover Image URL */}
                <div>
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5">
                        Cover Image URL
                    </label>
                    <input
                        value={form.coverImage}
                        onChange={(e) => update("coverImage", e.target.value)}
                        className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5">
                        Status
                    </label>
                    <select
                        value={form.status}
                        onChange={(e) => update("status", e.target.value)}
                        className="bg-[#111827] border border-[#1E293B] rounded-md px-4 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>

                {/* SEO */}
                <div className="border-t border-[#1E293B] pt-6">
                    <p className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-4">
                        SEO Settings
                    </p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs text-[#94A3B8] mb-1.5">
                                SEO Title
                            </label>
                            <input
                                value={form.seoTitle}
                                onChange={(e) => update("seoTitle", e.target.value)}
                                className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-[#94A3B8] mb-1.5">
                                Meta Description
                            </label>
                            <textarea
                                value={form.seoDescription}
                                onChange={(e) => update("seoDescription", e.target.value)}
                                rows={2}
                                className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-3 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors resize-y"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#00D4FF] text-[#0A0F1C] font-semibold px-5 py-2.5 rounded-md text-sm hover:bg-[#00D4FF]/90 disabled:opacity-50 transition-colors"
                    >
                        <Save size={16} />
                        {saving ? "Saving…" : "Update Post"}
                    </button>
                    <Link
                        href="/admin/blog"
                        className="px-5 py-2.5 text-sm text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
