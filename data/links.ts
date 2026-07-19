import { NavLink, SocialLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Achievements", href: "/achievements" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Nayana519",
    icon: "Github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nayana-j-pillai-39bb052ba/",
    icon: "Linkedin",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/NayanaJK/",
    icon: "Code2",
  },
  {
    label: "Email",
    href: "mailto:nayanajk159@gmail.com",
    icon: "Mail",
  },
];

export const resumeUrl = "/resume/Nayana_J_Pillai_Resume.pdf";
