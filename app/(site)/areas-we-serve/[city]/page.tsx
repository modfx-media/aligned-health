import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityDetailView } from "@/lib/cms/catalog-views";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { metadataForPath } from "@/lib/cms/metadata";
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/locations";
import { buildCityOverview } from "@/lib/serviceAreas";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams(): Promise<{ city: string }[]> {
  return getAllLocationSlugs().map((city) => ({ city }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return { title: "Not Found" };

  const url = `/areas-we-serve/${location.slug}`;
  const title = `Chiropractor in ${location.name}, CA · Aligned Health`;
  const description = location.home
    ? `Laguna Hills chiropractic care with Dr. Dustin Hack and Dr. Tara Hadden. One-on-one visits, spinal decompression, and most PPO plans verified before you book.`
    : `Chiropractor for ${location.name} patients at our Laguna Hills office. Drive is about ${location.driveMinutes} minutes via ${location.freeway}. Most PPO plans accepted.`;
  const image = "/images/about/about-hero-office.jpg";

  return metadataForPath(url, {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 768,
          height: 1024,
          alt: "Aligned Health interior office in Laguna Hills",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  });
}

export default async function CityAreaPage({ params }: PageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const content = buildCityOverview(location);

  return (
    <CMSRoute path={`/areas-we-serve/${location.slug}`}>
      <CityDetailView location={location} content={content} />
    </CMSRoute>
  );
}
