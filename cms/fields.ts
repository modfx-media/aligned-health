import type { CollectionConfig, Field } from "payload";
import { previewFromPath } from "@/lib/cms/preview";

export const faqFields: Field[] = [
  { name: "q", type: "text", required: true, label: "Question" },
  { name: "a", type: "textarea", required: true, label: "Answer" },
];

export const stringListField = (name: string, label: string): Field => ({
  name,
  type: "array",
  label,
  fields: [{ name: "value", type: "text", required: true }],
});

export const identityFields: Field[] = [
  {
    name: "slug",
    type: "text",
    unique: true,
    index: true,
    admin: { position: "sidebar" },
  },
  {
    name: "path",
    type: "text",
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: "Public URL. Generated from the slug if left blank.",
    },
  },
  {
    name: "legacyId",
    type: "text",
    unique: true,
    index: true,
    admin: { position: "sidebar", readOnly: true },
  },
  {
    name: "sourceUrl",
    type: "text",
    index: true,
    admin: { position: "sidebar" },
  },
  {
    name: "sourceUpdatedAt",
    type: "date",
    admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
  },
];

export const draftVersions: CollectionConfig["versions"] = {
  drafts: {
    schedulePublish: true,
  },
  maxPerDoc: 50,
};

export function previewAdmin(
  useAsTitle: string,
): Pick<CollectionConfig, "admin"> {
  return {
    admin: {
      useAsTitle,
      defaultColumns: [useAsTitle, "path", "_status", "updatedAt"],
      preview: (data) => previewFromPath(data?.path),
      livePreview: {
        url: ({ data }) => previewFromPath(data?.path),
      },
    },
  };
}

export const PAGE_TEMPLATES = [
  { label: "Home", value: "home" },
  { label: "About", value: "about" },
  { label: "Our Team", value: "team" },
  { label: "Services index", value: "servicesIndex" },
  { label: "Areas we serve", value: "areasIndex" },
  { label: "Blog index", value: "blogIndex" },
  { label: "Appointments", value: "appointments" },
  { label: "Contact", value: "contact" },
  { label: "Privacy", value: "privacy" },
  { label: "Sitemap", value: "sitemap" },
] as const;

export const PAGE_TEMPLATE_PATHS: Record<string, string> = {
  home: "/",
  about: "/about",
  team: "/our-team",
  servicesIndex: "/services",
  areasIndex: "/areas-we-serve",
  blogIndex: "/blog",
  appointments: "/appointments",
  contact: "/contact-us",
  privacy: "/privacy-policy",
  sitemap: "/sitemap",
};

export const ROUTING_COLLECTIONS = [
  "pages",
  "services",
  "locations",
  "service-areas",
  "posts",
] as const;

export type RoutingCollection = (typeof ROUTING_COLLECTIONS)[number];
