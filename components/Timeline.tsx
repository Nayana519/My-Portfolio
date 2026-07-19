import TimelineItem from "@/components/TimelineItem";
import { experience } from "@/data/experience";

export default function Timeline() {
  return (
    <div className="space-y-10">
      {experience.map((item, i) => (
        <TimelineItem key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}
