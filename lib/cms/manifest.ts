import { getAllPosts } from "@/lib/blog";
import { LOCATIONS } from "@/lib/locations";
import { getAllServices } from "@/lib/services";
import { ROUTES } from "@/lib/site";

export function sitemapManifestPaths(): string[] {
  const paths = new Set<string>([...ROUTES, "/sitemap"]);

  for (const service of getAllServices()) {
    paths.add(`/services/${service.slug}`);
  }

  for (const location of LOCATIONS) {
    paths.add(`/areas-we-serve/${location.slug}`);
    for (const service of getAllServices()) {
      paths.add(`/areas-we-serve/${location.slug}/${service.slug}`);
    }
  }

  for (const post of getAllPosts()) {
    paths.add(`/blog/${post.slug}`);
  }

  return [...paths].sort();
}
