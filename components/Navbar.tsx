"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, resumeUrl } from "@/data/links";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// ─── Cherry petal particle ──────────────────────────────────────────────────
interface Petal {
  id: number;
  x: number;
  y: number;
  rot: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
}

const PETAL_COLORS = ["#ff2d8a", "#ff6eb5", "#ffb3d9", "#ff1493", "#ff85c2", "#ffd6ec"];

function BlossomBurst({ origin }: { origin: { x: number; y: number } | null }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!origin) return;
    const newPetals: Petal[] = Array.from({ length: 28 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 28 + Math.random() * 0.5;
      const speed = 60 + Math.random() * 140;
      return {
        id: Date.now() + i,
        x: origin.x,
        y: origin.y,
        rot: Math.random() * 360,
        size: 6 + Math.random() * 10,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 60,
        life: 0.85 + Math.random() * 0.15,
      };
    });
    setPetals(newPetals);
    const t = setTimeout(() => setPetals([]), 1400);
    return () => clearTimeout(t);
  }, [origin]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
      <AnimatePresence>
        {petals.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: p.life, scale: 0, rotate: p.rot }}
            animate={{
              x: p.x + p.vx,
              y: p.y + p.vy + 120,
              opacity: 0,
              scale: 1,
              rotate: p.rot + 360 * (Math.random() > 0.5 ? 1 : -1),
            }}
            transition={{ duration: 1.2, ease: [0.2, 0, 0.8, 1] }}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: "50% 0 50% 0",
              background: p.color,
              boxShadow: `0 0 ${p.size}px ${p.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [burstOrigin, setBurstOrigin] = useState<{ x: number; y: number } | null>(null);
  const [laserActive, setLaserActive] = useState(false);
  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("/#", "").replace("#", "")).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNameClick = useCallback((e: React.MouseEvent) => {
    const rect = nameRef.current?.getBoundingClientRect();
    if (rect) {
      setBurstOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
    // Reset so the next click fires again
    setTimeout(() => setBurstOrigin(null), 1500);

    // Laser sweep
    setLaserActive(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLaserActive(true));
    });
    setTimeout(() => setLaserActive(false), 800);
  }, []);

  return (
    <>
      <BlossomBurst origin={burstOrigin} />

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-1/2 z-50 w-[94%] max-w-4xl -translate-x-1/2"
      >
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 glass-warm",
            scrolled
              ? "border-border-strong shadow-glow-sm"
              : "border-border"
          )}
        >
          {/* Logo — with Framer Motion bright pulsing dot */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-lg italic tracking-tight text-text-primary"
          >
            {/* Framer Motion pulsing dot — much brighter */}
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full"
                style={{ background: "var(--accent-1)" }}
                animate={{ scale: [1, 2.4, 1], opacity: [0.9, 0, 0.9] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ background: "linear-gradient(135deg, #ff2d8a, #ff6eb5)" }}
                animate={{
                  boxShadow: [
                    "0 0 4px 1px rgba(255,45,138,0.5)",
                    "0 0 16px 4px rgba(255,45,138,0.9)",
                    "0 0 4px 1px rgba(255,45,138,0.5)",
                  ],
                }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>

            {/* Name with laser sweep on click */}
            <span
              ref={nameRef}
              onClick={handleNameClick}
              className={cn("cursor-pointer relative overflow-hidden rounded-sm px-0.5", laserActive && "laser-sweep active")}
            >
              nayana<span className="gradient-text">.</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("/#", "").replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "nav-link text-sm transition-colors duration-200",
                      isActive
                        ? "gradient-text font-medium"
                        : "text-text-muted hover:text-text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Button href={resumeUrl} download variant="primary" className="!px-4 !py-2 text-xs">
            Resume
          </Button>
        </nav>
      </motion.header>
    </>
  );
}
