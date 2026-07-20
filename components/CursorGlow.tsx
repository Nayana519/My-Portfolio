"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let cx = -300, cy = -300;
    let tx = -300, ty = -300;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const animate = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${cx - 220}px, ${cy - 220}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 will-change-transform"
      ref={glowRef}
    >
      {/* Outer soft hot-pink bloom */}
      <div
        style={{
          width: 440,
          height: 440,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,45,138,0.16) 0%, rgba(194,24,91,0.08) 50%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />
    </div>
  );
}
