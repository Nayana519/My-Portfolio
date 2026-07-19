import SectionLabel from "@/components/ui/SectionLabel";
import Timeline from "@/components/Timeline";

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 px-6 py-28">
        {/* top gradient line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-gradient opacity-30" />
      <div className="mx-auto max-w-3xl">
        <SectionLabel>Experience</SectionLabel>
        <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          Leading, not just{" "}
          <span className="gradient-text italic">contributing</span>.
        </h2>

        <div className="mt-12">
          <Timeline />
        </div>
      </div>
    </section>
  );
}
