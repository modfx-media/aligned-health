"use client";

import {
 motion,
 useReducedMotion,
} from "motion/react";
import { Marquee } from "@/app/_components/motion/Marquee";
import Link from "next/link";
import { CLINIC, MAPS_URL } from "@/lib/site";
import { LeadConnectorForm } from "@/app/_components/LeadConnectorForm";

/**
 * "Visit us", location + contact form + areas-served marquee.
 *
 * Simplified layout after design review:
 * Row 1 Header (eyebrow + heading + right-aligned "Get Directions" pill)
 * Row 2 Map (7/12) with floating address overlay · Contact form (5/12)
 * Row 3 Slim "Serving" marquee of nearby cities
 *
 * The old 4-card info strip below has been retired, address is now baked
 * into the map card, phone/email live in the form's footer, and service
 * areas run as a single-row marquee at the bottom.
 */

const FULL_ADDRESS = `${CLINIC.address.street}, ${CLINIC.address.city}, ${CLINIC.address.region} ${CLINIC.address.postalCode}`;

const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
 FULL_ADDRESS
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

const MAP_LINK = MAPS_URL;

const SERVICE_AREAS = [
 { name: "Laguna Hills", slug: "laguna-hills" },
 { name: "Laguna Niguel", slug: "laguna-niguel" },
 { name: "Mission Viejo", slug: "mission-viejo" },
 { name: "Aliso Viejo", slug: "aliso-viejo" },
 { name: "Lake Forest", slug: "lake-forest" },
 { name: "Irvine", slug: "irvine" },
 { name: "Newport Beach", slug: "newport-beach" },
 { name: "Costa Mesa", slug: "costa-mesa" },
 { name: "Dana Point", slug: "dana-point" },
 { name: "San Clemente", slug: "san-clemente" },
] as const;

