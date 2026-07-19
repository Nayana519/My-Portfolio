"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, AnchorHTMLAttributes } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  icon,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 shimmer-sweep select-none";

  const styles = {
    primary:
      "bg-accent-gradient text-white shadow-glow-sm hover:shadow-glow hover:-translate-y-0.5 active:scale-95",
    ghost:
      "glass-warm text-text-primary hover:border-accent-1 hover:text-accent-1 hover:-translate-y-0.5 hover:shadow-glow-xs active:scale-95",
  };

  return (
    <motion.a
      whileTap={{ scale: 0.95 }}
      className={cn(base, styles[variant], className)}
      {...props}
    >
      {children}
      {icon}
    </motion.a>
  );
}
