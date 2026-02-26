"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApiAuth } from "@/lib/api";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewBlogPostPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "",
        content: "",
        excerpt: "",
        coverImage: "",
        status: "draft" as "draft" | "published",
        seoTitle: "",
        seoDescription: "",
    });

    function update(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSaving(true);
        try {
            await fetchApiAuth("blog/posts", {
                method: "POST",
                body: JSON.stringify(form),
            });
            router.push("/admin/blog");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create post");
        } finally {
            setSaving(false);
        }
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
                    <h1 className="text-2xl font-bold text-[#F1F5F9]">New Post</h1>
                    <p className="text-sm text-[#94A3B8] mt-0.5">
                        Create a new blog post
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
                        className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors"
                        placeholder="Enter post title"
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
                        className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-3 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors font-mono leading-relaxed resize-y"
                        placeholder="Write your post content in Markdown..."
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
                        className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-3 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors resize-y"
                        placeholder="Brief summary of the post"
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
                        className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors"
                        placeholder="https://..."
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
                                className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors"
                                placeholder="Custom SEO title (defaults to post title)"
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
                                className="w-full bg-[#111827] border border-[#1E293B] rounded-md px-4 py-3 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors resize-y"
                                placeholder="Custom meta description for search results"
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
                        {saving ? "Saving…" : "Create Post"}
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
