"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import { Certification } from "@/types";

export default function CertificateCard({
  cert,
  index,
}: { cert: Certification; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Card className="h-full glass-warm border-gradient-left relative overflow-hidden shimmer-sweep">
        {/* Year badge */}
        {cert.year && (
          <span className="absolute right-2 top-2 rounded-full bg-accent-gradient px-2 py-0.5 text-xs text-white shadow-glow-sm">
            {cert.year}
          </span>
        )}
        <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent-gradient">
          <Award size={16} className="text-white" />
        </div>
        <h3 className="font-display text-base leading-snug">{cert.title}</h3>
        <p className="mt-2 text-xs text-text-muted">{cert.issuer}</p>
        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent-2 hover:text-accent-1"
          >
            View Certificate <ExternalLink size={12} />
          </a>
        )}
      </Card>
    </motion.div>
  );
}
