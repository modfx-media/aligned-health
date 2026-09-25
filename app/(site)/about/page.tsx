import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { DesignedAboutPage } from "@/lib/cms/designed-pages";
import { metadataForPath } from "@/lib/cms/metadata";

const PATH = "/about";
const TITLE = "About Aligned Health · Chiropractors in Laguna Hills, CA";
const DESCRIPTION =
  "Meet Dr. Dustin Hack and Dr. Tara Hadden, the Laguna Hills chiropractors who still treat you one-on-one — not as a number on a 10-minute rotation.";

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

export default function AboutPage() {
  return (
    <CMSRoute path={PATH}>
      <DesignedAboutPage />
    </CMSRoute>
  );
}
