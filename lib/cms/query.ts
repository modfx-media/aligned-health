import { draftMode } from "next/headers";
import type { RoutingCollection } from "@/cms/fields";
import { ROUTING_COLLECTIONS } from "@/cms/fields";
import { getCMS } from "./payload";
import { withCMS } from "./safe";

export type RoutedContent = {
  collection: RoutingCollection;
  doc: Record<string, unknown>;
};

export async function queryRoutedContentByPath(
  path: string,
): Promise<RoutedContent | null> {
  return withCMS(async () => {
    const { isEnabled } = await draftMode();
    const payload = await getCMS();

    for (const collection of ROUTING_COLLECTIONS) {
      const result = await payload.find({
        collection,
        where: { path: { equals: path } },
        limit: 1,
        depth: 0,
        draft: isEnabled,
        overrideAccess: isEnabled,
      });
      const doc = result.docs[0];
      if (doc) {
        return { collection, doc: doc as Record<string, unknown> };
      }
    }

    return null;
  }, null);
}

export type CMSSitemapFlags = {
  path: string;
  noIndex?: boolean;
  excludeFromSitemap?: boolean;
  updatedAt?: string;
  sourceUpdatedAt?: string;
};

export async function querySitemapFlags(): Promise<CMSSitemapFlags[]> {
  return withCMS(async () => {
    const payload = await getCMS();
    const flags: CMSSitemapFlags[] = [];

    for (const collection of ROUTING_COLLECTIONS) {
      const result = await payload.find({
        collection,
        where: {
          _status: { equals: "published" },
        },
        limit: 10000,
        depth: 0,
        overrideAccess: false,
      });

      for (const doc of result.docs) {
        const record = doc as Record<string, unknown>;
        if (typeof record.path !== "string") continue;
        flags.push({
          path: record.path,
          noIndex: Boolean(record.noIndex),
          excludeFromSitemap: Boolean(record.excludeFromSitemap),
          updatedAt:
            typeof record.updatedAt === "string" ? record.updatedAt : undefined,
          sourceUpdatedAt:
            typeof record.sourceUpdatedAt === "string"
              ? record.sourceUpdatedAt
              : undefined,
        });
      }
    }

    return flags;
  }, []);
}
