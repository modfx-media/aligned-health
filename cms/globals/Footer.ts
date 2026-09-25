import type { GlobalConfig } from "payload";
import { authenticated } from "../access";

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "blurb",
      type: "textarea",
    },
    {
      name: "explore",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
      ],
    },
  ],
};
