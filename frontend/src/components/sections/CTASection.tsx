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
                    <div className="relative z-10 bg-neutral-900/60 backdrop-blur-sm rounded-2xl border border-white/10 p-12 lg:p-20 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl sm:text-4xl lg:text-5xl text-white font-medium mb-6"
                        >
                            ready to build something great?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-lg text-white/60 max-w-xl mx-auto mb-10"
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
