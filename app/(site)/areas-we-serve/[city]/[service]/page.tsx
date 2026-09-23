import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceAreaDetailView } from "@/lib/cms/catalog-views";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { metadataForPath } from "@/lib/cms/metadata";
import {
  getAllServiceSlugs,
  getServiceBySlug,
} from "@/lib/services";
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/locations";
import { buildServiceAreaContent } from "@/lib/serviceAreas";

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

  return metadataForPath(url, {
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
  });
}

export default async function ServiceAreaPage({ params }: PageProps) {
  const { city, service: serviceSlug } = await params;
  const location = getLocationBySlug(city);
  const service = getServiceBySlug(serviceSlug);
  if (!location || !service) notFound();

  const content = buildServiceAreaContent(service, location);

  return (
    <CMSRoute path={`/areas-we-serve/${location.slug}/${service.slug}`}>
      <ServiceAreaDetailView
        service={service}
        location={location}
        content={content}
      />
    </CMSRoute>
  );
}
