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
    "Award-winning Embedded Systems & IoT Engineer, AI Developer, Tech Community Leader, and STEM Advocate. Co-Founder of NION Academy.",
  keywords: [
    "Embedded Systems Engineer",
    "IoT Engineer",
    "AI Developer",
    "STEM Advocate",
    "NION Academy",
    "Engineer Yinka",
    "Oyindamola Deji-Agboola",
  ],
  openGraph: {
    title: "Oyindamola Deji-Agboola | Engineer Yinka",
    description:
      "Award-winning Embedded Systems & IoT Engineer, AI Developer, and STEM Advocate.",
    type: "website",
  },
};

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
        <div className="noise-bg" />
        {children}
      </body>
    </html>
  );
}
