"use client";

import { motion } from "framer-motion";
import { heroStats } from "@/data/stats";
import StatCounter from "@/components/StatCounter";

export default function StatsBand() {
  return (
    <section className="relative z-10 overflow-hidden px-6 py-6">
      {/* Marquee container */}
      <div className="relative whitespace-nowrap">
        <motion.div
          className="inline-block"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {heroStats.concat(heroStats).map((stat) => (
            <StatCounter key={stat.id + "-marquee"} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
