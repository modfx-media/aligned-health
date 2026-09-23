import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "../access";
import {
  draftVersions,
  faqFields,
  identityFields,
  previewAdmin,
} from "../fields";
import { generatePrefixedPath } from "../hooks";

export const Locations: CollectionConfig = {
  slug: "locations",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  ...previewAdmin("name"),
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "region",
      type: "select",
      options: [
        { label: "South Orange County", value: "South Orange County" },
        { label: "Central Orange County", value: "Central Orange County" },
        { label: "North Orange County", value: "North Orange County" },
        { label: "West Orange County", value: "West Orange County" },
      ],
    },
    { name: "zip", type: "text" },
    { name: "driveMinutes", type: "number" },
    { name: "freeway", type: "text" },
    { name: "landmark", type: "text" },
    { name: "neighborhood", type: "text" },
    { name: "wikipediaSlug", type: "text" },
    { name: "home", type: "checkbox", defaultValue: false },
    { name: "intro", type: "textarea" },
    { name: "commuteNote", type: "textarea" },
    { name: "localStory", type: "textarea" },
    {
      name: "localFaq",
      type: "group",
      fields: faqFields,
    },
    { name: "extraFaqs", type: "array", fields: faqFields },
    { name: "metaTitle", type: "text" },
    { name: "metaDescription", type: "textarea" },
    ...identityFields,
  ],
  hooks: {
    beforeValidate: [generatePrefixedPath("/areas-we-serve")],
  },
  versions: draftVersions,
};
