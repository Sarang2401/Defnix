import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
    title: "Disclaimer",
    description: "Defnix disclaimer — important information about the use of our technical content and services.",
};

export default function DisclaimerPage() {
    return (
        <div className="pt-28 pb-20">
            <article className="max-w-3xl mx-auto px-6">
                <PageTransition>
                    <p className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                        Legal
                    </p>
                    <h1 className="text-4xl sm:text-5xl text-[var(--color-text-primary)] mb-6">
                        Disclaimer
                    </h1>
                    <p className="text-sm text-[var(--color-text-muted)] mb-10">
                        Last updated: February 2026
                    </p>
                </PageTransition>

                <PageTransition delay={0.1}>
                    <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                General Disclaimer
                            </h2>
                            <p>
                                All technical information provided on this website —
                                including blog posts, case studies, and solution
                                descriptions — is for educational and informational
                                purposes only. The content reflects general best practices
                                and should not be considered as specific professional
                                advice for your organization.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Implementation Responsibility
                            </h2>
                            <p>
                                Implementation of security configurations, compliance
                                controls, cloud architectures, and any other technical
                                recommendations described on this website is the sole
                                responsibility of the user or organization. Defnix is not
                                liable for any damages, security incidents, or compliance
                                failures resulting from the independent application of
                                information found on this website outside of a formal
                                consulting engagement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                No Guarantees
                            </h2>
                            <p>
                                While we strive to provide accurate and up-to-date
                                information, we make no representations or warranties of
                                any kind, express or implied, about the completeness,
                                accuracy, reliability, or applicability of the information
                                on this website. Security and compliance requirements
                                change frequently — always verify current standards with
                                the relevant governing bodies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Statistics and Metrics
                            </h2>
                            <p>
                                Statistics, metrics, and performance figures cited on this
                                website (including on case study pages) are based on
                                specific client engagements and may not be representative
                                of results achievable in all environments. Individual
                                outcomes depend on the specific circumstances, existing
                                infrastructure, and organizational readiness of each
                                client.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                External Links
                            </h2>
                            <p>
                                This website may contain links to external websites that
                                are not provided or maintained by Defnix. We do not
                                guarantee the accuracy, relevance, timeliness, or
                                completeness of any information on these external
                                websites.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Contact
                            </h2>
                            <p>
                                For questions about this disclaimer, contact us at{" "}
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
