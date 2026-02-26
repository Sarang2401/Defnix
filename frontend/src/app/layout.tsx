import type { Metadata } from "next";
import { Sora, DM_Sans, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/layout/LayoutContent";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Defnix — Engineering Studio for Security & Cloud Infrastructure",
    template: "%s | Defnix",
  },
  description:
    "Defnix is an engineering studio specializing in SOC2 compliance, cloud security, and AI-driven security operations for modern startups.",
  keywords: [
    "SOC2 compliance",
    "cloud security",
    "AI SOC analyst",
    "security engineering",
    "cloud insurance",
    "compliance readiness",
  ],
  authors: [{ name: "Defnix Engineering" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Defnix",
    title: "Defnix — Engineering Studio for Security & Cloud Infrastructure",
    description:
      "SOC2 compliance, cloud security, and AI-driven security operations for modern startups.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Defnix — Engineering Studio",
    description:
      "SOC2 compliance, cloud security, and AI-driven security operations.",
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
    <html
      lang="en"
      className={`${sora.variable} ${dmSans.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}

