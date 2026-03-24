import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/sections/SolutionPageLayout";

export const metadata: Metadata = {
    title: "Website Development for Small Businesses",
    description:
        "Custom, conversion-focused websites for cafes, dental clinics, restaurants and local businesses. Mobile-first, SEO-optimised, and built to win local search.",
};

export default function WebsiteDevelopmentPage() {
    return (
        <SolutionPageLayout
            iconName="Globe"
            label="Website Development for Small Businesses"
            title="Your Website Should Bring Customers In"
            subtitle="46% of small businesses still have no website. The ones that do, win. We build fast, mobile-first websites that rank on Google and turn local searches into real customers — for cafes, clinics, restaurants, and every local business in between."
            sections={{
                problem: {
                    iconName: "AlertTriangle",
                    title: "The Problem",
                    content:
                        "Most local businesses in the US, UK, and Australia rely on foot traffic and word-of-mouth while their competitors build an online presence that captures customers 24/7. A poorly designed website is often worse than none — slow load times, no mobile optimisation, and zero visibility on Google mean you're invisible to the very people searching for what you offer right now.",
                },
                audience: {
                    iconName: "Users",
                    title: "Who This Is For",
                    content: [
                        "Cafe and coffee shop owners who want to show up when people search 'best coffee near me'",
                        "Dental and medical clinics that need online booking and a professional first impression",
                        "Restaurants and food businesses looking to take online orders or display their menu",
                        "Boutique shops, salons, and local service providers ready to grow their digital presence",
                        "Small businesses in USA, UK, and Australia entering the online space for the first time",
                    ],
                },
                risks: {
                    iconName: "AlertTriangle",
                    title: "Cost of No Online Presence",
                    content: [
                        "97% of consumers search online for local businesses before visiting — you're invisible without a website",
                        "Competitors with even a basic optimised site capture your potential customers every hour you're offline",
                        "Social media alone isn't enough — you don't own your audience on Instagram or Facebook",
                        "Outdated or slow websites actively hurt credibility — 88% of users won't return after a bad experience",
                        "Missing Google Maps and local search visibility means zero organic foot traffic from searches",
                    ],
                },
                approach: {
                    iconName: "Target",
                    title: "Our Approach",
                    content:
                        "We treat your website as a business tool, not a brochure. We start by understanding your customers, your local area, and what makes you different. Then we design and build a fast, mobile-first website that's configured for local SEO from day one — so you start appearing in Google search and Maps as quickly as possible. Everything is built to convert visitors into customers: clear calls to action, online booking or ordering integration, and a design your customers will trust.",
                },
                capabilities: {
                    iconName: "Cpu",
                    title: "What We Build",
                    content: [
                        "Custom responsive design — looks great on every device, especially mobile",
                        "Local SEO configuration — Google Business Profile, structured data, location targeting",
                        "Online booking and appointment scheduling integration",
                        "Online menu display or ordering system for food businesses",
                        "Google Maps embed and directions integration",
                        "Contact forms, click-to-call, and WhatsApp integration",
                        "Content management system (CMS) so you can update menus and content yourself",
                        "Basic analytics setup — know where your visitors are coming from",
                    ],
                },
                deliverables: {
                    iconName: "Package",
                    title: "What You Get",
                    content: [
                        "Production-ready website, live on your domain",
                        "Mobile-optimised design tested across iOS and Android",
                        "Google Business Profile setup or optimisation",
                        "Local SEO configuration with keyword targeting for your area",
                        "CMS setup and training so you can manage your own content",
                        "30 days of post-launch support for updates and fixes",
                        "Handover documentation and basic analytics reporting",
                    ],
                },
                engagement: {
                    iconName: "Handshake",
                    title: "Engagement Model",
                    content:
                        "Most website projects are delivered in 2 to 4 weeks. We start with a discovery call to understand your business and goals, then design and build in parallel sprints with regular check-ins. You review at each milestone before we go live. Pricing is fixed per project with no hourly billing surprises. Ongoing maintenance and SEO retainers are available for clients who want continued growth.",
                },
            }}
        />
    );
}
