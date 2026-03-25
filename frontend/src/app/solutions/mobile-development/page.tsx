import type { Metadata } from "next";
import { SolutionPageLayout } from "@/components/sections/SolutionPageLayout";

export const metadata: Metadata = {
    title: "Mobile App Development",
    description:
        "Cross-platform mobile apps for dental practices, clinics, restaurants, and service businesses. Booking systems, patient portals, push notifications, and payment integration.",
};

export default function MobileDevelopmentPage() {
    return (
        <SolutionPageLayout
            iconName="Smartphone"
            label="Mobile App Development"
            title="Give Your Customers an App They'll Actually Use"
            subtitle="85% of consumers prefer using an app over a mobile website for interacting with local service businesses. We build cross-platform iOS and Android apps that make booking, ordering, and engaging with your business effortless."
            sections={{
                problem: {
                    iconName: "AlertTriangle",
                    title: "The Problem",
                    content:
                        "Dental practices lose $150 or more per missed appointment. Restaurants watch customers abandon clunky third-party ordering platforms that take 20-30% commission. Clinics manage appointments by phone while staff spend hours each week on scheduling calls. The answer isn't a better spreadsheet — it's giving customers a direct, branded mobile experience that handles the operational load automatically.",
                },
                audience: {
                    iconName: "Users",
                    title: "Who This Is For",
                    content: [
                        "Dental and medical practices that want to reduce no-shows and automate appointment booking",
                        "Restaurants and cafes looking to own their ordering experience without third-party platform fees",
                        "Healthcare and wellness businesses needing patient portals and secure communication",
                        "Service businesses in USA, UK, and Australia ready to turn customers into loyal app users",
                        "Multi-location businesses that need consistent, branded customer experiences across all sites",
                    ],
                },
                risks: {
                    iconName: "AlertTriangle",
                    title: "Cost of Not Having an App",
                    content: [
                        "Dental practices lose an estimated $50,000+ per year from missed appointments and no-shows",
                        "Relying on Uber Eats or Deliveroo costs restaurants 20-30% per order — an app pays for itself quickly",
                        "Phone-based booking means missed calls outside business hours translates directly to lost revenue",
                        "Without a loyalty or push notification channel, customers drift to competitors who have one",
                        "Manual scheduling overhead consumes front-desk time that could be spent on customer service",
                    ],
                },
                approach: {
                    iconName: "Target",
                    title: "Our Approach",
                    content:
                        "We build cross-platform apps using React Native — a single codebase that runs natively on both iOS and Android. We start by mapping the exact customer journey we're solving for: booking, ordering, or engagement. Then we design and build with simplicity as the priority — an app your customers open with one tap and actually enjoy using. Backend systems are designed for reliability and integration with your existing tools wherever possible.",
                },
                capabilities: {
                    iconName: "Cpu",
                    title: "What We Build",
                    content: [
                        "Cross-platform iOS and Android apps from a single React Native codebase",
                        "Appointment and booking systems with automated SMS/email reminders",
                        "Online ordering with payment integration (Stripe, Square, PayPal)",
                        "Push notification campaigns for promotions and appointment reminders",
                        "Patient or customer portals with secure messaging",
                        "Loyalty programmes and repeat customer rewards",
                        "Admin dashboard for managing bookings, orders, and customer data",
                        "App Store and Google Play submission and publishing",
                    ],
                },
                deliverables: {
                    iconName: "Package",
                    title: "What You Get",
                    content: [
                        "iOS and Android app published to App Store and Google Play",
                        "Admin dashboard for managing customers, bookings, or orders",
                        "Push notification system for reminders and promotions",
                        "Payment integration configured and tested",
                        "60 days of post-launch support and bug fixes",
                        "App Store listing optimisation for discoverability",
                        "Full handover documentation and staff training guide",
                    ],
                },
                engagement: {
                    iconName: "Handshake",
                    title: "Engagement Model",
                    content:
                        "App projects typically run 6 to 10 weeks from kickoff to App Store submission. We work in clear phases: discovery and design (week 1-2), core development (week 3-7), testing and refinement (week 8-9), and submission and launch (week 10). Pricing is milestone-based with no surprises. Post-launch maintenance retainers are available for ongoing feature development and support.",
                },
            }}
        />
    );
}
