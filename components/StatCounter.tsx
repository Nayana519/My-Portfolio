"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Stat } from "@/types";
import { formatNumber } from "@/lib/utils";

export default function StatCounter({ stat }: { stat: Stat }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="glass-warm rounded-2xl px-6 py-8 text-center relative overflow-hidden group border border-border hover:border-border-strong transition-all duration-300"
    >
      {/* left rose accent stripe */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-[3px] bg-accent-gradient rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
      />
      {/* top edge highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-gradient opacity-30"
      />

      <p className="font-display text-3xl gradient-text-warm sm:text-4xl">
        {stat.prefix}
        {formatNumber(display)}
        {stat.suffix}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-muted">
        {stat.label}
      </p>
    </motion.div>
  );
}
