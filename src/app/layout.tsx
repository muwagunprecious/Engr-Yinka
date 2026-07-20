import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Oyindamola Deji-Agboola | Engineer Yinka",
  description:
    "Embedded Systems and IoT Engineer, Machine Learning Engineer, Certified Meta AI Academy Developer, and Tech Community Leader. Co-Founder of NION Academy.",
  keywords: [
    "Embedded Systems Engineer",
    "IoT Engineer",
    "Machine Learning Engineer",
    "Meta AI Academy Developer",
    "AI Developer",
    "STEM Advocate",
    "NION Academy",
    "Engineer Yinka",
    "Oyindamola Deji-Agboola",
  ],
  openGraph: {
    title: "Oyindamola Deji-Agboola | Engineer Yinka",
    description:
      "Embedded Systems & IoT Engineer, Machine Learning Engineer, and Certified Meta AI Academy Developer.",
    type: "website",
  },
};

import CircuitBackground from "../components/CircuitBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white relative">
        <CircuitBackground />
        <div className="noise-bg" />
        {children}
      </body>
    </html>
  );
}
