"use client";

import {
 motion,
 useReducedMotion,
} from "motion/react";
import { MagneticLink } from "@/app/_components/motion/MagneticLink";
import { useBookingModal } from "@/app/_components/booking/BookingModalContext";
import { CLINIC, NEW_PATIENT_CTA_LABEL } from "@/lib/site";

/**
 * About / Closing CTA, dark espresso section pushing the visitor toward
 * booking or contacting the office.
 */

const PHONE_TEL = CLINIC.phone.replace(/[^\d+]/g, "");

export function AboutClosing() {
 const reduce = useReducedMotion();
 const { openBookingModal } = useBookingModal();

 return (
 <section className="section-espresso section relative overflow-hidden">
 {/* Warm radial glow */}
 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-0 opacity-80"
 style={{
 background:
 "radial-gradient(50% 50% at 50% 30%, rgba(185,165,144,0.18) 0%, rgba(87,76,63,0) 65%)",
 }}
 />

 <div className="container-shell relative z-10 max-w-3xl text-center">
 <motion.p
 initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="eyebrow"
 >
 Ready to move better?
 </motion.p>

 <motion.h2
 initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.8,
 delay: 0.1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="heading-display mt-6 text-linen"
 >
 Come see what{" "}
 <span className="italic text-tan">aligned</span> feels like.
 </motion.h2>

 <motion.p
 initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.4,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="body-lead mt-8 text-linen/85"
 >
 Schedule now, most PPO plans accepted, and HSA and FSA accepted.
 Reach out and we&rsquo;ll get you scheduled same day or within 1–2 days.
 </motion.p>

 <motion.div
 initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.6,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8"
 >
 <MagneticLink
 onClick={openBookingModal}
 className="btn-cta-onDark btn-lg"
 >
 {NEW_PATIENT_CTA_LABEL}
 <span aria-hidden="true" className="ml-1">
 →
 </span>
 </MagneticLink>

 <a
 href={`tel:${PHONE_TEL}`}
 className="text-sm uppercase tracking-[0.2em] text-linen/80 underline decoration-tan underline-offset-4 transition-colors hover:text-linen"
 >
 Or call {CLINIC.phoneDisplay}
 </a>
 </motion.div>
 </div>
 </section>
 );
}