export function MapSection() {
 const reduce = useReducedMotion();

 return (
 <section
 id="visit"
 className="section-cream section relative overflow-hidden"
 >
 <BackgroundFlourish />

 <div className="container-shell relative z-10">
 {/* Header row */}
 <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
 <div className="max-w-2xl">
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="eyebrow"
 >
 Come visit us
 </motion.p>
 <motion.h2
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="heading-section mt-4"
 >
 In the heart of{" "}
 <span className="italic text-mocha">Laguna Hills.</span>
 </motion.h2>
 </div>

 <motion.a
 href={MAP_LINK}
 target="_blank"
 rel="noopener noreferrer"
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.6,
 delay: 0.25,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="btn-outline btn-sm inline-flex"
 >
 Get Directions
 <span aria-hidden="true" className="ml-1">
 ↗
 </span>
 </motion.a>
 </div>

 {/* Row 2: Map + Form (matched heights) */}
 <div className="mt-12 grid gap-6 md:mt-14 lg:grid-cols-12 lg:gap-8">
 {/* Map, 7 cols */}
 <motion.div
 initial={reduce ? false : { opacity: 0, x: -24 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
 className="relative overflow-hidden rounded-3xl shadow-card ring-1 ring-tan/30 lg:col-span-7"
 >
 <div className="relative aspect-[4/3] w-full bg-linen md:aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[560px]">
 <iframe
 src={MAP_EMBED_URL}
 title={`Map showing ${CLINIC.name} at ${FULL_ADDRESS}`}
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 allowFullScreen
 className="absolute inset-0 h-full w-full border-0"
 />
 </div>

 {/* Top-left: city pill with pulsing dot */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.6,
 delay: 0.4,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-linen/95 px-4 py-2 shadow-card backdrop-blur-sm md:left-6 md:top-6"
 >
 <span
 aria-hidden="true"
 className="relative inline-flex h-2 w-2"
 >
 <motion.span
 animate={
 reduce
 ? undefined
 : { scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }
 }
 transition={{
 duration: 2.2,
 repeat: Infinity,
 ease: "easeOut",
 }}
 className="absolute inset-0 rounded-full bg-tan"
 />
 <span className="relative h-2 w-2 rounded-full bg-tan" />
 </span>
 <span className="text-[0.7rem] uppercase tracking-[0.22em] text-espresso">
 {CLINIC.address.city}, {CLINIC.address.region}
 </span>
 </motion.div>

 {/* Bottom-left: floating address card overlay */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.6,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="absolute inset-x-4 bottom-4 rounded-2xl bg-linen/95 p-5 shadow-card backdrop-blur-sm md:inset-x-auto md:bottom-6 md:left-6 md:max-w-[300px]"
 >
 <div className="flex items-start gap-3">
 <span
 aria-hidden="true"
 className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-tan/15 text-tan"
 >
 <PinIcon />
 </span>
 <div className="min-w-0 flex-1">
 <p className="eyebrow !text-mocha">The office</p>
 <p className="mt-2 text-sm leading-snug text-espresso">
 {CLINIC.address.street}
 <br />
 {CLINIC.address.city}, {CLINIC.address.region}{" "}
 {CLINIC.address.postalCode}
 </p>
 <a
 href={MAP_LINK}
 target="_blank"
 rel="noopener noreferrer"
 className="mt-3 inline-flex items-center gap-1 text-[0.65rem] uppercase tracking-[0.2em] text-mocha underline decoration-tan underline-offset-4 hover:text-espresso"
 >
 Get directions <span aria-hidden="true">↗</span>
 </a>
 </div>
 </div>
 </motion.div>
 </motion.div>

 {/* Contact form, 5 cols */}
 <motion.div
 initial={reduce ? false : { opacity: 0, x: 24 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.85,
 delay: 0.15,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="lg:col-span-5"
 >
 <ContactForm />
 </motion.div>
 </div>

 {/* Row 3: Areas we serve, slim marquee (no info cards) */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.2,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-12 overflow-hidden rounded-3xl border border-tan/30 bg-linen py-4 md:mt-14"
 >
 <div className="flex items-center gap-4 px-6">
 <p className="whitespace-nowrap text-[0.65rem] uppercase tracking-[0.24em] text-mocha">
 Serving
 </p>
 <span aria-hidden="true" className="h-px w-8 bg-tan/50" />
 <div className="min-w-0 flex-1">
 <Marquee duration={40}>
 <ul className="flex shrink-0 items-center gap-8 pr-8">
 {SERVICE_AREAS.map((area) => (
 <li
 key={area.slug}
 className="flex items-center gap-3 whitespace-nowrap text-sm text-espresso"
 >
 <Link
 href={`/areas-we-serve/${area.slug}`}
 className="link-underline"
 >
 {area.name}
 </Link>
 <span
 aria-hidden="true"
 className="block h-1 w-1 rounded-full bg-tan"
 />
 </li>
 ))}
 </ul>
 </Marquee>
 </div>
 </div>
 </motion.div>
 </div>
 </section>
 );
}

/* ---------------------------------------------------------------------- */
/* Contact form */
/* ---------------------------------------------------------------------- */

function ContactForm() {
 return (
 <div className="flex h-full flex-col rounded-3xl border border-tan/30 bg-linen p-6 shadow-card md:p-8">
 <div className="flex-1">
 <LeadConnectorForm />
 </div>
 </div>
 );
}

/* ---------------------------------------------------------------------- */
/* Icons */
/* ---------------------------------------------------------------------- */

function PinIcon() {
 return (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
 <path d="M12 22s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z" />
 <circle cx="12" cy="10" r="2.5" />
 </svg>
 );
}

/* ---------------------------------------------------------------------- */
/* Background flourish */
/* ---------------------------------------------------------------------- */
function BackgroundFlourish() {
 const reduce = useReducedMotion();
 const draw = (delay: number) => ({
 initial: reduce
 ? { pathLength: 1, opacity: 0.22 }
 : { pathLength: 0, opacity: 0 },
 whileInView: { pathLength: 1, opacity: 0.22 },
 viewport: { once: true, margin: "0px 0px -100px 0px" },
 transition: {
 pathLength: { duration: 2.6, delay, ease: "easeOut" as const },
 opacity: { duration: 0.5, delay },
 },
 });
 return (
 <svg
 aria-hidden="true"
 viewBox="0 0 1400 900"
 preserveAspectRatio="none"
 className="pointer-events-none absolute inset-0 h-full w-full text-tan"
 fill="none"
 stroke="currentColor"
 strokeWidth="1"
 >
 <motion.path
 d="M -40 700 C 260 600, 460 480, 720 400 S 1180 240, 1440 120"
 {...draw(0.2)}
 />
 <motion.path
 d="M -40 780 C 260 680, 460 560, 720 480 S 1180 320, 1440 200"
 strokeWidth="0.6"
 {...draw(0.5)}
 />
 </svg>
 );
}
