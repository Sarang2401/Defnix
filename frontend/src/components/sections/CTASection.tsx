"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

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
                    {/* Content */}
                    <div
                        className="relative z-10 rounded-2xl border p-12 lg:p-20 text-center"
                        style={{
                            backgroundColor: "var(--color-secondary)",
                            borderColor: "var(--color-border)",
                        }}
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6"
                            style={{ color: "var(--color-mist)", fontFamily: "var(--font-headline)" }}
                        >
                            ready to build something great?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-lg mx-auto mb-10"
                            style={{
                                color: "var(--color-text-secondary)",
                                fontFamily: "var(--font-body)",
                                maxWidth: "52ch",
                                lineHeight: "1.6",
                            }}
                        >
                            whether it&apos;s soc2 compliance, a website for your cafe, a booking app,
                            or automating your workflows — book a free consultation and let&apos;s talk.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Button variant="primary" size="lg" href="/contact">
                                book a consultation
                                <ArrowRight size={18} />
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
