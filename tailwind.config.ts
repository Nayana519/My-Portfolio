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
        bg:            "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-card":     "var(--bg-card)",
        surface:       "var(--surface)",
        border:        "var(--border)",
        "border-strong": "var(--border-strong)",
        accent: {
          1:    "var(--accent-1)",
          2:    "var(--accent-2)",
          3:    "var(--accent-3)",
          warm: "var(--accent-warm)",
        },
        text: {
          primary: "var(--text-primary)",
          muted:   "var(--text-muted)",
          faint:   "var(--text-faint)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body:    ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(120deg, #ff2d8a, #ff6eb5 45%, #c2185b)",
        "accent-gradient-warm":
          "linear-gradient(120deg, #ff1493, #ff2d8a 50%, #ff6eb5)",
        "radial-glow":
          "radial-gradient(circle, rgba(255,45,138,0.45), rgba(194,24,91,0.18) 45%, transparent 70%)",
        "radial-glow-sm":
          "radial-gradient(circle, rgba(255,45,138,0.28), transparent 70%)",
        "hero-grid":
          "linear-gradient(to right, rgba(255,45,138,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,45,138,0.07) 1px, transparent 1px)",
      },
      boxShadow: {
        glow:        "0 0 60px -12px rgba(255,45,138,0.65), 0 0 30px -8px rgba(255,110,181,0.4)",
        "glow-sm":   "0 0 28px -8px rgba(255,45,138,0.5)",
        "glow-xs":   "0 0 14px -6px rgba(255,45,138,0.4)",
        "inner-glow":"inset 0 0 24px -8px rgba(255,45,138,0.3)",
        "card":      "0 4px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,105,180,0.1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%":      { transform: "translateY(-8px) rotate(3deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "1" },
        },
        "sparkle-spin": {
          "0%":   { transform: "rotate(0deg) scale(1)",    opacity: "1" },
          "50%":  { transform: "rotate(180deg) scale(1.3)", opacity: "0.7" },
          "100%": { transform: "rotate(360deg) scale(1)",  opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "shimmer-sweep": {
          to: { transform: "translateX(100%)" },
        },
        "radial-pulse": {
          "0%, 100%": { transform: "scale(1)",    opacity: "0.6" },
          "50%":      { transform: "scale(1.12)", opacity: "1" },
        },
        "text-shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        "card-drop": {
          "0%":   { transform: "translateY(-140px) rotate(-8deg)", opacity: "0" },
          "60%":  { transform: "translateY(14px) rotate(2deg)",    opacity: "1" },
          "80%":  { transform: "translateY(-6px) rotate(-1deg)" },
          "100%": { transform: "translateY(0px) rotate(0deg)",     opacity: "1" },
        },
        "ping-bright": {
          "0%":   { transform: "scale(1)",   opacity: "0.9" },
          "75%":  { transform: "scale(2.4)", opacity: "0" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        float:           "float 7s ease-in-out infinite",
        "float-slow":    "float-slow 9s ease-in-out infinite",
        "pulse-glow":    "pulse-glow 2.5s ease-in-out infinite",
        "sparkle-spin":  "sparkle-spin 4s linear infinite",
        marquee:         "marquee 28s linear infinite",
        "radial-pulse":  "radial-pulse 3s ease-in-out infinite",
        "blink-cursor":  "blink-cursor 1s step-end infinite",
        "card-drop":     "card-drop 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "ping-bright":   "ping-bright 1.2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
