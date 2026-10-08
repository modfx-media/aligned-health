import type { BlogPost } from "@/lib/blog";
import { getCMS } from "./payload";
import { mapPost } from "./mappers";
import { withCMS } from "./safe";

export function mergePostsBySlug(
  fallback: readonly BlogPost[],
  cms: readonly BlogPost[],
): BlogPost[] {
  const bySlug = new Map<string, BlogPost>();
  for (const post of fallback) {
    if (post.slug) bySlug.set(post.slug, post);
  }
  for (const post of cms) {
    if (post.slug) bySlug.set(post.slug, post);
  }
  return [...bySlug.values()].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
}

/** Published Payload posts. Hardcoded articles stay in place when the DB is down. */
export async function getPublishedCmsPosts(): Promise<BlogPost[]> {
  return withCMS(async () => {
    const payload = await getCMS();
    const result = await payload.find({
      collection: "posts",
      where: {
        _status: {
          equals: "published",
        },
      },
      sort: "-datePublished",
      depth: 2,
      limit: 200,
      overrideAccess: false,
    });

    return result.docs
      .map((doc) => mapPost(doc as unknown as Record<string, unknown>))
      .filter((post) => post.slug && post.title);
  }, []);
}
