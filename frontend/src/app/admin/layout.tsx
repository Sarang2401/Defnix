"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth";
import {
    LayoutDashboard,
    FileText,
    Users,
    Briefcase,
    Mail,
    BarChart3,
    Image,
    LogOut,
    ChevronRight,
} from "lucide-react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/blog", label: "Blog Posts", icon: FileText },
    { href: "/admin/leads", label: "Leads", icon: Users },
    { href: "/admin/case-studies", label: "Case Studies", icon: Briefcase },
    { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/media", label: "Media", icon: Image },
];

function AdminShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isAuthenticated, isLoading, logout } = useAuth();

    // Login page gets no shell
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#00D4FF] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Not authenticated — AuthProvider will redirect
    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-[#0A0F1C] flex">
            {/* Sidebar */}
            <aside className="w-60 bg-[#111827] border-r border-[#1E293B] flex flex-col fixed inset-y-0 left-0 z-30">
                {/* Logo */}
                <div className="h-16 flex items-center px-5 border-b border-[#1E293B]">
                    <Link href="/admin" className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#F1F5F9] tracking-tight">
                            Def<span className="text-[#00D4FF]">nix</span>
                        </span>
                        <span className="text-[10px] text-[#94A3B8] font-mono tracking-wider uppercase bg-[#1E293B] px-1.5 py-0.5 rounded">
                            Admin
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/admin" && pathname.startsWith(item.href));
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${isActive
                                    ? "bg-[#00D4FF]/10 text-[#00D4FF]"
                                    : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B]"
                                    }`}
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                                {isActive && (
                                    <ChevronRight size={14} className="ml-auto" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-[#1E293B]">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
                    >
                        View Site →
                    </Link>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-3 py-2 w-full text-left text-xs text-[#94A3B8] hover:text-[#FF4757] transition-colors rounded-md"
                    >
                        <LogOut size={14} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-60">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <AdminShell>{children}</AdminShell>
        </AuthProvider>
    );
}
