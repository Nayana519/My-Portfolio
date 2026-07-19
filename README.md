# Nayana J Pillai — Portfolio

A premium, dark-theme developer portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion. Design direction is inspired by three references: bold neon rose/violet gradients (LAILA), a near-black editorial base (RAZE), and oversized gradient display type with corner labels (VISION).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `app/` — routes, layout, global styles, SEO files (sitemap, robots)
- `components/` — one component per file, organized by section
- `components/ui/` — reusable primitives (Button, Card, GlowOrb, etc.)
- `hooks/` — custom React hooks (mouse tracking, scroll, in-view detection)
- `animations/` — Framer Motion variant presets + the canvas pixel-reveal effect
- `data/` — all resume content as typed data, edit here to update site copy
- `types/` — shared TypeScript interfaces
- `lib/` — utility functions

## Editing Content

All text content (projects, experience, skills, certifications, stats) lives in `data/*.ts`. You do not need to touch component files to update copy — just edit the relevant data file.

## Assets

- `public/images/profile.jpg` — your photo, used in the interactive hero portrait
- `public/images/greengrow-landing.png`, `greengrow-dashboard.png` — real GreenGrow product screenshots
- `public/resume/Nayana_J_Pillai_Resume.pdf` — downloadable resume, linked from Navbar and Footer

## Notes

- Update `siteUrl` in `app/layout.tsx` and `app/sitemap.ts` / `app/robots.ts` once you have a real domain.
- The contact form currently opens a pre-filled `mailto:` link. Swap in a real email service (Resend, EmailJS, etc.) inside `components/ContactForm.tsx` when ready.
- Add a proper `favicon.ico` and `public/images/og-image.png` for social sharing previews.
