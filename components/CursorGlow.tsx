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
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
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
      {/* outer soft bloom */}
      <div
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(244,114,182,0.12) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />
    </div>
  );
}
