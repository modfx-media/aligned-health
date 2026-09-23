"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { PostCard } from "@/app/(site)/blog/_components/PostCard";
import type { BlogPost } from "@/lib/blog";

/**
 * Homepage "From the Journal" section.
 *
 * Uniform 3-column grid of equal-height post cards for clean visual
 * alignment. Card heights are guaranteed by `h-full` inside PostCard and
 * `items-stretch` on the grid (grid's default). The read-link inside
 * each card is anchored to the bottom via `mt-auto`, so descriptions of
 * different lengths still leave every "Read the article →" perfectly on
 * the same baseline.
 *
 * Consumes posts as a prop so /home/page.tsx can stay a server component.
 */

interface Word {
 text: string;
 accent?: boolean;
}
const HEADING_WORDS: readonly Word[] = [
 { text: "Move" },
 { text: "Better." },
 { text: "Feel" },
 { text: "Better." },
 { text: "Live" },
 { text: "Better.", accent: true },
];

const HEADING_CONTAINER: Variants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

export function BlogPreview({ posts }: { posts: readonly BlogPost[] }) {
 const reduce = useReducedMotion();
 if (posts.length === 0) return null;

 return (
 <section className="section-cream section relative overflow-hidden">
 <BackgroundFlourish />

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
 <p className="eyebrow !text-mocha">Wellness insights</p>
 </motion.div>

 <motion.h2
 variants={HEADING_CONTAINER}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 className="heading-section mt-4"
 >
 {HEADING_WORDS.map((word, index) => (
 <HeadingWord
 key={`${word.text}-${index}`}
 word={word}
 index={index}
 reduce={!!reduce}
 />
 ))}
 </motion.h2>

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.6,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-5 max-w-xl text-base leading-relaxed text-mocha md:text-lg"
 >
 Helpful guidance on chiropractic care, pain relief, mobility,
 and everyday wellness to help you take control of your health.
 </motion.p>
 </div>

 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.6,
 delay: 0.25,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="md:pb-2"
 >
 <Link
 href="/blog"
 className="btn-outline btn-sm inline-flex items-center gap-2"
 >
 All articles <span aria-hidden="true">→</span>
 </Link>
 </motion.div>
 </div>

 {/* Uniform 3-up grid, all cards are the same size and every
 "Read the article →" ends on the same baseline. */}
 <div className="mt-12 grid gap-6 md:mt-14 md:gap-8 lg:grid-cols-3">
 {posts.map((post, i) => (
 <PostCard key={post.slug} post={post} index={i} />
 ))}
 </div>
 </div>
 </section>
 );
}

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
 transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
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
 ? { pathLength: 1, opacity: 0.18 }
 : { pathLength: 0, opacity: 0 },
 whileInView: { pathLength: 1, opacity: 0.18 },
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
