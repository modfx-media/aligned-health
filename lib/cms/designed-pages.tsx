import { BookNowBanner } from "@/app/_components/BookNowBanner";
import {
  FaqJsonLd,
  PageChromeJsonLd,
} from "@/app/_components/ClinicJsonLd";
import { EmailLink } from "@/app/_components/EmailLink";
import { AboutApproach } from "@/app/(site)/about/_components/AboutApproach";
import { AboutClosing } from "@/app/(site)/about/_components/AboutClosing";
import { AboutIntro } from "@/app/(site)/about/_components/AboutIntro";
import { AboutTeamPreview } from "@/app/(site)/about/_components/AboutTeamPreview";
import { AboutValues } from "@/app/(site)/about/_components/AboutValues";
import { AppointmentsIntro } from "@/app/(site)/appointments/_components/AppointmentsIntro";
import { AreasHubView } from "@/app/(site)/areas-we-serve/_components/AreasHubView";
import { BlogIndex } from "@/app/(site)/blog/_components/BlogIndex";
import { ContactAreas } from "@/app/(site)/contact-us/_components/ContactAreas";
import { ContactIntro } from "@/app/(site)/contact-us/_components/ContactIntro";
import { ContactMap } from "@/app/(site)/contact-us/_components/ContactMap";
import { DoctorProfiles } from "@/app/(site)/our-team/_components/DoctorProfiles";
import { TeamHero } from "@/app/(site)/our-team/_components/TeamHero";
import { ServicesIntro } from "@/app/(site)/services/_components/ServicesIntro";
import { SitemapView } from "@/app/(site)/sitemap/_components/SitemapView";
import { BlogPreview } from "@/app/home/_sections/BlogPreview";
import { ClosingSection } from "@/app/home/_sections/ClosingSection";
import { GoogleReviews } from "@/app/home/_sections/GoogleReviews";
import { Hero } from "@/app/home/_sections/Hero";
import { HomeFaq, HOME_FAQ_LIST } from "@/app/home/_sections/HomeFaq";
import { MapSection } from "@/app/home/_sections/MapSection";
import { ServicesGrid } from "@/app/home/_sections/ServicesGrid";
import { TeamSection } from "@/app/home/_sections/TeamSection";
import { TestimonialsMarquee } from "@/app/home/_sections/TestimonialsMarquee";
import { TrustMarquee } from "@/app/home/_sections/TrustMarquee";
import { ValueProps } from "@/app/home/_sections/ValueProps";
import { decodeHtmlEntities } from "@/lib/blog";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { LOCATIONS } from "@/lib/locations";
import { getPublishedSitePosts } from "@/lib/ranked/site-posts";
import { getRecentSitePosts } from "@/lib/ranked/site-posts";
import { CLINIC, SITE_URL } from "@/lib/site";

export async function DesignedHomePage() {
  const recentPosts = await getRecentSitePosts(3);
  const googleReviews = await getDisplayedGoogleReviews();
  const title = "Chiropractor in Laguna Hills, CA | Aligned Health";
  const description =
    "See a Laguna Hills chiropractor for back pain, sports injuries, and spinal decompression. Dr. Dustin Hack and Dr. Tara Hadden. Most PPO plans accepted.";
  return (
    <>
      <PageChromeJsonLd path="/" name={title} description={description} />
      <FaqJsonLd faqs={HOME_FAQ_LIST} />
      <Hero featuredReview={googleReviews.reviews[0]} />
      <TrustMarquee />
      <ValueProps />
      <ServicesGrid />
      <TeamSection />
      <GoogleReviews>
        {(payload) => (
          <TestimonialsMarquee reviews={payload.reviews} meta={payload.meta} />
        )}
      </GoogleReviews>
      <HomeFaq />
      <BlogPreview posts={recentPosts} />
      <ClosingSection />
      <MapSection />
      <BookNowBanner />
    </>
  );
}

export function DesignedAboutPage() {
  const title = "About Aligned Health · Chiropractors in Laguna Hills, CA";
  const description =
    "Meet Dr. Dustin Hack and Dr. Tara Hadden, the Laguna Hills chiropractors who still treat you one-on-one — not as a number on a 10-minute rotation.";
  return (
    <>
      <PageChromeJsonLd path="/about" name={title} description={description} />
      <AboutIntro />
      <AboutValues />
      <AboutApproach />
      <AboutTeamPreview />
      <AboutClosing />
    </>
  );
}

export function DesignedTeamPage() {
  const title = "Our Team · Dr. Dustin Hack & Dr. Tara Hadden";
  const description =
    "Meet the Laguna Hills chiropractors behind Aligned Health. Diversified adjusting, sports recovery, and honest answers when chiropractic is not the right next step.";
  return (
    <>
      <PageChromeJsonLd path="/our-team" name={title} description={description} />
      <TeamHero />
      <DoctorProfiles />
    </>
  );
}

export function DesignedServicesIndexPage() {
  const title = "Chiropractic Services in Laguna Hills · Aligned Health";
  const description =
    "Fourteen on-site services in one Laguna Hills office: adjustments, spinal decompression, percussion, red light, and more. One doctor, one visit.";
  return (
    <>
      <PageChromeJsonLd path="/services" name={title} description={description} />
      <ServicesIntro />
    </>
  );
}

