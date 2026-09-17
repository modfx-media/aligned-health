"use client";

import Image from "next/image";
import {
 motion,
 useReducedMotion,
 useScroll,
 useTransform,
} from "motion/react";
import { useRef } from "react";

/**
 * /about, dark editorial banner with the heading on the left and the
 * interior office photo as a framed card on the right (not a full-bleed
 * background), then a wave-shaped divider transitioning into a cream
 * content section carrying the "Prevent. Recover. Compete." heading and
 * the two supporting paragraphs.
 *
 * Copy is verbatim from the live site's /about page.
 * Photo is the actual interior office photograph pulled from the same page.
 *
 * Motion (respects `prefers-reduced-motion`):
 * - Photo card fades/scales in + slow "breathing" scale on scroll
 * - Wave path draws in on mount
 * - Word-by-word reveal on "Prevent. Recover. Compete." with an italic
 * mocha accent on "Recover."
 * - Paragraph staggered fade-up
 * - Bottom hairline + eyebrow tags fade in
 */

const HERO_PHOTO = "/images/about/about-hero-office.jpg";

interface Word {
 text: string;
 accent?: boolean;
}
const HEADING_WORDS: readonly Word[] = [
 { text: "Prevent." },
 { text: "Recover.", accent: true },
 { text: "Compete." },
];

// Container-level variants for the h1: a single `whileInView` observer on
// the parent triggers the cascade so each word reveals reliably.
const HEADING_CONTAINER = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

export function AboutIntro() {
 const reduce = useReducedMotion();
 const heroRef = useRef<HTMLDivElement>(null);

 const { scrollYProgress } = useScroll({
 target: heroRef,
 offset: ["start start", "end start"],
 });
 const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
 const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

 return (
 <>
 {/* --- Dark banner, heading left / photo card right --- */}
 <section
 ref={heroRef}
 className="relative w-full overflow-hidden bg-espresso pt-28 pb-24 md:pt-32 md:pb-28"
 >
 {/* Warm tan radial glow, top-left */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0"
 style={{
 background:
 "radial-gradient(50% 45% at 15% 25%, rgba(185,165,144,0.16) 0%, rgba(54,48,42,0) 60%)",
 }}
 />

 <div className="container-shell relative z-10">
 <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
 {/* Banner heading */}
 <motion.h1
 initial={reduce ? false : { opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
 duration: 0.75,
 delay: 0.3,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="font-serif text-4xl leading-[1.05] tracking-tight text-linen md:text-5xl lg:col-span-7 lg:text-6xl"
 >
 About Aligned Health.
 </motion.h1>

 {/* Photo card, right side */}
 <div className="lg:col-span-5">
 <motion.div
 initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 transition={{
 duration: 1.1,
 delay: 0.35,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-card ring-1 ring-linen/10"
 >
 <motion.div
 style={reduce ? undefined : { y: photoY, scale: photoScale }}
 className="absolute inset-0"
 >
 <Image
 src={HERO_PHOTO}
 alt="Aligned Health interior office in Laguna Hills"
 fill
 priority
 sizes="(min-width: 1024px) 40vw, 100vw"
 className="object-cover"
 />
 </motion.div>

 {/* Warm color wash: espresso base + subtle tan highlight top-right */}
 <div
 aria-hidden="true"
 className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/5 to-transparent"
 />
 <div
 aria-hidden="true"
 className="absolute inset-0"
 style={{
 background:
 "radial-gradient(60% 40% at 90% 10%, rgba(185,165,144,0.22) 0%, rgba(0,0,0,0) 70%)",
 }}
 />
 </motion.div>
 </div>
 </div>
 </div>

 {/* Wave-shaped divider transitioning into cream content section */}
 <WaveDivider />
 </section>

 {/* --- Cream content section --- */}
 <section className="section-cream section relative overflow-hidden">
 <BackgroundFlourish />

 <div className="container-shell relative z-10">
 <div className="mx-auto max-w-4xl">
 {/* Small eyebrow above heading */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="flex items-center gap-3"
 >
 <span aria-hidden="true" className="block h-px w-10 bg-tan" />
 <p className="eyebrow !text-mocha">Our mission</p>
 </motion.div>

 {/* Heading, three commanding words with mask reveal.
 Uses container-level `whileInView` + child variants so a
 single observer fires and all words respond (per-word
 observers on tiny inline motion.spans are unreliable). */}
 <motion.h2
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
 </motion.h2>

 {/* Supporting paragraphs, verbatim from the source */}
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.6,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-8 text-lg leading-relaxed text-mocha md:text-xl"
 >
 Whether it is a desk-tight neck, a disc that will not settle, or a sports tweak that stretching did not fix, you see a doctor here, not a rotation of assistants. We will tell you if chiropractic is the wrong next step.
 </motion.p>

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.8,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-6 text-lg leading-relaxed text-mocha md:text-xl"
 >
 We are in Laguna Hills, at 26071 Merit Circle. The goal is simple: get you back to the thing you actually miss — running, lifting, sitting through a workday, picking up a kid — without selling you a package you did not ask for.
 </motion.p>

 {/* Signature strip: hairline + small tracked caps */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-10 flex items-center gap-4"
 >
 <span aria-hidden="true" className="block h-px w-16 bg-tan" />
 <span className="text-[0.65rem] uppercase tracking-[0.28em] text-mocha/70">
 Aligned Health · Laguna Hills, CA
 </span>
 </motion.div>
 </div>
 </div>
 </section>
 </>
 );
}

/* ---------------------------------------------------------------------- */
/* Sub-components */
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
 // Variant that responds to the parent h1's `whileInView` trigger. The
 // parent's stagger orchestrates delay per child, so no per-word delays.
 const wordVariant = {
 hidden: reduce ? { y: 0 } : { y: "110%" as const },
 visible: {
 y: 0,
 transition: {
 duration: 0.85,
 ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
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

/**
 * Wave-shaped divider at the bottom of the hero. The cream shape "eats" up
 * into the hero photo, providing a soft, organic transition into the cream
 * content section below (which uses the same fill color).
 */
function WaveDivider() {
 const reduce = useReducedMotion();
 return (
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
 >
 <svg
 viewBox="0 0 1440 140"
 preserveAspectRatio="none"
 className="block h-[80px] w-full text-cream md:h-[120px]"
 >
 {/* Faint tan outline that draws in first */}
 <motion.path
 d="M0 60 C 240 110, 480 20, 720 60 S 1200 110, 1440 60"
 fill="none"
 stroke="#B9A590"
 strokeWidth="1"
 strokeOpacity="0.4"
 initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
 animate={{ pathLength: 1 }}
 transition={{
 duration: 2,
 delay: 0.6,
 ease: "easeOut" as const,
 }}
 />

 {/* Cream fill wave that transitions into the section below */}
 <motion.path
 d="M0 60 C 240 110, 480 20, 720 60 S 1200 110, 1440 60 L1440 140 L0 140 Z"
 fill="currentColor"
 initial={reduce ? { y: 0 } : { y: 40 }}
 animate={{ y: 0 }}
 transition={{
 duration: 1.2,
 delay: 0.35,
 ease: [0.16, 1, 0.3, 1],
 }}
 />
 </svg>
 </div>
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
