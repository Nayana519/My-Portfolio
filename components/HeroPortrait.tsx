"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SIZE = 380;

// Badges positioned to left/right OUTSIDE the face
const floatingBadges = [
  { label: "Python",  side: "right" as const, top: "16%", delay: 1.2 },
  { label: "React",   side: "right" as const, top: "44%", delay: 1.5 },
  { label: "ML",      side: "right" as const, top: "72%", delay: 1.8 },
  { label: "FastAPI", side: "left"  as const, top: "28%", delay: 1.3 },
  { label: "Next.js", side: "left"  as const, top: "58%", delay: 1.6 },
];

export default function HeroPortrait() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    setTilt({ x, y });
  }
  function handleMouseLeave() { setTilt({ x: 0, y: 0 }); }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative mx-auto flex items-center justify-center select-none"
      style={{ width: SIZE + 160, height: SIZE * 1.22 + 80 }}
    >
      {/* Pulsing outer aura */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,45,138,0.38) 0%, rgba(194,24,91,0.14) 50%, transparent 72%)",
          filter: "blur(28px)",
        }}
      />

      {/* Glow ring */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-[2rem]"
        animate={{ opacity: revealed ? 0.75 : 0.28 }}
        transition={{ duration: 1.4 }}
        style={{
          inset: "-20px 38px",
          background: "linear-gradient(135deg, rgba(255,45,138,0.58), rgba(194,24,91,0.42))",
          filter: "blur(34px)",
        }}
      />

      {/* ── Portrait card ── */}
      <motion.div
        className="relative overflow-hidden border border-border-strong shadow-glow"
        style={{
          width: SIZE,
          height: SIZE * 1.22,    // tall editorial ratio
          borderRadius: "1.5rem",
          transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 0.15s ease-out",
          background: "#0d0514",
        }}
      >
        {/* ── Big "NAYANA" background text — stays BEHIND the photo ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-start justify-center z-0 overflow-hidden pointer-events-none"
          style={{ paddingTop: "5%" }}
        >
          <span
            className="font-display font-bold leading-none select-none"
            style={{
              fontSize: "clamp(4.5rem, 15vw, 7.5rem)",
              background: "linear-gradient(180deg, rgba(255,45,138,0.60) 0%, rgba(194,24,91,0.08) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.04em",
            }}
          >
            NAYANA
          </span>
        </div>

        {/* ── Portrait image — smooth blur-to-clear fade ── */}
        <motion.img
          src="/images/profile.png"
          alt="Nayana J Pillai"
          onLoad={() => setRevealed(true)}
          initial={{ opacity: 0, scale: 1.04, filter: "blur(14px)" }}
          animate={{ opacity: 1,  scale: 1,    filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="absolute inset-0 h-full w-full object-cover object-top z-[1]"
          style={{ filter: "contrast(1.04) saturate(0.9)" }}
        />

        {/* ── Very subtle duotone pink tint on top of image (transparent, not obscuring) ── */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,45,138,0.08) 0%, transparent 50%, rgba(80,0,40,0.22) 100%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* ── Top neon strip ── */}
        <div
          className="absolute top-0 inset-x-0 h-[3px] z-[5]"
          style={{ background: "linear-gradient(90deg, #ff2d8a, #ff6eb5, #c2185b)" }}
        />

        {/* ── Bottom info bar (below face) ── */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: revealed ? 0 : 16, opacity: revealed ? 1 : 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="absolute bottom-0 inset-x-0 z-[5] flex items-end justify-between px-4 pb-3 pt-10"
          style={{
            background:
              "linear-gradient(0deg, rgba(13,5,20,0.94) 0%, rgba(13,5,20,0.55) 55%, transparent 100%)",
          }}
        >
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-text-faint">
              CEC · 2023–2027
            </p>
            <p className="font-display text-sm font-semibold text-text-primary mt-0.5">
              Nayana J Pillai
            </p>
          </div>
          {/* Barcode decoration */}
          <div className="flex items-end gap-[2px] pb-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i % 3 === 0 ? 2 : 1,
                  height: i % 4 === 0 ? 20 : 12,
                  background: "rgba(255,105,180,0.4)",
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating tech badges — sides only */}
      {floatingBadges.map(({ label, side, top, delay }) => (
        <motion.span
          key={label}
          initial={{ opacity: 0, x: side === "right" ? 20 : -20 }}
          animate={{ opacity: 1, x: 10 }}
          transition={{ delay, duration: 0.5, ease: "backOut" }}
          className="glass-warm pointer-events-none absolute rounded-full px-6 py-3.5 text-xs font-semibold text-accent-1 border border-border-strong shadow-glow-xs animate-float-slow"
          style={{
            [side]: "-8px",
            top,
            animationDelay: `${delay * 0.4}s`,
          }}
        >
          {label}
        </motion.span>
      ))}

      {/* Corner micro-labels */}
      <span className="absolute -bottom-8 left-10 text-[9px] uppercase tracking-[0.3em] text-text-faint">
        CS · Chengannur
      </span>
      <span className="absolute -top-7 right-10 text-[9px] uppercase tracking-[0.3em] text-text-faint">
        Est. 2023
      </span>
    </motion.div>
  );
}
