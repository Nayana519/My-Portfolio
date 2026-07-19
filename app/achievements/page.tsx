import { Metadata } from "next";
import Certificates from "@/components/Certificates";

export const metadata: Metadata = {
  title: "Achievements — Nayana J Pillai",
  description: "Certifications and achievements earned by Nayana J Pillai.",
};

export default function AchievementsPage() {
  return (
    <div className="pt-20">
      <Certificates />
    </div>
  );
}
