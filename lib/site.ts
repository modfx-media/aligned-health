/**
 * Site-wide constants for Aligned Health.
 *
 * Kept in one place so metadata, sitemap, robots, JSON-LD, and footer stay in sync.
 * Override `NEXT_PUBLIC_SITE_URL` in the environment for previews/staging.
 */

export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://alignedhealthoc.com"
).replace(/\/$/, "");

export const CLINIC = {
  name: "Aligned Health",
  legalName: "Aligned Health",
  description:
    "Chiropractic clinic in Laguna Hills, CA. Dr. Dustin Hack and Dr. Tara Hadden treat back pain, sports injuries, and post-surgery stiffness with one-on-one visits. Most PPO plans accepted.",
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

/** Listed office hours. Visits are still by appointment. */
export const HOURS = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "07:00", closes: "19:30", label: "Mon–Thu 7:00 AM–7:30 PM" },
  { days: ["Friday"], opens: "06:00", closes: "15:30", label: "Fri 6:00 AM–3:30 PM" },
  { days: ["Saturday"], opens: "09:00", closes: "16:00", label: "Sat 9:00 AM–4:00 PM" },
] as const;

export const HOURS_NOTE = "By appointment. Sunday closed.";

export const JANEAPP_URL = "https://alignedhealthoc.janeapp.com/";
export const JANEAPP_EXISTING_URL =
  "https://alignedhealthoc.janeapp.com/#/existing-patients";
export const JANEAPP_GIFT_CARD_URL =
  "https://alignedhealthoc.janeapp.com/online_gift_cards/new";

export const MAPS_URL =
  "https://www.google.com/maps/place/Aligned+Health/@33.5748115,-117.6755535,17z/data=!3m1!4b1!4m6!3m5!1s0x80dcebe3bbff6193:0xa55599af90af8db0!8m2!3d33.5748115!4d-117.6755535!16s%2Fg%2F11fwj32nr9";

/**
 * Jane App scheduler for returning patients, who book directly without the
 * lead-capture form new patients go through. Used by the home hero, the
 * footer, and the /appointments page.
 */
export const EXISTING_PATIENT_SCHEDULER_URL = JANEAPP_EXISTING_URL;

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
