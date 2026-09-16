/**
 * Site-wide constants for Aligned Health.
 *
 * Kept in one place so metadata, sitemap, robots, and JSON-LD stay in sync.
 * Override `NEXT_PUBLIC_SITE_URL` in the environment for previews/staging.
 */

export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://alignedhealthoc.com"
).replace(/\/$/, "");

export const CLINIC = {
  name: "Aligned Health",
  legalName: "Aligned Health",
  description:
    "Chiropractic office in Laguna Hills, CA offering chiropractic care and wellness services.",
  phone: "+1-949-557-7208",
  phoneDisplay: "(949) 557-7208",
  email: "Contact@AlignedHealthOC.com",
  address: {
    street: "26071 Merit Circle Suite 114",
    city: "Laguna Hills",
    region: "CA",
    postalCode: "92653",
    country: "US",
  },
} as const;

/**
 * Jane App scheduler for returning patients, who book directly without the
 * lead-capture form new patients go through. Used by the home hero, the
 * footer, and the /appointments page.
 */
export const EXISTING_PATIENT_SCHEDULER_URL =
  "https://alignedhealthoc.janeapp.com/#/existing-patients";

/**
 * Canonical route slugs. The order here also drives the sitemap ordering.
 * The homepage lives at `/` (site root); no separate `/home` alias.
 */
export const ROUTES = [
  "/",
  "/about",
  "/our-team",
  "/services",
  "/areas-we-serve",
  "/blog",
  "/appointments",
  "/contact-us",
  "/privacy-policy",
] as const;

export type Route = (typeof ROUTES)[number];

export function absoluteUrl(path: string): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${suffix}`;
}
