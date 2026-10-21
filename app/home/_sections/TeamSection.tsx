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
 * "Meet the team", alternating editorial rows for each doctor.
 *
 * Two doctors from the live /our-team page (Dr. Dustin Hack & Dr. Tara
 * Hadden). Each row is a 12-col split: portrait 5 / content 6, alternating
 * sides for magazine-like rhythm.
 *
 * Motion (respects `prefers-reduced-motion`):
 * - Header word-reveal + fade
 * - Portrait: mask reveal (curtain slides up) + subtle breathing float
 * - Content: staggered fade-up for name, title, bio
 * - Technique chips: cascade in one after another
 * - Hover on portrait: micro-zoom
 */

interface Doctor {
 slug: string;
 name: string;
 credential: string;
 eyebrow: string;
 photo: string;
 photoAlt: string;
 bio: string;
 techniques: readonly string[];
 quote: string;
}

const DOCTORS: readonly Doctor[] = [
 {
 slug: "dustin-hack",
 name: "Dr. Dustin Hack",
 credential: "D.C.",
 eyebrow: "Chiropractor · 11 years of practice",
 photo:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/f9a83991-a8fd-4f8f-8fa2-a3c1b3a848df/Aligned+Health+New+Profile+pic.png",
 photoAlt: "Portrait of Dr. Dustin Hack, D.C.",
 bio: "Raised in the Midwest as a three-sport athlete, hockey, football, and baseball, Dr. Dustin earned his B.S. in Human Biology & Chemistry from Minnesota State University, then his Doctor of Chiropractic from Southern California University of Health Sciences. Eleven years in, he combines percussion, active/passive muscle therapy, and soft-tissue work to treat sport and non-sport injuries alike.",
 techniques: [
 "Diversified Adjusting",
 "Drop Table",
 "Y-Strap Distraction",
 "Graston",
 "Cupping",
 "Kinesio Taping",
 ],
 quote:
 "The power that made the body heals the body, we just need to give it the tools to do so.",
 },
 {
 slug: "tara-hadden",
 name: "Dr. Tara Hadden",
 credential: "D.C.",
 eyebrow: "Chiropractor · Southern California native",
 photo:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/1600628721387-A4YL20DXRO9Z8PVW6SO1/IMG_1015-Edit_Original.JPG",
 photoAlt: "Portrait of Dr. Tara Hadden, D.C.",
 bio: "A Southern California native, Dr. Tara played collegiate softball at the University of Hawaii, including the 2010 Women's World Series, before studying Kinesiology & Rehabilitation Science, then earning her Doctorate of Chiropractic with Honors from Southern California University of Health Sciences. She treats everyone from youth leagues to professional athletes and general workforce personnel.",
 techniques: [
 "Diversified",
 "Activator",
 "Myofascial Release",
 "Percussion",
 "Rock Tape",
 "Kinesio Tape",
 ],
 quote:
 "I love hearing about what my patients enjoy, my job is to get them back on the field, court, or studio ASAP.",
 },
];

export function TeamSection() {
 return (
 <section className="section-cream section relative overflow-hidden">
 <BackgroundFlourish />

 <div className="container-shell relative z-10">
 <Header />

 <ul className="mt-16 flex flex-col gap-24 md:mt-20 md:gap-32">
 {DOCTORS.map((doc, idx) => (
 <li key={doc.slug}>
 <DoctorRow doctor={doc} mirror={idx % 2 === 1} />
 </li>
 ))}
 </ul>
 </div>
 </section>
 );
}

/* ---------------------------------------------------------------------- */

