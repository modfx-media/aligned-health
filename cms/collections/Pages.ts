import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "../access";
import {
  draftVersions,
  faqFields,
  identityFields,
  PAGE_TEMPLATES,
  previewAdmin,
} from "../fields";
import { generatePagePath } from "../hooks";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  ...previewAdmin("title"),
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "template",
      type: "select",
      required: true,
      options: [...PAGE_TEMPLATES],
      admin: { position: "sidebar" },
    },
    {
      name: "heading",
      type: "text",
    },
    {
      name: "lead",
      type: "textarea",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "ogImage",
      type: "text",
    },
    {
      name: "ogImageAlt",
      type: "text",
    },
    {
      name: "body",
      type: "textarea",
    },
    {
      name: "faqs",
      type: "array",
      fields: faqFields,
    },
    ...identityFields,
  ],
  hooks: {
    beforeValidate: [generatePagePath],
  },
  versions: draftVersions,
};
