"use client";

import Image from "next/image";
import Link from "next/link";
import {
 motion,
 useReducedMotion,
 type Variants,
} from "motion/react";
import { RevealHeading } from "@/app/_components/motion/RevealHeading";

/**
 * Bento-style services grid, 8 of the 13 services from the live /services
 * page, using the real Squarespace CDN photography for each service.
 *
 * Layout (12-col at md+):
 * Row 1 Featured (2×2) + Wide (2×1)
 * Row 2 Featured continues + two half tiles
 * Row 3 Four equal tiles
 *
 * Motion (respects `prefers-reduced-motion`):
 * - Word-reveal H2 + eyebrow/pill fade-in header
 * - Background flourish path-draws in
 * - Cards cascade in with staggered fade+lift
 * - Featured card: pulsing tan status dot + very slow breathing image scale
 * - Hover: card lift, image micro-zoom, arrow badge fills + rotates
 */

interface Service {
 slug: string;
 index: string;
 title: string;
 description: string;
 imageSrc: string;
 span: "feature" | "wide" | "half" | "quarter";
 featured?: boolean;
}

// Real service photography pulled from the live site's Squarespace CDN.
// Swap for `/public/images/services/*` files before decommissioning Squarespace.
const SERVICES: readonly Service[] = [
 {
 slug: "chiropractic-adjustments",
 index: "01",
 title: "Chiropractic Adjustments",
 description:
 "Precise thrusts that restore spine and extremity joint mobility.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/3dd5634c-1569-4b59-9138-2caf3eb46524/IMG_8324.jpg",
 span: "feature",
 featured: true,
 },
 {
 slug: "spinal-decompression",
 index: "02",
 title: "Spinal Decompression",
 description:
 "Non-surgical traction relief for disc, sciatica, and low-back pain.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/50c96876-138b-4b5d-9508-4b3880f504fb/IMG_9092.jpg",
 span: "wide",
 },
 {
 slug: "percussion-therapy",
 index: "03",
 title: "Percussion Therapy",
 description:
 "Deep-muscle percussion to ease soreness and boost mobility.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/735abe96-9486-433e-9899-802b92cc0e45/IMG_8435.jpg",
 span: "half",
 },
 {
 slug: "pemf-therapy",
 index: "04",
 title: "PEMF Therapy",
 description:
 "Electromagnetic pulses that support cellular repair and reduce inflammation.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/7eb0895e-30d3-40da-8cbe-1eef6767350c/IMG_9121.jpeg",
 span: "half",
 },
 {
 slug: "cupping",
 index: "05",
 title: "Cupping",
 description:
 "Suction that lifts fascia to improve circulation and release tension.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/d1a65330-f45f-4350-a789-344425a454be/IMG_1237_Original.jpg",
 span: "quarter",
 },
 {
 slug: "myofascial-scraping",
 index: "06",
 title: "Myofascial Scraping",
 description:
 "Instrument-assisted release for fascial restrictions and mobility.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/75314aa8-23a6-457e-a167-b0c25e33c30c/IMG_8565.jpeg",
 span: "quarter",
 },
 {
 slug: "red-light-therapy",
 index: "07",
 title: "Red Light Therapy",
 description:
 "Targeted wavelengths that calm inflammation and speed tissue repair.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/65e22074-e814-43e0-bd6e-e7713e190427/IMG_7890+2.jpeg",
 span: "quarter",
 },
 {
 slug: "assisted-stretching",
 index: "08",
 title: "Assisted Stretching",
 description:
 "Guided passive stretching for flexibility, balance, and range of motion.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/5965888a-2f81-413a-af59-2ba709d807de/IMG_8467.jpeg",
 span: "quarter",
 },
];

const SPAN_CLASSES: Record<Service["span"], string> = {
 feature: "md:col-span-2 md:row-span-2 min-h-[380px] md:min-h-0",
 wide: "md:col-span-2 min-h-[220px]",
 half: "md:col-span-1 min-h-[220px]",
 quarter: "md:col-span-1 min-h-[220px]",
};

