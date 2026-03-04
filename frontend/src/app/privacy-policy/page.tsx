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
                    <p className="text-sm text-[var(--color-text-muted)] mb-4">
                        Effective Date: 04-03-2026
                    </p>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-10">
                        Defnix respects your privacy and is committed to protecting the
                        information that visitors share when using our website and
                        services. This Privacy Policy explains how information is
                        collected, used, and protected when you interact with the Defnix
                        website. This policy applies to all visitors, users, and
                        organizations accessing the Defnix website or contacting Defnix
                        for services related to cloud security engineering, cybersecurity
                        infrastructure, and AI driven automation solutions.
                    </p>
                </PageTransition>

                <PageTransition delay={0.1}>
                    <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed">

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Information We Collect
                            </h2>
                            <p>
                                Defnix may collect certain types of information when
                                visitors interact with the website.
                            </p>
                            <h3 className="text-base text-[var(--color-text-primary)] mt-4 mb-2 font-[var(--font-heading)] font-semibold">
                                Information You Provide Directly
                            </h3>
                            <p>
                                You may voluntarily provide information when you contact
                                us through email or other communication channels. This
                                information may include:
                            </p>
                            <ul className="mt-3 space-y-2 pl-0 list-none">
                                {["Name", "Email address", "Organization or company name", "Message content related to inquiries or service requests"].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-3">
                                This information is used only to respond to inquiries or
                                provide relevant information about our services.
                            </p>
                            <h3 className="text-base text-[var(--color-text-primary)] mt-4 mb-2 font-[var(--font-heading)] font-semibold">
                                Automatically Collected Information
                            </h3>
                            <p>
                                Like most modern websites, Defnix may automatically
                                collect certain technical information when users visit the
                                website. This may include:
                            </p>
                            <ul className="mt-3 space-y-2 pl-0 list-none">
                                {["IP address", "Browser type and version", "Device type", "Operating system", "Referring website", "Pages visited and time spent on the website"].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-3">
                                This information helps us understand how visitors use the
                                website and improve the overall user experience.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Cookies and Tracking Technologies
                            </h2>
                            <p>
                                The Defnix website may use cookies and similar
                                technologies to enhance website functionality and analyze
                                website traffic. Cookies are small text files stored on
                                your device that help websites remember user preferences
                                and improve performance.
                            </p>
                            <p className="mt-3">These cookies may be used for:</p>
                            <ul className="mt-3 space-y-2 pl-0 list-none">
                                {["Website functionality", "Performance monitoring", "Analytics and traffic analysis", "Security and fraud prevention"].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-3">
                                Users can choose to disable cookies through their browser
                                settings. However, some features of the website may not
                                function properly if cookies are disabled.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Third Party Services
                            </h2>
                            <p>
                                Defnix may use trusted third party tools and services to
                                operate and improve the website. These services may
                                collect certain information in accordance with their own
                                privacy policies. Examples may include:
                            </p>
                            <ul className="mt-3 space-y-2 pl-0 list-none">
                                {["Website analytics tools", "Hosting providers", "Security monitoring services"].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-3">
                                These services only receive the information necessary to
                                perform their functions and are required to maintain
                                confidentiality and data protection standards.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Google AdSense and Advertising Cookies
                            </h2>
                            <p>
                                Defnix may display advertisements through third party
                                advertising networks such as Google AdSense. Google and
                                other advertising partners may use cookies or web beacons
                                to display relevant advertisements to users based on their
                                visits to this and other websites.
                            </p>
                            <p className="mt-3">
                                Google may use the{" "}
                                <strong className="text-[var(--color-text-primary)]">
                                    DoubleClick cookie
                                </strong>
                                , which enables it and its partners to serve ads to users
                                based on their visit to the Defnix website and other
                                websites on the internet. Users may choose to decline the
                                use of the DoubleClick cookie by visiting the Google Ads
                                Settings page.
                            </p>
                            <p className="mt-3">
                                For more information on how Google uses data from sites
                                that use its services, please refer to Google&apos;s
                                official privacy documentation.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                How We Use Collected Information
                            </h2>
                            <p>
                                Information collected through the website may be used for
                                the following purposes:
                            </p>
                            <ul className="mt-3 space-y-2 pl-0 list-none">
                                {[
                                    "Responding to inquiries and communication requests",
                                    "Improving website functionality and performance",
                                    "Monitoring website security and preventing abuse",
                                    "Analyzing traffic and usage trends",
                                    "Providing relevant services or information requested by users",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-3">
                                Defnix does not sell, rent, or trade personal information
                                to third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Data Security
                            </h2>
                            <p>
                                Defnix takes reasonable technical and organizational
                                measures to protect information from unauthorized access,
                                misuse, or disclosure.
                            </p>
                            <p className="mt-3">
                                However, no internet based system can guarantee absolute
                                security. Users should always exercise caution when
                                sharing sensitive information online.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                External Links
                            </h2>
                            <p>
                                The Defnix website may contain links to external websites
                                or resources. These third party websites operate
                                independently and have their own privacy policies.
                            </p>
                            <p className="mt-3">
                                Defnix is not responsible for the privacy practices or
                                content of external websites. Users are encouraged to
                                review the privacy policies of any external sites they
                                visit.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Children&apos;s Information
                            </h2>
                            <p>
                                The Defnix website and services are intended for
                                professional and organizational use and are not directed
                                toward children under the age of 13. Defnix does not
                                knowingly collect personal information from children.
                            </p>
                            <p className="mt-3">
                                If a parent or guardian believes that a child has provided
                                personal information on the website, they should contact
                                us so the information can be removed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Your Privacy Rights
                            </h2>
                            <p>
                                Depending on your jurisdiction, you may have rights
                                regarding your personal data, including:
                            </p>
                            <ul className="mt-3 space-y-2 pl-0 list-none">
                                {[
                                    "Access to information we hold about you",
                                    "Request correction of inaccurate data",
                                    "Request deletion of personal data",
                                    "Object to certain data processing activities",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2">
                                        <span className="mt-2 w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-3">
                                Requests related to privacy or personal data can be
                                directed to the contact email listed below.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Updates to This Policy
                            </h2>
                            <p>
                                Defnix may update this Privacy Policy from time to time
                                to reflect changes in technology, legal requirements, or
                                website operations. Any updates will be posted on this
                                page with the updated effective date.
                            </p>
                            <p className="mt-3">
                                Users are encouraged to review this page periodically.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl text-[var(--color-text-primary)] mb-3">
                                Contact Information
                            </h2>
                            <p>
                                If you have any questions about this Privacy Policy or
                                how information is handled, you may contact Defnix at:{" "}
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
                                providing cloud security, cybersecurity infrastructure,
                                and AI driven automation services globally.
                            </p>
                        </section>

                    </div>
                </PageTransition>
            </article>
        </div>
    );
}
