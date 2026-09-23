import type { GlobalConfig } from "payload";
import { authenticated } from "../access";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "tagline",
      type: "text",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "nav",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
      ],
    },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
    { name: "existingCtaLabel", type: "text" },
    { name: "existingCtaHref", type: "text" },
  ],
};
