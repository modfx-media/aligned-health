import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/lib/cms/catalog-views";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { metadataForPath } from "@/lib/cms/metadata";
import { getAllServiceSlugs, getServiceBySlug } from "@/lib/services";

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
  return metadataForPath(url, {
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
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <CMSRoute path={`/services/${service.slug}`}>
      <ServiceDetailView service={service} />
    </CMSRoute>
  );
}
