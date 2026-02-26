"use client";

import { useEffect, useState, useRef } from "react";
import { fetchApiAuth, uploadFile } from "@/lib/api";
import { Upload, Trash2, Copy, Check, Image as ImageIcon } from "lucide-react";

interface MediaAsset {
    id: string;
    filename: string;
    url: string;
    mimeType: string;
    sizeBytes: number;
    createdAt: string;
}

export default function AdminMediaPage() {
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadAssets();
    }, []);

    async function loadAssets() {
        setLoading(true);
        try {
            const data = await fetchApiAuth<MediaAsset[]>("media");
            setAssets(Array.isArray(data) ? data : []);
        } catch {
            setAssets([]);
        } finally {
            setLoading(false);
        }
    }

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            await uploadFile<MediaAsset>("media/upload", file);
            loadAssets();
        } catch {
            alert("Upload failed.");
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = "";
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this file?")) return;
        try {
            await fetchApiAuth(`media/${id}`, { method: "DELETE" });
            setAssets((prev) => prev.filter((a) => a.id !== id));
        } catch {
            alert("Failed to delete.");
        }
    }

    function copyUrl(id: string, url: string) {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    }

    function formatSize(bytes: number): string {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#F1F5F9]">Media</h1>
                    <p className="text-sm text-[#94A3B8] mt-1">
                        {assets.length} file{assets.length !== 1 ? "s" : ""} uploaded
                    </p>
                </div>
                <label className="flex items-center gap-2 bg-[#00D4FF] text-[#0A0F1C] font-semibold px-4 py-2 rounded-md text-sm hover:bg-[#00D4FF]/90 transition-colors cursor-pointer">
                    <Upload size={16} />
                    {uploading ? "Uploading…" : "Upload File"}
                    <input
                        ref={fileRef}
                        type="file"
                        className="hidden"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                </label>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="aspect-square bg-[#111827] border border-[#1E293B] rounded-lg animate-pulse"
                        />
                    ))}
                </div>
            ) : assets.length === 0 ? (
                <div className="bg-[#111827] border border-[#1E293B] rounded-lg p-16 text-center">
                    <ImageIcon size={32} className="text-[#94A3B8] mx-auto mb-3" />
                    <p className="text-sm text-[#94A3B8]">
                        No files uploaded yet. Click &quot;Upload File&quot; to get started.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {assets.map((asset) => (
                        <div
                            key={asset.id}
                            className="bg-[#111827] border border-[#1E293B] rounded-lg overflow-hidden group hover:border-[#00D4FF]/30 transition-colors"
                        >
                            {/* Preview */}
                            <div className="aspect-square bg-[#0A0F1C] flex items-center justify-center relative">
                                {asset.mimeType?.startsWith("image/") ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={asset.url}
                                        alt={asset.filename}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <ImageIcon size={24} className="text-[#94A3B8]" />
                                )}
                                {/* Overlay actions */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => copyUrl(asset.id, asset.url)}
                                        className="p-2 bg-[#111827] rounded-md text-[#F1F5F9] hover:bg-[#1E293B] transition-colors"
                                        title="Copy URL"
                                    >
                                        {copiedId === asset.id ? (
                                            <Check size={16} className="text-[#2ECC71]" />
                                        ) : (
                                            <Copy size={16} />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(asset.id)}
                                        className="p-2 bg-[#111827] rounded-md text-[#FF4757] hover:bg-[#1E293B] transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-3 py-2.5">
                                <p className="text-xs text-[#F1F5F9] truncate font-mono">
                                    {asset.filename}
                                </p>
                                <p className="text-[10px] text-[#94A3B8] mt-0.5">
                                    {formatSize(asset.sizeBytes)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
