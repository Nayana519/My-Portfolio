"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  va: number;
  size: number;
  alpha: number;
  color: string;
}

const COLORS = [
  "rgba(255,45,138,",
  "rgba(255,110,181,",
  "rgba(255,179,217,",
  "rgba(255,20,147,",
  "rgba(220,80,150,",
];

function makePetal(w: number, randomY = false, h = 0): Petal {
  return {
    x: Math.random() * w,
    y: randomY ? Math.random() * h : -20 - Math.random() * 80,
    vx: (Math.random() - 0.5) * 1.2,
    vy: 0.7 + Math.random() * 1.3,
    angle: Math.random() * Math.PI * 2,
    va: (Math.random() - 0.5) * 0.055,
    size: 5 + Math.random() * 9,
    alpha: 0.55 + Math.random() * 0.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal, h: number) {
  // Fade naturally to 0 in the bottom 20% so they seem to land softly
  const bottomFade = p.y > h * 0.8 ? 1 - (p.y - h * 0.8) / (h * 0.2) : 1;
  const finalAlpha = p.alpha * Math.max(0, bottomFade);
  if (finalAlpha <= 0) return;

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  ctx.globalAlpha = finalAlpha;

  ctx.beginPath();
  ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
  const grad = ctx.createRadialGradient(0, -p.size * 0.3, 0, 0, 0, p.size);
  grad.addColorStop(0, p.color + "0.92)");
  grad.addColorStop(1, p.color + "0)");
  ctx.fillStyle = grad;
  ctx.shadowColor = p.color + "0.5)";
  ctx.shadowBlur = 5;
  ctx.fill();

  ctx.restore();
}

export default function CherryBlossoms({ count = 38 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.parentElement?.clientWidth  ?? window.innerWidth;
    let h = canvas.parentElement?.clientHeight ?? window.innerHeight;
    canvas.width  = w;
    canvas.height = h;

    // Start petals scattered across full height so it doesn't look empty initially
    let petals: Petal[] = Array.from({ length: count }, () => makePetal(w, true, h));

    let raf: number;

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      petals.forEach((p) => {
        p.x    += p.vx + Math.sin(p.y * 0.012 + p.angle) * 0.45;
        p.y    += p.vy;
        p.angle += p.va;

        // Petal has fully fallen past screen — reset to top
        if (p.y > h + 20) {
          const fresh = makePetal(w);
          Object.assign(p, fresh);
        }
        if (p.x > w + 20) p.x = -20;
        if (p.x < -20)    p.x = w + 20;

        drawPetal(ctx, p, h);
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    const onResize = () => {
      w = canvas.parentElement?.clientWidth  ?? window.innerWidth;
      h = canvas.parentElement?.clientHeight ?? window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: 0.65 }}
    />
  );
}
