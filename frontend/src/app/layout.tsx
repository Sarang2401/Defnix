import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/layout/LayoutContent";

/*
  Typography — loaded via next/font for performance.
  General Sans is not in Google Fonts, so it is imported
  via the @import in globals.css (googleapis CDN).
  Inter covers body + label roles.
*/
const inter = Inter({
  variable: "--font-inter-loaded",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Defnix — Engineering Studio for Security, Web & Mobile Development",
    template: "%s | Defnix",
  },
  description:
    "Defnix is an engineering studio specializing in SOC2 compliance, cloud security, AI automation, website development, mobile apps, and business workflow automation for startups and small businesses.",
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
  ],
  authors: [{ name: "Defnix Engineering" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Defnix",
    title: "Defnix — Engineering Studio for Security, Web & Mobile Development",
    description:
      "SOC2 compliance, cloud security, AI automation, web development, mobile apps, and workflow automation for startups.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Defnix — Engineering Studio",
    description: "Security, cloud, AI, web, mobile, and automation engineering.",
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
    <html lang="en" className={inter.variable}>
      <head>
        {/* General Sans — not available on Google Fonts, loaded from Fontshare */}
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@600&display=swap"
        />
      </head>
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
