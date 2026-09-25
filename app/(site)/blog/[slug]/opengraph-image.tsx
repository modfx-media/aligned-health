import { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgCard,
} from "@/app/(site)/blog/_components/og-card";
import { decodeHtmlEntities, formatPostDate } from "@/lib/blog";
import {
  getPublishedSitePost,
  getPublishedSitePosts,
} from "@/lib/ranked/site-posts";

export const alt = "Aligned Health article cover";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Prerender a card for every published post instead of generating on first crawl. */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getPublishedSitePosts().catch(() => []);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedSitePost(slug);

  if (!post) {
    return new ImageResponse(
      <OgCard headline="Wellness Insights from the Aligned Health Journal" />,
      size
    );
  }

  return new ImageResponse(
    (
      <OgCard
        headline={decodeHtmlEntities(post.title)}
        eyebrow={decodeHtmlEntities(post.category)}
        footer={`${formatPostDate(post.datePublished)} · ${post.readingTime} min read`}
      />
    ),
    size
  );
}
