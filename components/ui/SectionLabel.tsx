import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-text-muted",
        className
      )}
    >
      {/* sparkle star */}
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        className="animate-sparkle-spin"
        aria-hidden="true"
      >
        <path
          d="M5 0L5.9 3.8H9.8L6.7 6.2L7.6 10L5 7.6L2.4 10L3.3 6.2L0.2 3.8H4.1L5 0Z"
          fill="url(#star-grad)"
        />
        <defs>
          <linearGradient id="star-grad" x1="0" y1="0" x2="10" y2="10">
            <stop offset="0%" stopColor="var(--accent-1)" />
            <stop offset="100%" stopColor="var(--accent-3)" />
          </linearGradient>
        </defs>
      </svg>
      {children}
      <span className="h-px w-8 bg-accent-gradient" />
    </span>
  );
}
