"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/animations/fadeUp";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import { education } from "@/data/experience";
import { GraduationCap, Lightbulb, Target } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-28 overflow-hidden">
        {/* top gradient line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-gradient opacity-30" />
      {/* decorative background blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(244,114,182,0.6), rgba(168,85,247,0.3))",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SectionLabel>About</SectionLabel>
          <p className="text-9xl font-display text-accent-1 opacity-10 -mt-12 leading-none select-none">“</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
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
        </motion.div>

        {/* Philosophy / Mission cards — LAILA style */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <Card className="h-full border-l-2 border-l-accent-3">
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

        {/* Education */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <Card className="h-full">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient">
                      <GraduationCap size={18} className="text-white" />
                    </div>
                    <h3 className="font-display text-lg">{edu.institution}</h3>
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
    </section>
  );
}
