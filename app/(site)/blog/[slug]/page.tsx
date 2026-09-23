import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostDetailView } from "@/lib/cms/catalog-views";
import { CMSRoute } from "@/lib/cms/CMSRoute";
import { metadataForPath } from "@/lib/cms/metadata";
import { decodeHtmlEntities } from "@/lib/blog";
import {
  getPublishedSitePost,
  getPublishedSitePosts,
} from "@/lib/ranked/site-posts";

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

  return metadataForPath(url, {
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
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = await getPublishedSitePosts();
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <CMSRoute path={`/blog/${post.slug}`}>
      <BlogPostDetailView post={post} related={related} />
    </CMSRoute>
  );
}