// Portrait source photo gets cropped hard by these landscape tiles; centered
// object-position lands on the shelf/wall, above the patient. Shift down +
// zoom (via the wrapping div, so it doesn't collide with the Image's own
// group-hover scale) so the patient stays in frame.
const IMAGE_OBJECT_POSITION_CLASS: Partial<Record<string, string>> = {
 "assisted-stretching": "object-[50%_78%]",
};
const IMAGE_ZOOM_STYLE: Partial<Record<string, string>> = {
 "assisted-stretching": "scale(1.2)",
};

export function ServicesGrid() {
 const reduce = useReducedMotion();

 const container: Variants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
 };

 const card: Variants = {
 hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
 },
 };

 return (
 <section className="section-linen section relative overflow-hidden">
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
 What we offer
 </motion.p>
 <RevealHeading
 as="h2"
 text={"Our Services."}
 className="heading-section mt-4"
 delay={0.1}
 trailing={
 <span aria-hidden="true" className="italic text-tan">
 {" "}
 </span>
 }
 />
 </div>

 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.6,
 delay: 0.2,
 ease: [0.16, 1, 0.3, 1],
 }}
 >
 <div className="flex flex-wrap items-center gap-3">
 <Link href="/services" className="btn-outline btn-sm">
 View All Services
 <span aria-hidden="true" className="ml-1">
 →
 </span>
 </Link>
 <Link href="/areas-we-serve" className="btn-outline btn-sm">
 Areas we serve
 <span aria-hidden="true" className="ml-1">
 →
 </span>
 </Link>
 </div>
 </motion.div>
 </div>

 {/* Bento grid */}
 <motion.ul
 variants={container}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 className="mt-14 grid grid-cols-1 gap-4 md:auto-rows-[220px] md:grid-cols-4 md:gap-5"
 >
 {SERVICES.map((service) => (
 <motion.li
 key={service.slug}
 variants={card}
 className={SPAN_CLASSES[service.span]}
 >
 <ServiceCard service={service} />
 </motion.li>
 ))}
 </motion.ul>
 </div>
 </section>
 );
}

/* ---------------------------------------------------------------------- */

