/** Shared stand-in used when a post has no resolvable image of its own. */
export const SHARED_DEFAULT_COVER = "/images/blog/default-cover.jpg";

export function isSharedDefaultCover(src: string | null | undefined): boolean {
  if (!src) return true;
  const path = src.split("?")[0]?.replace(/\/+$/, "") ?? "";
  return (
    path === SHARED_DEFAULT_COVER ||
    path.endsWith("/images/blog/default-cover.jpg")
  );
}

function isLocalMediaPath(pathname: string): boolean {
  return (
    pathname.startsWith("/media/") ||
    pathname === "/media" ||
    pathname.startsWith("/api/media")
  );
}

/**
 * Public URL for a Payload media value.
 * Blob uploads store an absolute https URL. Local `/media` and `/api/media`
 * paths 404 on Vercel, so they are skipped in favor of a real https URL on
 * the same document (thumbnail or image size).
 */
export function publicMediaUrl(value: unknown): string | null {
  if (typeof value === "string") {
    const url = value.trim();
    if (!url) return null;
    if (url.startsWith("https://") || url.startsWith("http://")) {
      try {
        const parsed = new URL(url);
        if (isLocalMediaPath(parsed.pathname)) return null;
      } catch {
        return url;
      }
      return url;
    }
    if (isLocalMediaPath(url)) return null;
    if (url.startsWith("/")) return url;
    return null;
  }

  if (!value || typeof value !== "object") return null;
  const record = value as {
    url?: unknown;
    thumbnailURL?: unknown;
    sizes?: unknown;
  };

  const direct = publicMediaUrl(record.url);
  if (direct) return direct;

  const thumb = publicMediaUrl(record.thumbnailURL);
  if (thumb) return thumb;

  if (record.sizes && typeof record.sizes === "object") {
    for (const size of Object.values(record.sizes as Record<string, unknown>)) {
      if (!size || typeof size !== "object" || !("url" in size)) continue;
      const sized = publicMediaUrl((size as { url?: unknown }).url);
      if (sized) return sized;
    }
  }

  return null;
}

export function mediaAlt(value: unknown, fallback = ""): string {
  if (!value || typeof value !== "object") return fallback;
  const alt = (value as { alt?: unknown }).alt;
  return typeof alt === "string" && alt.trim() ? alt.trim() : fallback;
}
