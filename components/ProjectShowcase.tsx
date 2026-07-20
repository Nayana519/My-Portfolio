"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ProjectImage } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectShowcase({ images }: { images: ProjectImage[] }) {
  const [idx, setIdx] = useState(0);
  const single = images.length === 1;

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="w-full">
      {/* ── Main large image ── */}
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-border-strong shadow-glow"
        style={{ aspectRatio: "16/10" }}
      >
        {/* Browser chrome bar */}
        <div
          className="absolute top-0 inset-x-0 z-10 flex items-center gap-1.5 px-3 py-2.5"
          style={{ background: "rgba(13,5,20,0.85)", backdropFilter: "blur(8px)" }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff2d8a" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6eb5" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffd6ec" }} />
          <span className="ml-3 text-[10px] text-text-faint tracking-widest uppercase">
            {images[idx]?.alt ?? "Project Preview"}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.38, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[idx].src}
              alt={images[idx].alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 55vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows — only if multiple images */}
        {!single && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full glass-warm border border-border-strong text-text-primary hover:text-accent-1 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full glass-warm border border-border-strong text-text-primary hover:text-accent-1 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnails row ── */}
      {!single && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setIdx(i)}
              className="relative flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-200"
              style={{
                width: 72,
                height: 48,
                borderColor: i === idx ? "var(--accent-1)" : "var(--border)",
                opacity: i === idx ? 1 : 0.55,
              }}
              aria-label={img.alt}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover object-top" sizes="72px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
