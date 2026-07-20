import { cn } from "@/lib/utils";

interface GlowOrbProps {
  className?: string;
  size?: number;
  color?: "rose" | "violet" | "fuchsia";
}

// Updated to match hot-pink neon theme
const colors = {
  rose:    "radial-gradient(circle, rgba(255,45,138,0.38), rgba(194,24,91,0.14) 50%, transparent 70%)",
  violet:  "radial-gradient(circle, rgba(194,24,91,0.32), rgba(255,45,138,0.10) 50%, transparent 70%)",
  fuchsia: "radial-gradient(circle, rgba(255,20,147,0.32), rgba(255,45,138,0.12) 50%, transparent 70%)",
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
