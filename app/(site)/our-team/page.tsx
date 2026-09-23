import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { DesignedTeamPage } from "@/lib/cms/designed-pages";
import { metadataForPath } from "@/lib/cms/metadata";

const PATH = "/our-team";
const TITLE = "Our Team · Dr. Dustin Hack & Dr. Tara Hadden";
const DESCRIPTION =
  "Meet the Laguna Hills chiropractors behind Aligned Health. Diversified adjusting, sports recovery, and honest answers when chiropractic is not the right next step.";

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

export default function OurTeamPage() {
  return (
    <CMSRoute path={PATH}>
      <DesignedTeamPage />
    </CMSRoute>
  );
}
