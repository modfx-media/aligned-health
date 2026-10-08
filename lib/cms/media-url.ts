/**
 * Public URL for a Payload media value.
 * Blob uploads store an absolute https URL. Local `/media` paths 404 on Vercel.
 */
export function publicMediaUrl(value: unknown): string | null {
  if (typeof value === "string") {
    const url = value.trim();
    if (!url) return null;
    if (url.startsWith("https://") || url.startsWith("http://")) return url;
    if (
      url.startsWith("/media/") ||
      url === "/media" ||
      url.startsWith("/api/media")
    ) {
      return null;
    }
    if (url.startsWith("/")) return url;
    return null;
  }

  if (value && typeof value === "object" && "url" in value) {
    return publicMediaUrl((value as { url?: unknown }).url);
  }

  return null;
}

export function mediaAlt(value: unknown, fallback = ""): string {
  if (!value || typeof value !== "object") return fallback;
  const alt = (value as { alt?: unknown }).alt;
  return typeof alt === "string" && alt.trim() ? alt.trim() : fallback;
}
