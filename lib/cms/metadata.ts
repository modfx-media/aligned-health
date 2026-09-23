import type { Metadata } from "next";
import { queryRoutedContentByPath } from "./query";
import { withCMS } from "./safe";

function robotsFromDoc(doc: Record<string, unknown>): Metadata["robots"] {
  if (!doc.noIndex && !doc.noFollow) return undefined;
  return {
    index: !doc.noIndex,
    follow: !doc.noFollow,
  };
}

function cmsMetadata(doc: Record<string, unknown>, fallback: Metadata): Metadata {
  const meta = (doc.meta ?? {}) as Record<string, unknown>;
  const title = String(
    meta.title || doc.metaTitle || doc.title || doc.label || doc.name || "",
  );
  const description = String(
    meta.description ||
      doc.metaDescription ||
      doc.description ||
      fallback.description ||
      "",
  );
  const path =
    (typeof doc.canonicalUrl === "string" && doc.canonicalUrl) ||
    (typeof doc.path === "string" ? doc.path : undefined);
  const image =
    (typeof doc.ogImage === "string" && doc.ogImage) ||
    (typeof doc.imageSrc === "string" && doc.imageSrc) ||
    (typeof doc.heroSrc === "string" && doc.heroSrc) ||
    undefined;
  const imageAlt =
    (typeof doc.ogImageAlt === "string" && doc.ogImageAlt) ||
    (typeof doc.imageAlt === "string" && doc.imageAlt) ||
    title;

  return {
    ...fallback,
    ...(title ? { title: { absolute: title } } : {}),
    ...(description ? { description } : {}),
    ...(path ? { alternates: { canonical: path } } : fallback.alternates),
    ...(robotsFromDoc(doc) ? { robots: robotsFromDoc(doc) } : {}),
    openGraph: {
      ...fallback.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(path ? { url: path } : {}),
      ...(image ? { images: [{ url: image, alt: imageAlt }] } : {}),
    },
    twitter: {
      ...fallback.twitter,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  };
}

export async function metadataForPath(
  path: string,
  fallback: Metadata,
): Promise<Metadata> {
  const routed = await withCMS(() => queryRoutedContentByPath(path), null);
  if (!routed) return fallback;
  return cmsMetadata(routed.doc, fallback);
}
