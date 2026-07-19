import { ExperienceItem, EducationItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "google-student-ambassador",
    role: "Campus Ambassador",
    organization: "Google Student Ambassador 2026",
    location: "Chengannur",
    startDate: "May 2026",
    endDate: "Present",
    bullets: [
      "Hosted 5+ virtual tech events on Google Meet for 13+ student attendees, demonstrating live AI product builds using Gemini and Google AI tools.",
      "Evaluated and interviewed student candidates for the Google Student Ambassador program, contributing to campus-wide ambassador recruitment.",
    ],
  },
  {
    id: "gdg-media-lead",
    role: "Media Lead",
    organization: "Google Developer Group On-Campus CEC",
    location: "Chengannur",
    startDate: "September 2025",
    endDate: "September 2026",
    bullets: [
      "Produced and edited promotional reels and highlight videos for 5+ tech events using CapCut and Canva, reaching a 550+ member developer community across social platforms.",
      "Designed event promotional content and managed post-production editing, growing GDG On-Campus CEC's Instagram following to 552+ followers within one academic year.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: "cec",
    institution: "College of Engineering, Chengannur",
    degree: "Bachelor of Technology (B.Tech), Computer Science",
    location: "Alappuzha, Kerala",
    startDate: "September 2023",
    endDate: "May 2027",
    metric: "CGPA 9.24",
  },
  {
    id: "ghss",
    institution: "G.G.H.S.S., Haripad",
    degree: "Biology Science, Class XII",
    location: "Kerala",
    startDate: "June 2019",
    endDate: "May 2021",
    metric: "99.75%",
  },
];
