"use client";

import Image from "next/image";
import {
 motion,
 useReducedMotion,
 useScroll,
 useTransform,
 type Variants,
} from "motion/react";
import { EmailLink } from "@/app/_components/EmailLink";
import { useRef } from "react";
import { MagneticLink } from "@/app/_components/motion/MagneticLink";
import { RevealHeading } from "@/app/_components/motion/RevealHeading";
import { CLINIC } from "@/lib/site";

/**
 * "Using Your Insurance?", dark editorial section on a warm interior photo.
 *
 * Layout: 5-col grid at `lg`, content on the left (3), sticky glass cards
 * on the right (2). Background photo parallaxes on scroll, overlaid with a
 * left-heavy espresso gradient + tan radial glow + masked dot grid so the
 * image reads as ambient texture, not decoration.
 *
 * Motion (all respects `prefers-reduced-motion`):
 * - Bg image scroll parallax (12%)
 * - Word-reveal heading
 * - Copy fade-ups (staggered by delay)
 * - PPO plan chips scale + fade in one after the other
 * - Right cards slide in from the right
 * - Magnetic gift-card CTA
 */

import { JANEAPP_GIFT_CARD_URL } from "@/lib/site";

const GIFT_CARD_URL = JANEAPP_GIFT_CARD_URL;
const PHONE_TEL = CLINIC.phone.replace(/[^\d+]/g, "");
const BG_IMAGE =
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/13a8a82a-4f38-4686-997f-57d70e3e14b1/IMG_7513.jpeg";

const PPO_PLANS = [
 "Aetna",
 "Meritain Health",
 "Anthem Blue Cross",
 "Blue Shield of CA",
 "United Healthcare",
 "Cigna",
] as const;

