import { getPublicServerURL, isValidPublicPath } from "./url";

export function previewFromPath(path: unknown): string | null {
  if (!isValidPublicPath(path)) return null;
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;
  const serverURL = getPublicServerURL();
  return `${serverURL}/next/preview?path=${encodeURIComponent(path)}&previewSecret=${encodeURIComponent(secret)}`;
}

export const livePreviewBreakpoints = [
  { label: "Mobile", name: "mobile", width: 375, height: 667 },
  { label: "Tablet", name: "tablet", width: 768, height: 1024 },
  { label: "Desktop", name: "desktop", width: 1440, height: 900 },
];
