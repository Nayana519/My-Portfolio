"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { ExperienceItem } from "@/types";

export default function TimelineItem({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-10"
    >
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-accent-gradient shadow-glow-sm" />
      <span className="absolute left-[5px] top-5 bottom-[-2.5rem] w-px bg-border last:hidden" />

      <Card hover={false} className="p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-xl">{item.role}</h3>
          <span className="text-xs text-text-faint">
            {item.startDate} – {item.endDate}
          </span>
        </div>
        <p className="mt-1 text-sm gradient-text">{item.organization}</p>
        <p className="text-xs text-text-faint">{item.location}</p>

        <ul className="mt-4 space-y-2">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-sm text-text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gradient" />
              {bullet}
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
}
