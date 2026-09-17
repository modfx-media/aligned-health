import type { Metadata } from "next";
import { PageChromeJsonLd } from "@/app/_components/ClinicJsonLd";
import { BlogIndex } from "./_components/BlogIndex";
import { decodeHtmlEntities } from "@/lib/blog";
import { getPublishedSitePosts } from "@/lib/ranked/site-posts";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

const PATH = "/blog";

const TITLE = "The Aligned Health Journal · Chiropractic Insights in Laguna Hills";
const DESCRIPTION =
    "Plain-spoken articles on chiropractic care, recovery modalities, and treatment plans from the Aligned Health team in Laguna Hills, CA.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  // og:image / twitter:image come from ./opengraph-image.tsx. Setting
  // `images` here would override that generated card, so it's omitted.
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

export default async function BlogPage() {
  const posts = await getPublishedSitePosts();

  // Blog collection JSON-LD for richer SERP presentation.
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}${PATH}`,
    url: `${SITE_URL}${PATH}`,
    name: "The Aligned Health Journal",
    description:
      "Chiropractic care, recovery modalities, and treatment insights from Aligned Health in Laguna Hills, CA.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${post.slug}`,
      url: `${SITE_URL}/blog/${post.slug}`,
      headline: decodeHtmlEntities(post.title),
      description: decodeHtmlEntities(post.description),
      datePublished: post.datePublished,
      dateModified: post.dateModified ?? post.datePublished,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
      image: post.hero.src,
    })),
  };

  return (
    <>
      <PageChromeJsonLd path={PATH} name={TITLE} description={DESCRIPTION} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <BlogIndex posts={posts} />
    </>
  );
}
