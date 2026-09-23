"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef } from "react";
import {
  formatPostDate,
  type BlogPost,
} from "@/lib/blog";
import { getServiceBySlug } from "@/lib/services";
import { PostCard } from "@/app/(site)/blog/_components/PostCard";
import { RichText } from "@/app/(site)/blog/_components/RichText";
import { MagneticLink } from "@/app/_components/motion/MagneticLink";
import {
  EXISTING_PATIENT_CTA_LABEL,
  EXISTING_PATIENT_SCHEDULER_URL,
  NEW_PATIENT_CTA_LABEL,
} from "@/lib/site";
import { useBookingModal } from "@/app/_components/booking/BookingModalContext";

/**
 * Individual blog post view. Full-bleed hero image with a floating meta
 * card, then a narrow reading column, then a related-posts row.
 */

const HEADING_CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const HEADING_WORD: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export function BlogPostView({
  post,
  related = [],
}: {
  post: BlogPost;
  related?: readonly BlogPost[];
}) {
  const reduce = useReducedMotion();
  const { openBookingModal } = useBookingModal();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  const words = splitTitle(post.title);
  const recent = related.filter((p) => p.slug !== post.slug);

  return (
    <>
      {/* --- Hero --- */}
      <section
        ref={heroRef}
        className="relative min-h-[600px] w-full overflow-hidden bg-espresso"
      >
        {/* Photo */}
        <motion.div
          style={reduce ? undefined : { y: photoY, scale: photoScale }}
          className="absolute inset-0"
        >
          <Image
            src={post.hero.src}
            alt={post.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { opacity: overlay }}
          className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-espresso/50 to-espresso/90"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 40% at 15% 25%, rgba(185,165,144,0.20) 0%, rgba(54,48,42,0) 60%)",
          }}
        />

        <div className="container-shell relative z-10 flex min-h-[600px] flex-col justify-end pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-4xl">
            {/* Breadcrumb + category */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-linen/80"
            >
              <Link
                href="/blog"
                className="hover:text-linen"
              >
                Wellness Insights
              </Link>
              <span aria-hidden="true" className="block h-px w-6 bg-tan/60" />
              <span
                className="inline-flex items-center gap-2 rounded-full border border-linen/25 bg-espresso/40 px-3 py-1 text-linen backdrop-blur-sm"
                dangerouslySetInnerHTML={{ __html: post.category }}
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={HEADING_CONTAINER}
              initial="hidden"
              animate="visible"
              className="mt-6 font-serif text-4xl leading-[1.08] tracking-tight text-linen md:text-5xl lg:text-6xl"
            >
              {words.map((w, i) => (
                <TitleWord key={i} html={w} reduce={!!reduce} />
              ))}
            </motion.h1>

            {/* Meta strip */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.7rem] uppercase tracking-[0.22em] text-linen/80"
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-tan"
                />
                <span>{post.author.name}</span>
              </div>
              <time dateTime={post.datePublished}>
                {formatPostDate(post.datePublished)}
              </time>
              <span>{post.readingTime} min read</span>
            </motion.div>
          </div>
        </div>

        <WaveDivider />
      </section>

      {/* --- Article body --- */}
      <section className="section-cream section relative overflow-hidden">
        <div className="container-shell relative z-10">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <RichText blocks={post.body} />
            </motion.div>

            {/* Author card */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-16 rounded-3xl border border-tan/30 bg-linen p-6 md:mt-20 md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="eyebrow !text-mocha">Written by</p>
                  <p className="mt-2 font-serif text-xl text-espresso md:text-2xl">
                    {post.author.name}
                  </p>
                  <p className="mt-1 text-sm text-mocha">{post.author.role}</p>
                </div>
                <Link
                  href="/our-team"
                  className="btn-outline btn-sm inline-flex w-full items-center justify-center gap-2 md:w-auto"
                >
                  Meet the team <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>

            {/* Related services chips */}
            {post.relatedServiceSlugs && post.relatedServiceSlugs.length > 0 ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-10"
              >
                <p className="eyebrow !text-mocha">Related services</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {post.relatedServiceSlugs.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/services/${slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-tan/40 bg-linen px-4 py-2 text-sm text-espresso transition-colors hover:bg-tan/10"
                      >
                        {getServiceBySlug(slug)?.label ?? slug}
                        <span aria-hidden="true" className="text-tan">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </div>
        </div>
      </section>

      {/* --- CTA strip --- */}
      <section className="section-espresso section relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 40% at 15% 25%, rgba(185,165,144,0.15) 0%, rgba(54,48,42,0) 60%)",
          }}
        />
        <div className="container-shell relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Ready when you are</p>
            <h2 className="heading-section mt-4 !text-linen">
              Let&rsquo;s get you{" "}
              <span className="italic text-tan">aligned.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-linen/80 md:text-lg">
              Schedule now. Most PPO plans accepted.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <MagneticLink
                onClick={openBookingModal}
                className="btn-primary btn-lg inline-flex items-center gap-2"
              >
                {NEW_PATIENT_CTA_LABEL}
              </MagneticLink>
              <MagneticLink
                href={EXISTING_PATIENT_SCHEDULER_URL}
                external
                className="btn-outline-invert btn-lg inline-flex items-center gap-2"
              >
                {EXISTING_PATIENT_CTA_LABEL}
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>

      {/* --- More reading --- */}
      {recent.length > 0 ? (
        <section className="section-linen section relative overflow-hidden">
          <div className="container-shell relative z-10">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow !text-mocha">Keep reading</p>
                <h2 className="heading-section mt-3">
                  More{" "}
                  <span className="italic text-tan">Wellness Insights.</span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="btn-ghost btn-sm hidden items-center gap-2 md:inline-flex"
              >
                All articles <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:mt-12 md:gap-8 lg:grid-cols-2">
              {recent.slice(0, 2).map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </div>

            <div className="mt-10 flex justify-center md:hidden">
              <Link
                href="/blog"
                className="btn-ghost btn-sm inline-flex items-center gap-2"
              >
                All articles <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function TitleWord({ html, reduce }: { html: string; reduce: boolean }) {
  return (
    <>
      <span className="inline-flex overflow-hidden pb-[0.1em] pr-[0.05em] align-top">
        <motion.span
          variants={reduce ? undefined : HEADING_WORD}
          className="inline-block"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </span>{" "}
    </>
  );
}

function splitTitle(title: string): string[] {
  // Split on whitespace but keep HTML entities intact within each token.
  return title.split(/\s+/).filter(Boolean);
}

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
        className="block h-[70px] w-full text-cream md:h-[100px]"
      >
        <motion.path
          d="M0 60 C 240 110, 480 20, 720 60 S 1200 110, 1440 60 L1440 140 L0 140 Z"
          fill="currentColor"
          initial={reduce ? { y: 0 } : { y: 40 }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </svg>
    </div>
  );
}
