import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 px-6 py-28">
        {/* top gradient line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-gradient opacity-30" />
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Projects</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
          Products, not just{" "}
          <span className="gradient-text italic">prototypes</span>.
        </h2>

        <div className="mt-12 space-y-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
