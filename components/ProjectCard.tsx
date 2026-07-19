"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import ProjectShowcase from "@/components/ProjectShowcase";
import { Project } from "@/types";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card hover={false} className="overflow-hidden p-8 sm:p-10">
        <div
          className={`grid grid-cols-1 gap-10 ${
            reversed ? "lg:grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[1.1fr_0.9fr]"
          }`}
        >
          <div className={reversed ? "lg:order-2" : ""}>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-3xl">{project.title}</h3>
              {project.metric && (
                <span className="rounded-full border border-border-strong px-3 py-1 text-xs font-medium gradient-text">
                  {project.metric.value} {project.metric.label}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-accent-2">{project.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              {project.description}
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">
                  Problem
                </p>
                <p className="mt-1 text-sm text-text-muted">{project.problem}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">
                  Solution
                </p>
                <p className="mt-1 text-sm text-text-muted">{project.solution}</p>
              </div>
            </div>

            <ul className="mt-6 space-y-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-text-muted"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gradient" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-xs text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-7 flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-primary hover:gradient-text"
                >
                  <Github size={16} /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-primary"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>

          <div className={`flex items-center ${reversed ? "lg:order-1" : ""}`}>
            {project.hasLiveScreenshots && project.images ? (
              <ProjectShowcase images={project.images} />
            ) : (
              <div className="glass flex h-full min-h-[220px] w-full flex-col items-center justify-center rounded-xl border-dashed p-8 text-center">
                <p className="font-display text-2xl gradient-text">
                  {project.title}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-faint">
                  Built in {project.metric?.value ?? "record time"}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