function ServiceCard({ service }: { service: Service }) {
 const reduce = useReducedMotion();
 const isFeatured = service.span === "feature";

 return (
 <Link
 href={`/services/${service.slug}`}
 className="group relative flex h-full w-full overflow-hidden rounded-2xl ring-1 ring-tan/20 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-linen md:rounded-3xl"
 >
 {/* Photo with slow "breathing" scale on featured only */}
 {isFeatured ? (
 <motion.div
 animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
 transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
 className="absolute inset-0"
 style={{ transform: IMAGE_ZOOM_STYLE[service.slug] }}
 >
 <Image
 src={service.imageSrc}
 alt={service.title}
 fill
 sizes="(min-width: 768px) 50vw, 100vw"
 className={`object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] ${
 IMAGE_OBJECT_POSITION_CLASS[service.slug] ?? ""
 }`}
 />
 </motion.div>
 ) : (
 <div
 className="absolute inset-0"
 style={{ transform: IMAGE_ZOOM_STYLE[service.slug] }}
 >
 <Image
 src={service.imageSrc}
 alt={service.title}
 fill
 sizes="(min-width: 768px) 25vw, 100vw"
 className={`object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] ${
 IMAGE_OBJECT_POSITION_CLASS[service.slug] ?? ""
 }`}
 />
 </div>
 )}

 {/* Legibility gradient */}
 {/* Legibility overlays, two stacked layers so text reads clearly on
 busy photo backgrounds:
 1. Strong bottom-anchored espresso gradient behind the copy
 2. A very light full-tile wash that darkens the whole photo a
 touch (kicks in only on the noisier tiles) */}
 <div
 aria-hidden="true"
 className={`absolute inset-0 ${
 isFeatured
 ? "bg-gradient-to-t from-espresso/95 via-espresso/60 to-espresso/25"
 : "bg-gradient-to-t from-espresso/95 via-espresso/65 to-espresso/30"
 }`}
 />
 <div
 aria-hidden="true"
 className="absolute inset-0 bg-espresso/15"
 />

 {/* Top-left chip: FEATURED pill (with pulsing dot) or page number */}
 {service.featured ? (
 <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-tan/95 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-espresso backdrop-blur-sm md:left-5 md:top-5">
 <span aria-hidden="true" className="relative inline-flex h-1.5 w-1.5">
 <motion.span
 animate={
 reduce
 ? undefined
 : { scale: [1, 2.4, 1], opacity: [0.8, 0, 0.8] }
 }
 transition={{
 duration: 2,
 repeat: Infinity,
 ease: "easeOut",
 }}
 className="absolute inset-0 rounded-full bg-espresso"
 />
 <span className="relative h-1.5 w-1.5 rounded-full bg-espresso" />
 </span>
 Featured
 </span>
 ) : (
 <span
 aria-hidden="true"
 className="absolute left-4 top-4 font-serif text-lg leading-none text-linen/70 md:left-5 md:top-5"
 >
 {service.index}
 </span>
 )}

 {/* Arrow badge (top-right) with ring hover effect */}
 <span
 aria-hidden="true"
 className="absolute right-4 top-4 md:right-5 md:top-5"
 >
 <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-linen/25 text-linen backdrop-blur-sm transition-all duration-300 group-hover:bg-tan group-hover:text-espresso">
 {/* Expanding ring on hover */}
 <span className="absolute inset-0 rounded-full ring-1 ring-tan/0 transition-all duration-500 group-hover:inset-[-4px] group-hover:ring-tan/50" />
 <svg
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.75"
 className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M7 17L17 7M9 7h8v8"
 />
 </svg>
 </span>
 </span>

 {/* Title + description + Learn more affordance.
 The parent `<Link>` handles navigation; the visible "Learn more"
 pill is a purely visual affordance styled to look like a button. */}
 <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
 <h3
 className={
 isFeatured
 ? "font-serif text-3xl leading-tight text-linen md:text-4xl lg:text-5xl"
 : "font-serif text-xl leading-tight text-linen md:text-2xl"
 }
 >
 {service.title}
 </h3>
 <p
 className={`mt-2 line-clamp-2 text-linen/90 ${
 isFeatured
 ? "max-w-[36ch] text-base leading-relaxed md:text-base"
 : "max-w-[32ch] text-sm leading-snug"
 }`}
 >
 {service.description}
 </p>

 {/* Learn more, filled linen pill on the featured card, subtle
 tan-underlined text on the smaller tiles so it doesn't compete
 with the copy. Both animate on card hover. */}
 {isFeatured ? (
 <span
 aria-hidden="true"
 className="mt-6 inline-flex items-center gap-2 rounded-full bg-linen px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-espresso shadow-card transition-all duration-300 group-hover:bg-tan group-hover:text-espresso"
 >
 Learn more
 <span
 aria-hidden="true"
 className="transition-transform duration-300 group-hover:translate-x-1"
 >
 →
 </span>
 </span>
 ) : (
 <span
 aria-hidden="true"
 className="mt-4 inline-flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-linen underline decoration-tan/60 underline-offset-4 transition-colors duration-300 group-hover:text-tan group-hover:decoration-tan"
 >
 Learn more
 <span
 aria-hidden="true"
 className="transition-transform duration-300 group-hover:translate-x-0.5"
 >
 →
 </span>
 </span>
 )}
 </div>
 </Link>
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
 d="M -40 720 C 260 620, 460 500, 720 420 S 1180 260, 1440 140"
 {...draw(0.2)}
 />
 <motion.path
 d="M -40 800 C 260 700, 460 580, 720 500 S 1180 340, 1440 220"
 strokeWidth="0.6"
 {...draw(0.5)}
 />
 </svg>
 );
}
