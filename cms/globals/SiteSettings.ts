import type { GlobalConfig } from "payload";
import { authenticated } from "../access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    { name: "name", type: "text" },
    { name: "legalName", type: "text" },
    { name: "description", type: "textarea" },
    { name: "phone", type: "text" },
    { name: "phoneDisplay", type: "text" },
    { name: "email", type: "email" },
    { name: "street", type: "text" },
    { name: "city", type: "text" },
    { name: "region", type: "text" },
    { name: "postalCode", type: "text" },
    { name: "country", type: "text" },
  ],
};
