import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Defnix terms of service — conditions governing the use of our website and engineering services.",
};

export default function TermsOfServicePage() {
    return (
        <div className="pt-28 pb-20">
            <article className="max-w-3xl mx-auto px-6">
                <PageTransition>
                    <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                        Legal
                    </p>
                    <h1 className="text-4xl sm:text-5xl text-[var(--color-text-primary)] mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-sm text-[var(--color-text-muted)] mb-10">
                        Last updated: February 2026
                    </p>
                </PageTransition>

                <PageTransition delay={0.1}>
                    <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Acceptance of Terms
                            </h2>
                            <p>
                                By accessing and using this website, you agree to be bound
                                by these Terms of Service and all applicable laws and
                                regulations. If you do not agree with any of these terms,
                                you are prohibited from using or accessing this site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Services
                            </h2>
                            <p>
                                Defnix provides engineering consulting services
                                specializing in SOC2 compliance, cloud security, and
                                AI-driven security automation. We also provide
                                informational content through our blog and technical
                                resources. All consulting engagements are governed by
                                separate service agreements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Use License
                            </h2>
                            <p>
                                Permission is granted to temporarily access the materials
                                on this website for personal, non-commercial transitory
                                viewing only. You may not modify, copy, distribute,
                                transmit, display, perform, reproduce, publish, license,
                                create derivative works from, transfer, or sell any
                                information obtained from this website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Intellectual Property
                            </h2>
                            <p>
                                All content on this website — including text, graphics,
                                logos, code samples, and documentation — is the property
                                of Defnix and is protected by applicable intellectual
                                property laws. Blog content may be shared with proper
                                attribution and a link back to the original article.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Limitation of Liability
                            </h2>
                            <p>
                                We provide engineering consulting and informational
                                content. We are not liable for damages resulting from the
                                use or inability to use the materials on this website, or
                                from the misuse of information provided through our
                                services, even if Defnix has been notified of the
                                possibility of such damages.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Accuracy of Information
                            </h2>
                            <p>
                                The materials on this website are provided on an
                                &quot;as is&quot; basis. Defnix makes no warranties,
                                expressed or implied, and hereby disclaims all other
                                warranties including, without limitation, implied
                                warranties of merchantability, fitness for a particular
                                purpose, or non-infringement of intellectual property.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Governing Law
                            </h2>
                            <p>
                                These terms and conditions are governed by and construed
                                in accordance with applicable laws, and you irrevocably
                                submit to the exclusive jurisdiction of the courts in that
                                location.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Contact
                            </h2>
                            <p>
                                For questions about these Terms of Service, contact us at{" "}
                                <a
                                    href="mailto:legal@defnix.com"
                                    className="text-[var(--color-accent)] hover:underline"
                                >
                                    legal@defnix.com
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
