import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";

import { Users } from "./cms/collections/Users";
import { Media } from "./cms/collections/Media";
import { Pages } from "./cms/collections/Pages";
import { Posts } from "./cms/collections/Posts";
import { Services } from "./cms/collections/Services";
import { Locations } from "./cms/collections/Locations";
import { ServiceAreas } from "./cms/collections/ServiceAreas";
import { Header } from "./cms/globals/Header";
import { Footer } from "./cms/globals/Footer";
import { SiteSettings } from "./cms/globals/SiteSettings";
import { livePreviewBreakpoints } from "./lib/cms/preview";
import { getCorsOrigins, getPublicServerURL } from "./lib/cms/url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isVercel = Boolean(process.env.VERCEL);
const isImport = process.env.CMS_IMPORT_APPLY === "1";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: getPublicServerURL(),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: livePreviewBreakpoints,
    },
  },
  collections: [Users, Media, Pages, Posts, Services, Locations, ServiceAreas],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    forceUseVercelPostgres: true,
    push: !isVercel && !isImport,
  }),
  cors: getCorsOrigins(),
  csrf: getCorsOrigins(),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [
    seoPlugin({
      collections: ["pages", "posts", "services", "locations", "service-areas"],
      uploadsCollection: "media",
      tabbedUI: true,
      generateTitle: ({ doc }) =>
        String(doc?.documentTitle || doc?.title || doc?.label || doc?.name || ""),
      generateDescription: ({ doc }) =>
        String(
          doc?.documentDescription ||
            doc?.description ||
            doc?.lead ||
            doc?.intro ||
            "",
        ),
      generateURL: ({ doc }) => {
        const pathValue = doc?.path;
        if (typeof pathValue !== "string" || !pathValue.startsWith("/")) {
          return "";
        }
        return `${getPublicServerURL()}${pathValue === "/" ? "" : pathValue}`;
      },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        { name: "canonicalUrl", type: "text" },
        { name: "noIndex", type: "checkbox", defaultValue: false },
        { name: "noFollow", type: "checkbox", defaultValue: false },
        { name: "excludeFromSitemap", type: "checkbox", defaultValue: false },
      ],
    }),
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
