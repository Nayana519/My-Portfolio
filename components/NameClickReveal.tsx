"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Mini cherry-blossom burst overlay ───────────────────────────────────────
interface Petal {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number;
}

const PETAL_COLORS = [
  "#ff2d8a", "#ff6eb5", "#ffb3d9", "#ff1493",
  "#ff85c2", "#ffd6ec", "#e91e8c",
];

function BurstPetals({ active }: { active: boolean }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!active) return;
    const count = 50;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const ps: Petal[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const speed = 80 + Math.random() * 220;
      return {
        id: i,
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 80,
        size: 6 + Math.random() * 12,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        angle: Math.random() * 360,
      };
    });
    setPetals(ps);
    const t = setTimeout(() => setPetals([]), 2000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[301]" aria-hidden="true">
      <AnimatePresence>
        {petals.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 0, rotate: p.angle }}
            animate={{
              x: p.x + p.vx,
              y: p.y + p.vy + 200,
              opacity: 0,
              scale: 1,
              rotate: p.angle + (Math.random() > 0.5 ? 540 : -540),
            }}
            transition={{ duration: 1.8, ease: [0.15, 0, 0.8, 1] }}
            style={{
              position: "fixed",
              width: p.size,
              height: p.size,
              borderRadius: "50% 0 50% 0",
              background: p.color,
              boxShadow: `0 0 ${p.size * 1.5}px ${p.color}88`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Falling petals on top of the card ──────────────────────────────────────
function FallingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${5 + Math.random() * 90}%`,
            y: "-10%",
            rotate: Math.random() * 360,
            opacity: 0.9,
            scale: 0.6 + Math.random() * 0.8,
          }}
          animate={{
            y: "110%",
            x: `${5 + Math.random() * 90}%`,
            rotate: Math.random() * 720 * (Math.random() > 0.5 ? 1 : -1),
            opacity: 0,
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            delay: i * 0.15,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
          style={{
            position: "absolute",
            width: 8 + Math.random() * 10,
            height: 8 + Math.random() * 10,
            borderRadius: "50% 0 50% 0",
            background: PETAL_COLORS[i % PETAL_COLORS.length],
            boxShadow: `0 0 8px ${PETAL_COLORS[i % PETAL_COLORS.length]}88`,
          }}
        />
      ))}
    </div>
  );
}

interface NameClickRevealProps {
  open: boolean;
  onClose: () => void;
}

export default function NameClickReveal({ open, onClose }: NameClickRevealProps) {
  const [burstActive, setBurstActive] = useState(false);

  // Trigger burst when opened
  useEffect(() => {
    if (open) {
      setBurstActive(true);
      const t = setTimeout(() => setBurstActive(false), 2100);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <BurstPetals active={burstActive} />

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={onClose}
              className="fixed inset-0 z-[299] backdrop-blur-xl"
              style={{ background: "rgba(13,5,20,0.82)" }}
            />

            {/* Card */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 60, rotate: -6 }}
              animate={{ scale: 1,   opacity: 1, y: 0,  rotate: 0 }}
              exit={{   scale: 0.7, opacity: 0, y: 40,  rotate: 4 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="fixed left-1/2 top-1/2 z-[300] -translate-x-1/2 -translate-y-1/2"
              style={{ width: "min(340px, 90vw)" }}
            >
              <div
                className="relative overflow-hidden rounded-3xl border border-border-strong shadow-glow"
                style={{
                  background: "linear-gradient(160deg, #1a0a28 0%, #0d0514 100%)",
                }}
              >
                <FallingPetals />

                {/* Top neon strip */}
                <div
                  className="h-3 w-full"
                  style={{ background: "linear-gradient(90deg, #ff2d8a, #ff6eb5, #c2185b)" }}
                />

                {/* Portrait */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mx-auto mt-5 h-56 w-56 overflow-hidden rounded-2xl border-2 border-border-strong shadow-glow"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/profile.jpg"
                    alt="Nayana J Pillai"
                    className="h-full w-full object-cover object-top"
                  />
                  {/* Pink shimmer overlay */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(255,45,138,0.18) 0%, transparent 50%, rgba(194,24,91,0.2) 100%)",
                      mixBlendMode: "color",
                    }}
                  />
                </motion.div>

                {/* Info */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="px-6 pb-6 pt-4 text-center"
                >
                  <p className="font-display text-xl font-semibold text-text-primary">Nayana J Pillai</p>
                  <p className="mt-1 text-sm gradient-text font-medium">Software Engineer · ML Builder</p>
                  <p className="mt-3 text-xs text-text-muted leading-relaxed">
                    B.Tech CS undergraduate · GDG Campus Lead · Google Student Ambassador
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {["Python", "React", "ML", "FastAPI"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border-strong px-2.5 py-0.5 text-[11px] text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Close hint */}
                  <button
                    onClick={onClose}
                    className="mt-5 text-xs text-text-faint hover:text-accent-1 transition-colors"
                  >
                    tap anywhere to close ✦
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
