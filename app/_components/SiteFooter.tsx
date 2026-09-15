import Image from "next/image";
import Link from "next/link";
import { CLINIC, EXISTING_PATIENT_SCHEDULER_URL } from "@/lib/site";
import { EmailLink } from "@/app/_components/EmailLink";
import { BookNowLink } from "@/app/_components/BookNowLink";

/**
 * Modern multi-column footer.
 *
 * Layout at `md+`: 4 columns, Brand · Explore · Visit · Book.
 * Stacks vertically on mobile. Bottom bar carries copyright and legal links.
 *
 * Kept as a Server Component (no client JS): hover states are handled by
 * plain CSS transitions, the year is computed at build time, and the maps
 * deep-link is a plain anchor.
 */

const YEAR = new Date().getFullYear();
const PHONE_TEL = CLINIC.phone.replace(/[^\d+]/g, "");
const FULL_ADDRESS = `${CLINIC.address.street}, ${CLINIC.address.city}, ${CLINIC.address.region} ${CLINIC.address.postalCode}`;
const MAP_LINK =
 "https://www.google.com/maps/place/Aligned+Health/@33.5748115,-117.6755535,871m/data=!3m2!1e3!5s0x80dceec47cf99773:0x8e0bd7756e6af25c!4m15!1m8!3m7!1s0x80dceec47ef93b1b:0xbdc6a1d087b932bd!2s26071+Merit+Cir+%23114,+Laguna+Hills,+CA+92653,+USA!3b1!8m2!3d33.5748115!4d-117.6755535!16s%2Fg%2F11n09cth33!3m5!1s0x80dcebe3bbff6193:0xa55599af90af8db0!8m2!3d33.5748115!4d-117.6755535!16s%2Fg%2F11fwj32nr9!5m1!1e1?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D";

const EXPLORE_LINKS = [
 { label: "About", href: "/about" },
 { label: "Our Team", href: "/our-team" },
 { label: "Services", href: "/services" },
 { label: "Areas We Serve", href: "/areas-we-serve" },
 { label: "Blog", href: "/blog" },
 { label: "Appointments", href: "/appointments" },
 { label: "Contact Us", href: "/contact-us" },
] as const;

