import { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects — Nayana J Pillai",
  description: "GreenGrow, PulseGuard, and other full-stack ML projects by Nayana J Pillai.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <Projects />
    </div>
  );
}
