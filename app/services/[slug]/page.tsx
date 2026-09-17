import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageChromeJsonLd } from "@/app/_components/ClinicJsonLd";
import { ServicePageView } from "./_components/ServicePageView";
import {
  getAllServiceSlugs,
  getRelatedServices,
  getServiceBySlug,
} from "@/lib/services";
import { SITE_URL } from "@/lib/site";

/**
 * /services/[slug], dynamic service detail page. Prerendered at build
 * via generateStaticParams so every service ships as a static file.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Not Found" };

  const url = `/services/${service.slug}`;
  const description = service.metaDescription.replace(/&[a-z]+;/g, "");
  return {
    title: { absolute: service.metaTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: service.metaTitle,
      description,
      images: [{ url: service.imageSrc, alt: service.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description,
      images: [service.imageSrc],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(slug);
  const url = `${SITE_URL}/services/${service.slug}`;
  const path = `/services/${service.slug}`;
  const description = service.metaDescription.replace(/&[a-z]+;/g, "");

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "@id": `${url}#therapy`,
    url,
    name: service.label,
    alternateName: service.short,
    description,
    image: service.imageSrc,
    provider: { "@id": `${SITE_URL}#clinic` },
    indication: service.indications.map((ind) => ({
      "@type": "MedicalIndication",
      name: ind.replace(/&[a-z]+;/g, ""),
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q.replace(/&[a-z]+;/g, ""),
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.replace(/&[a-z]+;/g, ""),
      },
    })),
  };

  return (
    <>
      <PageChromeJsonLd
        path={path}
        name={service.metaTitle}
        description={description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
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
      <ServicePageView service={service} related={related} />
    </>
  );
}
