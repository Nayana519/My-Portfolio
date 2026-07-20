"use client";

import { useEffect, useRef } from "react";

interface Branch {
  x1: number; y1: number;
  x2: number; y2: number;
  width: number;
  depth: number;
}

/**
 * Generates branches constrained to one side of the canvas.
 * maxX / minX restrict how far the branches can spread toward the center.
 */
function generateBranches(
  branches: Branch[],
  x1: number, y1: number,
  angle: number,
  length: number,
  width: number,
  depth: number,
  minX: number,
  maxX: number
) {
  if (depth === 0 || length < 5) return;
  const rad = (angle * Math.PI) / 180;
  const x2Raw = x1 + Math.cos(rad) * length;
  const y2 = y1 + Math.sin(rad) * length;

  // Clamp x2 to stay within permitted region
  const x2 = Math.max(minX, Math.min(maxX, x2Raw));

  branches.push({ x1, y1, x2, y2, width, depth });

  const spreadL = 14 + Math.random() * 18;
  const spreadR = 14 + Math.random() * 18;

  generateBranches(branches, x2, y2, angle - spreadL, length * 0.70, width * 0.66, depth - 1, minX, maxX);
  generateBranches(branches, x2, y2, angle + spreadR, length * 0.68, width * 0.63, depth - 1, minX, maxX);

  if (depth > 5 && Math.random() > 0.5) {
    generateBranches(branches, x2, y2, angle - 2, length * 0.58, width * 0.52, depth - 2, minX, maxX);
  }
}

interface Blossom {
  x: number; y: number; r: number; delay: number; color: string;
}

const BLOSSOM_COLORS = [
  "rgba(255,45,138,",
  "rgba(255,110,181,",
  "rgba(255,179,217,",
  "rgba(255,20,147,",
  "rgba(220,80,155,",
];

export default function BlossomTree({ side = "left" }: { side?: "left" | "right" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    // ── Side constraints ──────────────────────────────────────────────────────
    // Tree roots are in far corner; canopy must not exceed 28% of width into center
    const SIDE_LIMIT = W * 0.28;   // max spread toward center
    const minX = side === "left"  ? 0         : W - SIDE_LIMIT;
    const maxX = side === "left"  ? SIDE_LIMIT : W;

    const rootX    = side === "left" ? W * 0.06 : W * 0.94;
    const rootY    = H;
    // Lean slightly inward but mostly vertical
    const startAngle = -90 + (side === "left" ? 8 : -8);

    const branches: Branch[] = [];
    generateBranches(branches, rootX, rootY, startAngle, H * 0.40, 8, 9, minX, maxX);

    // Blossoms at tips
    const blossoms: Blossom[] = [];
    branches.forEach((b) => {
      if (b.depth <= 2) {
        const count = b.depth === 1 ? 4 : 2;
        for (let i = 0; i < count; i++) {
          blossoms.push({
            x: b.x2 + (Math.random() - 0.5) * 16,
            y: b.y2 + (Math.random() - 0.5) * 16,
            r: 4 + Math.random() * 7,
            delay: Math.random() * 2.5,
            color: BLOSSOM_COLORS[Math.floor(Math.random() * BLOSSOM_COLORS.length)],
          });
        }
      }
    });

    // ── Animation ─────────────────────────────────────────────────────────────
    const totalBranches = branches.length;
    const GROW_DURATION    = 3000;
    const BLOSSOM_START    = GROW_DURATION * 0.55;
    const BLOSSOM_DURATION = 2000;
    let startTime: number | null = null;
    let raf: number;

    function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

    function draw(ts: number) {
      if (!ctx) return;
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;

      ctx.clearRect(0, 0, W, H);

      const treeProgress = Math.min(elapsed / GROW_DURATION, 1);
      const branchesVisible = Math.ceil(totalBranches * easeOutCubic(treeProgress));

      for (let i = 0; i < branchesVisible; i++) {
        const b = branches[i];
        ctx.beginPath();
        ctx.moveTo(b.x1, b.y1);

        if (i === branchesVisible - 1 && treeProgress < 1) {
          const localT = (treeProgress * totalBranches) % 1;
          ctx.lineTo(b.x1 + (b.x2 - b.x1) * localT, b.y1 + (b.y2 - b.y1) * localT);
        } else {
          ctx.lineTo(b.x2, b.y2);
        }

        const depthNorm = 1 - b.depth / 9;
        const r = Math.round(55 + depthNorm * 70);
        const g = Math.round(8  + depthNorm * 18);
        const bv = Math.round(25 + depthNorm * 45);
        ctx.strokeStyle = `rgba(${r},${g},${bv},0.6)`;
        ctx.lineWidth   = Math.max(0.5, b.width);
        ctx.lineCap     = "round";
        ctx.stroke();
      }

      // Blossoms bloom
      if (elapsed > BLOSSOM_START) {
        const bt = Math.min((elapsed - BLOSSOM_START) / BLOSSOM_DURATION, 1);
        blossoms.forEach((bl) => {
          const localT = Math.max(0, Math.min((bt - bl.delay / BLOSSOM_DURATION) * 3, 1));
          if (localT <= 0) return;
          const alpha = easeOutCubic(localT) * 0.7;
          const radius = bl.r * easeOutCubic(localT);

          for (let p = 0; p < 5; p++) {
            const pAngle = (p / 5) * Math.PI * 2;
            const px = bl.x + Math.cos(pAngle) * radius * 0.7;
            const py = bl.y + Math.sin(pAngle) * radius * 0.7;
            ctx.beginPath();
            ctx.ellipse(px, py, radius * 0.55, radius * 0.38, pAngle, 0, Math.PI * 2);
            const grad = ctx.createRadialGradient(px, py, 0, px, py, radius * 0.6);
            grad.addColorStop(0, bl.color + (alpha * 0.9).toFixed(2) + ")");
            grad.addColorStop(1, bl.color + "0)");
            ctx.fillStyle = grad;
            ctx.fill();
          }
          // Centre dot
          ctx.beginPath();
          ctx.arc(bl.x, bl.y, radius * 0.22, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,220,240,${alpha * 0.9})`;
          ctx.fill();
        });
      }

      if (treeProgress < 1 || elapsed < BLOSSOM_START + BLOSSOM_DURATION + 500) {
        raf = requestAnimationFrame(draw);
      }
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [side]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
