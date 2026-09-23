import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PAGE_TEMPLATE_PATHS } from "../cms/fields";
import { getAllPosts } from "../lib/blog";
import { sitemapManifestPaths } from "../lib/cms/manifest";
import {
  FOOTER_EXPORT,
  HEADER_EXPORT,
  SITE_SETTINGS_EXPORT,
  STATIC_PAGES,
} from "../lib/cms/static-pages";
import { LOCATIONS } from "../lib/locations";
import { getAllServices } from "../lib/services";
import {
  buildCityOverview,
  buildServiceAreaContent,
} from "../lib/serviceAreas";

type ExportRecord = {
  collection: string;
  legacyId: string;
  sourceUrl: string;
  path: string;
  data: Record<string, unknown>;
};

function listValues(values: readonly string[] | undefined) {
  return (values ?? []).map((value) => ({ value }));
}

function listFaqs(values: ReadonlyArray<{ q: string; a: string }> | undefined) {
  return (values ?? []).map((faq) => ({ q: faq.q, a: faq.a }));
}

function buildExport() {
  const records: ExportRecord[] = [];
  const now = new Date().toISOString();

  for (const page of STATIC_PAGES) {
    const publicPath = PAGE_TEMPLATE_PATHS[page.template] ?? `/${page.template}`;
    records.push({
      collection: "pages",
      legacyId: `page:${page.template}`,
      sourceUrl: publicPath,
      path: publicPath,
      data: {
        title: page.title,
        template: page.template,
        heading: page.heading,
        lead: page.lead,
        description: page.description,
        ogImage: page.ogImage,
        ogImageAlt: page.ogImageAlt,
        faqs: listFaqs(page.faqs),
        slug: page.template === "home" ? "home" : page.template,
        path: publicPath,
        legacyId: `page:${page.template}`,
        sourceUrl: publicPath,
        sourceUpdatedAt: now,
        meta: { title: page.title, description: page.description },
      },
    });
  }

  for (const service of getAllServices()) {
    const publicPath = `/services/${service.slug}`;
    records.push({
      collection: "services",
      legacyId: `service:${service.slug}`,
      sourceUrl: publicPath,
      path: publicPath,
      data: {
        label: service.label,
        short: service.short,
        metaTitle: service.metaTitle,
        metaDescription: service.metaDescription,
        keywords: listValues(service.keywords),
        imageSrc: service.imageSrc,
        imageAlt: service.imageAlt,
        hero: {
          eyebrow: service.hero.eyebrow,
          tagline: service.hero.tagline,
          statValue: service.hero.stat?.value,
          statLabel: service.hero.stat?.label,
        },
        intro: service.intro,
        howItWorks: service.howItWorks.map((step) => ({
          title: step.title,
          description: step.description,
        })),
        benefits: listValues(service.benefits),
        indications: listValues(service.indications),
        contraindications: listValues(service.contraindications),
        whatToExpect: service.whatToExpect,
        faqs: listFaqs(service.faqs),
        relatedSlugs: listValues(service.relatedSlugs),
        related: service.relatedSlugs.map((slug) => ({
          $ref: { collection: "services", legacyId: `service:${slug}` },
        })),
        slug: service.slug,
        path: publicPath,
        legacyId: `service:${service.slug}`,
        sourceUrl: publicPath,
        sourceUpdatedAt: now,
        meta: {
          title: service.metaTitle,
          description: service.metaDescription,
        },
      },
    });
  }

  for (const location of LOCATIONS) {
    const publicPath = `/areas-we-serve/${location.slug}`;
    const overview = buildCityOverview(location);
    const title = `Chiropractor in ${location.name}, CA · Aligned Health`;
    const description = location.home
      ? `Laguna Hills chiropractic care with Dr. Dustin Hack and Dr. Tara Hadden. One-on-one visits, spinal decompression, and most PPO plans verified before you book.`
      : `Chiropractor for ${location.name} patients at our Laguna Hills office. Drive is about ${location.driveMinutes} minutes via ${location.freeway}. Most PPO plans accepted.`;
    records.push({
      collection: "locations",
      legacyId: `location:${location.slug}`,
      sourceUrl: publicPath,
      path: publicPath,
      data: {
        name: location.name,
        region: location.region,
        zip: location.zip,
        driveMinutes: location.driveMinutes,
        freeway: location.freeway,
        landmark: location.landmark,
        neighborhood: location.neighborhood,
        wikipediaSlug: location.wikipediaSlug,
        home: Boolean(location.home),
        intro: overview.intro,
        commuteNote: overview.commuteNote,
        localStory: overview.localStory,
        localFaq: overview.localFaq,
        extraFaqs: listFaqs(overview.extraFaqs),
        metaTitle: title,
        metaDescription: description,
        slug: location.slug,
        path: publicPath,
        legacyId: `location:${location.slug}`,
        sourceUrl: publicPath,
        sourceUpdatedAt: now,
        meta: { title, description },
      },
    });
  }

  for (const location of LOCATIONS) {
    for (const service of getAllServices()) {
      const publicPath = `/areas-we-serve/${location.slug}/${service.slug}`;
      const content = buildServiceAreaContent(service, location);
      records.push({
        collection: "service-areas",
        legacyId: `service-area:${location.slug}:${service.slug}`,
        sourceUrl: publicPath,
        path: publicPath,
        data: {
          title: `${service.label} in ${location.name}`,
          citySlug: location.slug,
          serviceSlug: service.slug,
          location: {
            $ref: { collection: "locations", legacyId: `location:${location.slug}` },
          },
          service: {
            $ref: { collection: "services", legacyId: `service:${service.slug}` },
          },
          metaTitle: content.metaTitle,
          metaDescription: content.metaDescription,
          intro: content.intro,
          localStory: content.localStory,
          whyChooseUs: listValues(content.whyChooseUs),
          localFaq: content.localFaq,
          extraFaqs: listFaqs(content.extraFaqs),
          commuteNote: content.commuteNote,
          structuralVariant: content.structuralVariant,
          slug: `${location.slug}--${service.slug}`,
          path: publicPath,
          legacyId: `service-area:${location.slug}:${service.slug}`,
          sourceUrl: publicPath,
          sourceUpdatedAt: now,
          meta: {
            title: content.metaTitle,
            description: content.metaDescription,
          },
        },
      });
    }
  }

  for (const post of getAllPosts()) {
    const publicPath = `/blog/${post.slug}`;
    records.push({
      collection: "posts",
      legacyId: `post:${post.slug}`,
      sourceUrl: publicPath,
      path: publicPath,
      data: {
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
        related: (post.relatedServiceSlugs ?? []).map((slug) => ({
          $ref: { collection: "services", legacyId: `service:${slug}` },
        })),
        slug: post.slug,
        path: publicPath,
        legacyId: `post:${post.slug}`,
        sourceUrl: publicPath,
        sourceUpdatedAt: now,
        meta: { title: post.title, description: post.description },
      },
    });
  }

  return {
    version: 1 as const,
    generatedAt: now,
    manifestCount: sitemapManifestPaths().length,
    records,
    globals: [
      { slug: "header", data: HEADER_EXPORT },
      { slug: "footer", data: FOOTER_EXPORT },
      { slug: "site-settings", data: SITE_SETTINGS_EXPORT },
    ],
  };
}

async function main() {
  const exportData = buildExport();
  const outDir = path.join(process.cwd(), "data");
  const outFile = path.join(outDir, "content-export.json");
  await mkdir(outDir, { recursive: true });
  await writeFile(outFile, `${JSON.stringify(exportData, null, 2)}\n`, "utf8");
  console.log(
    `Wrote ${exportData.records.length} records and ${exportData.globals.length} globals to ${outFile}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
