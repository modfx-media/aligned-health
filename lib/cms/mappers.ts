import type { BlogBlock, BlogPost } from "@/lib/blog";
import type { CityLocation, Region } from "@/lib/locations";
import type { Service } from "@/lib/services";
import type { CityOverviewContent, ServiceAreaContent } from "@/lib/serviceAreas";

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function num(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function bool(value: unknown): boolean {
  return Boolean(value);
}

function list(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && "value" in item) {
        return text((item as { value: unknown }).value);
      }
      return "";
    })
    .filter(Boolean);
}

function faqs(value: unknown): Array<{ q: string; a: string }> {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as { q?: unknown; a?: unknown };
      if (!row.q || !row.a) return null;
      return { q: text(row.q), a: text(row.a) };
    })
    .filter((item): item is { q: string; a: string } => Boolean(item));
}

function faqGroup(value: unknown, fallback: { q: string; a: string }): {
  q: string;
  a: string;
} {
  if (!value || typeof value !== "object") return fallback;
  const row = value as { q?: unknown; a?: unknown };
  if (!row.q || !row.a) return fallback;
  return { q: text(row.q), a: text(row.a) };
}

export function mapService(doc: Record<string, unknown>): Service {
  const hero = (doc.hero ?? {}) as Record<string, unknown>;
  const intro = (doc.intro ?? {}) as Record<string, unknown>;
  const expect = (doc.whatToExpect ?? {}) as Record<string, unknown>;
  const howItWorks = Array.isArray(doc.howItWorks)
    ? doc.howItWorks.map((step) => {
        const row = (step ?? {}) as Record<string, unknown>;
        return { title: text(row.title), description: text(row.description) };
      })
    : [];

  const statValue = text(hero.statValue);
  const statLabel = text(hero.statLabel);

  return {
    slug: text(doc.slug),
    label: text(doc.label),
    short: text(doc.short),
    metaTitle: text(doc.metaTitle || doc.title, text(doc.label)),
    metaDescription: text(doc.metaDescription || doc.description),
    keywords: list(doc.keywords),
    imageSrc: text(doc.imageSrc),
    imageAlt: text(doc.imageAlt),
    hero: {
      eyebrow: text(hero.eyebrow),
      tagline: text(hero.tagline),
      ...(statValue && statLabel
        ? { stat: { value: statValue, label: statLabel } }
        : {}),
    },
    intro: {
      lead: text(intro.lead),
      body: text(intro.body),
    },
    howItWorks,
    benefits: list(doc.benefits),
    indications: list(doc.indications),
    contraindications: list(doc.contraindications),
    whatToExpect: {
      duration: text(expect.duration),
      frequency: text(expect.frequency),
      prep: text(expect.prep),
      body: text(expect.body),
    },
    faqs: faqs(doc.faqs),
    relatedSlugs: list(doc.relatedSlugs),
  };
}

const REGIONS: Region[] = [
  "South Orange County",
  "Central Orange County",
  "North Orange County",
  "West Orange County",
];

export function mapLocation(doc: Record<string, unknown>): CityLocation {
  const region = text(doc.region) as Region;
  return {
    slug: text(doc.slug),
    name: text(doc.name),
    region: REGIONS.includes(region) ? region : "South Orange County",
    zip: text(doc.zip),
    driveMinutes: num(doc.driveMinutes),
    freeway: text(doc.freeway),
    landmark: text(doc.landmark),
    neighborhood: text(doc.neighborhood),
    wikipediaSlug: text(doc.wikipediaSlug),
    home: bool(doc.home) || undefined,
  };
}

export function mapCityOverview(
  doc: Record<string, unknown>,
  fallback: CityOverviewContent,
): CityOverviewContent {
  return {
    intro: text(doc.intro, fallback.intro),
    commuteNote: text(doc.commuteNote, fallback.commuteNote),
    localStory: text(doc.localStory, fallback.localStory),
    localFaq: faqGroup(doc.localFaq, fallback.localFaq),
    extraFaqs: faqs(doc.extraFaqs).length
      ? faqs(doc.extraFaqs)
      : fallback.extraFaqs,
  };
}

export function mapServiceAreaContent(
  doc: Record<string, unknown>,
  fallback: ServiceAreaContent,
): ServiceAreaContent {
  const variant = num(doc.structuralVariant, fallback.structuralVariant);
  return {
    metaTitle: text(doc.metaTitle, fallback.metaTitle),
    metaDescription: text(doc.metaDescription, fallback.metaDescription),
    intro: text(doc.intro, fallback.intro),
    localStory: text(doc.localStory, fallback.localStory),
    whyChooseUs: list(doc.whyChooseUs).length
      ? list(doc.whyChooseUs)
      : fallback.whyChooseUs,
    localFaq: faqGroup(doc.localFaq, fallback.localFaq),
    extraFaqs: faqs(doc.extraFaqs).length
      ? faqs(doc.extraFaqs)
      : fallback.extraFaqs,
    commuteNote: text(doc.commuteNote, fallback.commuteNote),
    structuralVariant: (variant === 1 || variant === 2 ? variant : 0) as 0 | 1 | 2,
  };
}

function mapBlocks(value: unknown): BlogBlock[] {
  if (!Array.isArray(value)) return [];
  const blocks: BlogBlock[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const type = text(row.type);
    if (type === "ul" || type === "ol") {
      blocks.push({ type, items: list(row.items) });
      continue;
    }
    if (type === "quote") {
      blocks.push({
        type: "quote",
        text: text(row.text),
        attribution: text(row.attribution) || undefined,
      });
      continue;
    }
    if (type === "callout") {
      blocks.push({
        type: "callout",
        title: text(row.title),
        text: text(row.text),
      });
      continue;
    }
    if (type === "p" || type === "lead" || type === "h2" || type === "h3") {
      blocks.push({ type, text: text(row.text) });
    }
  }
  return blocks;
}

export function mapPost(doc: Record<string, unknown>): BlogPost {
  return {
    slug: text(doc.slug),
    title: text(doc.title),
    description: text(doc.description),
    keywords: list(doc.keywords),
    category: text(doc.category, "Chiropractic Care"),
    datePublished: text(doc.datePublished).slice(0, 10),
    dateModified: text(doc.dateModified).slice(0, 10) || undefined,
    readingTime: num(doc.readingTime, 5),
    author: {
      name: text(doc.authorName, "Dr. Dustin Hack, D.C."),
      role: text(doc.authorRole, "Chiropractor · Aligned Health"),
    },
    hero: {
      src: text(doc.heroSrc, "/images/blog/default-cover.jpg"),
      alt: text(doc.heroAlt, text(doc.title)),
    },
    body: mapBlocks(doc.body),
    relatedServiceSlugs: list(doc.relatedServiceSlugs),
  };
}
