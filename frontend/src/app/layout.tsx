import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/layout/LayoutContent";

const readexPro = Readex_Pro({
  variable: "--font-readex",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
    description:
      "Security, cloud, AI, web, mobile, and automation engineering.",
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
    <html lang="en" className={readexPro.variable}>
      <body className="antialiased">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
