"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SmoothScroll } from "../ui/SmoothScroll";

export function LayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <SmoothScroll>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </SmoothScroll>
    );
}
