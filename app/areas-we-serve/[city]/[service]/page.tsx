import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageChromeJsonLd } from "@/app/_components/ClinicJsonLd";
import { ServiceAreaView } from "./_components/ServiceAreaView";
import {
  getAllServiceSlugs,
  getServiceBySlug,
  SERVICES,
} from "@/lib/services";
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/locations";
import { buildServiceAreaContent } from "@/lib/serviceAreas";
import { SITE_URL } from "@/lib/site";

/**
 * /areas-we-serve/[city]/[service], the city x service combo pages
 * (14 services x 30 cities = 420 pages). Prerendered at build via
 * generateStaticParams so every combo ships as a static file.
 */

interface PageProps {
  params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams(): Promise<
  { city: string; service: string }[]
> {
  const cities = getAllLocationSlugs();
  const services = getAllServiceSlugs();
  const params: { city: string; service: string }[] = [];
  for (const city of cities) {
    for (const service of services) {
      params.push({ city, service });
    }
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city, service: serviceSlug } = await params;
  const location = getLocationBySlug(city);
  const service = getServiceBySlug(serviceSlug);
  if (!location || !service) return { title: "Not Found" };

  const content = buildServiceAreaContent(service, location);
  const url = `/areas-we-serve/${location.slug}/${service.slug}`;

  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: content.metaTitle,
      description: content.metaDescription,
      images: [{ url: service.imageSrc, alt: service.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [service.imageSrc],
    },
  };
}

export default async function ServiceAreaPage({ params }: PageProps) {
  const { city, service: serviceSlug } = await params;
  const location = getLocationBySlug(city);
  const service = getServiceBySlug(serviceSlug);
  if (!location || !service) notFound();

  const content = buildServiceAreaContent(service, location);
  const path = `/areas-we-serve/${location.slug}/${service.slug}`;
  const url = `${SITE_URL}${path}`;
  const related = service.relatedSlugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  const faqs = [
    content.localFaq,
    ...content.extraFaqs,
    ...service.faqs.slice(0, 2),
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "@id": `${url}#therapy`,
    url,
    name: `${service.label} in ${location.name}, CA`,
    alternateName: service.short,
    description: content.metaDescription,
    image: service.imageSrc,
    provider: { "@id": `${SITE_URL}#clinic` },
    indication: service.indications.map((ind) => ({
      "@type": "MedicalIndication",
      name: ind.replace(/&[a-z]+;/g, ""),
    })),
    areaServed: {
      "@type": "City",
      name: location.name,
      sameAs: `https://en.wikipedia.org/wiki/${location.wikipediaSlug}`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.replace(/&rsquo;/g, "\u2019").replace(/&[a-z]+;/g, ""),
      },
    })),
  };

  return (
    <>
      <PageChromeJsonLd
        path={path}
        name={content.metaTitle}
        description={content.metaDescription}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Areas We Serve", path: "/areas-we-serve" },
          {
            name: location.name,
            path: `/areas-we-serve/${location.slug}`,
          },
          { name: service.label, path },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServiceAreaView
        service={service}
        location={location}
        content={content}
        related={related}
      />
    </>
  );
}
