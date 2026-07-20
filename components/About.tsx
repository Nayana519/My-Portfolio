"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from "@/animations/fadeUp";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import CherryBlossoms from "@/components/CherryBlossoms";
import { education } from "@/data/experience";
import { GraduationCap, Lightbulb, Target } from "lucide-react";

// ─── Cherry-petal decoration ─────────────────────────────────────────────────
function Petal({ style }: { style: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      className="absolute rounded-tl-full rounded-br-full"
      style={{ width: 10, height: 10, ...style }}
    />
  );
}

export default function About() {
  const [cardInView, setCardInView] = useState(false);

  return (
    <section id="about" className="relative z-10 px-6 py-28 overflow-hidden">
      {/* cherry blossoms falling behind content */}
      <CherryBlossoms count={20} />
      {/* top gradient line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-gradient opacity-30" />

      {/* decorative blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,45,138,0.7), rgba(194,24,91,0.3))" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 bottom-0 h-64 w-64 rounded-full opacity-8 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(194,24,91,0.5), transparent)" }}
      />

      <div className="mx-auto max-w-6xl">
        {/* ─── Two-column: ID Card + Text ─── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[auto_1fr] lg:items-start">

          {/* ─── Animated ID Card portrait ─── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            onViewportEnter={() => setCardInView(true)}
            variants={{
              hidden:  { opacity: 0, y: -160, rotate: -10 },
              visible: {
                opacity: 1, y: 0, rotate: 0,
                transition: { type: "spring", stiffness: 110, damping: 15, delay: 0.1 },
              },
            }}
            className="mx-auto w-[240px] shrink-0"
          >
            {/* ID Card */}
            <div
              className="relative rounded-3xl border border-border-strong shadow-glow overflow-hidden"
              style={{ background: "linear-gradient(160deg, #1a0a28 0%, #0d0514 100%)" }}
            >
              {/* Card top strip */}
              <div
                className="h-3 w-full"
                style={{ background: "linear-gradient(90deg, #ff2d8a, #ff6eb5, #c2185b)" }}
              />

              {/* Photo — editorial style */}
              <div className="relative mx-auto mt-5 h-[190px] w-[180px] overflow-hidden rounded-2xl border-2 border-border-strong shadow-glow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile.jpg"
                  alt="Nayana J Pillai"
                  className="h-full w-full object-cover object-top"
                  style={{ filter: "contrast(1.1) saturate(0.85)" }}
                />
                {/* Pink duotone overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "linear-gradient(160deg, rgba(255,45,138,0.25) 0%, transparent 50%, rgba(80,0,40,0.45) 100%)",
                    mixBlendMode: "color",
                  }}
                />
                {/* Grain texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.09]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />
                {/* Bottom name bar */}
                <div
                  className="absolute bottom-0 inset-x-0 py-1.5 text-center"
                  style={{ background: "linear-gradient(0deg, rgba(13,5,20,0.92) 0%, transparent 100%)" }}
                >
                  <p className="font-mono text-[8px] uppercase tracking-widest text-accent-2">nayana.dev</p>
                </div>
              </div>


              {/* Card info */}
              <div className="px-5 pb-5 pt-4 text-center">
                <p className="font-display text-base font-semibold text-text-primary">Nayana J Pillai</p>
                <p className="mt-0.5 text-xs gradient-text font-medium">Software Engineer · ML Builder</p>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {["Python", "React", "ML"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border-strong px-2 py-0.5 text-[10px] text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* Barcode decoration */}
                <div className="mt-4 flex justify-center gap-[2px]">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: i % 3 === 0 ? 2 : 1,
                        height: i % 5 === 0 ? 22 : 14,
                        background: "rgba(255,105,180,0.4)",
                      }}
                    />
                  ))}
                </div>
                <p className="mt-1.5 font-mono text-[9px] text-text-faint tracking-widest">CEC · 2023–2027</p>
              </div>

              {/* Floating petals on card */}
              {cardInView && (
                <>
                  <Petal style={{ top: -5, left: 20, background: "#ff2d8a", opacity: 0.7, animation: "petal-fall 2.5s ease-out 0.2s forwards" }} />
                  <Petal style={{ top: -5, left: 80, background: "#ff6eb5", opacity: 0.7, animation: "petal-fall 2.5s ease-out 0.5s forwards" }} />
                  <Petal style={{ top: -5, right: 20, background: "#ffb3d9", opacity: 0.7, animation: "petal-fall 2.5s ease-out 0.8s forwards" }} />
                  <Petal style={{ top: -5, right: 50, background: "#ff2d8a", opacity: 0.6, animation: "petal-fall 2.5s ease-out 1.1s forwards" }} />
                </>
              )}
            </div>

            {/* Lanyard string */}
            <div className="mx-auto mt-0 flex w-px flex-col items-center gap-0">
              <div className="h-8 w-0.5 rounded-full" style={{ background: "linear-gradient(180deg, #ff2d8a, rgba(255,45,138,0))" }} />
            </div>
          </motion.div>

          {/* ─── Text content ─── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionLabel>About</SectionLabel>
            <p className="text-7xl font-display text-accent-1 opacity-10 -mt-10 leading-none select-none">"</p>
            <h2 className="mt-2 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
              Building software that{" "}
              <span className="gradient-text italic">learns and reaches</span>{" "}
              people.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted">
              I&apos;m a Computer Science undergraduate at College of Engineering,
              Chengannur, drawn to the intersection of real-time systems and
              machine learning. I&apos;ve shipped a full-stack ML application that
              predicts fertilizer needs with 95% accuracy, and built a
              real-time health-alert system in an 18-hour hackathon sprint.
              Outside of code, I lead media and community efforts for Google
              Developer Group On-Campus, and now serve as a Google Student
              Ambassador — hosting live AI product demos and mentoring peers.
            </p>

            {/* Philosophy / Mission cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="h-full border-l-2 border-l-accent-1">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-accent-gradient">
                    <Lightbulb size={16} className="text-white" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-text-primary">My Philosophy</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    Blending traditional inspiration with modern frontend technologies to create
                    unique, high-performance web experiences.
                  </p>
                </Card>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="h-full border-l-2 border-l-accent-2">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-accent-gradient">
                    <Target size={16} className="text-white" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-text-primary">The Mission</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    Transforming complex ideas into clean, pixel-perfect, and responsive
                    interactive interfaces that captivate users.
                  </p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ─── Education ─── */}
        <div className="mt-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionLabel>Education</SectionLabel>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Academic Journey</h2>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.15 }}
              >
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient">
                        <GraduationCap size={18} className="text-white" />
                      </div>
                      <h3 className="font-display text-lg text-text-primary">{edu.institution}</h3>
                      <p className="mt-1 text-sm text-text-muted">{edu.degree}</p>
                      <p className="mt-1 text-xs text-text-faint">
                        {edu.startDate} – {edu.endDate} · {edu.location}
                      </p>
                    </div>
                    <span className="whitespace-nowrap rounded-full border border-border-strong px-3 py-1 text-xs gradient-text font-medium">
                      {edu.metric}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
