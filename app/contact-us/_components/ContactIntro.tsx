"use client";

import Image from "next/image";
import {
 motion,
 useReducedMotion,
 useScroll,
 useTransform,
 type Variants,
} from "motion/react";
import { useRef } from "react";
import { CLINIC, MAPS_URL } from "@/lib/site";
import { EmailLink } from "@/app/_components/EmailLink";
import { BookNowLink } from "@/app/_components/BookNowLink";
import { LeadConnectorForm } from "@/app/_components/LeadConnectorForm";

/**
 * /contact-us, full-bleed hero photo + wave divider + two-column content
 * section carrying the intro paragraph, a 4-field contact form, and a
 * sidebar with the address, phone, email, and response-time note.
 *
 * Copy verbatim from the live /contact-us page:
 * H1: "Contact us."
 * P: "To help us best serve your inquiry..."
 *
 * Form fields exactly match the source: First Name / Last Name / Email /
 * Message, with a Send submit button.
 */

const HERO_PHOTO = "/images/contact-us/hero-v2.jpg";

const PHONE_TEL = CLINIC.phone.replace(/[^\d+]/g, "");
const MAP_LINK = MAPS_URL;

interface Word {
 text: string;
 accent?: boolean;
}
const HEADING_WORDS: readonly Word[] = [
 { text: "Contact" },
 { text: "us.", accent: true },
];

const HEADING_CONTAINER: Variants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