export function InsuranceSection() {
 const reduce = useReducedMotion();
 const sectionRef = useRef<HTMLElement>(null);

 const { scrollYProgress } = useScroll({
 target: sectionRef,
 offset: ["start end", "end start"],
 });
 const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

 const chipContainer: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.08, delayChildren: 0.5 },
 },
 };
 const chip: Variants = {
 hidden: reduce
 ? { opacity: 1, y: 0, scale: 1 }
 : { opacity: 0, y: 14, scale: 0.94 },
 visible: {
 opacity: 1,
 y: 0,
 scale: 1,
 transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
 },
 };

 return (
 <section
 ref={sectionRef}
 className="relative overflow-hidden bg-espresso text-linen section"
 >
 {/* --- Background image + overlays --- */}
 <motion.div
 aria-hidden="true"
 style={reduce ? undefined : { y: bgY }}
 className="pointer-events-none absolute inset-x-0 -top-[10%] -bottom-[10%]"
 >
 <Image
 src={BG_IMAGE}
 alt=""
 fill
 sizes="100vw"
 className="object-cover opacity-30"
 />
 </motion.div>

 {/* Left-heavy espresso gradient so the text side stays legible */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0 bg-gradient-to-r from-espresso via-espresso/85 to-espresso/45"
 />

 {/* Warm tan glow anchored under the heading */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0"
 style={{
 background:
 "radial-gradient(55% 50% at 22% 28%, rgba(185,165,144,0.2) 0%, rgba(54,48,42,0) 60%)",
 }}
 />

 {/* Sparse tan dot-grid, masked to fade into the corners */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0 opacity-[0.08]"
 style={{
 backgroundImage:
 "radial-gradient(rgba(185,165,144,0.9) 1px, transparent 1px)",
 backgroundSize: "26px 26px",
 maskImage:
 "radial-gradient(80% 60% at 50% 50%, black 40%, transparent 100%)",
 WebkitMaskImage:
 "radial-gradient(80% 60% at 50% 50%, black 40%, transparent 100%)",
 }}
 />

 <div className="container-shell relative z-10">
 <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
 {/* --- Left: copy --- */}
 <div className="lg:col-span-3">
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="eyebrow"
 >
 Coverage &amp; Payment
 </motion.p>

 <RevealHeading
 as="h2"
 text={"Using Your\nInsurance?"}
 className="heading-section mt-4 text-linen lg:!text-5xl"
 delay={0.1}
 />

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.55,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-8 max-w-2xl text-base leading-relaxed text-linen/80"
 >
 <PinIcon />
 Friendly heads-up: if you&rsquo;re wanting to use insurance,
 please contact us to verify your benefits{" "}
 <strong className="font-semibold text-tan">
 &ldquo;prior&rdquo;
 </strong>{" "}
 to booking an appointment online. If you do not allow us to
 verify your benefits, any scheduled appointments will be billed
 per the pricing on the online scheduler and are held to the
 cancelation policy requirements. We&rsquo;re happy to clarify
 anything before you book an appointment online.
 </motion.p>

 {/* PPO card + chips */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.7,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-10 rounded-3xl border border-linen/15 bg-linen/[0.05] p-6 backdrop-blur-xl md:p-8"
 >
 <div className="flex items-center gap-3">
 <span aria-hidden="true" className="block h-px w-6 bg-tan" />
 <p className="eyebrow">
 We proudly accept most PPO plans
 </p>
 </div>

 <motion.ul
 variants={chipContainer}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
 >
 {PPO_PLANS.map((plan) => (
 <motion.li
 key={plan}
 variants={chip}
 className="group inline-flex items-center gap-3 rounded-full border border-linen/15 bg-linen/[0.06] px-4 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-tan/60 hover:bg-linen/[0.09]"
 >
 <span
 aria-hidden="true"
 className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tan text-espresso"
 >
 <svg
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="3"
 className="h-3 w-3"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M5 12l4.5 4.5L20 6"
 />
 </svg>
 </span>
 <span className="text-sm text-linen">{plan}</span>
 </motion.li>
 ))}
 </motion.ul>
 </motion.div>

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 1.1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-6 max-w-2xl text-xs leading-relaxed text-linen/55"
 >
 <strong className="text-linen/75">* Important.</strong>{" "}
 Please note that some of the above insurance plans may be
 processed out-of-network and deductibles/copays may vary. But
 don&rsquo;t worry we&rsquo;ll always check your benefits
 beforehand to ensure clarity and we&rsquo;re here to help answer
 any questions you have.
 </motion.p>

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 1.25,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-6 max-w-2xl text-base leading-relaxed text-linen/85"
 >
 We also accept{" "}
 <strong className="font-semibold text-tan">HSA, FSA, HRA</strong>
 , and other Health Share plans to help pay for care.
 </motion.p>
 </div>

 {/* --- Right: sticky glass aside --- */}
 <aside className="lg:col-span-2">
 <div className="sticky top-32 flex flex-col gap-5">
 <motion.div
 initial={reduce ? false : { opacity: 0, x: 24 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.8,
 delay: 0.3,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="relative overflow-hidden rounded-3xl border border-linen/15 bg-linen/[0.06] p-7 backdrop-blur-xl"
 >
 {/* Warm shimmer along the top edge */}
 <span
 aria-hidden="true"
 className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tan/70 to-transparent"
 />
 <p className="eyebrow">Give the gift of care</p>
 <h3 className="heading-card mt-3 text-linen">
 Aligned Health gift cards
 </h3>
 <p className="mt-3 text-sm leading-relaxed text-linen/75">
 Perfect for the person in your life who could use a little
 alignment.
 </p>
 <div className="mt-6">
 <MagneticLink
 href={GIFT_CARD_URL}
 external
 className="btn-cta-onDark btn-sm w-full"
 >
 Get Your Gift Card Here
 <span aria-hidden="true" className="ml-1">
 →
 </span>
 </MagneticLink>
 </div>
 </motion.div>

 <motion.div
 initial={reduce ? false : { opacity: 0, x: 24 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.8,
 delay: 0.5,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="relative overflow-hidden rounded-3xl border border-linen/15 bg-linen/[0.06] p-7 backdrop-blur-xl"
 >
 <span
 aria-hidden="true"
 className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tan/70 to-transparent"
 />
 <p className="eyebrow">Contact Us</p>
 <address className="mt-4 flex flex-col gap-2 text-sm not-italic leading-relaxed text-linen/85">
 <span>{CLINIC.address.street}</span>
 <span>
 {CLINIC.address.city}, {CLINIC.address.region}{" "}
 {CLINIC.address.postalCode}
 </span>
 <EmailLink
 email={CLINIC.email}
 className="mt-2 w-fit underline decoration-tan underline-offset-4 hover:text-linen"
 copiedClassName="text-linen/70"
 />
 <a
 href={`tel:${PHONE_TEL}`}
 className="w-fit underline decoration-tan underline-offset-4 hover:text-linen"
 >
 {CLINIC.phoneDisplay}
 </a>
 </address>
 </motion.div>
 </div>
 </aside>
 </div>
 </div>
 </section>
 );
}

/* ---------------------------------------------------------------------- */

/**
 * Small inline "pinned note" icon, tan, that replaces the emoji so it
 * renders reliably at any font size and matches the palette.
 */
function PinIcon() {
 return (
 <span
 aria-hidden="true"
 className="mr-2 inline-flex h-5 w-5 -translate-y-0.5 items-center justify-center rounded-full bg-tan/20 text-tan align-middle"
 >
 <svg
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.75"
 strokeLinecap="round"
 strokeLinejoin="round"
 className="h-3 w-3"
 >
 <path d="M12 2v6M8 6l4 6 4-6M9 22l3-8 3 8" />
 </svg>
 </span>
 );
}
