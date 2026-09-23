import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { DesignedPrivacyPage } from "@/lib/cms/designed-pages";
import { metadataForPath } from "@/lib/cms/metadata";

const PATH = "/privacy-policy";
const TITLE = "Privacy Policy · Aligned Health";
const DESCRIPTION =
  "How Aligned Health collects, uses, and protects information you share through this website, our contact form, and our online booking portal.";

const FALLBACK: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    type: "article",
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

export default function PrivacyPolicyPage() {
  return (
    <CMSRoute path={PATH}>
      <DesignedPrivacyPage />
    </CMSRoute>
  );
}
