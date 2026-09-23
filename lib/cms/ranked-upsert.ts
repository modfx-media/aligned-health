import type { BlogPost } from "@/lib/blog";
import { getCMS } from "./payload";
import { withCMS } from "./safe";

function listValues(values: readonly string[] | undefined) {
  return (values ?? []).map((value) => ({ value }));
}

export async function upsertRankedPostsAsDrafts(posts: BlogPost[]): Promise<void> {
  await withCMS(async () => {
    const payload = await getCMS();
    for (const post of posts) {
      const publicPath = `/blog/${post.slug}`;
      const legacyId = `ranked:${post.slug}`;
      const data = {
        title: post.title,
        description: post.description,
        keywords: listValues(post.keywords),
        category: post.category,
        datePublished: post.datePublished,
        dateModified: post.dateModified ?? post.datePublished,
        readingTime: post.readingTime,
        authorName: post.author.name,
        authorRole: post.author.role,
        heroSrc: post.hero.src,
        heroAlt: post.hero.alt,
        body: post.body.map((block) => {
          if (block.type === "ul" || block.type === "ol") {
            return { type: block.type, items: listValues(block.items) };
          }
          if (block.type === "quote") {
            return {
              type: "quote",
              text: block.text,
              attribution: block.attribution,
            };
          }
          if (block.type === "callout") {
            return { type: "callout", title: block.title, text: block.text };
          }
          return { type: block.type, text: block.text };
        }),
        relatedServiceSlugs: listValues(post.relatedServiceSlugs),
        slug: post.slug,
        path: publicPath,
        legacyId,
        sourceUrl: publicPath,
        _status: "draft" as const,
      };

      const existing = await payload.find({
        collection: "posts",
        where: {
          or: [
            { legacyId: { equals: legacyId } },
            { slug: { equals: post.slug } },
          ],
        },
        limit: 1,
        depth: 0,
        overrideAccess: true,
        draft: true,
      });

      const existingDoc = existing.docs[0] as { id: string | number } | undefined;
      if (existingDoc) {
        await payload.update({
          collection: "posts",
          id: existingDoc.id,
          // Payload types are generated later; draft upserts use collection fields.
          data: data as never,
          draft: true,
          overrideAccess: true,
        });
      } else {
        await payload.create({
          collection: "posts",
          data: data as never,
          draft: true,
          overrideAccess: true,
        });
      }
    }
  }, undefined);
}