export function DesignedAreasIndexPage() {
  const title = "Areas We Serve · Chiropractor for Orange County · Aligned Health";
  const description =
    "One Laguna Hills office, patients from 30 Orange County cities. Drive times, local FAQs, and every service we offer — from Irvine to San Clemente.";
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: LOCATIONS.map((location, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: location.name,
      url: `${SITE_URL}/areas-we-serve/${location.slug}`,
    })),
  };
  return (
    <>
      <PageChromeJsonLd
        path="/areas-we-serve"
        name={title}
        description={description}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <AreasHubView />
    </>
  );
}

export async function DesignedBlogIndexPage() {
  const posts = await getPublishedSitePosts();
  const title = "The Aligned Health Journal · Chiropractic Insights in Laguna Hills";
  const description =
    "Plain-spoken articles on chiropractic care, recovery modalities, and treatment plans from the Aligned Health team in Laguna Hills, CA.";
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog`,
    url: `${SITE_URL}/blog`,
    name: "The Aligned Health Journal",
    description:
      "Chiropractic care, recovery modalities, and treatment insights from Aligned Health in Laguna Hills, CA.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${post.slug}`,
      url: `${SITE_URL}/blog/${post.slug}`,
      headline: decodeHtmlEntities(post.title),
      description: decodeHtmlEntities(post.description),
      datePublished: post.datePublished,
      dateModified: post.dateModified ?? post.datePublished,
      author: { "@type": "Person", name: post.author.name },
      image: post.hero.src,
    })),
  };
  return (
    <>
      <PageChromeJsonLd path="/blog" name={title} description={description} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <BlogIndex posts={posts} />
    </>
  );
}

export function DesignedAppointmentsPage() {
  const title = "Existing Patient Appointments · Aligned Health Laguna Hills";
  const description =
    "Already a patient? Book your next visit online. New patients start with a 45-minute exam in Laguna Hills — we verify PPO coverage before you come in.";
  return (
    <>
      <PageChromeJsonLd
        path="/appointments"
        name={title}
        description={description}
      />
      <AppointmentsIntro />
    </>
  );
}

export function DesignedContactPage() {
  const title = "Contact Aligned Health · Laguna Hills Chiropractic Office";
  const description =
    "Call (949) 557-7208, email, or send a note. We are at 26071 Merit Circle in Laguna Hills and usually reply within one business day.";
  return (
    <>
      <PageChromeJsonLd
        path="/contact-us"
        name={title}
        description={description}
      />
      <ContactIntro />
      <ContactMap />
      <ContactAreas />
    </>
  );
}

const PRIVACY_LAST_UPDATED = "August 2026";
const PHONE_TEL = CLINIC.phone.replace(/[^\d+]/g, "");

export function DesignedPrivacyPage() {
  const title = "Privacy Policy · Aligned Health";
  const description =
    "How Aligned Health collects, uses, and protects information you share through this website, our contact form, and our online booking portal.";
  return (
    <>
      <PageChromeJsonLd
        path="/privacy-policy"
        name={title}
        description={description}
      />
      <section className="section-cream section relative overflow-hidden">
        <div className="container-shell relative z-10">
          <article className="mx-auto max-w-2xl">
            <div className="flex items-center justify-center gap-3">
              <span aria-hidden="true" className="block h-px w-10 bg-tan" />
              <p className="eyebrow !text-mocha">Legal</p>
              <span aria-hidden="true" className="block h-px w-10 bg-tan" />
            </div>
            <h1 className="mt-6 text-center font-serif text-5xl leading-[1.05] tracking-tight text-espresso md:text-6xl">
              Privacy <span className="italic text-tan">Policy.</span>
            </h1>
            <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-mocha/70">
              Last updated {PRIVACY_LAST_UPDATED}
            </p>
            <div className="mt-12 space-y-8 text-base leading-relaxed text-mocha md:text-lg">
              <p>
                Aligned Health (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
                &ldquo;the office&rdquo;) respects your privacy. This page
                explains what information we collect through this website,
                how we use it, and the choices you have. If anything here is
                unclear, please contact us using the details at the bottom
                of the page.
              </p>
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
                  click &ldquo;New Patients Schedule Here&rdquo; you
                  are directed to Jane&rsquo;s secure portal. Any personal,
                  contact, or clinical information you enter there is handled
                  under Jane&rsquo;s{" "}
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

export async function DesignedSitemapPage() {
  const posts = await getPublishedSitePosts();
  const title = "Sitemap · Aligned Health";
  const description =
    "Browse every page on the Aligned Health website, including our chiropractic services, blog articles, and all Orange County areas we serve.";
  return (
    <>
      <PageChromeJsonLd path="/sitemap" name={title} description={description} />
      <SitemapView posts={posts} />
    </>
  );
}

export function DesignedPageByTemplate(template: unknown) {
  switch (template) {
    case "home":
      return <DesignedHomePage />;
    case "about":
      return <DesignedAboutPage />;
    case "team":
      return <DesignedTeamPage />;
    case "servicesIndex":
      return <DesignedServicesIndexPage />;
    case "areasIndex":
      return <DesignedAreasIndexPage />;
    case "blogIndex":
      return <DesignedBlogIndexPage />;
    case "appointments":
      return <DesignedAppointmentsPage />;
    case "contact":
      return <DesignedContactPage />;
    case "privacy":
      return <DesignedPrivacyPage />;
    case "sitemap":
      return <DesignedSitemapPage />;
    default:
      return <DesignedHomePage />;
  }
}
