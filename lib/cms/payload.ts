import { getPayload } from "payload";
import config from "@payload-config";

export function cmsConfigured(): boolean {
  return Boolean(process.env.PAYLOAD_SECRET && process.env.DATABASE_URL);
}

export async function getCMS() {
  if (!cmsConfigured()) {
    throw new Error("CMS is not configured (PAYLOAD_SECRET or DATABASE_URL missing)");
  }
  return getPayload({ config });
}
