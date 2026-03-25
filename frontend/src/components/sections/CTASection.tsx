"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "../ui/TextReveal";

export function CTASection() {
    return (
        <section className="section-gap relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-2xl overflow-hidden"
                >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 cta-gradient-bg" />

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl animated-border" />

                    {/* Content */}
                    <div className="relative z-10 glass-card rounded-2xl p-12 lg:p-20 text-center border-0">
                        <TextReveal
                            as="h2"
                            className="text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)] mb-6"
                        >
                            Ready to build something great?
                        </TextReveal>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto mb-10"
                        >
                            Whether it&apos;s SOC2 compliance, a website for your cafe, a booking app,
                            or automating your workflows — book a free consultation and let&apos;s talk.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Button variant="primary" size="lg" href="/contact">
                                Book a Consultation
                                <ArrowRight size={18} />
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
