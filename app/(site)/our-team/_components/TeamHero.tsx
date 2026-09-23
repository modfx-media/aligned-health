"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { BookNowLink } from "@/app/_components/BookNowLink";

/**
 * /our-team hero, compact intro before the two doctor profiles.
 */

interface Word {
 text: string;
 accent?: boolean;
}
const HEADING_WORDS: readonly Word[] = [
 { text: "Doctors" },
 { text: "you", accent: true },
 { text: "can" },
 { text: "trust." },
];

const HEADING_CONTAINER: Variants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export function TeamHero() {
 const reduce = useReducedMotion();

 return (
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
 <p className="eyebrow !text-mocha">Meet the team</p>
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
 A highly qualified team in Laguna Hills. Dr. Dustin Hack and Dr. Tara
 Hadden still treat you themselves. If you are coming from elsewhere in
 Orange County, you will not spend that drive with an assistant.{" "}
 <BookNowLink className="link-underline text-espresso">
 Schedule now.
 </BookNowLink>
 </motion.p>
 </div>
 </div>
 </section>
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
 className={`inline-block ${word.accent ? "italic text-tan" : ""}`}
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
 viewBox="0 0 1400 400"
 preserveAspectRatio="none"
 className="pointer-events-none absolute inset-0 h-full w-full text-tan"
 fill="none"
 stroke="currentColor"
 strokeWidth="1"
 >
 <motion.path
 d="M -40 320 C 260 240, 460 160, 720 140 S 1180 60, 1440 20"
 {...draw(0.2)}
 />
 <motion.path
 d="M -40 380 C 260 300, 460 220, 720 200 S 1180 120, 1440 80"
 strokeWidth="0.6"
 {...draw(0.5)}
 />
 </svg>
 );
}
