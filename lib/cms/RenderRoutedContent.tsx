import { getServiceBySlug } from "@/lib/services";
import { getLocationBySlug } from "@/lib/locations";
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
    const post = mapPost(doc);
    const others = (await getPublishedSitePosts().catch(() => [])).filter(
      (item) => item.slug !== post.slug,
    );
    return <BlogPostDetailView post={post} related={others.slice(0, 3)} />;
  }

  return null;
}
