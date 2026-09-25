"use client";

import { motion, useReducedMotion } from "motion/react";
import { CLINIC } from "@/lib/site";

/**
 * /contact-us, big map card section. Mirrors the home MapSection map card
 * (floating city pill + address overlay) but takes the full column width
 * and drops the paired contact form (the contact page already has one).
 */

const FULL_ADDRESS = `${CLINIC.address.street}, ${CLINIC.address.city}, ${CLINIC.address.region} ${CLINIC.address.postalCode}`;

const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
 FULL_ADDRESS
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

const MAP_LINK =
 "https://www.google.com/maps/place/Aligned+Health/@33.5748115,-117.6755535,871m/data=!3m2!1e3!5s0x80dceec47cf99773:0x8e0bd7756e6af25c!4m15!1m8!3m7!1s0x80dceec47ef93b1b:0xbdc6a1d087b932bd!2s26071+Merit+Cir+%23114,+Laguna+Hills,+CA+92653,+USA!3b1!8m2!3d33.5748115!4d-117.6755535!16s%2Fg%2F11n09cth33!3m5!1s0x80dcebe3bbff6193:0xa55599af90af8db0!8m2!3d33.5748115!4d-117.6755535!16s%2Fg%2F11fwj32nr9!5m1!1e1?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D";

export function ContactMap() {
 const reduce = useReducedMotion();

 return (
 <section
 id="find-us"
 className="section-linen section relative overflow-hidden"
 >
 <div className="container-shell relative z-10">
 {/* Header row */}
 <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
 <div className="max-w-2xl">
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="flex items-center gap-3"
 >
 <span aria-hidden="true" className="block h-px w-10 bg-tan" />
 <p className="eyebrow !text-mocha">Find us</p>
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

 {/* Map card */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
 className="relative mt-12 overflow-hidden rounded-3xl shadow-card ring-1 ring-tan/30 md:mt-14"
 >
 <div className="relative aspect-[4/3] w-full bg-cream md:aspect-[16/9] lg:aspect-[21/9]">
 <iframe
 src={MAP_EMBED_URL}
 title={`Map showing ${CLINIC.name} at ${FULL_ADDRESS}`}
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 allowFullScreen
 className="absolute inset-0 h-full w-full border-0"
 />
 </div>

 {/* Top-left: city pill */}
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
 <span aria-hidden="true" className="relative inline-flex h-2 w-2">
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

 {/* Bottom-left: floating address card */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.6,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="absolute inset-x-4 bottom-4 rounded-2xl bg-linen/95 p-5 shadow-card backdrop-blur-sm md:inset-x-auto md:bottom-6 md:left-6 md:max-w-[320px]"
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
 </div>
 </section>
 );
}

function PinIcon() {
 return (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
 <path d="M12 22s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z" />
 <circle cx="12" cy="10" r="2.5" />
 </svg>
 );
}
