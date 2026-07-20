"use client";

import { useEffect, useState } from "react";

export default function SakuraBg() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a === 0 ? 1 : 0)), 16000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
    >
      {/* ── Image layer 1 ── */}
      <div
        className="absolute inset-0"
        style={{ opacity: active === 0 ? 1 : 0, transition: "opacity 3.5s ease-in-out" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/sakura-bg1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "ken-burns-1 22s ease-in-out infinite alternate",
            willChange: "transform",
            /* very dark: lower brightness + grayscale-shift toward purple */
            filter: "brightness(0.35) saturate(1.4) hue-rotate(-10deg)",
          }}
        />
      </div>

      {/* ── Image layer 2 ── */}
      <div
        className="absolute inset-0"
        style={{ opacity: active === 1 ? 1 : 0, transition: "opacity 3.5s ease-in-out" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/sakura-bg2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "ken-burns-2 24s ease-in-out infinite alternate",
            willChange: "transform",
            filter: "brightness(0.26) saturate(1.5) hue-rotate(-12deg)",
          }}
        />
      </div>

      {/* ── Dark overlay (readability, uniform — no dark band) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,5,20,0.48) 0%, rgba(13,5,20,0.52) 50%, rgba(13,5,20,0.70) 100%)",
        }}
      />

      {/* ── Pink halo glow in center ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,45,138,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Edge vignette — deepens corners ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(13,5,20,0.80) 100%)",
        }}
      />
    </div>
  );
}
