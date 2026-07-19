import { cn } from "@/lib/utils";

interface GlowOrbProps {
  className?: string;
  size?: number;
  color?: "rose" | "violet" | "fuchsia";
}

const colors = {
  rose:    "radial-gradient(circle, rgba(244,114,182,0.30), rgba(168,85,247,0.10) 50%, transparent 70%)",
  violet:  "radial-gradient(circle, rgba(168,85,247,0.28), rgba(244,114,182,0.08) 50%, transparent 70%)",
  fuchsia: "radial-gradient(circle, rgba(232,121,249,0.28), rgba(244,114,182,0.10) 50%, transparent 70%)",
};

export default function GlowOrb({ className, size = 400, color = "rose" }: GlowOrbProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl animate-float animate-pulse-glow",
        className
      )}
      style={{ width: size, height: size, background: colors[color] }}
      aria-hidden="true"
    />
  );
}
