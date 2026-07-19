"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function Card({ children, className, hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      whileHover={
        hover
          ? { y: -6, borderColor: "var(--border-strong)" }
          : undefined
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "glass rounded-2xl p-6 relative overflow-hidden",
        hover && "hover:shadow-glow-sm cursor-default",
        glow && "shadow-inner-glow",
        className
      )}
    >
      {/* subtle top-edge highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-gradient opacity-30"
      />
      {children}
    </motion.div>
  );
}
