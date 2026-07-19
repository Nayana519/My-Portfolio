"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { runPixelReveal } from "@/animations/pixelReveal";

const SIZE = 380;

const floatingBadges = [
  { label: "Python",  deg: 30,  r: 210, delay: 0 },
  { label: "React",   deg: 150, r: 200, delay: 0.4 },
  { label: "ML",      deg: 270, r: 210, delay: 0.8 },
];

export default function HeroPortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = SIZE;
    canvas.height = SIZE;

    const img = new window.Image();
    img.src = "/images/profile.jpg";
    img.crossOrigin = "anonymous";
    img.onload = () => {
      runPixelReveal(canvas, img, () => setRevealed(true));
    };
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto flex items-center justify-center"
      style={{ width: SIZE + 80, height: SIZE + 80 }}
    >
      {/* Radial rose aura — animated pulse */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full animate-radial-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(244,114,182,0.30) 0%, rgba(168,85,247,0.16) 45%, transparent 72%)",
          filter: "blur(18px)",
        }}
      />

      {/* Glow ring behind portrait */}
      <div
        className="absolute rounded-[2rem] transition-opacity duration-500"
        style={{
          inset: "-20px",
          background: `linear-gradient(135deg, rgba(244,114,182,0.45), rgba(168,85,247,0.35))`,
          opacity: revealed ? 0.55 : 0.25,
          filter: "blur(28px)",
        }}
        aria-hidden="true"
      />

      {/* Portrait card */}
      <div
        className="relative overflow-hidden rounded-[1.75rem] border border-border-strong shadow-glow transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          width: SIZE,
          height: SIZE,
        }}
      >
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="block [filter:contrast(1.05)_saturate(0.95)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(244,114,182,0.22), rgba(168,85,247,0.22))",
          }}
        />
        {/* colour overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(244,114,182,0.18) 0%, transparent 40%, rgba(168,85,247,0.22) 100%)",
            mixBlendMode: "color",
          }}
        />
        {/* shimmer sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Floating tech badges */}
      {floatingBadges.map(({ label, deg, r, delay }) => {
        const rad = (deg * Math.PI) / 180;
        const bx = Math.cos(rad) * r;
        const by = Math.sin(rad) * r;
        return (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + delay, duration: 0.5, ease: "backOut" }}
            className="glass-warm pointer-events-none absolute rounded-full px-3 py-1 text-[11px] font-medium text-accent-1 border border-border-strong shadow-glow-xs animate-float-slow"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${bx}px), calc(-50% + ${by}px))`,
              animationDelay: `${delay}s`,
            }}
          >
            {label}
          </motion.span>
        );
      })}

      {/* Corner labels — VISION poster style */}
      <span className="absolute -bottom-7 left-0 text-[10px] uppercase tracking-[0.3em] text-text-faint">
        CS · Chengannur
      </span>
      <span className="absolute -top-7 right-0 text-[10px] uppercase tracking-[0.3em] text-text-faint">
        Est. 2023
      </span>
    </motion.div>
  );
}
