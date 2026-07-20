"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMouse } from "@/hooks/useMouse";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import SectionLabel from "@/components/ui/SectionLabel";
import GlowOrb from "@/components/ui/GlowOrb";
import CherryBlossoms from "@/components/CherryBlossoms";
import { resumeUrl } from "@/data/links";
import { ArrowDown, ArrowRight } from "lucide-react";

declare global { interface Window { __lenis?: { scrollTo: (el: Element, opts: object) => void } } }

const roles = ["Software Engineer", "ML Builder", "Full-Stack Developer"];

// ─── Typing animation ─────────────────────────────────────────────────────────
function useTypingEffect(words: string[], speed = 80, pause = 1600, enabled = true) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx]     = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const current = words[wordIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(w => (w + 1) % words.length);
    }
  }, [charIdx, deleting, wordIdx, words, speed, pause, enabled]);
  useEffect(() => setDisplayed(words[wordIdx].slice(0, charIdx)), [charIdx, wordIdx, words]);
  return displayed;
}

// ─── Scroll-driven portrait ───────────────────────────────────────────────────
function Portrait({ visible }: { visible: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(false);
  const SIZE = 360;

  return (
    <motion.div
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 10, y: ((e.clientY - r.top) / r.height - 0.5) * -10 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, x: 80, scale: 0.88 }}
      animate={visible
        ? { opacity: 1, x: 0, scale: 1 }
        : { opacity: 0, x: 80, scale: 0.88 }
      }
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative mx-auto flex items-center justify-center select-none"
      style={{ width: SIZE + 160, height: SIZE * 1.22 + 80 }}
    >
      {/* Aura */}
      <motion.div aria-hidden="true" className="absolute inset-0 rounded-full"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, rgba(255,45,138,0.36) 0%, rgba(194,24,91,0.12) 50%, transparent 72%)", filter: "blur(28px)" }}
      />
      {/* Glow ring */}
      <motion.div aria-hidden="true" className="absolute rounded-[2rem]"
        animate={{ opacity: revealed ? 0.7 : 0.25 }} transition={{ duration: 1.4 }}
        style={{ inset: "-20px 38px", background: "linear-gradient(135deg, rgba(255,45,138,0.55), rgba(194,24,91,0.4))", filter: "blur(34px)" }}
      />

      {/* Card */}
      <div
        className="relative overflow-hidden border border-border-strong shadow-glow"
        style={{
          width: SIZE, height: SIZE * 1.22, borderRadius: "1.5rem",
          transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 0.15s ease-out", background: "#0d0514",
        }}
      >
        {/* NAYANA bg text */}
        <div aria-hidden="true" className="absolute inset-0 flex items-start justify-center z-0 overflow-hidden pointer-events-none" style={{ paddingTop: "5%" }}>
          <span className="font-display font-bold leading-none select-none"
            style={{ fontSize: "clamp(4rem, 14vw, 7rem)", background: "linear-gradient(180deg, rgba(255,45,138,0.58) 0%, rgba(194,24,91,0.06) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.04em" }}>
            NAYANA
          </span>
        </div>
        {/* Photo */}
        <motion.img src="/images/profile.png" alt="Nayana J Pillai" onLoad={() => setRevealed(true)}
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="absolute inset-0 h-full w-full object-cover object-top z-[1]"
          style={{ filter: "contrast(1.04) saturate(0.9)" }}
        />
        <div className="pointer-events-none absolute inset-0 z-[2]" style={{ background: "linear-gradient(160deg, rgba(255,45,138,0.07) 0%, transparent 50%, rgba(80,0,40,0.20) 100%)", mixBlendMode: "multiply" }} />
        <div className="absolute top-0 inset-x-0 h-[3px] z-[5]" style={{ background: "linear-gradient(90deg, #ff2d8a, #ff6eb5, #c2185b)" }} />
        {/* Bottom bar */}
        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: revealed ? 0 : 16, opacity: revealed ? 1 : 0 }} transition={{ delay: 1.0, duration: 0.5 }}
          className="absolute bottom-0 inset-x-0 z-[5] flex items-end justify-between px-4 pb-3 pt-10"
          style={{ background: "linear-gradient(0deg, rgba(13,5,20,0.94) 0%, rgba(13,5,20,0.55) 55%, transparent 100%)" }}>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-text-faint">CEC · 2023–2027</p>
            <p className="font-display text-sm font-semibold text-text-primary mt-0.5">Nayana J Pillai</p>
          </div>
          <div className="flex items-end gap-[2px] pb-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} style={{ width: i % 3 === 0 ? 2 : 1, height: i % 4 === 0 ? 20 : 12, background: "rgba(255,105,180,0.4)", borderRadius: 1 }} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      {[
        { label: "Python",  side: "right" as const, top: "16%", delay: 0.6 },
        { label: "React",   side: "right" as const, top: "44%", delay: 0.8 },
        { label: "ML",      side: "right" as const, top: "72%", delay: 1.0 },
        { label: "FastAPI", side: "left"  as const, top: "28%", delay: 0.7 },
        { label: "Next.js", side: "left"  as const, top: "58%", delay: 0.9 },
      ].map(({ label, side, top, delay }) => (
        <motion.span key={label}
          initial={{ opacity: 0, x: side === "right" ? 36 : -36 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: side === "right" ? 36 : -36 }}
          transition={{ delay: visible ? delay : 0, duration: 0.55, ease: "backOut" }}
          className="glass-warm pointer-events-none absolute rounded-full px-3 py-1.5 text-xs font-semibold text-accent-1 border border-border-strong shadow-glow-xs animate-float-slow"
          style={{ [side]: "-4px", top }}
        >
          {label}
        </motion.span>
      ))}

      <span className="absolute -bottom-8 left-10 text-[9px] uppercase tracking-[0.3em] text-text-faint">CS · Chengannur</span>
      <span className="absolute -top-7 right-10 text-[9px] uppercase tracking-[0.3em] text-text-faint">Est. 2023</span>
    </motion.div>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
  const { x: mx, y: my } = useMouse();
  const sectionRef = useRef<HTMLElement>(null);
  const [split, setSplit] = useState(false);
  const typedRole = useTypingEffect(roles, 80, 1600, split);

  // Trigger split on first scroll (≥ 40px) — using native listener so it fires
  // even with Lenis running.
  useEffect(() => {
    function onScroll() {
      if (window.scrollY >= 40) {
        setSplit(true);
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToAbout() {
    const el = document.getElementById("about");
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="hero" ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28">
      <CherryBlossoms count={26} />

      {/* Mouse spotlight */}
      <div className="pointer-events-none absolute inset-0 z-0"
        style={{ background: `radial-gradient(600px circle at ${mx}px ${my}px, rgba(255,45,138,0.09), transparent 70%)` }} />

      <GlowOrb className="left-[-140px] top-[8%]"     size={480} color="rose" />
      <GlowOrb className="right-[-120px] bottom-[4%]" size={520} color="violet" />

      {/* ── Single DOM structure — positions animated with spring ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* Grid wrapper — animates from single centered column to two columns */}
        <motion.div
          layout
          className="grid grid-cols-1 items-center"
          animate={split
            ? { gap: "3rem" }
            : { gap: "0rem" }
          }
          style={{ gridTemplateColumns: split ? "1.25fr 0.75fr" : "1fr" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── Left / Center: Text block ── */}
          <motion.div
            layout="position"
            animate={split
              ? { textAlign: "left",   paddingLeft: 0  }
              : { textAlign: "center", paddingLeft: 0 }
            }
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
            style={{ alignItems: split ? "flex-start" : "center" }}
          >
            <motion.div layout="position"
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}>
              <SectionLabel>Portfolio — 2026</SectionLabel>
            </motion.div>

            {/* Name */}
            <motion.h1
              layout="position"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-6 font-display leading-[1.05] text-text-primary"
              style={{ fontSize: split ? "clamp(2.8rem,5vw,4.5rem)" : "clamp(3.5rem,7vw,6rem)" }}
            >
              Nayana J{" "}
              <motion.span
                onClick={scrollToAbout}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="cursor-pointer inline-block relative group"
              >
                <GradientText as="span" className="italic">Pillai</GradientText>
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-accent-1 transition-all duration-300 group-hover:w-full" />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-accent-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ✦ meet me ↓ ✦
                </span>
              </motion.span>
            </motion.h1>

            {/* Typing role — fades in once split */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={split ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-5 flex flex-wrap items-center gap-2 text-lg text-text-muted sm:text-xl">
                <span>Aspiring</span>
                <span className="gradient-text font-semibold">
                  {typedRole}
                  <span className="ml-0.5 inline-block w-[2px] h-[1.1em] align-middle bg-accent-1 animate-blink-cursor" />
                </span>
              </div>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
                B.Tech Computer Science undergraduate building full-stack and
                machine learning systems — from a 95%-accurate fertilizer
                recommendation engine to real-time health alerting.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={resumeUrl} download icon={<ArrowDown size={16} />}>
                  Download Resume
                </Button>
                <Button href="/projects" variant="ghost" icon={<ArrowRight size={16} />}>
                  View Projects
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Portrait (only in split) ── */}
          {split && (
            <Portrait visible={split} />
          )}
        </motion.div>
      </div>

      {/* Scroll hint (before split) */}
      <motion.div
        animate={{ opacity: split ? 0 : 1, y: split ? 12 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-text-faint"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="text-accent-1">
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
