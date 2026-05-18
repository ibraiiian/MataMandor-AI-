import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MataMandor AI — Visual BoM Estimator",
  description:
    "Estimasi kebutuhan material bangunan secara instan dari foto ruangan. Didukung oleh AI Gemini untuk analisis visual yang akurat dan cepat.",
  keywords: [
    "estimasi material bangunan",
    "AI",
    "Gemini",
    "bill of materials",
    "renovasi",
    "MataMandor",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
