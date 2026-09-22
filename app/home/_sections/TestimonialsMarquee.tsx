"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { Marquee } from "@/app/_components/motion/Marquee";
import type { GoogleReview, GoogleReviewsMeta } from "@/lib/reviews";

/**
 * "What our patients say", real 5-star Google reviews as two
 * counter-scrolling rows. Hovering a card pauses the track and opens
 * a popup with the full Google quote.
 */

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
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<Testimonial | null>(null);

  if (reviews.length === 0) return null;

  const testimonials = reviews.map(toCard);
  const mid = Math.max(1, Math.ceil(testimonials.length / 2));
  const rowA = testimonials;
  const rowB =
    testimonials.length > 1
      ? [...testimonials.slice(mid), ...testimonials.slice(0, mid)]
      : testimonials;

  return (
    <section
      aria-label="Patient testimonials"
      className="section-espresso section relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 12% 20%, rgba(185,165,144,0.15) 0%, rgba(54,48,42,0) 60%), radial-gradient(45% 40% at 88% 80%, rgba(185,165,144,0.12) 0%, rgba(54,48,42,0) 60%)",
        }}
      />

      <div className="container-shell relative z-10">
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
                <span className="font-serif text-2xl leading-none text-linen">
                  G
                </span>
              )}
              <div className="flex flex-col gap-1">
                <StarRating
                  rating={meta.rating > 0 ? Math.round(meta.rating) : 5}
                />
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

      <div className="relative mt-14 md:mt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-espresso to-transparent md:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-espresso to-transparent md:w-40"
        />

        <div className="flex flex-col gap-5">
          <Marquee duration={80} paused={paused || !!active}>
            {rowA.map((t) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                onPause={setPaused}
                onRead={setActive}
              />
            ))}
          </Marquee>
          <Marquee duration={95} reverse paused={paused || !!active}>
            {rowB.map((t) => (
              <TestimonialCard
                key={`${t.id}-b`}
                testimonial={t}
                onPause={setPaused}
                onRead={setActive}
              />
            ))}
          </Marquee>
        </div>
      </div>

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

      {active ? (
        <ReviewPopup
          review={active}
          reviewsUrl={meta.reviewsUrl}
          onClose={() => setActive(null)}
        />
      ) : null}
    </section>
  );
}

function TestimonialCard({
  testimonial,
  onPause,
  onRead,
}: {
  testimonial: Testimonial;
  onPause: (paused: boolean) => void;
  onRead: (review: Testimonial) => void;
}) {
  return (
    <article
      className="flex w-[340px] shrink-0 flex-col gap-4 rounded-2xl border border-tan/25 bg-linen p-6 shadow-card md:w-[380px]"
      onMouseEnter={() => onPause(true)}
      onMouseLeave={() => onPause(false)}
    >
      <header className="flex items-center justify-between">
        <StarRating rating={5} />
        <GoogleMark />
      </header>

      <p className="line-clamp-4 text-sm leading-relaxed text-espresso">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <button
        type="button"
        onMouseEnter={() => onRead(testimonial)}
        onClick={() => onRead(testimonial)}
        className="self-start text-[0.7rem] uppercase tracking-[0.18em] text-mocha underline decoration-tan underline-offset-4 hover:text-espresso"
      >
        Read more
      </button>

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

function ReviewPopup({
  review,
  reviewsUrl,
  onClose,
}: {
  review: Testimonial;
  reviewsUrl: string;
  onClose: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close review"
        onClick={onClose}
        className="absolute inset-0 bg-espresso/70 backdrop-blur-sm"
      />
      <div className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-linen p-7 shadow-card-hover ring-1 ring-tan/20 md:p-9">
        <div className="flex items-start justify-between gap-4">
          <div>
            <StarRating rating={5} />
            <p
              id={titleId}
              className="mt-3 font-serif text-2xl leading-snug text-espresso"
            >
              {review.name}
            </p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-mocha/70">
              {review.date} · Google review
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-espresso/5 text-espresso hover:bg-espresso/10"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <p className="mt-6 text-base leading-relaxed text-espresso">
          &ldquo;{review.text}&rdquo;
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-tan/25 pt-5">
          <GoogleMark />
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.7rem] uppercase tracking-[0.18em] text-mocha underline decoration-tan underline-offset-4 hover:text-espresso"
          >
            View on Google
          </a>
        </div>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            fill={i < rating ? "#8a735c" : "rgba(87,76,63,0.2)"}
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      ))}
    </div>
  );
}

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
