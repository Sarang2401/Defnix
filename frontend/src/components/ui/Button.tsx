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
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black font-medium hover:bg-neutral-200",
  outline:
    "border border-white/20 text-white hover:bg-white/10",
  ghost:
    "text-white/60 hover:text-white hover:bg-white/5",
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
  const classes = `inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`;

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
