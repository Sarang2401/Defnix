import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold hover:opacity-90",
    outline:
        "btn-trace border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)]",
    ghost:
        "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]",
};

export function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    onClick,
    className = "",
    type = "button",
    disabled = false,
}: ButtonProps) {
    const classes = `inline-flex items-center justify-center gap-2 rounded font-[var(--font-heading)] transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`;

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {children}
        </button>
    );
}
