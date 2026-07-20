"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Stat } from "@/types";
import { formatNumber } from "@/lib/utils";

export default function StatCounter({ stat }: { stat: Stat }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(stat.value * eased);
      if (t < 1) requestAnimationFrame(tick);
      else setDisplay(stat.value);
    }
    requestAnimationFrame(tick);
  }, [inView, stat.value]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center">
      <p
        className="font-display font-bold leading-none whitespace-nowrap"
        style={{
          fontSize: "2.1rem",
          background: "linear-gradient(120deg, #ff2d8a, #ff6eb5 50%, #ff2d8a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% auto",
        }}
      >
        {stat.prefix}{formatNumber(display)}{stat.suffix}
      </p>
      <p
        className="mt-2 text-center leading-snug"
        style={{
          fontSize: "0.68rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          maxWidth: 160,
          whiteSpace: "normal",
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}
