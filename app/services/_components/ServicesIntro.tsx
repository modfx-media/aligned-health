"use client";

import Image from "next/image";
import Link from "next/link";
import { BookNowLink } from "@/app/_components/BookNowLink";
import {
 motion,
 useReducedMotion,
 type Variants,
} from "motion/react";

/**
 * /services, hero + 14-card grid.
 *
 * Copy verbatim from the live /services page:
 * Intro: "At Aligned Health we provide some of the most advanced treatment
 * and therapeutic modalities."
 * Titles: the exact 13 legacy service names, plus Auto/Personal Injury.
 *
 * Descriptions are added here (the live page lists titles only). They're
 * short, factual descriptions of each modality.
 *
 * Photography: the real Squarespace CDN photo for each service, pulled
 * from the live page's DOM order.
 */

export interface Service {
 slug: string;
 title: string;
 description: string;
 imageSrc: string;
}

const INTRO =
 "Fourteen services live in the same Laguna Hills suite, so you are not sent across town for a second stop. Adjustments, decompression, percussion, red light — we pick what the tissue actually needs that day.";

export const SERVICES: readonly Service[] = [
 {
 slug: "chiropractic-adjustments",
 title: "Chiropractic Adjustments",
 description:
 "Precise thrusts that restore spine and extremity joint mobility, the foundation of every treatment plan.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/3dd5634c-1569-4b59-9138-2caf3eb46524/IMG_8324.jpg",
 },
 {
 slug: "spinal-decompression",
 title: "Spinal Decompression",
 description:
 "Non-surgical traction that relieves pressure on discs and nerves, for chronic low-back, neck, and sciatica pain.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/50c96876-138b-4b5d-9508-4b3880f504fb/IMG_9092.jpg",
 },
 {
 slug: "electromuscular-stimulation",
 title: "Electromuscular Stimulation",
 description:
 "Gentle electrical current that reduces muscle spasm, improves circulation, and eases pain during recovery.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/a41945d6-c5f3-49b5-a385-aeb4edf98114/IMG_8271.jpg",
 },
 {
 slug: "percussion-therapy",
 title: "Percussion Therapy",
 description:
 "Deep-muscle percussive treatment that reduces soreness and improves range of motion after training or injury.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/735abe96-9486-433e-9899-802b92cc0e45/IMG_8435.jpg",
 },
 {
 slug: "pemf-therapy",
 title: "PEMF, Pulsed Electromagnetic Field Therapy",
 description:
 "Electromagnetic pulses that support cellular repair and reduce inflammation at the tissue level.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/7eb0895e-30d3-40da-8cbe-1eef6767350c/IMG_9121.jpeg",
 },
 {
 slug: "game-ready-ice-compressions",
 title: "Game Ready Ice Compressions",
 description:
 "Combined cold and intermittent compression that speeds recovery from acute injuries and post-training swelling.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/4cfa78c3-93ae-41a2-af51-9f3d262d3af9/IMG_8230.jpg",
 },
 {
 slug: "myofascial-scraping",
 title: "Myofascial Scraping",
 description:
 "Instrument-assisted soft-tissue work that releases fascial restrictions and improves mobility.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/75314aa8-23a6-457e-a167-b0c25e33c30c/IMG_8565.jpeg",
 },
 {
 slug: "red-light-therapy",
 title: "Red Light Therapy (Photobiomodulation)",
 description:
 "Targeted red and near-infrared wavelengths that calm inflammation and support tissue repair at the cellular level.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/65e22074-e814-43e0-bd6e-e7713e190427/IMG_7890+2.jpeg",
 },
 {
 slug: "pneumatic-compressions",
 title: "Pneumatic Compressions",
 description:
 "Sequential air compression sleeves that boost circulation through the muscles, spa-like recovery for legs and arms.",
 imageSrc: "/images/services/pneumatic-compressions-card.webp",
 },
 {
 slug: "intersegmental-distraction",
 title: "Intersegmental Distraction",
 description:
 "Gentle roller table traction that mobilizes each spinal segment and increases blood flow to spinal tissues.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/d6c36965-f455-4ec1-b80e-bbe0385a7667/IMG_9130.jpg",
 },
 {
 slug: "assisted-stretching",
 title: "Assisted Stretching",
 description:
 "Guided passive stretching to restore flexibility, balance, and range of motion, done for you, not to you.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/5965888a-2f81-413a-af59-2ba709d807de/IMG_8467.jpeg",
 },
 {
 slug: "cupping",
 title: "Cupping",
 description:
 "Suction therapy that lifts fascia to improve circulation, release adhesions, and reduce muscle tension.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/d1a65330-f45f-4350-a789-344425a454be/IMG_1237_Original.jpg",
 },
 {
 slug: "therapeutic-ultrasounds",
 title: "Therapeutic Ultrasounds",
 description:
 "High-frequency sound waves that penetrate deep into soft tissue to reduce inflammation and speed healing.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/db97a98a-50f3-426a-90a9-a18061ff7558/74AA8CFA-75BD-4EBC-A7DE-A7E803253B34_1_105_c.jpeg",
 },
 {
 slug: "auto-personal-injury",
 title: "Auto/Personal Injury",
 description:
 "Post-accident chiropractic care for whiplash and injury recovery, with auto insurance and attorney lien coordination.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/3dd5634c-1569-4b59-9138-2caf3eb46524/IMG_8324.jpg",
 },
];

