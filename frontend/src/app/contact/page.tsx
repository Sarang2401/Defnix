import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import * as motion from "framer-motion/client";
import { Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with the Defnix engineering team. Book a consultation for SOC2 compliance, cloud security, or AI-driven security operations.",
};

export default function ContactPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column: Info */}
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4"
                        >
                            contact us
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl sm:text-5xl text-white font-medium mb-6"
                        >
                            let&apos;s talk about
                            <br />
                            <span className="text-white/50">
                                your project.
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-white/60 leading-relaxed mb-10"
                        >
                            whether you need soc2 compliance engineering, cloud
                            resilience, website development, mobile apps, or
                            business automation — we start every engagement with a
                            no-obligation conversation. tell us about your challenges.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="space-y-6"
                        >
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
                        </motion.div>
                    </div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="rounded-xl bg-neutral-900 border border-white/10 p-8 lg:p-10">
                            <h2 className="text-xl text-white font-medium mb-6">
                                send us a message
                            </h2>
                            <ContactForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
