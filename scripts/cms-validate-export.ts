import { readFile } from "node:fs/promises";
import path from "node:path";
import { sitemapManifestPaths } from "../lib/cms/manifest";

type ExportFile = {
  version: number;
  records?: Array<{ path?: string; sourceUrl?: string }>;
};

async function main() {
  const file = path.join(process.cwd(), "data", "content-export.json");
  const raw = await readFile(file, "utf8");
  const data = JSON.parse(raw) as ExportFile;
  if (data.version !== 1) {
    throw new Error(`Unexpected export version ${data.version}`);
  }

  const exported = new Set(
    (data.records ?? [])
      .map((record) => record.path || record.sourceUrl)
      .filter((value): value is string => Boolean(value)),
  );
  const manifest = sitemapManifestPaths();
  const missing = manifest.filter((item) => !exported.has(item));
  const extra = [...exported].filter((item) => !manifest.includes(item));

  if (missing.length || extra.length) {
    console.error(
      JSON.stringify(
        {
          ok: false,
          exported: exported.size,
          manifest: manifest.length,
          missing,
          extra,
        },
        null,
        2,
      ),
    );
    process.exit(1);
  }

  console.log(
    `Export covers every sitemap path (${manifest.length} URLs, ${exported.size} records).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