interface Word {
 text: string;
 accent?: boolean;
}
const HEADING_WORDS: readonly Word[] = [
 { text: "Everything we" },
 { text: "can do", accent: true },
 { text: "in one visit." },
];

const HEADING_CONTAINER: Variants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

export function ServicesIntro() {
 const reduce = useReducedMotion();

 const gridContainer: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.06, delayChildren: 0.1 },
 },
 };
 const gridItem: Variants = {
 hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
 },
 };

 return (
 <>
 {/* --- Hero --- */}
 <section className="section-cream section relative overflow-hidden">
 <BackgroundFlourish />

 <div className="container-shell relative z-10">
 <div className="mx-auto max-w-4xl">
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="flex items-center gap-3"
 >
 <span aria-hidden="true" className="block h-px w-10 bg-tan" />
 <p className="eyebrow !text-mocha">Our services</p>
 </motion.div>

 <motion.h1
 variants={HEADING_CONTAINER}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-espresso md:text-6xl lg:text-7xl"
 >
 {HEADING_WORDS.map((word, index) => (
 <HeadingWord
 key={word.text}
 word={word}
 index={index}
 reduce={!!reduce}
 />
 ))}
 </motion.h1>

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.75,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-8 max-w-2xl text-lg leading-relaxed text-mocha md:text-xl"
 >
 {INTRO}
 </motion.p>

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.6,
 delay: 0.95,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-4 max-w-xl text-sm leading-relaxed text-mocha/80"
 >
 Hover a card for a quick overview. If you are driving in from{" "}
 <Link href="/areas-we-serve" className="link-underline text-espresso">
 elsewhere in Orange County
 </Link>
 , we will still see you here. Book online or call the office.
 </motion.p>
 </div>
 </div>
 </section>

 {/* --- 14-card grid --- */}
 <section className="section-linen section relative overflow-hidden">
 <div className="container-shell relative z-10">
 <div className="flex items-center gap-4">
 <motion.span
 aria-hidden="true"
 initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
 whileInView={{ scaleX: 1 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
 className="block h-px w-16 origin-left bg-tan/60"
 />
 <span className="text-[0.7rem] uppercase tracking-[0.24em] text-mocha/70">
 All {SERVICES.length} services
 </span>
 </div>

 <motion.ul
 variants={gridContainer}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-6"
 >
 {SERVICES.map((service) => (
 <motion.li key={service.slug} variants={gridItem}>
 <ServiceCard service={service} />
 </motion.li>
 ))}
 </motion.ul>

 {/* Closing CTA row */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.2,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-14 flex flex-col items-start gap-4 rounded-3xl border border-tan/30 bg-cream p-8 md:mt-16 md:flex-row md:items-center md:justify-between md:p-10"
 >
 <div className="max-w-xl">
 <p className="eyebrow !text-mocha">Not sure which service?</p>
 <p className="mt-3 text-base leading-relaxed text-mocha md:text-lg">
 We&rsquo;ll verify your benefits and help match you to the
 right combination of therapies. Schedule now.
 </p>
 </div>
 <div className="flex flex-wrap items-center gap-4">
 <BookNowLink className="btn-accent">
 Book Online
 <span aria-hidden="true" className="ml-1">
 →
 </span>
 </BookNowLink>
 <Link
 href="/contact-us"
 className="text-sm uppercase tracking-[0.18em] text-espresso underline decoration-tan underline-offset-4 hover:text-mocha"
 >
 Contact the office
 </Link>
 </div>
 </motion.div>
 </div>
 </section>
 </>
 );
}

/* ---------------------------------------------------------------------- */
/* Service card */
/* ---------------------------------------------------------------------- */

export function ServiceCard({ service }: { service: Service }) {
 return (
 <Link
 href={`/services/${service.slug}`}
 id={service.slug}
 className="group relative flex aspect-[4/5] w-full flex-col overflow-hidden rounded-3xl bg-espresso ring-1 ring-tan/20 shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-linen scroll-mt-32"
 >
 {/* Photo */}
 <Image
 src={service.imageSrc}
 alt={service.title}
 fill
 sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
 className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
 />

 {/* Legibility gradient, stronger at bottom for title/description */}
 <div
 aria-hidden="true"
 className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/50 to-espresso/15"
 />
 {/* Slight overall wash so text always reads */}
 <div
 aria-hidden="true"
 className="absolute inset-0 bg-espresso/15"
 />

 {/* Arrow badge, top-right, fills tan on hover */}
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

 {/* Text block, bottom-left. Title always visible, description
 revealed on hover on desktop, always visible on mobile. */}
 <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
 <h3 className="font-serif text-xl leading-tight text-linen md:text-2xl">
 {service.title}
 </h3>
 <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-linen/85 opacity-100 transition-opacity duration-500 md:opacity-80 md:group-hover:opacity-100">
 {service.description}
 </p>
 </div>
 </Link>
 );
}

/* ---------------------------------------------------------------------- */

function HeadingWord({
 word,
 index,
 reduce,
}: {
 word: Word;
 index: number;
 reduce: boolean;
}) {
 const wordVariant: Variants = {
 hidden: reduce ? { y: 0 } : { y: "110%" },
 visible: {
 y: 0,
 transition: {
 duration: 0.85,
 ease: [0.16, 1, 0.3, 1],
 },
 },
 };
 return (
 <>
 {index > 0 ? " " : null}
 <span className="inline-flex overflow-hidden pb-[0.1em] pr-[0.05em] align-top">
 <motion.span
 variants={wordVariant}
 className={`inline-block ${word.accent ? "italic text-mocha" : ""}`}
 >
 {word.text}
 </motion.span>
 </span>
 </>
 );
}

function BackgroundFlourish() {
 const reduce = useReducedMotion();
 const draw = (delay: number) => ({
 initial: reduce
 ? { pathLength: 1, opacity: 0.2 }
 : { pathLength: 0, opacity: 0 },
 whileInView: { pathLength: 1, opacity: 0.2 },
 viewport: { once: true, margin: "0px 0px -100px 0px" },
 transition: {
 pathLength: { duration: 2.6, delay, ease: "easeOut" as const },
 opacity: { duration: 0.5, delay },
 },
 });
 return (
 <svg
 aria-hidden="true"
 viewBox="0 0 1400 500"
 preserveAspectRatio="none"
 className="pointer-events-none absolute inset-0 h-full w-full text-tan"
 fill="none"
 stroke="currentColor"
 strokeWidth="1"
 >
 <motion.path
 d="M -40 380 C 260 320, 460 240, 720 200 S 1180 120, 1440 80"
 {...draw(0.2)}
 />
 <motion.path
 d="M -40 440 C 260 380, 460 300, 720 260 S 1180 180, 1440 140"
 strokeWidth="0.6"
 {...draw(0.5)}
 />
 </svg>
 );
}
