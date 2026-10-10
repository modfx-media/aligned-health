import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/services";
import { getLocationBySlug } from "@/lib/locations";
import { isSharedDefaultCover } from "@/lib/cms/media-url";
import { isPublishDateLive } from "@/lib/publish-date";
import { getPublishedSitePosts } from "@/lib/ranked/site-posts";
import { buildCityOverview, buildServiceAreaContent } from "@/lib/serviceAreas";
import {
  BlogPostDetailView,
  CityDetailView,
  ServiceAreaDetailView,
  ServiceDetailView,
} from "./catalog-views";
import { DesignedPageByTemplate } from "./designed-pages";
import {
  mapCityOverview,
  mapLocation,
  mapPost,
  mapService,
  mapServiceAreaContent,
} from "./mappers";
import type { RoutedContent } from "./query";

export async function RenderRoutedContent({
  routed,
}: {
  routed: RoutedContent;
}) {
  const { collection, doc } = routed;

  if (collection === "pages") {
    return DesignedPageByTemplate(doc.template);
  }

  if (collection === "services") {
    return <ServiceDetailView service={mapService(doc)} />;
  }

  if (collection === "locations") {
    const location = mapLocation(doc);
    const fallback = buildCityOverview(location);
    return (
      <CityDetailView
        location={location}
        content={mapCityOverview(doc, fallback)}
      />
    );
  }

  if (collection === "service-areas") {
    const citySlug = String(doc.citySlug || "");
    const serviceSlug = String(doc.serviceSlug || "");
    const location =
      getLocationBySlug(citySlug) ??
      (doc.name ? mapLocation({ ...doc, slug: citySlug }) : undefined);
    const service =
      getServiceBySlug(serviceSlug) ??
      (doc.label ? mapService({ ...doc, slug: serviceSlug }) : undefined);
    if (!location || !service) return null;
    const fallback = buildServiceAreaContent(service, location);
    return (
      <ServiceAreaDetailView
        service={service}
        location={location}
        content={mapServiceAreaContent(doc, fallback)}
      />
    );
  }

  if (collection === "posts") {
    const { isEnabled } = await draftMode();
    const scheduled =
      typeof doc.datePublished === "string" && doc.datePublished
        ? doc.datePublished
        : typeof doc.createdAt === "string"
          ? doc.createdAt
          : "";
    if (!isEnabled && !isPublishDateLive(scheduled)) notFound();

    let post = mapPost(doc);
    const sitePosts = await getPublishedSitePosts().catch(() => []);
    const merged = sitePosts.find((item) => item.slug === post.slug);
    if (
      merged &&
      isSharedDefaultCover(post.hero.src) &&
      !isSharedDefaultCover(merged.hero.src)
    ) {
      post = { ...post, hero: merged.hero };
    }
    const others = sitePosts.filter((item) => item.slug !== post.slug);
    return <BlogPostDetailView post={post} related={others.slice(0, 3)} />;
  }

  return null;
}
