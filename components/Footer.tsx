import Link from "next/link";
import { Github, Linkedin, Code2, Mail } from "lucide-react";
import { socialLinks, resumeUrl } from "@/data/links";

const iconMap = { Github, Linkedin, Code2, Mail };

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border px-6 py-10">
        {/* top gradient line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-gradient opacity-30" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <Link href="/" className="font-display text-xl italic text-text-primary">
          nayana<span className="gradient-text">.</span>
        </Link>

        <p className="text-xs text-text-faint">
          © {new Date().getFullYear()} Nayana J Pillai. Built with intent.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="glass flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition-all hover:text-text-primary hover:shadow-glow-sm"
              >
                <Icon size={16} />
              </a>
            );
          })}
          <a
            href={resumeUrl}
            download
            className="text-xs text-text-muted underline underline-offset-4 hover:text-text-primary"
          >
            Download Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
