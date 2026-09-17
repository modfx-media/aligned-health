import type { Metadata } from "next";
import { PageChromeJsonLd } from "@/app/_components/ClinicJsonLd";
import { SitemapView } from "./_components/SitemapView";
import { getPublishedSitePosts } from "@/lib/ranked/site-posts";

const PATH = "/sitemap";

const TITLE = "Sitemap · Aligned Health";
const DESCRIPTION =
    "Browse every page on the Aligned Health website, including our chiropractic services, blog articles, and all Orange County areas we serve.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  robots: { index: true, follow: true },
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

export default async function SitemapPage() {
  const posts = await getPublishedSitePosts();
  return (
    <>
      <PageChromeJsonLd path={PATH} name={TITLE} description={DESCRIPTION} />
      <SitemapView posts={posts} />
    </>
  );
}
