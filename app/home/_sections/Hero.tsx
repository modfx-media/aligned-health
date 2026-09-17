"use client";

import Image from "next/image";
import {
 motion,
 useReducedMotion,
 useScroll,
 useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Counter } from "@/app/_components/motion/Counter";
import { MagneticLink } from "@/app/_components/motion/MagneticLink";
import { useBookingModal } from "@/app/_components/booking/BookingModalContext";

/**
 * /home hero, dark, editorial, motion-forward, with richer brand color use.
 *
 * Layout: 12-col grid at `lg`, text 7 / photo 5.
 *
 * Motion inventory (all respect `prefers-reduced-motion`):
 * - Ambient warm radial glow + masked tan dot-grid
 * - Floating tan particles that gently drift across the section
 * - Rotating conic-gradient orb behind the photo
 * - Dashed tan orbit ring rotating around the photo
 * - Line-art flourish path-draws in over 2.4s + orbiting focal dot
 * - Word-by-word headline reveal with an italic-tan accent phrase
 * ("Southern California") for brand-color emphasis
 * - Curtain reveal slides off the photo on mount
 * - Slow "breathing" oscillation + scroll parallax on the photo
 * - Pulsing tan status dot in the top eyebrow pill
 * - Magnetic CTAs
 * - Number counters that count up when in view
 * - Vertical scroll hint at the bottom center
 */

const HERO_IMAGE = "/images/home/hero-treatment-room.jpg";

// Rotating background slideshow behind the whole hero. A curated set of
// real service photos from the office, crossfading every ~6 seconds so
// the section always has a fresh scene playing underneath. Deliberately
// avoids IMG_7513 (sidebar portrait) and IMG_8372 (used in ClosingSection
// / PhotoBand) so nothing repeats on the same page.
const BG_SLIDESHOW: readonly string[] = [
 // Chiropractic adjustment
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/3dd5634c-1569-4b59-9138-2caf3eb46524/IMG_8324.jpg",
 // Percussion therapy
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/735abe96-9486-433e-9899-802b92cc0e45/IMG_8435.jpg",
 // Spinal decompression table
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/50c96876-138b-4b5d-9508-4b3880f504fb/IMG_9092.jpg",
 // PEMF setup
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/7eb0895e-30d3-40da-8cbe-1eef6767350c/IMG_9121.jpeg",
 // Red light therapy
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/65e22074-e814-43e0-bd6e-e7713e190427/IMG_7890+2.jpeg",
 // Assisted stretching
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/5965888a-2f81-413a-af59-2ba709d807de/IMG_8467.jpeg",
];
const BG_INTERVAL_MS = 6000;

// Headline parts. Each item is a phrase that mask-reveals as a group.
// `accent` renders italic in tan for editorial color emphasis; `newLine`
// starts a fresh line.
interface HeadlinePart {
 text: string;
 accent?: boolean;
 newLine?: boolean;
}
const HEADLINE: readonly HeadlinePart[] = [
 { text: "Chiropractic care" },
 { text: "in", newLine: true },
 { text: "Laguna Hills,", accent: true },
 { text: "built around you.", newLine: true },
];