export function ContactIntro() {
 const reduce = useReducedMotion();
 const heroRef = useRef<HTMLDivElement>(null);

 const { scrollYProgress } = useScroll({
 target: heroRef,
 offset: ["start start", "end start"],
 });
 const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
 const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);
 const overlay = useTransform(scrollYProgress, [0, 1], [0.4, 0.75]);

 return (
 <>
 {/* --- Hero --- */}
 <section
 ref={heroRef}
 className="relative h-[70vh] min-h-[520px] w-full overflow-hidden bg-espresso"
 >
 <motion.div
 style={reduce ? undefined : { y: photoY, scale: photoScale }}
 className="absolute inset-0"
 >
 <Image
 src={HERO_PHOTO}
 alt="A note reading 'We're here to help' next to an Aligned Health contact card on a desk"
 fill
 priority
 quality={90}
 sizes="100vw"
 className="object-cover"
 />
 </motion.div>
 {/* Flat base darkening, keeps the heading legible regardless of scroll position */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0 bg-espresso/45"
 />
 <motion.div
 aria-hidden="true"
 style={reduce ? undefined : { opacity: overlay }}
 className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-espresso/20 to-espresso/80"
 />

 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0"
 style={{
 background:
 "radial-gradient(50% 45% at 15% 25%, rgba(185,165,144,0.16) 0%, rgba(54,48,42,0) 60%)",
 }}
 />

 {/* Top eyebrow tag */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: -8 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
 className="container-shell relative z-10 flex items-center gap-3 pt-24 text-linen md:pt-32"
 >
 <span aria-hidden="true" className="relative inline-flex h-2 w-2">
 <motion.span
 animate={
 reduce
 ? undefined
 : { scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] }
 }
 transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
 className="absolute inset-0 rounded-full bg-tan"
 />
 <span className="relative h-2 w-2 rounded-full bg-tan" />
 </span>
 <p className="text-[0.7rem] uppercase tracking-[0.28em] text-linen/85">
 Get in touch
 </p>
 </motion.div>

 <motion.h1
 variants={HEADING_CONTAINER}
 initial="hidden"
 animate="visible"
 className="container-shell relative z-10 mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-linen md:text-5xl lg:text-6xl"
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

 <WaveDivider />
 </section>

 {/* --- Content section --- */}
 <section className="section-cream section relative overflow-hidden">
 <BackgroundFlourish />

 <div className="container-shell relative z-10">
 {/* Header row */}
 <div className="mx-auto max-w-5xl">
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="flex items-center gap-3"
 >
 <span aria-hidden="true" className="block h-px w-10 bg-tan" />
 <p className="eyebrow !text-mocha">We&rsquo;re listening</p>
 </motion.div>

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

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.6,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-8 max-w-2xl text-base leading-relaxed text-mocha md:text-lg"
 >
 If your back, neck, or a sports tweak is not settling, tell us what is
 going on. We usually reply within{" "}
 <span className="italic text-espresso">one business day.</span> Prefer
 to talk? Call (949) 557-7208. We can also check PPO coverage before
 you drive over.
 </motion.p>
 </div>

 {/* Form + sidebar */}
 <div className="mt-14 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
 {/* Form, 7 cols */}
 <motion.div
 initial={reduce ? false : { opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
 className="lg:col-span-7"
 >
 <ContactForm />
 </motion.div>

 {/* Sidebar, 5 cols */}
 <motion.aside
 initial={reduce ? false : { opacity: 0, x: 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.85,
 delay: 0.15,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="lg:col-span-5"
 >
 <ContactSidebar />
 </motion.aside>
 </div>
 </div>
 </section>
 </>
 );
}

/* ---------------------------------------------------------------------- */
/* Contact form */
/* ---------------------------------------------------------------------- */

function ContactForm() {
 return (
 <div className="rounded-3xl border border-tan/30 bg-linen p-6 shadow-card md:p-10">
 <LeadConnectorForm />
 </div>
 );
}

/* ---------------------------------------------------------------------- */
/* Sidebar */
/* ---------------------------------------------------------------------- */

function ContactSidebar() {
 return (
 <div className="flex h-full flex-col gap-4">
 {/* Address / directions */}
 <div className="rounded-3xl border border-tan/30 bg-linen p-6 md:p-7">
 <div className="flex items-start gap-4">
 <IconChip>
 <PinIcon />
 </IconChip>
 <div className="min-w-0 flex-1">
 <p className="eyebrow !text-mocha">The office</p>
 <address className="mt-3 flex flex-col gap-1 text-sm not-italic leading-relaxed text-espresso">
 <span>{CLINIC.address.street}</span>
 <span>
 {CLINIC.address.city}, {CLINIC.address.region}{" "}
 {CLINIC.address.postalCode}
 </span>
 </address>
 <a
 href={MAP_LINK}
 target="_blank"
 rel="noopener noreferrer"
 className="mt-3 inline-flex items-center gap-1 text-[0.65rem] uppercase tracking-[0.2em] text-mocha underline decoration-tan underline-offset-4 hover:text-espresso"
 >
 Get directions <span aria-hidden="true">↗</span>
 </a>
 </div>
 </div>
 </div>

 {/* Phone */}
 <div className="rounded-3xl border border-tan/30 bg-linen p-6 md:p-7">
 <div className="flex items-start gap-4">
 <IconChip>
 <PhoneIcon />
 </IconChip>
 <div className="min-w-0 flex-1">
 <p className="eyebrow !text-mocha">Call the office</p>
 <a
 href={`tel:${PHONE_TEL}`}
 className="mt-2 block font-serif text-2xl text-espresso hover:text-mocha md:text-3xl"
 >
 {CLINIC.phoneDisplay}
 </a>
 </div>
 </div>
 </div>

 {/* Email */}
 <div className="rounded-3xl border border-tan/30 bg-linen p-6 md:p-7">
 <div className="flex items-start gap-4">
 <IconChip>
 <MailIcon />
 </IconChip>
 <div className="min-w-0 flex-1">
 <p className="eyebrow !text-mocha">Email us</p>
 <div className="mt-2 flex flex-wrap items-baseline gap-x-1">
 <EmailLink
 email={CLINIC.email}
 className="block break-all text-sm text-espresso underline decoration-tan underline-offset-4 hover:text-mocha md:text-base"
 copiedClassName="text-mocha"
 />
 </div>
 <p className="mt-2 text-xs leading-relaxed text-mocha/70">
 General response time is one business day.
 </p>
 </div>
 </div>
 </div>

 {/* Book online CTA */}
 <div className="rounded-3xl border border-linen/25 bg-espresso p-6 text-linen md:p-7">
 <p className="eyebrow">Prefer to book directly?</p>
 <p className="mt-3 text-sm leading-relaxed text-linen/85">
 Schedule now. Secure scheduling through Jane App.
 </p>
 <BookNowLink className="btn-cta-onDark btn-sm mt-5 inline-flex w-full items-center justify-center gap-2 whitespace-normal text-center leading-snug">
 Book your New Patient Appointment
 <span aria-hidden="true">→</span>
 </BookNowLink>
 </div>
 </div>
 );
}

/* ---------------------------------------------------------------------- */
/* Shared bits */
/* ---------------------------------------------------------------------- */

function IconChip({ children }: { children: React.ReactNode }) {
 return (
 <span
 aria-hidden="true"
 className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-tan/15 text-tan"
 >
 {children}
 </span>
 );
}

function PinIcon() {
 return (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
 <path d="M12 22s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z" />
 <circle cx="12" cy="10" r="2.5" />
 </svg>
 );
}

function PhoneIcon() {
 return (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
 <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />
 </svg>
 );
}

function MailIcon() {
 return (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
 <rect x="3" y="5" width="18" height="14" rx="2" />
 <path d="M3 7l9 6 9-6" />
 </svg>
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
