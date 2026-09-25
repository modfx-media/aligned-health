import type { CollectionConfig } from "payload";
import { authenticated } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
  upload: true,
};
