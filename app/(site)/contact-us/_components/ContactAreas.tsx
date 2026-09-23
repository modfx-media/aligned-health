"use client";

import Link from "next/link";
import {
 motion,
 useReducedMotion,
 type Variants,
} from "motion/react";
import { BookNowLink } from "@/app/_components/BookNowLink";
import { NEW_PATIENT_CTA_LABEL } from "@/lib/site";

/**
 * /contact-us, "Areas we serve" section on dark espresso. Grid of nearby
 * cities with the primary location (Laguna Hills) called out with a tan
 * "Home office" chip. The rest read as a soft grid of tan-bordered pills
 * that stagger in.
 */

interface City {
 name: string;
 slug?: string;
 home?: boolean;
}

const CITIES: readonly City[] = [
 { name: "Laguna Hills", slug: "laguna-hills", home: true },
 { name: "Laguna Niguel", slug: "laguna-niguel" },
 { name: "Laguna Beach", slug: "laguna-beach" },
 { name: "Mission Viejo", slug: "mission-viejo" },
 { name: "Aliso Viejo", slug: "aliso-viejo" },
 { name: "Lake Forest", slug: "lake-forest" },
 { name: "Irvine", slug: "irvine" },
 { name: "Newport Beach", slug: "newport-beach" },
 { name: "Costa Mesa", slug: "costa-mesa" },
 { name: "Dana Point", slug: "dana-point" },
 { name: "San Clemente", slug: "san-clemente" },
 { name: "San Juan Capistrano", slug: "san-juan-capistrano" },
 { name: "Rancho Santa Margarita", slug: "rancho-santa-margarita" },
 { name: "Ladera Ranch", slug: "ladera-ranch" },
];

const GRID_CONTAINER: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.06, delayChildren: 0.1 },
 },
};

const CITY_ITEM: Variants = {
 hidden: { opacity: 0, y: 12 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
 },
};

export function ContactAreas() {
 const reduce = useReducedMotion();

 return (
 <section
 id="areas-we-serve"
 className="section-espresso section relative overflow-hidden"
 >
 {/* Soft warm glows */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0"
 style={{
 background:
 "radial-gradient(50% 45% at 12% 20%, rgba(185,165,144,0.15) 0%, rgba(54,48,42,0) 60%), radial-gradient(45% 40% at 85% 80%, rgba(185,165,144,0.12) 0%, rgba(54,48,42,0) 60%)",
 }}
 />

 <div className="container-shell relative z-10">
 {/* Header */}
 <div className="mx-auto max-w-3xl text-center">
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="flex items-center justify-center gap-3"
 >
 <span aria-hidden="true" className="block h-px w-10 bg-tan/60" />
 <p className="eyebrow">Areas we serve</p>
 <span aria-hidden="true" className="block h-px w-10 bg-tan/60" />
 </motion.div>

 <motion.h2
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="heading-section mt-4 !text-linen"
 >
 Caring for patients across{" "}
 <span className="italic text-tan">South Orange County.</span>
 </motion.h2>

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.2,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-5 text-base leading-relaxed text-linen/80 md:text-lg"
 >
 Our Laguna Hills office is a short drive from most of South OC.
 People come in from the cities below because the visit is
 one-on-one, not a 10-minute rotation. Don&rsquo;t see yours?{" "}
 <Link href="/areas-we-serve" className="link-underline text-linen">
 All 30 cities we serve
 </Link>
 .
 </motion.p>
 </div>

 {/* City grid */}
 <motion.ul
 variants={GRID_CONTAINER}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
 >
 {CITIES.map((city) => (
 <motion.li
 key={city.name}
 variants={CITY_ITEM}
 className={`group relative overflow-hidden rounded-2xl border p-4 transition-colors md:p-5 ${
 city.home
 ? "border-tan/60 bg-tan/10"
 : "border-linen/15 bg-espresso/40 hover:border-tan/40 hover:bg-espresso/60"
 }`}
 >
 <Link
 href={
 city.slug ? `/areas-we-serve/${city.slug}` : "/areas-we-serve"
 }
 className="block"
 >
 {/* Dot */}
 <span
 aria-hidden="true"
 className="mb-3 block h-1.5 w-1.5 rounded-full bg-tan"
 />
 <p
 className={`font-serif text-lg leading-snug md:text-xl ${
 city.home ? "text-linen" : "text-linen/90"
 }`}
 >
 {city.name}
 </p>
 {city.home ? (
 <p className="mt-1 text-[0.6rem] uppercase tracking-[0.24em] text-tan">
 Home office
 </p>
 ) : (
 <p className="mt-1 text-[0.6rem] uppercase tracking-[0.24em] text-linen/50">
 Now serving
 </p>
 )}

 {/* Subtle sweep on hover */}
 {!city.home ? (
 <span
 aria-hidden="true"
 className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-tan/60 transition-transform duration-500 group-hover:scale-x-100"
 />
 ) : null}
 </Link>
 </motion.li>
 ))}
 </motion.ul>

 {/* Footer note */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.3,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-3 text-center md:mt-14"
 >
 <p className="text-sm leading-relaxed text-linen/70 md:text-base">
 Don&rsquo;t see your area?{" "}
 <span className="italic text-tan">
 If you can get to us, we can care for you.
 </span>
 </p>
 <div className="flex flex-col items-center gap-3 sm:flex-row">
 <Link
 href="#find-us"
 className="btn-outline-invert btn-sm inline-flex items-center gap-2"
 >
 See our location
 <span aria-hidden="true">↑</span>
 </Link>
 <BookNowLink className="btn-cta-onDark btn-sm inline-flex items-center gap-2">
 {NEW_PATIENT_CTA_LABEL}
 <span aria-hidden="true">→</span>
 </BookNowLink>
 </div>
 </motion.div>
 </div>
 </section>
 );
}
