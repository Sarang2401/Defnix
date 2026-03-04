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
                    <p className="text-sm text-[var(--color-text-muted)] mb-4">
                        Effective Date: 04-03-2026
                    </p>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-10">
                        The information provided on the Defnix website is published in
                        good faith and is intended for general informational and
                        educational purposes related to cloud security, cybersecurity
                        engineering, compliance readiness, and AI driven automation.
                        By using this website, you acknowledge and agree to the terms
                        outlined in this disclaimer.
                    </p>
                </PageTransition>

                <PageTransition delay={0.1}>
                    <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed">

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Informational Purpose
                            </h2>
                            <p>
                                All content available on the Defnix website, including
                                articles, documentation, service descriptions, and
                                technical discussions, is provided for informational
                                purposes only.
                            </p>
                            <p className="mt-3">
                                While Defnix strives to present accurate and up to date
                                information, cybersecurity and cloud technologies evolve
                                rapidly. As a result, some information may become outdated
                                or may not apply to every environment or infrastructure
                                setup.
                            </p>
                            <p className="mt-3">
                                Users should independently evaluate any technical guidance
                                before implementing it within their systems.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                No Professional Guarantee
                            </h2>
                            <p>
                                The information presented on this website does not
                                constitute guaranteed professional, legal, or security
                                advice.
                            </p>
                            <p className="mt-3">
                                Security implementations, compliance outcomes, and
                                infrastructure resilience depend on multiple factors
                                including system architecture, operational practices, and
                                organizational processes.
                            </p>
                            <p className="mt-3">
                                Defnix does not guarantee that applying any information
                                from this website will prevent security incidents, data
                                breaches, or compliance issues. Organizations are
                                responsible for assessing their own security requirements
                                and implementing appropriate safeguards.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Service Descriptions
                            </h2>
                            <p>
                                Descriptions of services, engineering solutions, or
                                technical capabilities on the Defnix website are provided
                                for general informational purposes.
                            </p>
                            <p className="mt-3">
                                Actual services delivered to clients are defined through
                                formal agreements, project scopes, and mutually agreed
                                technical deliverables. Viewing or interacting with this
                                website does not establish a professional or contractual
                                relationship between Defnix and the visitor.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                External Links and Third Party Content
                            </h2>
                            <p>
                                The Defnix website may include links to external websites,
                                documentation resources, or third party services for
                                informational purposes.
                            </p>
                            <p className="mt-3">
                                Defnix does not control the content, policies, or
                                practices of these external websites and is not responsible
                                for any information or services they provide. Users should
                                review the policies and terms of any external websites they
                                access.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Technology and Security Limitations
                            </h2>
                            <p>
                                Cybersecurity is a constantly evolving discipline and no
                                security system can guarantee absolute protection.
                            </p>
                            <p className="mt-3">
                                Even well designed security architectures and monitoring
                                systems may experience vulnerabilities, emerging threats,
                                or unforeseen operational challenges. Users and
                                organizations should maintain continuous monitoring,
                                regular updates, and responsible security practices as
                                part of their overall risk management strategy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Consent
                            </h2>
                            <p>
                                By accessing and using the Defnix website, you acknowledge
                                that you have read, understood, and agreed to this
                                disclaimer and its limitations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Updates to This Disclaimer
                            </h2>
                            <p>
                                Defnix may update this Disclaimer periodically to reflect
                                changes in services, legal requirements, or website
                                operations. Any updates will be published on this page with
                                the revised effective date.
                            </p>
                            <p className="mt-3">
                                Users are encouraged to review this page periodically to
                                stay informed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Contact Information
                            </h2>
                            <p>
                                If you have questions regarding this Disclaimer or the
                                information presented on this website, you may contact
                                Defnix at:{" "}
                                <a
                                    href="mailto:hello@defnix.com"
                                    className="text-[var(--color-accent)] hover:underline"
                                >
                                    hello@defnix.com
                                </a>
                                .
                            </p>
                            <p className="mt-3">
                                Defnix operates as a remote first engineering studio
                                providing services related to cloud security engineering,
                                cybersecurity infrastructure, compliance readiness, and AI
                                driven security automation.
                            </p>
                        </section>

                    </div>
                </PageTransition>
            </article>
        </div>
    );
}
