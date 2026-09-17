import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "./_components/BlogPostView";
import { decodeHtmlEntities } from "@/lib/blog";
import {
  getPublishedSitePost,
  getPublishedSitePosts,
} from "@/lib/ranked/site-posts";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = await getPublishedSitePosts().catch(() => []);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedSitePost(slug);
  if (!post) {
    return { title: "Not Found" };
  }

  const plainTitle = decodeHtmlEntities(post.title);
  const plainDescription = decodeHtmlEntities(post.description);

  const url = `/blog/${post.slug}`;
  // og:image / twitter:image come from ./opengraph-image.tsx, which renders a
  // 1200x630 PNG card per post. Setting `images` here would override it (and
  // several social platforms won't unfurl the .webp hero images).
  return {
    title: { absolute: plainTitle },
    description: plainDescription,
    authors: [{ name: post.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: plainTitle,
      description: plainDescription,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: plainTitle,
      description: plainDescription,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await getPublishedSitePosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const plainTitle = decodeHtmlEntities(post.title);
  const plainDescription = decodeHtmlEntities(post.description);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: plainTitle,
    description: plainDescription,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Aligned Health",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/aligned-health-light.png`,
      },
    },
    image: [post.hero.src],
    articleSection: decodeHtmlEntities(post.category),
    wordCount: estimateWordCount(post),
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostView post={post} related={related} />
    </>
  );
}

function estimateWordCount(post: {
  body: { type: string }[];
}): number {
  let count = 0;
  for (const b of post.body as Array<Record<string, unknown>>) {
    if (typeof b.text === "string") {
      count += (b.text as string).split(/\s+/).length;
    }
    if (Array.isArray(b.items)) {
      for (const item of b.items as string[]) {
        count += item.split(/\s+/).length;
      }
    }
  }
  return count;
}
