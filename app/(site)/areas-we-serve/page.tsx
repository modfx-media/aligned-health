import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { DesignedAreasIndexPage } from "@/lib/cms/designed-pages";
import { metadataForPath } from "@/lib/cms/metadata";

const PATH = "/areas-we-serve";
const TITLE = "Areas We Serve · Chiropractor for Orange County · Aligned Health";
const DESCRIPTION =
  "One Laguna Hills office, patients from 30 Orange County cities. Drive times, local FAQs, and every service we offer — from Irvine to San Clemente.";

const FALLBACK: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    type: "website",
    images: [
      {
        url: "/images/about/about-hero-office.jpg",
        width: 768,
        height: 1024,
        alt: "Aligned Health interior office in Laguna Hills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/about/about-hero-office.jpg"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return metadataForPath(PATH, FALLBACK);
}

export default function AreasWeServePage() {
  return (
    <CMSRoute path={PATH}>
      <DesignedAreasIndexPage />
    </CMSRoute>
  );
}
