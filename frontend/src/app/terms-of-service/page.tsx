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
                    <p className="text-sm text-[var(--color-text-muted)] mb-4">
                        Effective Date: 04-03-2026
                    </p>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-10">
                        These Terms of Service govern the use of the Defnix website and
                        any information, resources, or services made available through
                        the website. By accessing or using this website, you agree to
                        comply with and be bound by these terms. If you do not agree
                        with any part of these Terms of Service, you should discontinue
                        use of the website.
                    </p>
                </PageTransition>

                <PageTransition delay={0.1}>
                    <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed">

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Use of the Website
                            </h2>
                            <p>
                                The Defnix website provides information related to cloud
                                security engineering, cybersecurity infrastructure,
                                compliance readiness, and AI driven automation solutions.
                                The content available on this website is intended for
                                informational and professional awareness purposes. Users
                                may access and read the content for lawful purposes only.
                            </p>
                            <p className="mt-3">
                                Users agree not to use the website in any way that may:
                            </p>
                            <ul className="mt-3 space-y-2 pl-0 list-none">
                                {[
                                    "Violate applicable laws or regulations",
                                    "Disrupt the operation or security of the website",
                                    "Attempt unauthorized access to systems, servers, or networks",
                                    "Distribute malicious code, spam, or harmful content",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-3">
                                Defnix reserves the right to restrict access to users
                                who misuse the website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Intellectual Property
                            </h2>
                            <p>
                                All content published on the Defnix website, including
                                text, graphics, design elements, documentation, and
                                branding, is the property of Defnix unless otherwise
                                stated. This content is protected under applicable
                                intellectual property laws.
                            </p>
                            <p className="mt-3">Users may:</p>
                            <ul className="mt-3 space-y-2 pl-0 list-none">
                                <li className="flex items-start gap-2">
                                    <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                    View and read website content for personal or
                                    professional reference
                                </li>
                            </ul>
                            <p className="mt-3">Users may not:</p>
                            <ul className="mt-3 space-y-2 pl-0 list-none">
                                {[
                                    "Copy, reproduce, or redistribute website content without permission",
                                    "Republish content on other platforms without attribution",
                                    "Use Defnix branding, trademarks, or materials for commercial purposes without authorization",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-3">
                                Requests for permission may be submitted through the
                                official contact email.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Accuracy of Information
                            </h2>
                            <p>
                                Defnix strives to provide accurate and current information
                                related to cybersecurity practices, cloud infrastructure,
                                and security automation.
                            </p>
                            <p className="mt-3">
                                However, the cybersecurity field evolves rapidly, and
                                information presented on the website may change over time.
                                Defnix does not guarantee that all information on the
                                website is complete, fully current, or free from errors.
                                Users should verify technical information independently
                                before applying it within their own systems or
                                environments.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Professional Services
                            </h2>
                            <p>
                                The information available on this website does not
                                constitute a binding service agreement or professional
                                engagement.
                            </p>
                            <p className="mt-3">
                                Any services described on the website, including cloud
                                security engineering, compliance readiness support, or AI
                                driven automation solutions, are subject to separate
                                agreements and project scopes established between Defnix
                                and its clients. Communication through the website or via
                                email does not automatically establish a client
                                relationship.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                External Links
                            </h2>
                            <p>
                                The website may contain references or links to external
                                websites or third party resources. These links are
                                provided for informational purposes only. Defnix does not
                                control or endorse the content, policies, or services
                                offered by external websites.
                            </p>
                            <p className="mt-3">
                                Users who access external links do so at their own
                                discretion and should review the terms and privacy
                                policies of those websites.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Limitation of Liability
                            </h2>
                            <p>
                                Defnix provides website content on an informational basis.
                                To the maximum extent permitted by law, Defnix shall not
                                be held liable for any direct, indirect, incidental, or
                                consequential damages arising from the use of this website
                                or reliance on the information presented.
                            </p>
                            <p className="mt-3">
                                This includes potential losses related to:
                            </p>
                            <ul className="mt-3 space-y-2 pl-0 list-none">
                                {[
                                    "Business operations",
                                    "System security",
                                    "Infrastructure decisions",
                                    "Data protection practices",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-3">
                                Users remain responsible for evaluating and implementing
                                appropriate security measures within their own
                                environments.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Website Availability
                            </h2>
                            <p>
                                Defnix makes reasonable efforts to keep the website
                                accessible and operational. However, uninterrupted
                                availability cannot be guaranteed.
                            </p>
                            <p className="mt-3">
                                The website may occasionally experience maintenance
                                periods, updates, or temporary service interruptions.
                                Defnix reserves the right to modify, suspend, or
                                discontinue any part of the website at any time without
                                prior notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Modifications to These Terms
                            </h2>
                            <p>
                                Defnix may update these Terms of Service periodically to
                                reflect changes in services, legal requirements, or
                                operational practices. When updates are made, the revised
                                Terms will be posted on this page with an updated
                                effective date.
                            </p>
                            <p className="mt-3">
                                Continued use of the website after changes are posted
                                constitutes acceptance of the revised terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Governing Principles
                            </h2>
                            <p>
                                These Terms of Service are intended to reflect fair and
                                responsible usage of the Defnix website. Users are
                                expected to access the website in good faith and in
                                accordance with applicable laws and professional
                                standards.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Contact Information
                            </h2>
                            <p>
                                If you have any questions regarding these Terms of Service
                                or the use of this website, you may contact Defnix at:{" "}
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
                                providing services in cloud security engineering,
                                cybersecurity infrastructure, compliance readiness, and
                                AI driven security automation.
                            </p>
                        </section>

                    </div>
                </PageTransition>
            </article>
        </div>
    );
}
