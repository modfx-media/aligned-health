"use client";

import Image from "next/image";
import Link from "next/link";
import {
 motion,
 useReducedMotion,
 useScroll,
 useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { CLINIC } from "@/lib/site";
import { BookNowLink } from "@/app/_components/BookNowLink";

/**
 * "Why Aligned Health", merged header + full-width photo band + a horizontal
 * timeline of the three promises.
 *
 * Replaces the old ValueProps (3 photo cards) + PhotoBand (photo mosaic).
 *
 * Timeline: the three nodes are connected by a hairline that fills tan from
 * left to right, driven by the section's scroll progress. Each node contains
 * a serif page number and a pulsing tan halo; the content block below each
 * carries an animated line-art icon, title, body, and quick-fact chip.
 *
 * Motion (respects `prefers-reduced-motion`):
 * - Header eyebrow + heading fade + slide
 * - Photo band scroll parallax + entrance
 * - Timeline connector: scroll-driven scaleX
 * - Node scale-in with tan halo pulse
 * - Step content: staggered fade-up
 * - Icon path-draw
 * - Background flourish
 */

const HERO_PHOTO =
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/29e8393a-4ba8-4764-b520-de23669ec908/IMG_8372.jpeg";

interface Step {
 index: string;
 title: string;
 body: ReactNode;
 highlight: string;
 highlightHref?: string;
 Icon: (props: { className?: string }) => ReactNode;
}

const STEPS: readonly Step[] = [
 {
 index: "01",
 title: "Schedule",
 body: "Same-day and next-day visits when we can. If you are driving from Irvine or Mission Viejo, we will still try to get you in without a two-week wait.",
 highlight: "Schedule now",
 Icon: ClockIcon,
 },
 {
 index: "02",
 title: "Insurance Verified First",
 body: (
 <>
 If you want to use your insurance contact us at{" "}
 <a href={`tel:${CLINIC.phone}`} className="link-underline text-espresso">
 {CLINIC.phoneDisplay}
 </a>
 . We will verify your coverage prior to booking an appointment.
 </>
 ),
 highlight:
 "We proudly accept most PPO plans: Aetna, Meritain Health, Anthem Blue Cross, Blue Shield of CA, United Healthcare, Cigna",
 Icon: ShieldIcon,
 },
 {
 index: "03",
 title: "One-on-One Sessions with a Highly Qualified Provider",
 body: "Diversified adjusting, percussion, and decompression in the same room. You see a doctor the whole visit, not an assistant rotating through.",
 highlight: "View Services",
 highlightHref: "/services",
 Icon: OrbitIcon,
 },
];

export function ValueProps() {
 const reduce = useReducedMotion();
 const timelineRef = useRef<HTMLDivElement>(null);
 const bandRef = useRef<HTMLDivElement>(null);

 // Timeline line fills tan as the timeline block passes through the viewport.
 const { scrollYProgress: timelineProgress } = useScroll({
 target: timelineRef,
 offset: ["start 85%", "end 55%"],
 });
 const lineScaleX = useTransform(timelineProgress, [0, 1], [0, 1]);

 // Photo parallax
 const { scrollYProgress: bandProgress } = useScroll({
 target: bandRef,
 offset: ["start end", "end start"],
 });
 const photoY = useTransform(bandProgress, [0, 1], ["-8%", "8%"]);

 return (
 <section className="section-cream section relative overflow-hidden">
 <BackgroundFlourish />

 <div className="container-shell relative z-10">
 {/* --- Header row --- */}
 <div className="grid gap-8 md:grid-cols-12 md:items-end">
 <div className="md:col-span-7 lg:col-span-6">
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="eyebrow"
 >
 Why Aligned Health
 </motion.p>
 <motion.h2
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
 className="heading-section mt-4"
 >
 Care that shows up on time
 <br className="hidden md:block" /> and stays{" "}
 <span className="italic text-mocha">personal.</span>
 </motion.h2>
 <p className="mt-4 max-w-xl text-sm leading-relaxed text-mocha md:text-base">
 Same-day and next-day visits when we can, insurance checked before
 you book, and a doctor in the room the whole time. We also treat
 patients driving in from{" "}
 <Link href="/areas-we-serve" className="link-underline text-espresso">
 across Orange County
 </Link>
 .
 </p>
 </div>
 </div>

 {/* --- Photo band (single wide, no mosaic tiles) --- */}
 <div className="mt-14 md:mt-16">
 <div className="flex items-center gap-4">
 <motion.span
 aria-hidden="true"
 initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
 whileInView={{ scaleX: 1 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
 className="block h-px flex-1 origin-left bg-tan/60"
 />
 <span
 aria-hidden="true"
 className="whitespace-nowrap text-[0.65rem] uppercase tracking-[0.4em] text-mocha/70"
 >
 Aligned Health · Laguna Hills
 </span>
 <motion.span
 aria-hidden="true"
 initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
 whileInView={{ scaleX: 1 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 1,
 delay: 0.1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="block h-px flex-1 origin-right bg-tan/60"
 />
 </div>

 <motion.figure
 ref={bandRef}
 initial={reduce ? false : { opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
 className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-card ring-1 ring-tan/20 md:aspect-[21/9]"
 >
 <motion.div
 style={reduce ? undefined : { y: photoY }}
 className="absolute inset-x-0 -top-[10%] -bottom-[10%]"
 >
 <Image
 src={HERO_PHOTO}
 alt="Chiropractic care in progress at Aligned Health"
 fill
 sizes="(min-width: 1024px) 1200px, 100vw"
 className="object-cover"
 />
 </motion.div>

 {/* Warm caption card */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.5,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="absolute bottom-4 right-4 hidden max-w-[280px] rounded-2xl bg-linen/95 p-4 shadow-card backdrop-blur-sm md:block md:bottom-6 md:right-6"
 >
 <p className="text-[0.65rem] uppercase tracking-[0.22em] text-tan">
 Hands-on care
 </p>
 <p className="mt-1.5 text-sm leading-snug text-espresso">
 Personalized care plans to meet your needs.
 </p>
 </motion.div>

 {/* Corner ticks */}
 <span
 aria-hidden="true"
 className="absolute left-4 top-4 h-4 w-4 border-l border-t border-linen/80"
 />
 <span
 aria-hidden="true"
 className="absolute right-4 top-4 h-4 w-4 border-r border-t border-linen/80"
 />
 </motion.figure>
 </div>

 {/* --- Timeline --- */}
 <div ref={timelineRef} className="relative mt-20 md:mt-24">
 {/* Connecting line above the nodes (desktop only). Base line is
 a soft tan/25 rail; the tan bar on top fills as user scrolls. */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-x-8 top-8 hidden h-px bg-tan/25 md:block"
 />
 <motion.div
 aria-hidden="true"
 style={reduce ? { scaleX: 1 } : { scaleX: lineScaleX }}
 className="pointer-events-none absolute inset-x-8 top-8 hidden h-px origin-left bg-tan md:block"
 />

 <ol className="relative grid gap-16 md:grid-cols-3 md:gap-8">
 {STEPS.map((step, idx) => (
 <TimelineStep key={step.index} step={step} index={idx} />
 ))}
 </ol>
 </div>
 </div>
 </section>
 );
}

/* ---------------------------------------------------------------------- */
/* Timeline step */
/* ---------------------------------------------------------------------- */

function TimelineStep({ step, index }: { step: Step; index: number }) {
 const reduce = useReducedMotion();
 const delay = 0.1 + index * 0.15;

 return (
 <motion.li
 initial={reduce ? false : { opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
 className="relative flex flex-col items-center text-center md:items-start md:text-left"
 >
 {/* Node, circular badge with the serif page number and a pulsing halo */}
 <motion.div
 initial={reduce ? false : { scale: 0, opacity: 0 }}
 whileInView={{ scale: 1, opacity: 1 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.55,
 delay: delay + 0.3,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-cream ring-2 ring-tan"
 >
 <motion.span
 aria-hidden="true"
 animate={
 reduce
 ? undefined
 : { scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }
 }
 transition={{
 duration: 2.6,
 repeat: Infinity,
 ease: "easeOut",
 delay: index * 0.35,
 }}
 className="absolute inset-0 rounded-full bg-tan/25"
 />
 <span className="relative font-serif text-2xl leading-none text-espresso">
 {step.index}
 </span>
 </motion.div>

 {/* Content */}
 <div className="mt-8 flex w-full items-start gap-3 md:mt-10">
 <span
 aria-hidden="true"
 className="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-tan/15 text-tan md:inline-flex"
 >
 <step.Icon className="h-4 w-4" />
 </span>
 <div className="min-w-0 flex-1">
 <h3 className="heading-card">
 {index === 0 ? (
 <BookNowLink className="link-underline">
 {step.title}
 </BookNowLink>
 ) : (
 step.title
 )}
 </h3>
 <p className="mt-3 text-sm leading-relaxed text-mocha md:text-base">
 {step.body}
 </p>
 <div className="mt-6 flex items-center gap-3 border-t border-tan/25 pt-4">
 <span aria-hidden="true" className="block h-px w-4 bg-tan" />
 {step.highlightHref ? (
 <Link
 href={step.highlightHref}
 className="link-underline text-[0.65rem] uppercase tracking-[0.2em] text-mocha/80"
 >
 {step.highlight}
 </Link>
 ) : (
 <span className="text-[0.65rem] uppercase tracking-[0.2em] text-mocha/80">
 {step.highlight}
 </span>
 )}
 </div>
 </div>
 </div>
 </motion.li>
 );
}

/* ---------------------------------------------------------------------- */
/* Icons */
/* ---------------------------------------------------------------------- */

interface IconProps {
 className?: string;
}

function ClockIcon({ className }: IconProps) {
 const reduce = useReducedMotion();
 const draw = (delay: number) => ({
 initial: reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
 whileInView: { pathLength: 1, opacity: 1 },
 viewport: { once: true, margin: "0px 0px -60px 0px" },
 transition: {
 pathLength: { duration: 1.2, delay, ease: "easeOut" as const },
 opacity: { duration: 0.3, delay },
 },
 });
 return (
 <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
 <motion.circle cx="16" cy="16" r="11" {...draw(0.9)} />
 <motion.path d="M16 10 V16 L20 19" {...draw(1.3)} />
 </svg>
 );
}

function ShieldIcon({ className }: IconProps) {
 const reduce = useReducedMotion();
 const draw = (delay: number) => ({
 initial: reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
 whileInView: { pathLength: 1, opacity: 1 },
 viewport: { once: true, margin: "0px 0px -60px 0px" },
 transition: {
 pathLength: { duration: 1.2, delay, ease: "easeOut" as const },
 opacity: { duration: 0.3, delay },
 },
 });
 return (
 <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
 <motion.path d="M16 4 L26 8 V16 C26 22 21 26 16 28 C11 26 6 22 6 16 V8 Z" {...draw(1.05)} />
 <motion.path d="M11 16 L15 20 L21 13" {...draw(1.65)} />
 </svg>
 );
}

function OrbitIcon({ className }: IconProps) {
 const reduce = useReducedMotion();
 const draw = (delay: number) => ({
 initial: reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
 whileInView: { pathLength: 1, opacity: 1 },
 viewport: { once: true, margin: "0px 0px -60px 0px" },
 transition: {
 pathLength: { duration: 1.3, delay, ease: "easeOut" as const },
 opacity: { duration: 0.3, delay },
 },
 });
 return (
 <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
 <motion.circle cx="16" cy="16" r="4" {...draw(1.2)} />
 <motion.ellipse cx="16" cy="16" rx="11" ry="4" {...draw(1.55)} />
 <motion.ellipse cx="16" cy="16" rx="11" ry="4" transform="rotate(60 16 16)" {...draw(1.8)} />
 <motion.ellipse cx="16" cy="16" rx="11" ry="4" transform="rotate(-60 16 16)" {...draw(2.05)} />
 </svg>
 );
}

/* ---------------------------------------------------------------------- */
/* Background flourish */
/* ---------------------------------------------------------------------- */
function BackgroundFlourish() {
 const reduce = useReducedMotion();
 const draw = (delay: number) => ({
 initial: reduce ? { pathLength: 1, opacity: 0.28 } : { pathLength: 0, opacity: 0 },
 whileInView: { pathLength: 1, opacity: 0.28 },
 viewport: { once: true, margin: "0px 0px -100px 0px" },
 transition: {
 pathLength: { duration: 2.6, delay, ease: "easeOut" as const },
 opacity: { duration: 0.5, delay },
 },
 });
 return (
 <svg aria-hidden="true" viewBox="0 0 1400 900" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full text-tan" fill="none" stroke="currentColor" strokeWidth="1">
 <motion.path d="M -40 720 C 260 620, 460 500, 720 420 S 1180 260, 1440 140" {...draw(0.2)} />
 <motion.path d="M -40 800 C 260 700, 460 580, 720 500 S 1180 340, 1440 220" strokeWidth="0.6" {...draw(0.5)} />
 </svg>
 );
}
