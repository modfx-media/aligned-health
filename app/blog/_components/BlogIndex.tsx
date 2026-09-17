"use client";

import {
 motion,
 useReducedMotion,
 type Variants,
} from "motion/react";
import { useMemo, useState } from "react";
import { PostCard } from "./PostCard";
import { decodeHtmlEntities, type BlogPost } from "@/lib/blog";

const ALL_CATEGORIES = "All";

interface Word {
 text: string;
 accent?: boolean;
}
const HEADING_WORDS: readonly Word[] = [
 { text: "Wellness" },
 { text: "Insights.", accent: true },
];

const HEADING_CONTAINER: Variants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

export function BlogIndex({ posts }: { posts: readonly BlogPost[] }) {
 const reduce = useReducedMotion();
 const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);

 // Categories in the order posts appear (newest first), deduped.
 const categories = useMemo(() => {
 const seen = new Map<string, number>();
 for (const post of posts) {
 seen.set(post.category, (seen.get(post.category) ?? 0) + 1);
 }
 return [...seen.entries()].map(([category, count]) => ({ category, count }));
 }, [posts]);

 const visiblePosts = useMemo(
 () =>
 activeCategory === ALL_CATEGORIES
 ? posts
 : posts.filter((post) => post.category === activeCategory),
 [posts, activeCategory]
 );

 return (
 <>
 {/* Hero */}
 <section className="section-cream section relative overflow-hidden">
 <BackgroundFlourish />

 <div className="container-shell relative z-10">
 <div className="mx-auto max-w-3xl text-center">
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="flex items-center justify-center gap-3"
 >
 <span aria-hidden="true" className="block h-px w-10 bg-tan" />
 <p className="eyebrow !text-mocha">Wellness insights</p>
 <span aria-hidden="true" className="block h-px w-10 bg-tan" />
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
 delay: 0.55,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-8 text-base leading-relaxed text-mocha md:text-lg"
 >
 Plain-spoken notes from the Laguna Hills office: what an adjustment
 actually does, when decompression helps sciatica, and how we build a
 plan that does not assume you live next door.
 </motion.p>
 </div>
 </div>
 </section>

 {/* Post grid */}
 <section className="section-linen section relative overflow-hidden">
 <div className="container-shell relative z-10">
 {/* Category filter */}
 {categories.length > 1 ? (
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="mb-10 md:mb-12"
 >
 <div
 role="group"
 aria-label="Filter articles by category"
 className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
 >
 <CategoryChip
 label={ALL_CATEGORIES}
 count={posts.length}
 isActive={activeCategory === ALL_CATEGORIES}
 onSelect={() => setActiveCategory(ALL_CATEGORIES)}
 />
 {categories.map(({ category, count }) => (
 <CategoryChip
 key={category}
 label={category}
 count={count}
 isActive={activeCategory === category}
 onSelect={() => setActiveCategory(category)}
 />
 ))}
 </div>
 <p aria-live="polite" className="sr-only">
 {visiblePosts.length}{" "}
 {visiblePosts.length === 1 ? "article" : "articles"} shown
 {activeCategory === ALL_CATEGORIES
 ? ""
 : ` in ${decodeHtmlEntities(activeCategory)}`}
 </p>
 </motion.div>
 ) : null}

 <div
 key={activeCategory}
 className="grid gap-6 md:gap-8 lg:grid-cols-3"
 >
 {visiblePosts.map((post, i) => (
 <PostCard key={post.slug} post={post} index={i} />
 ))}
 </div>

 {/* Trailing note */}
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.3,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mx-auto mt-16 max-w-xl text-center text-sm leading-relaxed text-mocha/70 md:mt-20"
 >
 More articles on the way. Have a topic you want us to cover?{" "}
 <a
 href="/contact-us"
 className="underline decoration-tan underline-offset-4 hover:text-espresso"
 >
 Tell us
 </a>
 .
 </motion.p>
 </div>
 </section>
 </>
 );
}

function CategoryChip({
 label,
 count,
 isActive,
 onSelect,
}: {
 label: string;
 count: number;
 isActive: boolean;
 onSelect: () => void;
}) {
 return (
 <button
 type="button"
 onClick={onSelect}
 aria-pressed={isActive}
 className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 ${
 isActive
 ? "border-espresso bg-espresso text-linen"
 : "border-tan/40 text-mocha hover:border-tan hover:text-espresso"
 }`}
 >
 <span dangerouslySetInnerHTML={{ __html: label }} />
 <span
 aria-hidden="true"
 className={isActive ? "text-tan" : "text-tan/70"}
 >
 {count}
 </span>
 </button>
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
