import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Payload } from "payload";

type Ref = { $ref: { collection: string; legacyId: string } };
type ExportRecord = {
  collection: string;
  legacyId: string;
  sourceUrl: string;
  path: string;
  data: Record<string, unknown>;
};
type ExportFile = {
  version: number;
  records: ExportRecord[];
  globals: Array<{ slug: string; data: Record<string, unknown> }>;
};

const COLLECTION_ORDER = [
  "services",
  "locations",
  "service-areas",
  "posts",
  "pages",
] as const;

function isRef(value: unknown): value is Ref {
  return Boolean(
    value &&
      typeof value === "object" &&
      "$ref" in value &&
      typeof (value as Ref).$ref?.collection === "string" &&
      typeof (value as Ref).$ref?.legacyId === "string",
  );
}

function walkRefs(
  value: unknown,
  resolve: (ref: Ref) => unknown,
): unknown {
  if (isRef(value)) {
    return resolve(value);
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => walkRefs(item, resolve))
      .filter((item) => item !== undefined);
  }
  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      next[key] = walkRefs(item, resolve);
    }
    return next;
  }
  return value;
}

async function findExisting(
  payload: Payload,
  collection: "pages" | "posts" | "services" | "locations" | "service-areas",
  record: ExportRecord,
) {
  const byLegacy = await payload.find({
    collection,
    where: { legacyId: { equals: record.legacyId } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
    draft: true,
  });
  if (byLegacy.docs[0]) return byLegacy.docs[0];

  const bySource = await payload.find({
    collection,
    where: { sourceUrl: { equals: record.sourceUrl } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
    draft: true,
  });
  return bySource.docs[0] ?? null;
}

async function main() {
  const apply = process.argv.includes("--apply") || process.env.CMS_IMPORT_APPLY === "1";
  const fileArg = process.argv.find((arg) => arg.endsWith(".json"));
  const file = path.resolve(
    process.cwd(),
    fileArg && !fileArg.startsWith("--")
      ? fileArg
      : "data/content-export.json",
  );

  const data = JSON.parse(await readFile(file, "utf8")) as ExportFile;
  if (data.version !== 1) {
    throw new Error(`Unexpected export version ${data.version}`);
  }

  if (!apply) {
    console.log(
      `Dry run: ${data.records.length} records, ${data.globals.length} globals. Re-run with --apply (and CMS_IMPORT_APPLY=1) to write drafts.`,
    );
    return;
  }

  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URL) {
    throw new Error("PAYLOAD_SECRET and DATABASE_URL are required for import.");
  }

  const [{ getPayload }, { default: config }] = await Promise.all([
    import("payload"),
    import("../payload.config"),
  ]);
  const payload = await getPayload({ config });
  const idByLegacy = new Map<string, string | number>();
  const skippedRefs: string[] = [];
  let created = 0;
  let updated = 0;

  const resolve = (ref: Ref) => {
    const id = idByLegacy.get(`${ref.$ref.collection}:${ref.$ref.legacyId}`);
    if (!id) {
      skippedRefs.push(`${ref.$ref.collection}:${ref.$ref.legacyId}`);
      return undefined;
    }
    return id;
  };

  for (const collection of COLLECTION_ORDER) {
    const batch = data.records.filter((record) => record.collection === collection);
    for (const record of batch) {
      const resolved = walkRefs(record.data, resolve) as Record<string, unknown>;
      const dataToSave = {
        ...resolved,
        _status: "draft",
      };

      const existing = (await findExisting(
        payload,
        collection,
        record,
      )) as { id: string | number } | null;

      if (existing) {
        await payload.update({
          collection: collection as never,
          id: existing.id,
          data: dataToSave as never,
          draft: true,
          overrideAccess: true,
        });
        idByLegacy.set(`${collection}:${record.legacyId}`, existing.id);
        updated += 1;
      } else {
        const createdDoc = (await payload.create({
          collection: collection as never,
          data: dataToSave as never,
          draft: true,
          overrideAccess: true,
        })) as { id: string | number };
        idByLegacy.set(`${collection}:${record.legacyId}`, createdDoc.id);
        created += 1;
      }
    }
  }

  for (const global of data.globals) {
    await payload.updateGlobal({
      slug: global.slug as never,
      data: global.data as never,
      overrideAccess: true,
    });
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        created,
        updated,
        skippedRefs: [...new Set(skippedRefs)],
        status: "draft",
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
