"use client";

import Link from "next/link";
import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
    magnetic?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]",
    outline:
        "btn-trace border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)]",
    ghost:
        "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]",
};

function MagneticWrapper({
    children,
    disabled,
}: {
    children: ReactNode;
    disabled?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    if (disabled) return <>{children}</>;

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={(e) => {
                const el = ref.current;
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                x.set((e.clientX - centerX) * 0.15);
                y.set((e.clientY - centerY) * 0.15);
            }}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    onClick,
    className = "",
    type = "button",
    disabled = false,
    magnetic = true,
}: ButtonProps) {
    const classes = `inline-flex items-center justify-center gap-2 rounded font-[var(--font-heading)] transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`;

    const isMagnetic = magnetic && !disabled && (variant === "primary" || variant === "outline");

    const buttonElement = href ? (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
            <Link href={href} className={classes}>
                {children}
            </Link>
        </motion.div>
    ) : (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={classes}
            >
                {children}
            </button>
        </motion.div>
    );

    if (isMagnetic) {
        return <MagneticWrapper>{buttonElement}</MagneticWrapper>;
    }

    return buttonElement;
}
