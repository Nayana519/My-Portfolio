import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://nayanajpillai.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nayana J Pillai — Software Engineer",
  description:
    "B.Tech Computer Science undergraduate building full-stack and machine learning applications. Creator of GreenGrow and PulseGuard.",
  keywords: [
    "Nayana J Pillai",
    "Software Engineer",
    "Machine Learning",
    "Full Stack Developer",
    "GreenGrow",
    "PulseGuard",
  ],
  openGraph: {
    title: "Nayana J Pillai — Software Engineer",
    description:
      "B.Tech Computer Science undergraduate building full-stack and machine learning applications.",
    url: siteUrl,
    siteName: "Nayana J Pillai",
    images: ["/images/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nayana J Pillai — Software Engineer",
    description:
      "B.Tech Computer Science undergraduate building full-stack and machine learning applications.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="noise relative">
        <CursorGlow />
        <SmoothScroll />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