export function SiteFooter() {
 return (
 <footer className="relative overflow-hidden bg-espresso text-linen">
 {/* Warm radial glow behind the top-right for depth */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0"
 style={{
 background:
 "radial-gradient(55% 60% at 85% 0%, rgba(185,165,144,0.14) 0%, rgba(54,48,42,0) 60%), radial-gradient(45% 55% at 10% 100%, rgba(87,76,63,0.35) 0%, rgba(54,48,42,0) 55%)",
 }}
 />

 {/* Top hairline */}
 <span
 aria-hidden="true"
 className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tan/40 to-transparent"
 />

 <div className="container-shell relative z-10 pt-16 pb-8 md:pt-20 md:pb-10">
 {/* Top: 12-col grid, 4 content sections */}
 <div className="grid gap-12 md:grid-cols-12 md:gap-10">
 {/* --- Brand --- */}
 <div className="md:col-span-5 lg:col-span-4">
 <FooterWordmark />
 <p className="mt-6 max-w-sm text-sm leading-relaxed text-linen/70">
 A highly qualified team helping the Southern California community
                relieve pain, recover from surgery, and rebuild strength.
                Schedule now.
 </p>

 {/* Big phone as a signature call to action */}
 <a
 href={`tel:${PHONE_TEL}`}
 className="mt-8 inline-flex flex-col gap-1 text-linen transition-colors hover:text-tan"
 >
 <span className="eyebrow">Call the office</span>
 <span className="font-serif text-3xl tracking-tight md:text-4xl">
 {CLINIC.phoneDisplay}
 </span>
 </a>
 </div>

 {/* --- Explore nav --- */}
 <nav
 aria-label="Footer navigation"
 className="md:col-span-3 lg:col-span-2"
 >
 <p className="eyebrow">Explore</p>
 <ul className="mt-5 flex flex-col gap-3">
 {EXPLORE_LINKS.map((item) => (
 <li key={item.href}>
 <Link
 href={item.href}
 className="text-sm text-linen/85 transition-colors hover:text-tan"
 >
 {item.label}
 </Link>
 </li>
 ))}
 </ul>
 </nav>

 {/* --- Visit --- */}
 <div className="md:col-span-4 lg:col-span-3">
 <p className="eyebrow">Visit</p>
 <address className="mt-5 flex flex-col gap-2 text-sm not-italic leading-relaxed text-linen/85">
 <span>{CLINIC.address.street}</span>
 <span>
 {CLINIC.address.city}, {CLINIC.address.region}{" "}
 {CLINIC.address.postalCode}
 </span>
 <a
 href={MAP_LINK}
 target="_blank"
 rel="noopener noreferrer"
 className="mt-2 inline-flex w-fit items-center gap-1 text-[0.7rem] uppercase tracking-[0.2em] text-tan underline decoration-tan/60 underline-offset-4 hover:decoration-tan"
 >
 Get directions <span aria-hidden="true">↗</span>
 </a>
 <EmailLink
 email={CLINIC.email}
 className="mt-4 w-fit break-words text-sm text-linen/85 underline decoration-tan/60 underline-offset-4 transition-colors hover:text-linen hover:decoration-tan"
 copiedClassName="text-linen/70"
 />
 </address>
 </div>

 {/* --- Book / Hours --- */}
 <div className="md:col-span-12 lg:col-span-3">
 <p className="eyebrow text-center">Book a visit</p>
 <div className="mt-5 flex flex-col items-center rounded-3xl border border-linen/15 bg-linen/[0.05] p-6 text-center backdrop-blur-sm">
 <div className="flex items-center justify-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-tan">
 <span aria-hidden="true" className="relative inline-flex h-2 w-2">
 <span className="absolute inset-0 rounded-full bg-tan opacity-70 blur-[2px]" />
 <span className="relative h-2 w-2 rounded-full bg-tan" />
 </span>
 Schedule now
 </div>
 <p className="mt-3 text-sm leading-relaxed text-linen/85">
 By appointment.
 </p>
 <BookNowLink className="btn-cta-onDark btn-sm mt-5 inline-flex w-full items-center justify-center gap-2 whitespace-normal text-center leading-snug">
 Book your New Patient Appointment
 <span aria-hidden="true">→</span>
 </BookNowLink>
 <a
 href={EXISTING_PATIENT_SCHEDULER_URL}
 target="_blank"
 rel="noopener noreferrer"
 className="btn-outline-invert btn-sm mt-3 inline-flex w-full items-center justify-center gap-2 whitespace-normal text-center leading-snug"
 >
 Existing patient? Schedule here <span aria-hidden="true">→</span>
 </a>
 </div>
 </div>
 </div>

 {/* Divider */}
 <span className="divider-hairline mt-14 block" />

 {/* Bottom bar */}
 <div className="mt-6 flex flex-col-reverse items-start gap-4 text-xs text-linen/50 md:mt-8 md:flex-row md:items-center md:justify-between">
 <p>
 © {YEAR} {CLINIC.name}. All rights reserved. · Laguna Hills, CA
 </p>
 <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
 <li>
 <Link
 href="/privacy-policy"
 className="text-linen/60 transition-colors hover:text-linen"
 >
 Privacy Policy
 </Link>
 </li>
 <li>
 <Link
 href="/sitemap"
 className="text-linen/60 transition-colors hover:text-linen"
 >
 Sitemap
 </Link>
 </li>
 <li className="hidden text-linen/30 sm:inline">·</li>
 <li className="text-linen/40">
 Crafted with care in <span className="italic text-tan">Southern California.</span>
 </li>
 <li className="hidden text-linen/30 sm:inline">·</li>
 <li className="text-linen/40">
 Powered by{" "}
 <a
 href="https://modfxmedia.com"
 target="_blank"
 rel="noopener noreferrer"
 className="italic text-tan underline decoration-tan/60 underline-offset-4 transition-colors hover:text-linen hover:decoration-tan"
 >
 ModFX Media
 </a>
 </li>
 </ul>
 </div>
 </div>
 </footer>
 );
}

/* ---------------------------------------------------------------------- */

function FooterWordmark() {
 return (
 <Link
      href="/"
 aria-label={`${CLINIC.name}, home`}
 className="group inline-flex w-fit items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
 >
 <Image
 src="/logos/aligned-health-light.png"
 alt={CLINIC.name}
 width={1129}
 height={355}
 className="h-11 w-auto md:h-12"
 />
 </Link>
 );
}

export default SiteFooter;
