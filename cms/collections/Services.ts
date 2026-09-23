import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "../access";
import {
  draftVersions,
  faqFields,
  identityFields,
  previewAdmin,
  stringListField,
} from "../fields";
import { generatePrefixedPath } from "../hooks";

export const Services: CollectionConfig = {
  slug: "services",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  ...previewAdmin("label"),
  fields: [
    { name: "label", type: "text", required: true },
    { name: "short", type: "text" },
    { name: "metaTitle", type: "text" },
    { name: "metaDescription", type: "textarea" },
    stringListField("keywords", "Keywords"),
    { name: "imageSrc", type: "text" },
    { name: "imageAlt", type: "text" },
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "eyebrow", type: "text" },
        { name: "tagline", type: "textarea" },
        { name: "statValue", type: "text" },
        { name: "statLabel", type: "text" },
      ],
    },
    {
      name: "intro",
      type: "group",
      fields: [
        { name: "lead", type: "textarea" },
        { name: "body", type: "textarea" },
      ],
    },
    {
      name: "howItWorks",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    stringListField("benefits", "Benefits"),
    stringListField("indications", "Indications"),
    stringListField("contraindications", "Contraindications"),
    {
      name: "whatToExpect",
      type: "group",
      fields: [
        { name: "duration", type: "text" },
        { name: "frequency", type: "text" },
        { name: "prep", type: "textarea" },
        { name: "body", type: "textarea" },
      ],
    },
    { name: "faqs", type: "array", fields: faqFields },
    {
      name: "related",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
    },
    stringListField("relatedSlugs", "Related service slugs"),
    ...identityFields,
  ],
  hooks: {
    beforeValidate: [generatePrefixedPath("/services")],
  },
  versions: draftVersions,
};
