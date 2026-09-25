import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { DesignedHomePage } from "@/lib/cms/designed-pages";
import { metadataForPath } from "@/lib/cms/metadata";

const PATH = "/";

const TITLE = "Chiropractor in Laguna Hills, CA | Aligned Health";
const DESCRIPTION =
  "See a Laguna Hills chiropractor for back pain, sports injuries, and spinal decompression. Dr. Dustin Hack and Dr. Tara Hadden. Most PPO plans accepted.";

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

export async function generateMetadata(): Promise<Metadata> {
  return metadataForPath(PATH, FALLBACK);
}

export default async function HomePage() {
  return (
    <CMSRoute path={PATH}>
      <DesignedHomePage />
    </CMSRoute>
  );
}
