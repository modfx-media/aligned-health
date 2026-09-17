"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Marquee } from "@/app/_components/motion/Marquee";

/**
 * "What our patients say", real 5-star Google reviews rendered as a
 * horizontal marquee of glass cards. Two counter-scrolling rows create
 * movement, and a "See more reviews on Google" CTA anchors the section
 * to the office's live Google Business Profile.
 * Names are shortened to First name + last initial to match the
 * presentation on Google's own review widget.
 */

import type { GoogleReview, GoogleReviewsMeta } from "@/lib/reviews";

interface Testimonial {
 id: string;
 name: string;
 initial: string;
 date: string;
 rating: number;
 text: string;
}

function toCard(review: GoogleReview, index: number): Testimonial {
 const initial = review.name.trim().charAt(0).toUpperCase() || "A";
 return {
 id: `${review.name}-${index}`,
 name: review.name,
 initial,
 date: review.relativeTime ?? "Google review",
 rating: review.rating,
 text: review.quote,
 };
}

export function TestimonialsMarquee({
 reviews,
 meta,
}: {
 reviews: GoogleReview[];
 meta: GoogleReviewsMeta;
}) {
 const reduce = useReducedMotion();
 const testimonials = reviews.map(toCard);
 const mid = Math.max(1, Math.ceil(testimonials.length / 2));
 const ROW_A = testimonials.slice(0, mid);
 const ROW_B = testimonials.slice(mid);
 const secondRow = ROW_B.length > 0 ? ROW_B : ROW_A;

 return (
 <section
 aria-label="Patient testimonials"
 className="section-espresso section relative overflow-hidden"
 >
 {/* Warm radial glows to add depth on dark ground */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0"
 style={{
 background:
 "radial-gradient(50% 45% at 12% 20%, rgba(185,165,144,0.15) 0%, rgba(54,48,42,0) 60%), radial-gradient(45% 40% at 88% 80%, rgba(185,165,144,0.12) 0%, rgba(54,48,42,0) 60%)",
 }}
 />

 <div className="container-shell relative z-10">
 {/* Header row */}
 <div className="grid gap-8 md:grid-cols-12 md:items-end">
 <div className="md:col-span-7 lg:col-span-6">
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="eyebrow"
 >
 Patient stories
 </motion.p>
 <motion.h2
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="heading-section mt-4 !text-linen"
 >
 What our patients{" "}
 <span className="italic text-tan">say.</span>
 </motion.h2>
 </div>

 {/* Right: Google rating badge */}
 <div className="md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8">
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.6,
 delay: 0.2,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="inline-flex items-center gap-4 rounded-2xl border border-linen/25 bg-espresso/40 px-5 py-3 shadow-card backdrop-blur-sm"
 >
 {meta.rating > 0 ? (
 <span className="font-serif text-3xl leading-none text-linen">
 {meta.rating.toFixed(1)}
 </span>
 ) : (
 <span className="font-serif text-2xl leading-none text-linen">G</span>
 )}
 <div className="flex flex-col gap-1">
 <StarRating rating={meta.rating > 0 ? Math.round(meta.rating) : 5} />
 <span className="text-[0.65rem] uppercase tracking-[0.2em] text-linen/70">
 Reviews on{" "}
 <span className="font-medium text-linen">Google</span>
 {meta.reviewCount > 0 ? ` · ${meta.reviewCount}` : ""}
 </span>
 </div>
 </motion.div>
 </div>
 </div>
 </div>

 {/* Marquees, full-bleed so the cards can flow off both edges */}
 <div className="relative mt-14 md:mt-16">
 {/* Edge fade masks so cards fade in/out at the section edges */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-espresso to-transparent md:w-40"
 />
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-espresso to-transparent md:w-40"
 />

 <div className="flex flex-col gap-5">
 <Marquee duration={55}>
 {ROW_A.map((t) => (
 <TestimonialCard key={t.id} testimonial={t} />
 ))}
 </Marquee>
 <Marquee duration={65} reverse>
 {secondRow.map((t) => (
 <TestimonialCard key={t.id} testimonial={t} />
 ))}
 </Marquee>
 </div>
 </div>

 {/* Footer CTA, links to the live Google Business Profile so patients
 can read every review and add their own. */}
 <div className="container-shell relative z-10 mt-12 flex justify-center md:mt-16">
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 >
 <Link
 href={meta.reviewsUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="btn-cta-onDark btn-lg inline-flex items-center gap-2"
 >
 See more reviews on Google
 <span aria-hidden="true">↗</span>
 </Link>
 </motion.div>
 </div>
 </section>
 );
}

/* ---------------------------------------------------------------------- */

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
 return (
 <article className="flex w-[340px] shrink-0 flex-col gap-4 rounded-2xl border border-tan/25 bg-linen p-6 shadow-card md:w-[380px]">
 <header className="flex items-center justify-between">
 <StarRating rating={testimonial.rating} />
 <GoogleMark />
 </header>

 <p className="line-clamp-4 text-sm leading-relaxed text-espresso">
 &ldquo;{testimonial.text}&rdquo;
 </p>

 <footer className="mt-auto flex items-center gap-3 border-t border-tan/25 pt-4">
 <span
 aria-hidden="true"
 className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tan/20 font-serif text-sm text-tan"
 >
 {testimonial.initial}
 </span>
 <div className="min-w-0 flex-1">
 <p className="truncate text-sm font-medium text-espresso">
 {testimonial.name}
 </p>
 <p className="text-[0.65rem] uppercase tracking-[0.18em] text-mocha/70">
 {testimonial.date}
 </p>
 </div>
 </footer>
 </article>
 );
}

/* ---------------------------------------------------------------------- */
/* Star rating + Google mark */
/* ---------------------------------------------------------------------- */

function StarRating({ rating }: { rating: number }) {
 return (
 <div
 className="flex items-center gap-0.5"
 aria-label={`${rating} out of 5 stars`}
 >
 {Array.from({ length: 5 }).map((_, i) => (
 <svg
 key={i}
 viewBox="0 0 24 24"
 className="h-3.5 w-3.5"
 aria-hidden="true"
 >
 <path
 fill={i < rating ? "var(--color-tan)" : "rgba(87,76,63,0.2)"}
 d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
 />
 </svg>
 ))}
 </div>
 );
}

/**
 * Small "G" mark used as a source attribution, deliberately monochrome
 * rather than Google's multi-color brand mark so we don't need to reproduce
 * their trademark colors.
 */
function GoogleMark() {
 return (
 <span
 aria-hidden="true"
 className="inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-mocha/70"
 >
 <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-espresso/5 font-serif text-xs text-espresso">
 G
 </span>
 Google
 </span>
 );
}
