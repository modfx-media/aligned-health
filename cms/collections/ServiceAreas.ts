import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "../access";
import {
  draftVersions,
  faqFields,
  identityFields,
  previewAdmin,
  stringListField,
} from "../fields";
import { generateServiceAreaPath } from "../hooks";

export const ServiceAreas: CollectionConfig = {
  slug: "service-areas",
  labels: {
    singular: "Service area",
    plural: "Service areas",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  ...previewAdmin("title"),
  fields: [
    { name: "title", type: "text", required: true },
    { name: "citySlug", type: "text", index: true },
    { name: "serviceSlug", type: "text", index: true },
    {
      name: "location",
      type: "relationship",
      relationTo: "locations",
    },
    {
      name: "service",
      type: "relationship",
      relationTo: "services",
    },
    { name: "metaTitle", type: "text" },
    { name: "metaDescription", type: "textarea" },
    { name: "intro", type: "textarea" },
    { name: "localStory", type: "textarea" },
    stringListField("whyChooseUs", "Why choose us"),
    { name: "localFaq", type: "group", fields: faqFields },
    { name: "extraFaqs", type: "array", fields: faqFields },
    { name: "commuteNote", type: "textarea" },
    {
      name: "structuralVariant",
      type: "number",
      min: 0,
      max: 2,
    },
    ...identityFields,
  ],
  hooks: {
    beforeValidate: [generateServiceAreaPath],
  },
  versions: draftVersions,
};
