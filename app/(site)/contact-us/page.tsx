import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { DesignedContactPage } from "@/lib/cms/designed-pages";
import { metadataForPath } from "@/lib/cms/metadata";

const PATH = "/contact-us";
const TITLE = "Contact Aligned Health · Laguna Hills Chiropractic Office";
const DESCRIPTION =
  "Call (949) 557-7208, email, or send a note. We are at 26071 Merit Circle in Laguna Hills and usually reply within one business day.";

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

export default function ContactUsPage() {
  return (
    <CMSRoute path={PATH}>
      <DesignedContactPage />
    </CMSRoute>
  );
}
