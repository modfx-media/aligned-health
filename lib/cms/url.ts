const PRODUCTION_ORIGIN = "https://alignedhealthoc.com";
const PRODUCTION_WWW = "https://www.alignedhealthoc.com";

function stripSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function isLocalhost(url: string): boolean {
  return /localhost|127\.0\.0\.1/i.test(url);
}

/**
 * Public origin for preview URLs, CORS, and CSRF.
 * On Vercel a localhost NEXT_PUBLIC_SERVER_URL is ignored.
 */
export function getPublicServerURL(): string {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

  if (process.env.VERCEL) {
    if (server && !isLocalhost(server)) return stripSlash(server);
    if (site && !isLocalhost(site)) return stripSlash(site);
    return vercel || PRODUCTION_ORIGIN;
  }

  return stripSlash(server || site || "http://localhost:3000");
}

export function getCorsOrigins(): string[] {
  const vercel = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  return [
    ...new Set(
      [
        getPublicServerURL(),
        PRODUCTION_ORIGIN,
        PRODUCTION_WWW,
        vercel,
        process.env.NEXT_PUBLIC_SITE_URL,
        process.env.NEXT_PUBLIC_SERVER_URL,
      ]
        .filter((value): value is string => Boolean(value))
        .map(stripSlash)
        .filter((value) => !process.env.VERCEL || !isLocalhost(value)),
    ),
  ];
}

export function isValidPublicPath(path: unknown): path is string {
  if (typeof path !== "string" || !path.startsWith("/")) return false;
  if (path !== "/" && path.endsWith("/")) return false;
  if (path.includes("//")) return false;
  const segments = path === "/" ? [] : path.slice(1).split("/");
  return segments.every((segment) => segment && segment !== "null" && segment !== "undefined");
}
