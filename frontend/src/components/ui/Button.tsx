"use client";

import Link from "next/link";
import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

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
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.65)] hover:-translate-y-0.5 transition-all duration-300",
  outline:
    "btn-trace rounded-xl text-[var(--color-text-primary)] font-medium",
  ghost:
    "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(255,255,255,0.06)] rounded-xl transition-all duration-200",
};

function MagneticWrapper({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 20 });
  const springY = useSpring(y, { stiffness: 280, damping: 20 });

  if (disabled) return <>{children}</>;

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.14);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.14);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
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
  const classes = `relative inline-flex items-center justify-center gap-2 overflow-hidden font-[var(--font-heading)] ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} ${className}`;

  const isMagnetic = magnetic && !disabled && variant === "primary";

  const shimmer = variant === "primary" ? (
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 z-0 pointer-events-none" />
  ) : null;

  const inner = href ? (
    <Link href={href} className={`group ${classes}`}>
      {shimmer}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Link>
  ) : (
    <button type={type} onClick={onClick} disabled={disabled} className={`group ${classes}`}>
      {shimmer}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );

  return isMagnetic ? <MagneticWrapper>{inner}</MagneticWrapper> : inner;
}
