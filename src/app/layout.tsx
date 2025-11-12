import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "Battle Royale App Store Pulse",
  description:
    "Live view into the top trending battle royale games on the Apple App Store with stats, momentum, and quick links.",
  metadataBase: new URL("https://agentic-89d05d44.vercel.app"),
  openGraph: {
    title: "Battle Royale App Store Pulse",
    description:
      "Track the highest ranking battle royale games on the App Store with ratings, price, and quick analysis.",
    url: "https://agentic-89d05d44.vercel.app",
    siteName: "Battle Royale App Store Pulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Battle Royale App Store Pulse",
    description:
      "Discover the top trending battle royale titles on the Apple App Store in a single curated view.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable}`}>
      <body className="flex min-h-screen flex-col bg-slate-950 main-gradient">
        {children}
      </body>
    </html>
  );
}
