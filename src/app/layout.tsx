import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Manas — Creative Developer",
  description:
    "Personal portfolio of Manas — a creative developer crafting immersive digital experiences at the intersection of design and engineering.",
  keywords: [
    "portfolio",
    "creative developer",
    "web developer",
    "frontend engineer",
    "UI/UX",
    "Next.js",
    "React",
  ],
  openGraph: {
    title: "Manas — Creative Developer",
    description:
      "Crafting immersive digital experiences at the intersection of design and engineering.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