function Header() {
 const reduce = useReducedMotion();
 return (
 <div className="grid gap-8 md:grid-cols-12 md:items-end">
 <div className="md:col-span-7 lg:col-span-6">
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="eyebrow"
 >
 Meet the team
 </motion.p>
 <RevealHeading
 as="h2"
 text={"The people behind\nyour care."}
 className="heading-section mt-4"
 delay={0.1}
 />
 </div>

 <div className="md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8">
 <div className="flex items-center gap-4">
 <motion.span
 aria-hidden="true"
 initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
 whileInView={{ scaleX: 1 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 1.1,
 delay: 0.25,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="block h-px flex-1 origin-left bg-tan/60"
 />
 <Link
 href="/our-team"
 className="whitespace-nowrap text-[0.7rem] uppercase tracking-[0.24em] text-mocha/80 underline decoration-tan underline-offset-4 hover:text-espresso"
 >
 Read full bios →
 </Link>
 </div>
 </div>
 </div>
 );
}

/* ---------------------------------------------------------------------- */

function DoctorRow({
 doctor,
 mirror,
}: {
 doctor: Doctor;
 mirror: boolean;
}) {
 return (
 <article
 className={`flex flex-col items-center gap-10 md:gap-14 lg:gap-20 ${
 mirror ? "md:flex-row-reverse" : "md:flex-row"
 } md:items-center`}
 >
 {/* Portrait, fixed proportional width, doesn't shrink */}
 <div className="w-full md:basis-5/12 md:shrink-0">
 <Portrait
 src={doctor.photo}
 alt={doctor.photoAlt}
 eyebrow={doctor.eyebrow}
 />
 </div>

 {/* Content, fills the remaining space; `min-w-0` prevents flex overflow */}
 <div className="w-full md:min-w-0 md:flex-1">
 <DoctorContent doctor={doctor} />
 </div>
 </article>
 );
}

function Portrait({
 src,
 alt,
 eyebrow,
}: {
 src: string;
 alt: string;
 eyebrow: string;
}) {
 const reduce = useReducedMotion();
 return (
 <motion.figure
 initial={reduce ? false : { opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
 className="group relative"
 >
 <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-card ring-1 ring-tan/25">
 {/* Very slow breathing float */}
 <motion.div
 animate={reduce ? undefined : { y: [0, -6, 0] }}
 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
 className="absolute inset-0"
 >
 <Image
 src={src}
 alt={alt}
 fill
 sizes="(min-width: 768px) 42vw, 100vw"
 className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
 />
 </motion.div>

 {/* Warm gradient wash at bottom for eyebrow legibility */}
 <div
 aria-hidden="true"
 className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent"
 />

 {/* Eyebrow overlay */}
 <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5 text-linen">
 <span aria-hidden="true" className="block h-px w-6 bg-tan" />
 <span className="text-[0.65rem] uppercase tracking-[0.24em]">
 {eyebrow}
 </span>
 </div>

 {/* Corner ticks */}
 <span
 aria-hidden="true"
 className="absolute left-3 top-3 h-3 w-3 border-l border-t border-linen/80"
 />
 <span
 aria-hidden="true"
 className="absolute right-3 bottom-3 h-3 w-3 border-b border-r border-linen/80"
 />

 {/* Curtain reveal, kept INSIDE the overflow-hidden frame so that
 when it translates down by its own height on entry, it gets
 clipped off instead of leaking below the figure and covering
 adjacent content in the next row. */}
 <motion.div
 aria-hidden="true"
 initial={reduce ? { y: "100%" } : { y: 0 }}
 whileInView={{ y: "100%" }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 1.3,
 delay: 0.3,
 ease: [0.7, 0, 0.3, 1],
 }}
 className="absolute inset-0 bg-cream"
 />
 </div>
 </motion.figure>
 );
}

function DoctorContent({ doctor }: { doctor: Doctor }) {
 const reduce = useReducedMotion();

 const chipStagger: Variants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.06, delayChildren: 0.7 } },
 };
 const chip: Variants = {
 hidden: reduce
 ? { opacity: 1, y: 0, scale: 1 }
 : { opacity: 0, y: 8, scale: 0.95 },
 visible: {
 opacity: 1,
 y: 0,
 scale: 1,
 transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
 },
 };

 return (
 <div>
 {/* Name (with credential in italic) */}
 <motion.h3
 initial={reduce ? false : { opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.15,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl"
 >
 {doctor.name}
 <span className="italic text-tan">, {doctor.credential}</span>
 </motion.h3>

 {/* Bio */}
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.35,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-6 text-base leading-relaxed text-mocha"
 >
 {doctor.bio}
 </motion.p>

 {/* Pull-quote */}
 <motion.blockquote
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.55,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-6 border-l-2 border-tan pl-4"
 >
 <p className="font-serif italic text-lg leading-snug text-espresso/90 md:text-xl">
 &ldquo;{doctor.quote}&rdquo;
 </p>
 </motion.blockquote>

 {/* Technique chips */}
 <motion.ul
 variants={chipStagger}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 className="mt-8 flex flex-wrap gap-2"
 >
 {doctor.techniques.map((t) => (
 <motion.li
 key={t}
 variants={chip}
 className="rounded-full border border-tan/40 bg-linen/60 px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-mocha backdrop-blur-sm"
 >
 {t}
 </motion.li>
 ))}
 </motion.ul>

 {/* Read bio link */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.6,
 delay: 1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-10"
 >
 <Link
 href={`/our-team#${doctor.slug}`}
 className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-espresso underline decoration-tan underline-offset-4 hover:text-mocha"
 >
 Read full bio
 <span
 aria-hidden="true"
 className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-tan/20 text-tan transition-all duration-300 group-hover:bg-tan group-hover:text-linen"
 >
 <svg
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.75"
 className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M5 12h14M13 6l6 6-6 6"
 />
 </svg>
 </span>
 </Link>
 </motion.div>
 </div>
 );
}

/* ---------------------------------------------------------------------- */

function BackgroundFlourish() {
 const reduce = useReducedMotion();
 const draw = (delay: number) => ({
 initial: reduce
 ? { pathLength: 1, opacity: 0.25 }
 : { pathLength: 0, opacity: 0 },
 whileInView: { pathLength: 1, opacity: 0.25 },
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
 d="M 1440 120 C 1180 220, 900 360, 640 440 S 200 620, -40 720"
 {...draw(0.2)}
 />
 <motion.path
 d="M 1440 220 C 1180 320, 900 460, 640 540 S 200 720, -40 820"
 strokeWidth="0.6"
 {...draw(0.5)}
 />
 </svg>
 );
}
