import { PageChromeJsonLd } from "@/app/_components/ClinicJsonLd";
import { CityAreaView } from "@/app/(site)/areas-we-serve/[city]/_components/CityAreaView";
import { ServiceAreaView } from "@/app/(site)/areas-we-serve/[city]/[service]/_components/ServiceAreaView";
import { BlogPostView } from "@/app/(site)/blog/[slug]/_components/BlogPostView";
import { ServicePageView } from "@/app/(site)/services/[slug]/_components/ServicePageView";
import type { BlogPost } from "@/lib/blog";
import { decodeHtmlEntities } from "@/lib/blog";
import type { CityLocation } from "@/lib/locations";
import type { Service } from "@/lib/services";
import { getRelatedServices, SERVICES } from "@/lib/services";
import type { CityOverviewContent, ServiceAreaContent } from "@/lib/serviceAreas";
import { SITE_URL } from "@/lib/site";

export function ServiceDetailView({ service }: { service: Service }) {
  const related = getRelatedServices(service.slug);
  const url = `${SITE_URL}/services/${service.slug}`;
  const path = `/services/${service.slug}`;
  const description = service.metaDescription.replace(/&[a-z]+;/g, "");

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "@id": `${url}#therapy`,
    url,
    name: service.label,
    alternateName: service.short,
    description,
    image: service.imageSrc,
    provider: { "@id": `${SITE_URL}#clinic` },
    indication: service.indications.map((ind) => ({
      "@type": "MedicalIndication",
      name: ind.replace(/&[a-z]+;/g, ""),
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q.replace(/&[a-z]+;/g, ""),
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.replace(/&[a-z]+;/g, ""),
      },
    })),
  };

  return (
    <>
      <PageChromeJsonLd
        path={path}
        name={service.metaTitle}
        description={description}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.label, path },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServicePageView service={service} related={related} />
    </>
  );
}

export function CityDetailView({
  location,
  content,
}: {
  location: CityLocation;
  content: CityOverviewContent;
}) {
  const path = `/areas-we-serve/${location.slug}`;
  const title = `Chiropractor in ${location.name}, CA`;
  const faqs = [content.localFaq, ...content.extraFaqs];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <PageChromeJsonLd
        path={path}
        name={title}
        description={content.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Areas We Serve", path: "/areas-we-serve" },
          { name: location.name, path },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CityAreaView location={location} services={SERVICES} content={content} />
    </>
  );
}

export function ServiceAreaDetailView({
  service,
  location,
  content,
}: {
  service: Service;
  location: CityLocation;
  content: ServiceAreaContent;
}) {
  const path = `/areas-we-serve/${location.slug}/${service.slug}`;
  const url = `${SITE_URL}${path}`;
  const related = service.relatedSlugs
    .map((slug) => SERVICES.find((item) => item.slug === slug))
    .filter((item): item is Service => Boolean(item));
  const faqs = [content.localFaq, ...content.extraFaqs, ...service.faqs.slice(0, 2)];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "@id": `${url}#therapy`,
    url,
    name: `${service.label} in ${location.name}, CA`,
    alternateName: service.short,
    description: content.metaDescription,
    image: service.imageSrc,
    provider: { "@id": `${SITE_URL}#clinic` },
    indication: service.indications.map((ind) => ({
      "@type": "MedicalIndication",
      name: ind.replace(/&[a-z]+;/g, ""),
    })),
    areaServed: {
      "@type": "City",
      name: location.name,
      sameAs: `https://en.wikipedia.org/wiki/${location.wikipediaSlug}`,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.replace(/&rsquo;/g, "\u2019").replace(/&[a-z]+;/g, ""),
      },
    })),
  };

  return (
    <>
      <PageChromeJsonLd
        path={path}
        name={content.metaTitle}
        description={content.metaDescription}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Areas We Serve", path: "/areas-we-serve" },
          { name: location.name, path: `/areas-we-serve/${location.slug}` },
          { name: service.label, path },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ServiceAreaView
        service={service}
        location={location}
        content={content}
        related={related}
      />
    </>
  );
}

export function BlogPostDetailView({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const plainTitle = decodeHtmlEntities(post.title);
  const plainDescription = decodeHtmlEntities(post.description);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: plainTitle,
    description: plainDescription,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: { "@type": "Person", name: post.author.name },
    publisher: {
      "@type": "Organization",
      name: "Aligned Health",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/aligned-health-light.png`,
      },
    },
    image: [post.hero.src],
    articleSection: decodeHtmlEntities(post.category),
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostView post={post} related={related} />
    </>
  );
}
