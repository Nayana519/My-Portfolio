"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { navLinks, resumeUrl } from "@/data/links";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section for nav highlight
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("/#", "").replace("#", "")).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 z-50 w-[94%] max-w-4xl -translate-x-1/2"
    >
      <nav
        className={cn(
          "flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 glass-warm",
          scrolled
            ? "border-border-strong shadow-glow-sm"
            : "border-border"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg italic tracking-tight text-text-primary"
        >
          {/* pulsing dot */}
          <span
            className="relative flex h-2 w-2"
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-1 opacity-6" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-gradient" />
          </span>
          nayana<span className="gradient-text">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("/#", "").replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "nav-link text-sm transition-colors duration-200",
                    isActive
                      ? "gradient-text font-medium"
                      : "text-text-muted hover:text-text-primary"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Button href={resumeUrl} download variant="primary" className="!px-4 !py-2 text-xs">
          Resume
        </Button>
      </nav>
    </motion.header>
  );
}
