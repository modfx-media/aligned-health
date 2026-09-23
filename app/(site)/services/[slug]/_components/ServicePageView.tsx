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
import type { Service } from "@/lib/services";
import { MagneticLink } from "@/app/_components/motion/MagneticLink";
import { useBookingModal } from "@/app/_components/booking/BookingModalContext";
import {
 EXISTING_PATIENT_CTA_LABEL,
 EXISTING_PATIENT_SCHEDULER_URL,
 NEW_PATIENT_CTA_LABEL,
} from "@/lib/site";

/**
 * Shared rendering shell for every /services/[slug] page.
 *
 * Layout (top → bottom):
 * 1. Full-bleed hero photo with breadcrumb + H1 + tagline + stat
 * 2. Wave divider into cream
 * 3. Intro paragraph
 * 4. "How it works", numbered steps grid
 * 5. Benefits, linen bordered card with checkmark list
 * 6. Great for / Not right when, two-column indications block
 * 7. What to expect, dark espresso strip with 3-stat callout
 * 8. FAQ, accordion-style list
 * 9. Related services, 3-up cards
 * 10. Closing CTA, book / call
 */

// The "Related services" cards use the original Squarespace CDN photos
// (not the newer local hero images) per client feedback.
const LEGACY_IMG_BASE =
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5";
const LEGACY_RELATED_IMAGE_SRC: Record<string, string> = {
 "chiropractic-adjustments": `${LEGACY_IMG_BASE}/3dd5634c-1569-4b59-9138-2caf3eb46524/IMG_8324.jpg`,
 "spinal-decompression": `${LEGACY_IMG_BASE}/50c96876-138b-4b5d-9508-4b3880f504fb/IMG_9092.jpg`,
 "electromuscular-stimulation": `${LEGACY_IMG_BASE}/a41945d6-c5f3-49b5-a385-aeb4edf98114/IMG_8271.jpg`,
 "percussion-therapy": `${LEGACY_IMG_BASE}/735abe96-9486-433e-9899-802b92cc0e45/IMG_8435.jpg`,
 "pemf-therapy": `${LEGACY_IMG_BASE}/7eb0895e-30d3-40da-8cbe-1eef6767350c/IMG_9121.jpeg`,
 "game-ready-ice-compressions": `${LEGACY_IMG_BASE}/4cfa78c3-93ae-41a2-af51-9f3d262d3af9/IMG_8230.jpg`,
 "myofascial-scraping": `${LEGACY_IMG_BASE}/75314aa8-23a6-457e-a167-b0c25e33c30c/IMG_8565.jpeg`,
 "red-light-therapy": `${LEGACY_IMG_BASE}/65e22074-e814-43e0-bd6e-e7713e190427/IMG_7890+2.jpeg`,
 "pneumatic-compressions": `${LEGACY_IMG_BASE}/d644eb01-5e65-4e5c-a604-f4dfcc95e70c/IMG_8245.jpeg`,
 "intersegmental-distraction": `${LEGACY_IMG_BASE}/d6c36965-f455-4ec1-b80e-bbe0385a7667/IMG_9130.jpg`,
 "assisted-stretching": `${LEGACY_IMG_BASE}/5965888a-2f81-413a-af59-2ba709d807de/IMG_8467.jpeg`,
 cupping: `${LEGACY_IMG_BASE}/d1a65330-f45f-4350-a789-344425a454be/IMG_1237_Original.jpg`,
 "therapeutic-ultrasounds": `${LEGACY_IMG_BASE}/db97a98a-50f3-426a-90a9-a18061ff7558/74AA8CFA-75BD-4EBC-A7DE-A7E803253B34_1_105_c.jpeg`,
 "auto-personal-injury": `${LEGACY_IMG_BASE}/3dd5634c-1569-4b59-9138-2caf3eb46524/IMG_8324.jpg`,
};

const HEADING_CONTAINER: Variants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

// Portrait source photos get cropped hard by the 4:3 related-card frame;
// these tune the crop so the patient/treatment stays in view (not just
// the wall/poster at the top of the shot).
const RELATED_CARD_IMAGE_CLASS: Record<string, string> = {
 "spinal-decompression": "object-[58%_62%] scale-[1.4]",
 "pneumatic-compressions": "object-[65%_78%] scale-[1.3]",
 "pemf-therapy": "object-[30%_82%] scale-[1.3]",
 "red-light-therapy": "object-[50%_75%] scale-[1.2]",
};

const HEADING_WORD: Variants = {
 hidden: { y: "110%" },
 visible: {
 y: 0,
 transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
 },
};

