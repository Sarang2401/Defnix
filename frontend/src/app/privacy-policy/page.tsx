import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Defnix privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="pt-28 pb-20">
            <article className="max-w-3xl mx-auto px-6">
                <PageTransition>
                    <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                        Legal
                    </p>
                    <h1 className="text-4xl sm:text-5xl text-[var(--color-text-primary)] mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-sm text-[var(--color-text-muted)] mb-10">
                        Last updated: February 2026
                    </p>
                </PageTransition>

                <PageTransition delay={0.1}>
                    <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Information We Collect
                            </h2>
                            <p>
                                We collect limited personal information including name,
                                email address, company name, and message content submitted
                                through our contact forms. This data is used solely for
                                communication and service delivery purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                How We Use Your Information
                            </h2>
                            <p>
                                The information you provide is used exclusively to respond
                                to your inquiries, deliver our engineering services, and
                                send you relevant updates about our services if you have
                                opted in to our newsletter. We do not use your data for
                                automated decision-making or profiling.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Data Sharing
                            </h2>
                            <p>
                                We do not sell personal information to third parties. We
                                may share information with trusted service providers who
                                assist us in operating our website and conducting our
                                business, subject to confidentiality agreements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Cookies and Analytics
                            </h2>
                            <p>
                                We use analytics tools to understand how visitors interact
                                with our website. These tools may use cookies to collect
                                information such as pages visited, time spent on pages,
                                and referral sources. You can control cookie settings
                                through your browser preferences.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Data Security
                            </h2>
                            <p>
                                We implement appropriate technical and organizational
                                measures to protect your personal information against
                                unauthorized access, alteration, disclosure, or
                                destruction. All data is transmitted over encrypted
                                connections (HTTPS/TLS).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Your Rights
                            </h2>
                            <p>
                                You have the right to access, correct, or delete your
                                personal information at any time. To exercise these
                                rights, please contact us at{" "}
                                <a
                                    href="mailto:privacy@defnix.com"
                                    className="text-[var(--color-accent)] hover:underline"
                                >
                                    privacy@defnix.com
                                </a>
                                .
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Contact
                            </h2>
                            <p>
                                For privacy-related questions or concerns, contact us at{" "}
                                <a
                                    href="mailto:privacy@defnix.com"
                                    className="text-[var(--color-accent)] hover:underline"
                                >
                                    privacy@defnix.com
                                </a>
                                .
                            </p>
                        </section>
                    </div>
                </PageTransition>
            </article>
        </div>
    );
}
