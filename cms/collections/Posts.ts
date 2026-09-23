import type { CollectionConfig } from "payload";
import { authenticated, authenticatedOrPublished } from "../access";
import {
  draftVersions,
  identityFields,
  previewAdmin,
  stringListField,
} from "../fields";
import { generatePrefixedPath } from "../hooks";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  ...previewAdmin("title"),
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    stringListField("keywords", "Keywords"),
    { name: "category", type: "text" },
    { name: "datePublished", type: "date" },
    { name: "dateModified", type: "date" },
    { name: "readingTime", type: "number" },
    { name: "authorName", type: "text" },
    { name: "authorRole", type: "text" },
    { name: "heroSrc", type: "text" },
    { name: "heroAlt", type: "text" },
    {
      name: "body",
      type: "array",
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          options: [
            { label: "Paragraph", value: "p" },
            { label: "Lead", value: "lead" },
            { label: "Heading 2", value: "h2" },
            { label: "Heading 3", value: "h3" },
            { label: "Bullets", value: "ul" },
            { label: "Numbered", value: "ol" },
            { label: "Quote", value: "quote" },
            { label: "Callout", value: "callout" },
          ],
        },
        { name: "text", type: "textarea" },
        stringListField("items", "List items"),
        { name: "title", type: "text" },
        { name: "attribution", type: "text" },
      ],
    },
    {
      name: "related",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
    },
    stringListField("relatedServiceSlugs", "Related service slugs"),
    ...identityFields,
  ],
  hooks: {
    beforeValidate: [generatePrefixedPath("/blog")],
  },
  versions: draftVersions,
};
