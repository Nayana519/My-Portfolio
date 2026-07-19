import { Metadata } from "next";
import Experience from "@/components/Experience";

export const metadata: Metadata = {
  title: "Experience — Nayana J Pillai",
  description: "Leadership and community experience of Nayana J Pillai.",
};

export default function ExperiencePage() {
  return (
    <div className="pt-20">
      <Experience />
    </div>
  );
}
