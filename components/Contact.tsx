import { Github, Linkedin, Code2, Mail } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/ContactForm";
import { socialLinks } from "@/data/links";

const iconMap = { Github, Linkedin, Code2, Mail };

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-6 py-28">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Let's build{" "}
            <span className="gradient-text italic">something real</span>.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-text-muted">
            Open to internships, collaborative projects, and community work.
            Reach out directly or connect through any of the channels below.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs text-text-muted transition-all hover:text-text-primary hover:shadow-glow-sm"
                >
                  <Icon size={14} /> {link.label}
                </a>
              );
            })}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