export function ServicePageView({
 service,
 related,
}: {
 service: Service;
 related: readonly Service[];
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
 const overlay = useTransform(scrollYProgress, [0, 1], [0.5, 0.85]);

 const words = service.label.split(/\s+/);

 return (
 <>
 {/* ---------- 1. Hero ---------- */}
 <section
 ref={heroRef}
 className="relative min-h-[620px] w-full overflow-hidden bg-espresso"
 >
 <motion.div
 style={reduce ? undefined : { y: photoY, scale: photoScale }}
 className="absolute inset-0"
 >
 <Image
 src={service.imageSrc}
 alt={service.imageAlt}
 fill
 priority
 quality={95}
 sizes="100vw"
 className="object-cover object-center"
 />
 </motion.div>
 <motion.div
 aria-hidden="true"
 style={reduce ? undefined : { opacity: overlay }}
 className="absolute inset-0 bg-gradient-to-b from-espresso/75 via-espresso/55 to-espresso/95"
 />
 {/* Left-side scrim, guarantees text-column legibility on light photos. */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/40 to-transparent md:via-espresso/25"
 />
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0"
 style={{
 background:
 "radial-gradient(45% 40% at 15% 25%, rgba(185,165,144,0.22) 0%, rgba(54,48,42,0) 60%)",
 }}
 />

 <div className="container-shell relative z-10 flex min-h-[620px] flex-col justify-center py-24 md:py-32">
 <div className="max-w-3xl">
 {/* Breadcrumb */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: -6 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="flex flex-wrap items-center gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-linen/80"
 >
 <Link href="/services" className="hover:text-linen">
 Services
 </Link>
 <span aria-hidden="true" className="block h-px w-6 bg-tan/60" />
 <span className="inline-flex items-center gap-2 rounded-full border border-linen/25 bg-espresso/40 px-3 py-1 text-linen backdrop-blur-sm">
 {service.hero.eyebrow}
 </span>
 </motion.div>

 {/* H1 */}
 <motion.h1
 variants={HEADING_CONTAINER}
 initial="hidden"
 animate="visible"
 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-linen md:text-5xl lg:text-6xl"
 >
 {words.map((word, i) => (
 <span key={i}>
 <span className="inline-flex overflow-hidden pb-[0.1em] pr-[0.05em] align-top">
 <motion.span
 variants={reduce ? undefined : HEADING_WORD}
 className="inline-block"
 dangerouslySetInnerHTML={{ __html: word }}
 />
 </span>
 {i < words.length - 1 ? " " : null}
 </span>
 ))}
 <span aria-hidden="true" className="text-tan">
 .
 </span>
 </motion.h1>

 {/* Tagline */}
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
 duration: 0.75,
 delay: 0.55,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-6 max-w-xl text-base leading-relaxed text-linen md:text-lg"
 dangerouslySetInnerHTML={{ __html: service.hero.tagline }}
 />

 {/* Stat + CTAs */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 12 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
 duration: 0.75,
 delay: 0.7,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-10 flex flex-col items-start gap-5 md:flex-row md:items-center"
 >
 {service.hero.stat ? (
 <div className="inline-flex items-center gap-4 rounded-2xl border border-linen/20 bg-espresso/40 px-5 py-3 backdrop-blur-sm">
 <span className="font-serif text-3xl leading-none text-linen">
 {service.hero.stat.value}
 </span>
 <span className="text-[0.62rem] uppercase tracking-[0.24em] text-linen/70">
 {service.hero.stat.label}
 </span>
 </div>
 ) : null}
 <MagneticLink
 onClick={openBookingModal}
 className="btn-primary inline-flex items-center gap-2"
 >
 {NEW_PATIENT_CTA_LABEL}
 <span aria-hidden="true">→</span>
 </MagneticLink>
 </motion.div>
 </div>
 </div>

 <WaveDivider />
 </section>

 {/* ---------- 3. Intro ---------- */}
 <section className="section-cream section relative overflow-hidden">
 <BackgroundFlourish />

 <div className="container-shell relative z-10">
 <div className="mx-auto max-w-3xl">
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
 className="text-lg leading-relaxed text-espresso md:text-xl"
 dangerouslySetInnerHTML={{ __html: service.intro.lead }}
 />
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-5 text-base leading-relaxed text-mocha md:text-lg"
 dangerouslySetInnerHTML={{ __html: service.intro.body }}
 />
 </div>
 </div>
 </section>

 {/* ---------- 4. How it works ---------- */}
 <section className="section-linen section relative overflow-hidden">
 <div className="container-shell relative z-10">
 <SectionHeader
 eyebrow="How it works"
 heading={
 <>
 Inside a{" "}
 <span className="italic text-tan">
 {service.label.toLowerCase()}
 </span>{" "}
 session.
 </>
 }
 />

 <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
 {service.howItWorks.map((step, i) => (
 <motion.div
 key={i}
 initial={reduce ? false : { opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: i * 0.08,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="relative rounded-3xl border border-tan/30 bg-cream p-6 md:p-7"
 >
 <span className="font-serif text-2xl text-tan md:text-3xl">
 {String(i + 1).padStart(2, "0")}
 </span>
 <h3 className="mt-3 font-serif text-lg leading-snug text-espresso md:text-xl">
 {step.title}
 </h3>
 <p
 className="mt-3 text-sm leading-relaxed text-mocha md:text-base"
 dangerouslySetInnerHTML={{ __html: step.description }}
 />
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* ---------- 5. Benefits ---------- */}
 <section className="section-cream section relative overflow-hidden">
 <div className="container-shell relative z-10">
 <SectionHeader
 eyebrow="Why patients ask for it"
 heading={
 <>
 What you can{" "}
 <span className="italic text-tan">expect to feel.</span>
 </>
 }
 />

 <motion.ul
 initial={reduce ? false : { opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
 className="mx-auto mt-12 grid max-w-4xl gap-3 md:mt-14 md:grid-cols-2 md:gap-4"
 >
 {service.benefits.map((benefit, i) => (
 <li
 key={i}
 className="flex items-start gap-3 rounded-2xl border border-tan/25 bg-linen px-5 py-4"
 >
 <span
 aria-hidden="true"
 className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tan/15 text-tan"
 >
 <CheckIcon />
 </span>
 <span
 className="text-sm leading-relaxed text-espresso md:text-base"
 dangerouslySetInnerHTML={{ __html: benefit }}
 />
 </li>
 ))}
 </motion.ul>
 </div>
 </section>

 {/* ---------- 6. Great for / Not right when ---------- */}
 <section className="section-linen section relative overflow-hidden">
 <div className="container-shell relative z-10">
 <SectionHeader
 eyebrow="Is it right for you?"
 heading={
 <>
 Who this <span className="italic text-tan">helps.</span>
 </>
 }
 />

 <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
 {/* Great for */}
 <motion.div
 initial={reduce ? false : { opacity: 0, x: -16 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
 className="rounded-3xl border border-tan/30 bg-cream p-6 md:p-8"
 >
 <p className="eyebrow !text-mocha">Great for</p>
 <ul className="mt-5 space-y-3 border-l-2 border-tan/40 pl-5">
 {service.indications.map((item, i) => (
 <li
 key={i}
 className="text-sm leading-relaxed text-espresso md:text-base"
 dangerouslySetInnerHTML={{ __html: item }}
 />
 ))}
 </ul>
 </motion.div>

 {/* Not right when */}
 {service.contraindications ? (
 <motion.div
 initial={reduce ? false : { opacity: 0, x: 16 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="rounded-3xl bg-espresso p-6 text-linen md:p-8"
 >
 <p className="eyebrow">Not right when</p>
 <ul className="mt-5 space-y-3 border-l-2 border-tan/60 pl-5">
 {service.contraindications.map((item, i) => (
 <li
 key={i}
 className="text-sm leading-relaxed text-linen/90 md:text-base"
 dangerouslySetInnerHTML={{ __html: item }}
 />
 ))}
 </ul>
 <p className="mt-6 text-xs leading-relaxed text-linen/70">
 If any of these apply we&rsquo;ll build a plan around a
 different modality, and we&rsquo;ll tell you why.
 </p>
 </motion.div>
 ) : null}
 </div>
 </div>
 </section>

 {/* ---------- 7. What to expect ---------- */}
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
 <SectionHeader
 eyebrow="What to expect"
 heading={
 <>
 Your first{" "}
 <span className="italic text-tan">session.</span>
 </>
 }
 onDark
 />

 <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:mt-14 md:grid-cols-3 md:gap-6">
 <ExpectStat label="Duration" value={service.whatToExpect.duration} />
 <ExpectStat label="Frequency" value={service.whatToExpect.frequency} />
 <ExpectStat label="Prep" value={service.whatToExpect.prep} />
 </div>

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.2,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-linen/85 md:mt-12 md:text-lg"
 dangerouslySetInnerHTML={{ __html: service.whatToExpect.body }}
 />
 </div>
 </section>

 {/* ---------- 8. FAQ ---------- */}
 <section className="section-cream section relative overflow-hidden">
 <div className="container-shell relative z-10">
 <SectionHeader
 eyebrow="FAQ"
 heading={
 <>
 Common <span className="italic text-tan">questions.</span>
 </>
 }
 />

 <div className="mx-auto mt-12 max-w-3xl divide-y divide-tan/30 border-y border-tan/30 md:mt-14">
 {service.faqs.map((faq, i) => (
 <details
 key={i}
 className="group py-5 md:py-6"
 >
 <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
 <span className="font-serif text-lg leading-snug text-espresso md:text-xl">
 {faq.q}
 </span>
 <span
 aria-hidden="true"
 className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-tan/40 text-tan transition-transform group-open:rotate-45"
 >
 +
 </span>
 </summary>
 <p
 className="mt-4 text-sm leading-relaxed text-mocha md:text-base"
 dangerouslySetInnerHTML={{ __html: faq.a }}
 />
 </details>
 ))}
 </div>
 </div>
 </section>

 {/* ---------- 9. Related services ---------- */}
 {related.length > 0 ? (
 <section className="section-linen section relative overflow-hidden">
 <div className="container-shell relative z-10">
 <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
 <div>
 <p className="eyebrow !text-mocha">Pairs well with</p>
 <h2 className="heading-section mt-3">
 Often <span className="italic text-tan">combined with.</span>
 </h2>
 </div>
 <Link
 href="/services"
 className="btn-outline btn-sm inline-flex items-center gap-2"
 >
 All services <span aria-hidden="true">→</span>
 </Link>
 </div>

 <div className="mt-10 grid gap-6 md:mt-12 md:gap-8 lg:grid-cols-3">
 {related.map((r, i) => (
 <motion.article
 key={r.slug}
 initial={reduce ? false : { opacity: 0, y: 18 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.75,
 delay: i * 0.08,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="group flex h-full flex-col overflow-hidden rounded-3xl border border-tan/30 bg-cream shadow-card transition-shadow duration-500 hover:shadow-card-hover"
 >
 <Link
 href={`/services/${r.slug}`}
 className="flex h-full flex-col"
 >
 <div className="relative aspect-[4/3] w-full overflow-hidden">
 <motion.div
 className="absolute inset-0"
 whileHover={reduce ? undefined : { scale: 1.05 }}
 transition={{
 duration: 0.9,
 ease: [0.16, 1, 0.3, 1],
 }}
 >
 <Image
 src={LEGACY_RELATED_IMAGE_SRC[r.slug] ?? r.imageSrc}
 alt={r.imageAlt}
 fill
 sizes="(max-width: 768px) 100vw, 33vw"
 className={`object-cover ${
 RELATED_CARD_IMAGE_CLASS[r.slug] ?? "object-top"
 }`}
 />
 </motion.div>
 <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-espresso/10 to-transparent" />
 </div>
 <div className="flex flex-1 flex-col gap-2 p-6 md:p-7">
 <h3 className="font-serif text-xl leading-snug text-espresso md:text-2xl">
 {r.label}
 </h3>
 <p className="text-sm leading-relaxed text-mocha md:text-base">
 {r.short}
 </p>
 <div className="mt-auto flex items-center gap-2 pt-3 text-[0.7rem] uppercase tracking-[0.22em] text-tan">
 <span>Learn more</span>
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
 ))}
 </div>
 </div>
 </section>
 ) : null}

 {/* ---------- 10. Closing CTA ---------- */}
 <section className="section-espresso section relative overflow-hidden">
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0"
 style={{
 background:
 "radial-gradient(50% 45% at 12% 20%, rgba(185,165,144,0.15) 0%, rgba(54,48,42,0) 60%), radial-gradient(45% 40% at 88% 80%, rgba(185,165,144,0.12) 0%, rgba(54,48,42,0) 60%)",
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
 </>
 );
}

/* ---------------------------------------------------------------------- */
/* Small pieces */
/* ---------------------------------------------------------------------- */

function SectionHeader({
 eyebrow,
 heading,
 onDark = false,
}: {
 eyebrow: string;
 heading: React.ReactNode;
 onDark?: boolean;
}) {
 return (
 <div className="mx-auto max-w-3xl text-center">
 <div className="flex items-center justify-center gap-3">
 <span
 aria-hidden="true"
 className={`block h-px w-10 ${onDark ? "bg-tan/60" : "bg-tan"}`}
 />
 <p className={`eyebrow ${onDark ? "" : "!text-mocha"}`}>{eyebrow}</p>
 <span
 aria-hidden="true"
 className={`block h-px w-10 ${onDark ? "bg-tan/60" : "bg-tan"}`}
 />
 </div>
 <h2
 className={`heading-section mt-4 ${onDark ? "!text-linen" : ""}`}
 >
 {heading}
 </h2>
 </div>
 );
}

function ExpectStat({ label, value }: { label: string; value: string }) {
 return (
 <div className="rounded-3xl border border-linen/20 bg-espresso/40 p-6 text-center backdrop-blur-sm md:p-7">
 <p className="eyebrow">{label}</p>
 <p
 className="mt-3 font-serif text-xl leading-snug text-linen md:text-2xl"
 dangerouslySetInnerHTML={{ __html: value }}
 />
 </div>
 );
}

function CheckIcon() {
 return (
 <svg
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className="h-3.5 w-3.5"
 aria-hidden="true"
 >
 <path d="M5 12l5 5L20 7" />
 </svg>
 );
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
