import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-card": "var(--bg-card)",
        surface: "var(--surface)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        accent: {
          1: "var(--accent-1)",
          2: "var(--accent-2)",
          3: "var(--accent-3)",
          warm: "var(--accent-warm)",
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
          faint: "var(--text-faint)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(120deg, var(--accent-1), var(--accent-2) 45%, var(--accent-3))",
        "accent-gradient-warm":
          "linear-gradient(120deg, var(--accent-warm), var(--accent-1) 50%, var(--accent-2))",
        "radial-glow":
          "radial-gradient(circle, rgba(244,114,182,0.35), rgba(168,85,247,0.12) 45%, transparent 70%)",
        "radial-glow-sm":
          "radial-gradient(circle, rgba(244,114,182,0.22), transparent 70%)",
      },
      boxShadow: {
        glow:    "0 0 60px -12px rgba(232,121,249,0.55), 0 0 30px -8px rgba(244,114,182,0.35)",
        "glow-sm": "0 0 28px -8px rgba(244,114,182,0.45)",
        "glow-xs": "0 0 14px -6px rgba(244,114,182,0.35)",
        "inner-glow": "inset 0 0 24px -8px rgba(244,114,182,0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%":       { transform: "translateY(-8px) rotate(3deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%":       { opacity: "1" },
        },
        "sparkle-spin": {
          "0%":   { transform: "rotate(0deg) scale(1)",   opacity: "1" },
          "50%":  { transform: "rotate(180deg) scale(1.3)", opacity: "0.7" },
          "100%": { transform: "rotate(360deg) scale(1)", opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "shimmer-sweep": {
          to: { transform: "translateX(100%)" },
        },
        "radial-pulse": {
          "0%, 100%": { transform: "scale(1)",   opacity: "0.6" },
          "50%":       { transform: "scale(1.08)", opacity: "0.9" },
        },
        "text-shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
      },
      animation: {
        float:          "float 7s ease-in-out infinite",
        "float-slow":   "float-slow 9s ease-in-out infinite",
        "pulse-glow":   "pulse-glow 3.5s ease-in-out infinite",
        "sparkle-spin": "sparkle-spin 4s linear infinite",
        marquee:        "marquee 28s linear infinite",
        "radial-pulse": "radial-pulse 4s ease-in-out infinite",
        "blink-cursor": "blink-cursor 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
