import SectionLabel from "@/components/ui/SectionLabel";
import SkillCategoryCard from "@/components/SkillCategoryCard";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Skills</SectionLabel>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted hover:border-accent-1 hover:text-accent-1 transition-colors">React</span>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted hover:border-accent-1 hover:text-accent-1 transition-colors">Python</span>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted hover:border-accent-1 hover:text-accent-1 transition-colors">TypeScript</span>
        </div>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
          A toolkit for{" "}
          <span className="gradient-text italic">full-stack ML</span>{" "}
          products.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((category, i) => (
            <SkillCategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
