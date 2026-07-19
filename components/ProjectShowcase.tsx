import Image from "next/image";
import { ProjectImage } from "@/types";

export default function ProjectShowcase({ images }: { images: ProjectImage[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {images.map((img) => (
        <div
          key={img.src}
          className="overflow-hidden rounded-xl border border-border-strong shadow-glow-sm"
        >
          <div className="flex items-center gap-1.5 border-b border-border bg-bg-elevated px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-1/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-2/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-3/60" />
          </div>
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
