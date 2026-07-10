import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

/**
 * Reusable breadcrumb trail. On desktop it shows the full path
 * (Home / Section / Page); on small screens it collapses to a single
 * "‹ Back to [parent]" link so it doesn't compete for space with
 * page content — see CLAUDE.md responsiveness conventions.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    if (items.length === 0) return null;
    const parent = items.length >= 2 ? items[items.length - 2] : items[0];

    return (
        <nav aria-label="Breadcrumb" className="breadcrumb-nav">
            {parent.href && (
                <Link href={parent.href} className="breadcrumb-mobile-back footer-link">
                    <ChevronLeft size={14} /> Back to {parent.label}
                </Link>
            )}
            <ol className="breadcrumb-trail">
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <li key={item.label} className="breadcrumb-item">
                            {item.href && !isLast ? (
                                <Link href={item.href} className="footer-link">{item.label}</Link>
                            ) : (
                                <span aria-current={isLast ? "page" : undefined} className="breadcrumb-current">
                                    {item.label}
                                </span>
                            )}
                            {!isLast && <span className="breadcrumb-sep">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
