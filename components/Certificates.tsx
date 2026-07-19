import SectionLabel from "@/components/ui/SectionLabel";
import CertificateCard from "@/components/CertificateCard";
import { certifications } from "@/data/certifications";

export default function Certificates() {
  return (
    <section id="achievements" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Certifications & Achievements</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
          Proof of{" "}
          <span className="gradient-text italic">consistent effort</span>.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <CertificateCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
