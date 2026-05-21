import { HeroSection } from "@/components/sections/HeroSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { MetricsBar } from "@/components/sections/MetricsBar";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CTASection } from "@/components/sections/CTASection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { PortfolioPreviewSection } from "@/components/sections/PortfolioPreviewSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <MetricsBar />
      <HowWeWorkSection />
      <PortfolioPreviewSection />
      <BlogPreviewSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