export function Hero() {
 const reduce = useReducedMotion();
 const { openBookingModal } = useBookingModal();
 const sectionRef = useRef<HTMLElement>(null);

 const { scrollYProgress } = useScroll({
 target: sectionRef,
 offset: ["start start", "end start"],
 });
 const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
 // Full-bleed background photo parallax + slow scale on scroll.
 const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
 const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

 // Rotating slideshow index. Advances every BG_INTERVAL_MS while the
 // user's OS motion preference allows it.
 const [bgIndex, setBgIndex] = useState(0);
 useEffect(() => {
 if (reduce) return;
 const id = window.setInterval(() => {
 setBgIndex((i) => (i + 1) % BG_SLIDESHOW.length);
 }, BG_INTERVAL_MS);
 return () => window.clearInterval(id);
 }, [reduce]);

 return (
 <section
 ref={sectionRef}
 className="relative overflow-hidden bg-espresso text-linen"
 >
 {/* --- Rotating full-bleed background slideshow with parallax --- */}
 <motion.div
 aria-hidden="true"
 style={reduce ? undefined : { y: bgY, scale: bgScale }}
 className="pointer-events-none absolute inset-0"
 >
 {BG_SLIDESHOW.map((src, i) => (
 <motion.div
 key={src}
 initial={false}
 animate={{ opacity: i === bgIndex ? 0.6 : 0 }}
 transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
 className="absolute inset-0"
 >
 <Image
 src={src}
 alt=""
 fill
 // Only priority-load the first slide; the rest lazy-load.
 priority={i === 0}
 sizes="100vw"
 className="object-cover object-center"
 />
 </motion.div>
 ))}
 </motion.div>
 {/* Strong dark scrim on top of the bg photo so all text stays legible. */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/85 via-espresso/70 to-espresso/95"
 />
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0 bg-gradient-to-r from-espresso/70 via-espresso/25 to-transparent"
 />

 {/* --- Ambient background layers --- */}
 <AmbientGlow />
 <DotField />
 <FloatingParticles />
 <FlourishAccent />
 {/* Warm color bridge along the right edge, mocha → transparent */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 lg:block"
 style={{
 background:
 "linear-gradient(to left, rgba(185,165,144,0.10) 0%, rgba(87,76,63,0.06) 45%, rgba(54,48,42,0) 100%)",
 }}
 />

 <div className="container-shell relative z-10 pt-16 pb-24 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40">
 <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
 {/* --- Text column --- */}
 <div className="lg:col-span-7">
 <StatusPill />

 <h1 className="heading-display mt-8 text-linen lg:!text-[4.75rem] lg:!leading-[1.02]">
 {HEADLINE.map((part, index) => (
 <HeadlineWord
 key={index}
 part={part}
 index={index}
 reduce={!!reduce}
 />
 ))}
 </h1>

 {/* EKG-style heartbeat line, draws in on mount, then a small
 cursor dot loops along the trace. */}
 <Heartbeat delay={0.9} />

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 14 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
 duration: 0.7,
 delay: 0.95,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="body-lead mt-10 max-w-xl text-linen/75"
 >
 Dr. Dustin Hack and Dr. Tara Hadden treat back pain, neck stiffness,
 and sports injuries in Laguna Hills. You are not a number here. Most
 PPO plans accepted — we verify before you book. Driving from Irvine
 or Mission Viejo is normal for this office.
 </motion.p>

 <motion.div
 initial={reduce ? false : { opacity: 0, y: 14 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
 duration: 0.7,
 delay: 1.15,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-12 flex flex-wrap items-center gap-4"
 >
 <MagneticLink
 onClick={openBookingModal}
 className="btn-cta-onDark btn-lg"
 >
 Book your New Patient Appointment
 <span aria-hidden="true" className="ml-1">
 →
 </span>
 </MagneticLink>
 <MagneticLink
 href="/areas-we-serve"
 className="btn-outline-invert"
 >
 Areas we serve
 </MagneticLink>
 </motion.div>

 <motion.div
 initial={reduce ? false : { opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
 duration: 0.8,
 delay: 1.35,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-linen/15 pt-8"
 >
 <HeroStat value={6} suffix="+" label="PPO plans accepted" />
 <HeroStat value={3} label="Signature therapies" />
 <HeroStat value={30} suffix="-60" label="Minute sessions" />
 </motion.div>
 </div>

 {/* --- Photo column --- */}
 <div className="lg:col-span-5">
 <div className="relative">
 <RotatingGlow />
 <OrbitRing />

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
 style={reduce ? undefined : { y: photoY }}
 className="absolute inset-0"
 >
 <motion.div
 animate={reduce ? undefined : { y: [0, -8, 0] }}
 transition={{
 duration: 9,
 repeat: Infinity,
 ease: "easeInOut",
 }}
 className="absolute inset-0"
 >
 <Image
 src={HERO_IMAGE}
 alt="Aligned Health treatment room in Laguna Hills"
 fill
 priority
 sizes="(min-width: 1024px) 40vw, 100vw"
 className="object-cover"
 />
 </motion.div>
 </motion.div>

 {/* Warm color wash: espresso base + subtle tan highlight top-right */}
 <div
 aria-hidden="true"
 className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent"
 />
 <div
 aria-hidden="true"
 className="absolute inset-0"
 style={{
 background:
 "radial-gradient(60% 40% at 90% 10%, rgba(185,165,144,0.22) 0%, rgba(0,0,0,0) 70%)",
 }}
 />

 {/* Curtain reveal */}
 <motion.div
 initial={reduce ? { y: "100%" } : { y: 0 }}
 animate={{ y: "100%" }}
 transition={{
 duration: 1.4,
 delay: 0.6,
 ease: [0.7, 0, 0.3, 1],
 }}
 className="absolute inset-0 bg-espresso"
 aria-hidden="true"
 />

 <CornerFrames />
 </motion.div>

 {/* Floating testimonial badge */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 24 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{
 duration: 0.7,
 delay: 1.25,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="absolute -bottom-6 -left-6 hidden max-w-xs rounded-2xl bg-mocha p-5 shadow-card ring-1 ring-linen/10 md:block lg:-left-10"
 >
 <div className="flex items-start gap-3">
 <span
 aria-hidden="true"
 className="relative mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tan/25 text-tan"
 >
 <motion.span
 animate={
 reduce
 ? undefined
 : { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }
 }
 transition={{
 duration: 2.4,
 repeat: Infinity,
 ease: "easeOut",
 }}
 className="absolute inset-0 rounded-full bg-tan/40"
 />
 <svg
 viewBox="0 0 24 24"
 fill="currentColor"
 className="relative h-4 w-4"
 >
 <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21Z" />
 </svg>
 </span>
 <div>
 <p className="text-[0.65rem] uppercase tracking-[0.22em] text-tan">
 5-star review
 </p>
 <p className="mt-1.5 text-sm leading-snug text-linen/90">
 &ldquo;I had an amazing experience! Dr. Dustin was incredibly
 accommodating, and his adjustment and treatment were
 absolutely top-notch. I highly recommend him!&rdquo;
 </p>
 <p className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-linen/60">
 &mdash; Nick, Google review
 </p>
 </div>
 </div>
 </motion.div>

 {/* Small floating "EST." chip top-right for editorial touch */}
 <motion.div
 initial={reduce ? false : { opacity: 0, x: 12 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{
 duration: 0.7,
 delay: 1.45,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="absolute -right-4 top-8 hidden rounded-full border border-linen/15 bg-espresso/90 px-4 py-2 backdrop-blur-sm md:inline-flex lg:-right-6"
 >
 <span className="text-[0.65rem] uppercase tracking-[0.24em] text-tan">
 Laguna Hills · Est. 2020
 </span>
 </motion.div>
 </div>
 </div>
 </div>

 {/* Scroll hint at the bottom */}
 <ScrollHint reduce={!!reduce} />
 </div>

 <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-linen/10" />
 </section>
 );
}

/* ---------------------------------------------------------------------- */
/* Headline word helper */
/* ---------------------------------------------------------------------- */

function HeadlineWord({
 part,
 index,
 reduce,
}: {
 part: HeadlinePart;
 index: number;
 reduce: boolean;
}) {
 const delay = 0.15 + index * 0.09;
 const inner = (
 <motion.span
 className={`inline-block ${
 part.accent ? "italic text-tan" : ""
 }`}
 initial={reduce ? { y: 0 } : { y: "110%" }}
 animate={{ y: 0 }}
 transition={{
 duration: 0.75,
 delay,
 ease: [0.16, 1, 0.3, 1],
 }}
 >
 {part.text}
 </motion.span>
 );

 return (
 <>
 {part.newLine ? <br /> : index > 0 ? " " : null}
 <span className="inline-flex overflow-hidden pb-[0.1em] pr-[0.15em] align-top">
 {inner}
 </span>
 </>
 );
}

/* ---------------------------------------------------------------------- */
/* Sub-components */
/* ---------------------------------------------------------------------- */

function StatusPill() {
 const reduce = useReducedMotion();
 return (
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 8 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
 className="inline-flex items-center gap-3 rounded-full border border-linen/15 bg-linen/[0.03] px-4 py-2 backdrop-blur-sm"
 >
 <span className="relative inline-flex h-2 w-2">
 <motion.span
 animate={
 reduce ? undefined : { scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] }
 }
 transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
 className="absolute inset-0 rounded-full bg-tan"
 />
 <span className="relative h-2 w-2 rounded-full bg-tan" />
 </span>
 <p className="text-[0.7rem] uppercase tracking-[0.22em] text-linen/80">
 Chiropractic Care · Laguna Hills, CA
 </p>
 </motion.div>
 );
}

function HeroStat({
 value,
 suffix,
 label,
}: {
 value: number;
 suffix?: string;
 label: string;
}) {
 return (
 <div>
 <div className="font-serif text-3xl leading-none text-tan md:text-4xl">
 <Counter value={value} suffix={suffix} />
 </div>
 <p className="mt-2 text-[0.7rem] uppercase tracking-[0.18em] text-linen/60">
 {label}
 </p>
 </div>
 );
}

/* --- Ambient warm glow --- */
function AmbientGlow() {
 return (
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0"
 style={{
 background:
 "radial-gradient(60% 55% at 78% 30%, rgba(185,165,144,0.20) 0%, rgba(87,76,63,0) 60%), radial-gradient(50% 45% at 15% 85%, rgba(87,76,63,0.45) 0%, rgba(54,48,42,0) 55%)",
 }}
 />
 );
}

/* --- Sparse tan dot grid --- */
function DotField() {
 return (
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0 opacity-[0.09]"
 style={{
 backgroundImage:
 "radial-gradient(rgba(185,165,144,0.9) 1px, transparent 1px)",
 backgroundSize: "28px 28px",
 maskImage:
 "radial-gradient(80% 60% at 50% 30%, black 40%, transparent 100%)",
 WebkitMaskImage:
 "radial-gradient(80% 60% at 50% 30%, black 40%, transparent 100%)",
 }}
 />
 );
}

/* --- Floating tan particles that drift slowly --- */
function FloatingParticles() {
 const reduce = useReducedMotion();
 if (reduce) return null;

 // Hand-placed so distribution feels considered, not random.
 const particles = [
 { x: 12, y: 22, size: 3, dur: 22, delay: 0, drift: -34 },
 { x: 28, y: 68, size: 2, dur: 28, delay: 3, drift: -22 },
 { x: 42, y: 15, size: 4, dur: 26, delay: 6, drift: -40 },
 { x: 58, y: 78, size: 2, dur: 30, delay: 2, drift: -28 },
 { x: 74, y: 35, size: 3, dur: 24, delay: 9, drift: -32 },
 { x: 88, y: 70, size: 2, dur: 27, delay: 5, drift: -26 },
 { x: 6, y: 55, size: 3, dur: 25, delay: 8, drift: -30 },
 { x: 52, y: 88, size: 2, dur: 29, delay: 4, drift: -24 },
 { x: 82, y: 12, size: 2, dur: 31, delay: 7, drift: -36 },
 ];

 return (
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0 overflow-hidden"
 >
 {particles.map((p, i) => (
 <motion.span
 key={i}
 className="absolute block rounded-full bg-tan"
 style={{
 left: `${p.x}%`,
 top: `${p.y}%`,
 width: p.size,
 height: p.size,
 }}
 animate={{
 y: [0, p.drift, 0],
 opacity: [0.25, 0.7, 0.25],
 }}
 transition={{
 duration: p.dur,
 delay: p.delay,
 repeat: Infinity,
 ease: "easeInOut",
 }}
 />
 ))}
 </div>
 );
}

/* --- Rotating conic-gradient orb behind the photo --- */
function RotatingGlow() {
 const reduce = useReducedMotion();
 return (
 <motion.div
 aria-hidden="true"
 animate={reduce ? undefined : { rotate: 360 }}
 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
 className="pointer-events-none absolute -inset-8 -z-0 rounded-full opacity-45 blur-3xl"
 style={{
 background:
 "conic-gradient(from 0deg, rgba(185,165,144,0.6), rgba(87,76,63,0), rgba(185,165,144,0.35), rgba(87,76,63,0), rgba(185,165,144,0.6))",
 }}
 />
 );
}

/* --- Dashed tan orbit ring rotating around the photo --- */
function OrbitRing() {
 const reduce = useReducedMotion();
 return (
 <motion.svg
 aria-hidden="true"
 viewBox="0 0 400 500"
 preserveAspectRatio="none"
 animate={reduce ? undefined : { rotate: -360 }}
 transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
 className="pointer-events-none absolute -inset-6 -z-0 h-[calc(100%+3rem)] w-[calc(100%+3rem)] opacity-40"
 fill="none"
 stroke="currentColor"
 >
 <ellipse
 cx="200"
 cy="250"
 rx="196"
 ry="246"
 strokeWidth="0.75"
 strokeDasharray="4 12"
 className="text-tan"
 />
 </motion.svg>
 );
}

/* --- Corner frame ticks on the photo --- */
function CornerFrames() {
 const commonBase = "absolute h-4 w-4 border-tan/70";
 return (
 <>
 <span
 aria-hidden="true"
 className={`${commonBase} left-3 top-3 border-l border-t`}
 />
 <span
 aria-hidden="true"
 className={`${commonBase} right-3 top-3 border-r border-t`}
 />
 <span
 aria-hidden="true"
 className={`${commonBase} left-3 bottom-3 border-b border-l`}
 />
 <span
 aria-hidden="true"
 className={`${commonBase} right-3 bottom-3 border-b border-r`}
 />
 </>
 );
}

/* --- Decorative line-art flourish, top-right --- */
function FlourishAccent() {
 const reduce = useReducedMotion();
 const draw = (delay: number, dur = 2.4) => ({
 initial: reduce
 ? { pathLength: 1, opacity: 0.3 }
 : { pathLength: 0, opacity: 0 },
 animate: { pathLength: 1, opacity: 0.4 },
 transition: {
 pathLength: { duration: dur, delay, ease: "easeOut" as const },
 opacity: { duration: 0.6, delay },
 },
 });

 return (
 <svg
 aria-hidden="true"
 viewBox="0 0 600 600"
 className="pointer-events-none absolute -right-8 -top-32 hidden h-[720px] w-[720px] text-tan md:block"
 fill="none"
 stroke="currentColor"
 strokeWidth="1"
 strokeLinecap="round"
 >
 <motion.path
 d="M60 480 C 200 420, 260 320, 320 220 S 460 100, 560 80"
 {...draw(0.4)}
 />
 <motion.path
 d="M120 520 C 240 460, 300 360, 360 260 S 500 140, 580 130"
 {...draw(0.7)}
 />
 <motion.path
 d="M180 560 C 280 500, 340 400, 400 300 S 520 180, 590 180"
 {...draw(1.0)}
 />
 <motion.path
 d="M40 420 C 180 380, 240 300, 300 180"
 strokeWidth="0.8"
 {...draw(1.3, 1.8)}
 />
 <motion.circle
 cx="0"
 cy="0"
 r="3.5"
 fill="currentColor"
 stroke="none"
 initial={reduce ? { opacity: 0.6 } : { opacity: 0 }}
 animate={
 reduce
 ? { opacity: 0.6 }
 : {
 opacity: [0, 1, 1, 0.4],
 cx: [60, 320, 560, 60],
 cy: [480, 220, 80, 480],
 }
 }
 transition={{
 duration: 7,
 delay: 2.6,
 repeat: Infinity,
 ease: "easeInOut",
 }}
 />
 <circle cx="320" cy="220" r="2" fill="currentColor" opacity="0.55" />
 <circle cx="560" cy="80" r="2" fill="currentColor" opacity="0.45" />
 <circle cx="180" cy="440" r="2" fill="currentColor" opacity="0.4" />
 </svg>
 );
}

/* --- EKG heartbeat trace under the H1 --- */
function Heartbeat({ delay = 0 }: { delay?: number }) {
 const reduce = useReducedMotion();

 // 4 heartbeat "QRS" clusters spaced across a 1200-wide viewBox.
 // Path stays on the y=30 baseline between spikes.
 const d =
 "M 0 30 L 180 30 L 190 27 L 200 30 L 218 30 L 224 42 L 232 6 L 240 50 L 248 30 L 262 27 L 272 30 L 430 30 L 440 27 L 450 30 L 468 30 L 474 42 L 482 6 L 490 50 L 498 30 L 512 27 L 522 30 L 680 30 L 690 27 L 700 30 L 718 30 L 724 42 L 732 6 L 740 50 L 748 30 L 762 27 L 772 30 L 930 30 L 940 27 L 950 30 L 968 30 L 974 42 L 982 6 L 990 50 L 998 30 L 1012 27 L 1022 30 L 1200 30";

 return (
 <div
 aria-hidden="true"
 className="mt-8 max-w-xl overflow-hidden"
 >
 <svg
 viewBox="0 0 1200 60"
 preserveAspectRatio="none"
 className="h-10 w-full"
 fill="none"
 >
 <defs>
 <linearGradient id="ekg-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
 <stop offset="0%" stopColor="#B9A590" stopOpacity="0.35" />
 <stop offset="20%" stopColor="#B9A590" stopOpacity="1" />
 <stop offset="80%" stopColor="#B9A590" stopOpacity="1" />
 <stop offset="100%" stopColor="#B9A590" stopOpacity="0.35" />
 </linearGradient>
 </defs>

 {/* Static faint baseline that shows before the animated trace lands */}
 <line
 x1="0"
 y1="30"
 x2="1200"
 y2="30"
 stroke="#B9A590"
 strokeOpacity="0.15"
 strokeWidth="1"
 />

 {/* The trace itself, draws in from left to right */}
 <motion.path
 d={d}
 stroke="url(#ekg-stroke)"
 strokeWidth="1.75"
 strokeLinecap="round"
 strokeLinejoin="round"
 initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
 animate={{ pathLength: 1, opacity: 1 }}
 transition={{
 pathLength: {
 duration: 2.6,
 delay,
 ease: "easeOut" as const,
 },
 opacity: { duration: 0.3, delay },
 }}
 />

 {/* Cursor dot that loops along the width after the trace finishes */}
 <motion.circle
 cx="0"
 cy="30"
 r="3"
 fill="#B9A590"
 initial={reduce ? { opacity: 0.6 } : { opacity: 0 }}
 animate={
 reduce
 ? { opacity: 0.6 }
 : {
 opacity: [0, 1, 1, 0],
 cx: [0, 1200],
 }
 }
 transition={{
 duration: 4,
 delay: delay + 2.8,
 repeat: Infinity,
 repeatDelay: 1.2,
 ease: "linear",
 }}
 />
 </svg>
 </div>
 );
}

/* --- Vertical scroll hint --- */
function ScrollHint({ reduce }: { reduce: boolean }) {
 return (
 <motion.div
 initial={reduce ? { opacity: 1 } : { opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.8, delay: 1.8 }}
 aria-hidden="true"
 className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-linen/50"
 >
 <span className="text-[0.6rem] uppercase tracking-[0.28em]">Scroll</span>
 <span className="relative block h-8 w-px overflow-hidden bg-linen/20">
 <motion.span
 className="absolute inset-x-0 top-0 block h-3 bg-tan"
 animate={reduce ? undefined : { y: [-12, 32, -12] }}
 transition={{
 duration: 2.2,
 repeat: Infinity,
 ease: "easeInOut",
 }}
 />
 </span>
 </motion.div>
 );
}
