"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchApiAuth } from "@/lib/api";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    status: "draft" | "published" | "archived";
    readingTime: number;
    publishedAt: string | null;
    createdAt: string;
}

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 15;

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const res = await fetchApiAuth<{ posts: BlogPost[]; total: number }>(
                    `blog/admin/posts?page=${page}&limit=${limit}`,
                );
                setPosts(res.posts);
                setTotal(res.total);
            } catch {
                setPosts([]);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [page]);

    async function handleDelete(id: string, title: string) {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
        try {
            await fetchApiAuth(`blog/posts/${id}`, { method: "DELETE" });
            setPosts((prev) => prev.filter((p) => p.id !== id));
            setTotal((prev) => prev - 1);
        } catch {
            alert("Failed to delete post.");
        }
    }

    const totalPages = Math.ceil(total / limit);

    const statusColors: Record<string, string> = {
        draft: "bg-[#F59E0B]/10 text-[#F59E0B]",
        published: "bg-[#2ECC71]/10 text-[#2ECC71]",
        archived: "bg-[#94A3B8]/10 text-[#94A3B8]",
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#F1F5F9]">Blog Posts</h1>
                    <p className="text-sm text-[#94A3B8] mt-1">
                        {total} post{total !== 1 ? "s" : ""} total
                    </p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 bg-[#00D4FF] text-[#0A0F1C] font-semibold px-4 py-2 rounded-md text-sm hover:bg-[#00D4FF]/90 transition-colors"
                >
                    <Plus size={16} />
                    New Post
                </Link>
            </div>

            {/* Table */}
            <div className="bg-[#111827] border border-[#1E293B] rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#1E293B] text-left">
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider hidden md:table-cell">
                                Date
                            </th>
                            <th className="px-5 py-3 text-xs font-mono text-[#94A3B8] uppercase tracking-wider text-right">
                                Actions
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
                        ) : posts.length === 0 ? (
                            <tr>
                                <td
                                    className="px-5 py-10 text-center text-[#94A3B8]"
                                    colSpan={4}
                                >
                                    No blog posts yet.{" "}
                                    <Link
                                        href="/admin/blog/new"
                                        className="text-[#00D4FF] hover:underline"
                                    >
                                        Create your first post →
                                    </Link>
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-[#1E293B]/40 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <p className="text-[#F1F5F9] font-medium truncate max-w-xs">
                                            {post.title}
                                        </p>
                                        <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
                                            /{post.slug}
                                        </p>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span
                                            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${statusColors[post.status] || statusColors.draft}`}
                                        >
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-xs text-[#94A3B8] hidden md:table-cell">
                                        {post.publishedAt
                                            ? new Date(post.publishedAt).toLocaleDateString()
                                            : new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                target="_blank"
                                                className="p-1.5 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
                                                title="Preview"
                                            >
                                                <Eye size={15} />
                                            </Link>
                                            <Link
                                                href={`/admin/blog/${post.id}/edit`}
                                                className="p-1.5 text-[#94A3B8] hover:text-[#00D4FF] transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={15} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id, post.title)}
                                                className="p-1.5 text-[#94A3B8] hover:text-[#FF4757] transition-colors"
                                                title="Delete"
                                            >
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
