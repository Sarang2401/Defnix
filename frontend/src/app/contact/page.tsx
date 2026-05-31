import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageTransition } from "@/components/ui/PageTransition";
import { Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with the Defnix engineering team. Book a consultation for SOC2 compliance, cloud security, or AI-driven security operations.",
};

export default function ContactPage() {
    return (
        <div className="pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
                    {/* Left — Info */}
                    <div>
                        <PageTransition>
                            <p className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4">
                                contact us
                            </p>
                        </PageTransition>
                        <PageTransition delay={0.1}>
                            <h1 className="text-4xl sm:text-5xl text-white font-medium mb-6">
                                let&apos;s talk about
                                <br />
                                <span className="text-white/50">
                                    your project.
                                </span>
                            </h1>
                        </PageTransition>
                        <PageTransition delay={0.2}>
                            <p className="text-lg text-white/60 leading-relaxed mb-10">
                                whether you need soc2 compliance engineering, cloud
                                resilience, website development, mobile apps, or
                                business automation — we start every engagement with a
                                no-obligation conversation. tell us about your challenges.
                            </p>
                        </PageTransition>

                        <PageTransition delay={0.3}>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white flex-shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white font-medium mb-0.5">
                                            email
                                        </p>
                                        <p className="text-sm text-white/60">
                                            hello@defnix.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white flex-shrink-0">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white font-medium mb-0.5">
                                            response time
                                        </p>
                                        <p className="text-sm text-white/60">
                                            within 1 business day
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white flex-shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-white font-medium mb-0.5">
                                            location
                                        </p>
                                        <p className="text-sm text-white/60">
                                            remote-first · serving clients globally
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PageTransition>
                    </div>

                    {/* Right — Form */}
                    <div>
                        <PageTransition delay={0.3}>
                            <div className="rounded-xl bg-neutral-900 border border-white/10 p-8 lg:p-10">
                                <h2 className="text-xl text-white font-medium mb-6">
                                    send us a message
                                </h2>
                                <ContactForm />
                            </div>
                        </PageTransition>
                    </div>
                </div>
            </div>
        </div>
    );
}
