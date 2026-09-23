import type { Metadata } from "next";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { DesignedBlogIndexPage } from "@/lib/cms/designed-pages";
import { metadataForPath } from "@/lib/cms/metadata";

export const revalidate = 3600;

const PATH = "/blog";
const TITLE = "The Aligned Health Journal · Chiropractic Insights in Laguna Hills";
const DESCRIPTION =
  "Plain-spoken articles on chiropractic care, recovery modalities, and treatment plans from the Aligned Health team in Laguna Hills, CA.";

const FALLBACK: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return metadataForPath(PATH, FALLBACK);
}

export default async function BlogPage() {
  return (
    <CMSRoute path={PATH}>
      <DesignedBlogIndexPage />
    </CMSRoute>
  );
}
