import type { Metadata } from "next";
import { PageChromeJsonLd } from "@/app/_components/ClinicJsonLd";
import { CLINIC } from "@/lib/site";
import { EmailLink } from "@/app/_components/EmailLink";

const PATH = "/privacy-policy";
const LAST_UPDATED = "August 2026";
const PHONE_TEL = CLINIC.phone.replace(/[^\d+]/g, "");
const DESCRIPTION =
  "How Aligned Health collects, uses, and protects information you share through this website, our contact form, and our online booking portal.";
const TITLE = "Privacy Policy · Aligned Health";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    type: "article",
    images: [
      {
        url: "/images/contact-us/hero-v2.jpg",
        width: 2400,
        height: 1018,
        alt: "Aligned Health chiropractic office in Laguna Hills, CA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/contact-us/hero-v2.jpg"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageChromeJsonLd path={PATH} name={TITLE} description={DESCRIPTION} />

      <section className="section-cream section relative overflow-hidden">
        <div className="container-shell relative z-10">
          <article className="mx-auto max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-tan" />
              <p className="eyebrow !text-mocha">Legal</p>
              <span aria-hidden="true" className="block h-px w-10 bg-tan" />
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-center font-serif text-5xl leading-[1.05] tracking-tight text-espresso md:text-6xl">
              Privacy{" "}
              <span className="italic text-tan">Policy.</span>
            </h1>
            <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-mocha/70">
              Last updated {LAST_UPDATED}
            </p>

            {/* Body */}
            <div className="mt-12 space-y-8 text-base leading-relaxed text-mocha md:text-lg">
              <p>
                Aligned Health (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
                &ldquo;the office&rdquo;) respects your privacy. This page
                explains what information we collect through this website,
                how we use it, and the choices you have. If anything here is
                unclear, please contact us using the details at the bottom
                of the page.
              </p>

              {/* Section: What we collect */}
              <div>
                <h2 className="font-serif text-2xl text-espresso md:text-3xl">
                  Information we collect
                </h2>
                <p className="mt-4">
                  We collect information from you in two ways:
                </p>
                <ul className="mt-5 space-y-3 border-l-2 border-tan/40 pl-6">
                  <li className="text-espresso">
                    <span className="font-medium">When you visit this site.</span>{" "}
                    Our hosting provider automatically records standard
                    server-log information such as your IP address, browser
                    type, device type, referring page, and the pages you
                    view. This is used to keep the site fast, secure, and
                    functional.
                  </li>
                  <li className="text-espresso">
                    <span className="font-medium">When you contact us.</span>{" "}
                    If you submit our contact form, call the office, or email
                    us, we receive only what you choose to share, typically
                    your name, email, phone number, and message. We use this
                    information to respond to your inquiry.
                  </li>
                </ul>
              </div>

              {/* Section: Online booking */}
              <div>
                <h2 className="font-serif text-2xl text-espresso md:text-3xl">
                  Online appointment booking
                </h2>
                <p className="mt-4">
                  Online appointments are handled by{" "}
                  <a
                    href="https://jane.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-tan underline-offset-4 hover:text-espresso"
                  >
                    Jane App
                  </a>
                  , our third-party practice-management platform. When you
                  click &ldquo;Book your New Patient Appointment&rdquo; you
                  are directed to
                  Jane&rsquo;s secure portal. Any personal, contact, or
                  clinical information you enter there is handled under
                  Jane&rsquo;s{" "}
                  <a
                    href="https://jane.app/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-tan underline-offset-4 hover:text-espresso"
                  >
                    Privacy Policy
                  </a>{" "}
                  and applicable healthcare privacy law.
                </p>
              </div>

              {/* Section: HIPAA / clinical records */}
              <div>
                <h2 className="font-serif text-2xl text-espresso md:text-3xl">
                  Clinical records & HIPAA
                </h2>
                <p className="mt-4">
                  Health information collected during your care is protected
                  under the Health Insurance Portability and Accountability
                  Act (HIPAA) and California medical-privacy law. We do not
                  share your clinical information without your written
                  authorization, except as required or permitted by law
                  (for example, to your insurance carrier for claims you
                  authorize, or in response to a lawful subpoena).
                </p>
              </div>

              {/* Section: Cookies */}
              <div>
                <h2 className="font-serif text-2xl text-espresso md:text-3xl">
                  Cookies & analytics
                </h2>
                <p className="mt-4">
                  This website uses only the essential cookies needed for the
                  site to function. We may use privacy-respecting analytics
                  to understand which pages patients find helpful, but we do
                  not sell your personal information and we do not use
                  cross-site advertising tracking.
                </p>
              </div>

              {/* Section: Third-party embeds */}
              <div>
                <h2 className="font-serif text-2xl text-espresso md:text-3xl">
                  Third-party content on this site
                </h2>
                <p className="mt-4">
                  Some pages embed content from third parties, for example
                  Google Maps directions to the office. When you interact
                  with those embeds, the third party may set its own cookies
                  or collect data under its own privacy policy. We do not
                  control those policies.
                </p>
              </div>

              {/* Section: Your rights */}
              <div>
                <h2 className="font-serif text-2xl text-espresso md:text-3xl">
                  Your rights
                </h2>
                <p className="mt-4">
                  California residents have rights under the California
                  Consumer Privacy Act (CCPA/CPRA), including the right to
                  know what personal information we hold about you, to
                  request correction or deletion of that information, and to
                  opt out of any sale of personal information (we do not
                  sell personal information). To exercise any of these
                  rights, contact us using the details below.
                </p>
              </div>

              {/* Section: Contact */}
              <div>
                <h2 className="font-serif text-2xl text-espresso md:text-3xl">
                  Contact us about your privacy
                </h2>
                <p className="mt-4">
                  Questions about this policy or the information we hold
                  about you? Reach us at:
                </p>
                <ul className="mt-5 space-y-2 border-l-2 border-tan/40 pl-6">
                  <li className="text-espresso">
                    {CLINIC.name} · {CLINIC.address.street},{" "}
                    {CLINIC.address.city}, {CLINIC.address.region}{" "}
                    {CLINIC.address.postalCode}
                  </li>
                  <li className="text-espresso">
                    Phone:{" "}
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className="underline decoration-tan underline-offset-4 hover:text-espresso"
                    >
                      {CLINIC.phoneDisplay}
                    </a>
                  </li>
                  <li className="text-espresso">
                    Email:{" "}
                    <EmailLink
                      email={CLINIC.email}
                      className="underline decoration-tan underline-offset-4 hover:text-espresso"
                      copiedClassName="text-mocha"
                    />
                  </li>
                </ul>
              </div>

              {/* Section: Changes */}
              <div>
                <h2 className="font-serif text-2xl text-espresso md:text-3xl">
                  Changes to this policy
                </h2>
                <p className="mt-4">
                  We may update this policy from time to time. When we do,
                  we will change the &ldquo;Last updated&rdquo; date at the
                  top of the page. Continued use of the website after an
                  update means you accept the revised policy.
                </p>
              </div>
            </div>

            {/* Hairline footer */}
            <div className="mt-16 border-t border-tan/30 pt-6 text-center">
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-mocha/70">
                Aligned Health · Laguna Hills, CA
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
