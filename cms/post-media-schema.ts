import { sql } from "@payloadcms/db-vercel-postgres";
import type { Payload } from "payload";

/**
 * Additive columns for featured images and inline rich text.
 * Production disables drizzle push, so these are applied on boot.
 * Existing rows stay null and no document status is changed.
 */
const STATEMENTS = [
  `ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "featured_image_id" integer`,
  `ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "content" jsonb`,
  `ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_featured_image_id" integer`,
  `ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_content" jsonb`,
] as const;

export async function ensurePostMediaColumns(payload: Payload): Promise<void> {
  const db = payload.db?.drizzle;
  if (!db || typeof db.execute !== "function") return;

  for (const statement of STATEMENTS) {
    try {
      await db.execute(sql.raw(statement));
    } catch (error) {
      payload.logger.error({
        err: error,
        msg: `Unable to ensure posts media column: ${statement}`,
      });
    }
  }
}
