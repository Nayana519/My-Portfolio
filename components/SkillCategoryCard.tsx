"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { staggerContainer, staggerItem } from "@/animations/stagger";
import { SkillCategory } from "@/types";

export default function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Card className="h-full border-gradient-left glass-warm relative overflow-hidden">
        {/* left gradient stripe is now handled by border-gradient-left utility */}
        <h3 className="font-display text-lg text-text-primary">
          {category.title}
        </h3>
        <motion.div
          variants={staggerContainer(0.04)}
          initial="hidden"
          animate="visible"
          className="mt-4 flex flex-wrap gap-2"
        >
          {category.skills.map((skill) => (
            <motion.span
              key={skill}
              variants={staggerItem}
              className="rounded-full border border-border px-3 py-1 text-xs text-text-muted transition-colors hover:border-accent-1 hover:text-accent-1"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
        {/* Subtle sparkle at top‑right */}
        <motion.span
          className="absolute top-2 right-2 text-accent-2 opacity-40"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 3.2 }}
        >
          ✨
        </motion.span>
      </Card>
    </motion.div>
  );
}
