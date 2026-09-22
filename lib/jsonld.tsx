import { LOCATIONS } from "@/lib/locations";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { isFiveStarReview } from "@/lib/reviews";
import { CLINIC, SITE_URL, absoluteUrl, HOURS, MAPS_URL } from "@/lib/site";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebPageJsonLd({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description?: string;
}) {
  const url = path === "/" ? SITE_URL : absoluteUrl(path);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: { "@id": `${SITE_URL}#website` },
        about: { "@id": `${SITE_URL}#clinic` },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: ReadonlyArray<{ name: string; path: string }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.path === "/" ? SITE_URL : absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: ReadonlyArray<{ q: string; a: string }>;
}) {
  if (faqs.length === 0) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }}
    />
  );
}

/**
 * Clinic entity plus WebPage and BreadcrumbList for a route.
 * Clinic `url` stays locked to the homepage.
 */
export async function PageChromeJsonLd({
  path,
  name,
  description,
  crumbs,
}: {
  path: string;
  name: string;
  description?: string;
  crumbs?: ReadonlyArray<{ name: string; path: string }>;
}) {
  const items =
    crumbs ??
    (path === "/"
      ? [{ name: "Home", path: "/" }]
      : [
          { name: "Home", path: "/" },
          { name, path },
        ]);

  return (
    <>
      <ClinicJsonLd />
      <WebPageJsonLd path={path} name={name} description={description} />
      <BreadcrumbJsonLd items={items} />
    </>
  );
}

/**
 * One stable MedicalClinic entity for the whole site.
 * Do not point `url` at inner routes — that collides with `@id`.
 */
export async function ClinicJsonLd() {
  const { reviews, meta } = await getDisplayedGoogleReviews();

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Chiropractor", "LocalBusiness"],
    "@id": `${SITE_URL}#clinic`,
    name: CLINIC.name,
    legalName: CLINIC.legalName,
    description: CLINIC.description,
    url: SITE_URL,
    telephone: CLINIC.phone,
    email: CLINIC.email,
    priceRange: "$$",
    image: absoluteUrl("/images/contact-us/hero-v2.jpg"),
    logo: absoluteUrl("/logos/aligned-health-light.png"),
    medicalSpecialty: {
      "@type": "MedicalSpecialty",
      name: "Chiropractic",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC.address.street,
      addressLocality: CLINIC.address.city,
      addressRegion: CLINIC.address.region,
      postalCode: CLINIC.address.postalCode,
      addressCountry: CLINIC.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.5749909,
      longitude: -117.6755141,
    },
    openingHoursSpecification: HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: LOCATIONS.map((location) => ({
      "@type": "City",
      name: location.name,
      sameAs: `https://en.wikipedia.org/wiki/${location.wikipediaSlug}`,
    })),
    availableService: [
      { "@type": "MedicalProcedure", name: "Chiropractic adjustment" },
      { "@type": "MedicalProcedure", name: "Spinal decompression" },
      { "@type": "MedicalTherapy", name: "Sports injury recovery" },
    ],
    employee: [
      {
        "@type": "Physician",
        name: "Dr. Dustin Hack",
        honorificSuffix: "D.C.",
        jobTitle: "Chiropractor",
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "Southern California University of Health Sciences",
          },
          {
            "@type": "CollegeOrUniversity",
            name: "Minnesota State University, Mankato",
          },
        ],
        knowsAbout: [
          "Diversified adjusting",
          "Sports injury",
          "Percussion therapy",
          "Soft-tissue therapy",
        ],
      },
      {
        "@type": "Physician",
        name: "Dr. Tara Hadden",
        honorificSuffix: "D.C.",
        jobTitle: "Chiropractor",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Southern California University of Health Sciences",
        },
        knowsAbout: [
          "Diversified technique",
          "Myofascial release",
          "Sports chiropractic",
        ],
      },
    ],
    sameAs: [MAPS_URL, "https://alignedhealthoc.janeapp.com/"],
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Insurance",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CLINIC.phone,
      email: CLINIC.email,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
    hasMap: MAPS_URL,
  };

  if (meta.rating > 0 && meta.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: meta.rating,
      reviewCount: meta.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  const visible = reviews.filter(isFiveStarReview);
  if (visible.length > 0) {
    schema.review = visible.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      reviewBody: review.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    }));
  }

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}#website`,
          url: SITE_URL,
          name: CLINIC.name,
          publisher: { "@id": `${SITE_URL}#clinic` },
        }}
      />
    </>
  );
}
