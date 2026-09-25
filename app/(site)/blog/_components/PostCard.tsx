"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { formatPostDate, type BlogPost } from "@/lib/blog";

/**
 * Shared blog post card. Used on /blog and on the homepage BlogPreview.
 * Motion is opt-in via the `index` prop, which offsets the enter delay.
 *
 * The card fills its grid cell (`h-full` + flex-column layout) so a row
 * of cards stays perfectly aligned regardless of body-copy length.
 */
export function PostCard({
 post,
 index = 0,
 variant = "default",
}: {
 post: BlogPost;
 index?: number;
 variant?: "default" | "featured";
}) {
 const reduce = useReducedMotion();
 const isFeatured = variant === "featured";

 return (
 <motion.article
 initial={reduce ? false : { opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.75,
 delay: index * 0.08,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-tan/30 bg-linen shadow-card transition-shadow duration-500 hover:shadow-card-hover"
 >
 <Link
 href={`/blog/${post.slug}`}
 className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2"
 >
 {/* Image */}
 <div
 className={`relative w-full overflow-hidden ${
 isFeatured ? "aspect-[16/10]" : "aspect-[4/3]"
 }`}
 >
 <motion.div
 className="absolute inset-0"
 whileHover={reduce ? undefined : { scale: 1.05 }}
 transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
 >
 <Image
 src={post.hero.src}
 alt={post.hero.alt}
 fill
 sizes={
 isFeatured
 ? "(max-width: 768px) 100vw, 66vw"
 : "(max-width: 768px) 100vw, 33vw"
 }
 className="object-cover"
 />
 </motion.div>
 {/* Category chip */}
 <div className="pointer-events-none absolute left-4 top-4 md:left-5 md:top-5">
 <span
 className="inline-flex items-center gap-2 rounded-full bg-linen/95 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-espresso shadow-card backdrop-blur-sm"
 dangerouslySetInnerHTML={{ __html: post.category }}
 />
 </div>
 {/* Read arrow */}
 <div className="pointer-events-none absolute right-4 top-4 md:right-5 md:top-5">
 <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-espresso text-linen transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
 <span aria-hidden="true">↗</span>
 </span>
 </div>
 </div>

 {/* Body, flex column that fills remaining height so the read
 link stays anchored to the bottom of every card. */}
 <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
 <div className="flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.22em] text-mocha">
 <time dateTime={post.datePublished}>
 {formatPostDate(post.datePublished)}
 </time>
 <span aria-hidden="true" className="block h-px w-6 bg-tan/60" />
 <span>{post.readingTime} min read</span>
 </div>
 <h3
 className={`font-serif leading-snug text-espresso ${
 isFeatured
 ? "text-2xl md:text-3xl lg:text-4xl"
 : "text-xl md:text-2xl"
 }`}
 dangerouslySetInnerHTML={{ __html: post.title }}
 />
 <p
 className="line-clamp-3 text-sm leading-relaxed text-mocha md:text-base"
 dangerouslySetInnerHTML={{ __html: post.description }}
 />
 <div className="mt-auto flex items-center gap-2 pt-3 text-[0.7rem] uppercase tracking-[0.22em] text-tan">
 <span>Read the article</span>
 <span
 aria-hidden="true"
 className="transition-transform duration-500 group-hover:translate-x-1"
 >
 →
 </span>
 </div>
 </div>
 </Link>
 </motion.article>
 );
}
