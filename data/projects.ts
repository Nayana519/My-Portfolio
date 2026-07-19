import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "greengrow",
    title: "GreenGrow",
    tagline: "Smart Fertilizer Recommendation System",
    description:
      "A full-stack machine learning web application that recommends precise fertilizers for farmers using live weather data, soil pH, and NPK values — helping maximize yield while minimizing waste.",
    problem:
      "Farmers often over- or under-apply fertilizer without data-backed guidance, leading to wasted resources and reduced crop yield across varying soil and weather conditions.",
    solution:
      "Built a Random Forest classification pipeline trained on soil, crop, and real-time weather API data, wrapped in a Flask backend with a clean prediction dashboard for instant, explainable recommendations.",
    features: [
      "Real-time weather API integration for location-aware predictions",
      "Random Forest model achieving 95% prediction accuracy",
      "Supports 11 distinct crop categories",
      "Prediction summary dashboard with quantity, fertilizer type, and confidence",
    ],
    techStack: ["Python", "Flask", "Scikit-learn", "Pandas", "NumPy", "Random Forest"],
    githubUrl: "https://github.com/Nayana519",
    hasLiveScreenshots: true,
    images: [
      { src: "/images/greengrow-landing.png", alt: "GreenGrow landing page" },
      { src: "/images/greengrow-dashboard.png", alt: "GreenGrow prediction dashboard" },
    ],
    metric: { value: "95%", label: "prediction accuracy" },
  },
  {
    id: "pulseguard",
    title: "PulseGuard",
    tagline: "Real-Time Monitoring & Alert System",
    description:
      "A real-time heart monitoring system built during an 18-hour hackathon that automates emergency alerts the moment an abnormal pulse is detected.",
    problem:
      "Delayed detection of abnormal vitals can be critical — there was no lightweight system to monitor pulse in real time and immediately notify emergency contacts.",
    solution:
      "Engineered a containerized Flask + React application integrated with AWS SNS to automatically trigger emergency alerts on abnormal pulse detection, built end-to-end within an 18-hour hackathon window.",
    features: [
      "Real-time pulse monitoring and anomaly detection",
      "Automated emergency alerts via AWS SNS",
      "Dockerized for consistent deployment",
      "React frontend with a Flask API backend",
    ],
    techStack: ["Flask", "React", "Docker", "AWS SNS"],
    githubUrl: "https://github.com/Nayana519",
    hasLiveScreenshots: false,
    metric: { value: "18hrs", label: "hackathon build" },
  },
];
