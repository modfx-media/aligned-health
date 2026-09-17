import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/site";
import { getPublishedSitePosts } from "@/lib/ranked/site-posts";
import { getAllServices } from "@/lib/services";
import { LOCATIONS } from "@/lib/locations";

/**
 * Sitemap lists URLs only. Google ignores changefreq and priority.
 * lastmod is omitted on static routes so we do not stamp every URL as "today".
 * Blog posts keep lastmod from their real publish/modified dates.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedSitePosts();

  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.datePublished),
  }));

  const serviceEntries: MetadataRoute.Sitemap = getAllServices().map(
    (service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
    }),
  );

  const cityEntries: MetadataRoute.Sitemap = LOCATIONS.map((location) => ({
    url: `${SITE_URL}/areas-we-serve/${location.slug}`,
  }));

  const cityServiceEntries: MetadataRoute.Sitemap = LOCATIONS.flatMap(
    (location) =>
      getAllServices().map((service) => ({
        url: `${SITE_URL}/areas-we-serve/${location.slug}/${service.slug}`,
      })),
  );

  return [
    ...staticEntries,
    ...serviceEntries,
    ...cityEntries,
    ...cityServiceEntries,
    ...postEntries,
  ];
}
