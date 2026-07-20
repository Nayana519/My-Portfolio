"use client";

import { motion } from "framer-motion";
import { heroStats } from "@/data/stats";
import StatCounter from "@/components/StatCounter";

// Triple so the loop is truly seamless regardless of viewport width
const tripled = [...heroStats, ...heroStats, ...heroStats];

// Separators between cards
function Dot() {
  return (
    <span
      aria-hidden="true"
      className="flex-shrink-0 self-center"
      style={{
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: "rgba(255,45,138,0.45)",
      }}
    />
  );
}

export default function StatsBand() {
  return (
    <section className="relative z-10 overflow-hidden">
      {/* gradient line top */}
      <div className="section-divider" />

      {/* ── scrolling strip ── */}
      <div
        className="relative overflow-hidden"
        style={{ paddingTop: 28, paddingBottom: 28 }}
      >
        {/* left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
          style={{
            width: 100,
            background: "linear-gradient(90deg, var(--bg) 30%, transparent)",
          }}
        />
        {/* right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
          style={{
            width: 100,
            background: "linear-gradient(-90deg, var(--bg) 30%, transparent)",
          }}
        />

        {/* The moving strip — animate from 0 to -33.33% (one set of 4 stats) */}
        <motion.div
          className="inline-flex items-center"
          style={{ gap: 20, willChange: "transform" }}
          animate={{ x: ["0%", "-33.34%"] }}
          transition={{
            repeat: Infinity,
            duration: 28,
            ease: "linear",
          }}
        >
          {tripled.map((stat, i) => (
            <>
              {/* Stat card */}
              <div
                key={`stat-${stat.id}-${i}`}
                className="inline-flex flex-col items-center justify-center flex-shrink-0 glass-warm rounded-2xl border border-border"
                style={{
                  width: 210,
                  minWidth: 210,
                  padding: "18px 24px",
                }}
              >
                <StatCounter stat={stat} />
              </div>

              {/* Dot separator — skip after last in each group */}
              {i % heroStats.length !== heroStats.length - 1 && (
                <Dot key={`dot-${i}`} />
              )}
            </>
          ))}
        </motion.div>
      </div>

      {/* gradient line bottom */}
      <div className="section-divider" />
    </section>
  );
}
