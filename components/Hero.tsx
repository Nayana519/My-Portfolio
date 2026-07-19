"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useMouse } from "@/hooks/useMouse";
import { fadeUp } from "@/animations/fadeUp";
import { staggerContainer, staggerItem } from "@/animations/stagger";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import SectionLabel from "@/components/ui/SectionLabel";
import HeroPortrait from "@/components/HeroPortrait";
import GlowOrb from "@/components/ui/GlowOrb";
import { resumeUrl } from "@/data/links";
import { ArrowDown, ArrowRight } from "lucide-react";

const roles = ["Software Engineer", "ML Builder", "Full-Stack Developer"];

// ─── Typing animation hook ───────────────────────────────────────────────────
function useTypingEffect(words: string[], typingSpeed = 80, pauseDuration = 1600) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];

    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), typingSpeed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pauseDuration);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), typingSpeed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
  }, [charIdx, deleting, wordIdx, words, typingSpeed, pauseDuration]);

  useEffect(() => {
    setDisplayed(words[wordIdx].slice(0, charIdx));
  }, [charIdx, wordIdx, words]);

  return displayed;
}

// ─── Sparkle particle ────────────────────────────────────────────────────────
function Sparkle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      transition={{ delay, duration: 2.2, repeat: Infinity, repeatDelay: 3 + delay }}
      className="pointer-events-none absolute"
      style={{ left: x, top: y }}
    >
      <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
        <path
          d="M6 0L6.9 4.2H11.2L7.7 6.8L9 11L6 8.4L3 11L4.3 6.8L0.8 4.2H5.1L6 0Z"
          fill="url(#sp-grad)"
        />
        <defs>
          <linearGradient id="sp-grad" x1="0" y1="0" x2="12" y2="12">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </motion.span>
  );
}

const sparkles = [
  { x: -40, y: 10,  size: 10, delay: 0 },
  { x: 20,  y: -20, size: 28,  delay: 0.4 },
  { x: 340, y: 5,   size: 17, delay: 0.4 },
  { x: 370, y: -24, size: 7,  delay: 1.2 },
  { x: -20, y: 60,  size: 20,  delay: 2 },
];

export default function Hero() {
  const { x, y } = useMouse();
  const typedRole = useTypingEffect(roles);

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28">
      {/* warm rose mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(214, 21, 121, 0.1), transparent 70%)`,
        }}
      />

      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(244,114,182,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(244,114,182,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <GlowOrb className="left-[-140px] top-[8%]"  size={420} color="rose" />
      <GlowOrb className="right-[-120px] bottom-[4%]" size={480} color="violet" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerItem}>
            <SectionLabel>Portfolio — 2026</SectionLabel>
          </motion.div>

          {/* Name with sparkles */}
          <motion.h1
            variants={staggerItem}
            className="relative mt-6 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            {sparkles.map((s, i) => (
              <Sparkle key={i} {...s} />
            ))}
            Nayana J{" "}
            <GradientText as="span" className="italic">
              Pillai
            </GradientText>
          </motion.h1>

          {/* Typing role */}
          <motion.div
            variants={staggerItem}
            className="mt-5 flex flex-wrap items-center gap-2 text-lg text-text-muted sm:text-xl"
          >
            <span>Aspiring</span>
            <span className="gradient-text font-semibold">
              {typedRole}
              <span className="ml-0.5 inline-block w-[2px] h-[1.1em] align-middle bg-accent-1 animate-blink-cursor" />
            </span>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="mt-6 max-w-xl text-base leading-relaxed text-text-muted"
          >
            B.Tech Computer Science undergraduate building full-stack and
            machine learning systems — from a 95%-accurate fertilizer
            recommendation engine to real-time health alerting. I care about
            software that ships, and communities that grow.
          </motion.p>

          {/* Tech badges row */}
          <motion.div
            variants={staggerItem}
            className="mt-6 flex flex-wrap items-center gap-2"
          >
            {["Python", "TypeScript", "React", "Next.js", "Scikit-learn", "FastAPI"].map((tech) => (
              <span
                key={tech}
                className="glass-warm rounded-full px-3 py-1 text-xs text-text-muted border border-border hover:border-accent-1 hover:text-accent-1 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href={resumeUrl} download icon={<ArrowDown size={16} />}>
              Download Resume
            </Button>
            <Button href="/projects" variant="ghost" icon={<ArrowRight size={16} />}>
              View Projects
            </Button>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <HeroPortrait />
        </motion.div>
      </div>

      {/* Scroll to explore */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-text-faint"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="text-accent-1"
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
