import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/layout/LayoutContent";

/*
  Typography — all loaded via next/font/google (self-hosted,
  no render-blocking external <link>, no duplicate requests).
  Space Grotesk covers headlines, Manrope covers body + label roles,
  Fraunces is a serif accent voice used sparingly for editorial
  moments (kickers, pull-quotes) — see globals.css header comment.
*/
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  style: ["italic", "normal"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Defnix — Engineering Studio for Startups & Small Businesses",
    template: "%s | Defnix",
  },
  description:
    "Defnix is an engineering studio building SOC2 compliance, cloud security, AI automation, websites, mobile apps, and workflow automation for startups and small businesses — enterprise-grade engineering without the enterprise overhead.",
  keywords: [
    "SOC2 compliance",
    "cloud security",
    "AI SOC analyst",
    "website development",
    "mobile app development",
    "business automation",
    "n8n automation",
    "React Native apps",
    "small business website",
    "compliance readiness",
    "startup security engineering",
  ],
  authors: [{ name: "Defnix Engineering" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Defnix",
    title: "Defnix — Engineering Studio for Startups & Small Businesses",
    description:
      "SOC2 compliance, cloud security, AI automation, web development, mobile apps, and workflow automation — built for startups and small businesses, not enterprises.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Defnix — Engineering Studio for Startups & Small Businesses",
    description: "Security, cloud, AI, web, mobile, and automation engineering — for startups and small businesses.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Defnix",
    url: "https://defnix.in",
    sameAs: ["https://www.linkedin.com"],
    description: "Engineering studio for SOC2 compliance, cloud security, and automation.",
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} ${fraunces.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
