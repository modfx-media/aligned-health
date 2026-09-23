"use client";

import Image from "next/image";
import Link from "next/link";
import { BookNowLink } from "@/app/_components/BookNowLink";
import {
 motion,
 useReducedMotion,
 type Variants,
} from "motion/react";

/**
 * /our-team, two doctor profiles rendered as alternating row blocks.
 *
 * Copy is verbatim from the live site's /our-team page. Portraits are the
 * actual profile photos from the same page, verified to match each doctor
 * (Dr. Dustin wears an "Aligned Health · Dr. Dustin D.C." shirt in his
 * portrait; Dr. Tara is the second portrait in DOM order).
 */

interface Doctor {
 slug: string;
 name: string;
 credential: string;
 role: string;
 photo: string;
 photoAlt: string;
 bio: readonly string[];
 techniquesIntro: string;
 techniques: readonly string[];
 closing: string;
 quote?: string;
}

const DOCTORS: readonly Doctor[] = [
 {
 slug: "dustin-hack",
 name: "Dr. Dustin Hack",
 credential: "D.C.",
 role: "Chiropractor · 11 years of practice",
 photo:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/f9a83991-a8fd-4f8f-8fa2-a3c1b3a848df/Aligned+Health+New+Profile+pic.png",
 photoAlt: "Portrait of Dr. Dustin Hack, D.C.",
 bio: [
 "Dr. Dustin grew up in the Midwest playing hockey, football, and baseball. He graduated from Minnesota State University, Mankato in 2010 with a B.S. in Human Biology and Chemistry, spent three years in undergraduate genetics research, and served as vice president of the Future Health Care Providers club. He earned his Doctor of Chiropractic degree from Southern California University of Health Sciences and has been in practice for 11 years. In the room he is known for pairing adjustments with percussion and hands-on muscle work so a sports injury or a desk-tight back is not treated as two separate visits.",
 ],
 techniquesIntro:
 "People respond to different tools. That is why he has more than one way in:",
 techniques: [
 "Diversified Adjusting",
 "Activator",
 "Drop Table",
 "Y-Strap Cervical Distraction",
 "Graston",
 "Cupping",
 "Kinesiology Taping",
 ],
 closing:
 "He has treated ankle sprains, golfer's and tennis elbow, runner's knee, and shoulder impingement in athletes who need to get back to play without guessing. The work is adjustments, soft-tissue, percussion, exercise, and taping when it actually helps. His line is simple: the body heals itself; we give it the conditions to do that.",
 quote:
 "The power that made the body heals the body, we just need to give it the tools to do so.",
 },
 {
 slug: "tara-hadden",
 name: "Dr. Tara Hadden",
 credential: "D.C.",
 role: "Chiropractor · Southern California native",
 photo:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/1600628721387-A4YL20DXRO9Z8PVW6SO1/IMG_1015-Edit_Original.JPG",
 photoAlt: "Portrait of Dr. Tara Hadden, D.C.",
 bio: [
 "Dr. Tara was born and raised in Southern California. She grew up in karate and softball, played collegiate softball at the University of Hawaii from 2010 to 2013, and was part of the 2010 Women's World Series team. At UH she studied Kinesiology and Rehabilitation Science. She later graduated with honors from Southern California University of Health Sciences with her Doctor of Chiropractic degree.",
 ],
 techniquesIntro:
 "The techniques she uses most:",
 techniques: [
 "Diversified technique",
 "Activator technique",
 "Myofascial Release therapy",
 "Percussion therapy",
 "Rock tape and kinesio tape certified",
 ],
 closing:
 "She treats kids in rec leagues, weekend warriors, and people who sit at a desk all week. She will ask what you actually miss doing — the course, the track, the studio, the office — and build the visit around getting you back there, not around a canned protocol.",
 },
];

export function DoctorProfiles() {
 return (
 <>
 {DOCTORS.map((doctor, idx) => (
 <ProfileBlock
 key={doctor.slug}
 doctor={doctor}
 mirror={idx % 2 === 1}
 // Alternate section bg for visual rhythm.
 background={idx % 2 === 0 ? "linen" : "cream"}
 />
 ))}
 </>
 );
}

/* ---------------------------------------------------------------------- */

function ProfileBlock({
 doctor,
 mirror,
 background,
}: {
 doctor: Doctor;
 mirror: boolean;
 background: "linen" | "cream";
}) {
 const reduce = useReducedMotion();

 const chipContainer: Variants = {
 hidden: {},
 visible: {
 transition: { staggerChildren: 0.06, delayChildren: 0.6 },
 },
 };
 const chip: Variants = {
 hidden: reduce
 ? { opacity: 1, y: 0, scale: 1 }
 : { opacity: 0, y: 8, scale: 0.95 },
 visible: {
 opacity: 1,
 y: 0,
 scale: 1,
 transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
 },
 };

 const sectionCls =
 background === "cream" ? "section-cream" : "section-linen";
 const cardBg = background === "cream" ? "bg-linen" : "bg-cream";

 return (
 <section
 id={doctor.slug}
 className={`${sectionCls} section relative overflow-hidden scroll-mt-32`}
 >
 <div className="container-shell relative z-10">
 <article
 className={`flex flex-col items-center gap-10 md:items-start md:gap-14 lg:gap-20 ${
 mirror ? "md:flex-row-reverse" : "md:flex-row"
 }`}
 >
 {/* Portrait */}
 <div className="w-full md:sticky md:top-32 md:basis-5/12 md:shrink-0">
 <Portrait
 src={doctor.photo}
 alt={doctor.photoAlt}
 cardBg={cardBg}
 />
 </div>

 {/* Content */}
 <div className="w-full md:min-w-0 md:flex-1">
 {/* Name */}
 <motion.h2
 initial={reduce ? false : { opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.75,
 delay: 0.1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl"
 >
 {doctor.name}
 <span className="italic text-tan">, {doctor.credential}</span>
 </motion.h2>

 <motion.p
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.6,
 delay: 0.25,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-3 text-[0.75rem] uppercase tracking-[0.22em] text-mocha/80"
 >
 {doctor.role}
 </motion.p>

 {/* Bio paragraphs */}
 {doctor.bio.map((paragraph, index) => (
 <motion.p
 key={index}
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.4 + index * 0.15,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-6 text-base leading-relaxed text-mocha md:text-lg"
 >
 {paragraph}
 </motion.p>
 ))}

 {/* Techniques */}
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 12 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.45,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-6 text-base leading-relaxed text-mocha md:text-lg"
 >
 {doctor.techniquesIntro}
 </motion.p>

 <motion.ul
 variants={chipContainer}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 className="mt-6 flex flex-wrap gap-2"
 >
 {doctor.techniques.map((technique) => (
 <motion.li
 key={technique}
 variants={chip}
 className="rounded-full border border-tan/40 bg-linen/70 px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-mocha"
 >
 {technique}
 </motion.li>
 ))}
 </motion.ul>

 {/* Closing paragraph */}
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.7,
 delay: 0.85,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-8 text-base leading-relaxed text-mocha md:text-lg"
 >
 {doctor.closing}
 </motion.p>

 {/* Optional pull-quote */}
 {doctor.quote ? (
 <motion.blockquote
 initial={reduce ? false : { opacity: 0, y: 14 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.7,
 delay: 1,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-8 border-l-2 border-tan pl-4"
 >
 <p className="font-serif italic text-lg leading-snug text-espresso/90 md:text-xl">
 &ldquo;{doctor.quote}&rdquo;
 </p>
 </motion.blockquote>
 ) : null}

 {/* Booking CTA */}
 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 0.6,
 delay: 1.15,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="mt-10 flex flex-wrap items-center gap-4"
 >
 <BookNowLink className="btn-accent btn-sm">
 Book with {doctor.name.split(" ").slice(0, 2).join(" ")}
 <span aria-hidden="true" className="ml-1">
 →
 </span>
 </BookNowLink>
 <Link
 href="/contact-us"
 className="text-sm uppercase tracking-[0.18em] text-espresso underline decoration-tan underline-offset-4 hover:text-mocha"
 >
 Contact the office
 </Link>
 </motion.div>
 </div>
 </article>
 </div>
 </section>
 );
}

function Portrait({
 src,
 alt,
 cardBg,
}: {
 src: string;
 alt: string;
 cardBg: string;
}) {
 const reduce = useReducedMotion();
 return (
 <motion.figure
 initial={reduce ? false : { opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
 className="group relative"
 >
 <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-card ring-1 ring-tan/25">
 {/* Very slow breathing float */}
 <motion.div
 animate={reduce ? undefined : { y: [0, -6, 0] }}
 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
 className="absolute inset-0"
 >
 <Image
 src={src}
 alt={alt}
 fill
 sizes="(min-width: 768px) 42vw, 100vw"
 className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
 />
 </motion.div>

 {/* Corner ticks */}
 <span
 aria-hidden="true"
 className="absolute left-3 top-3 h-3 w-3 border-l border-t border-linen/80"
 />
 <span
 aria-hidden="true"
 className="absolute right-3 bottom-3 h-3 w-3 border-b border-r border-linen/80"
 />

 {/* Curtain reveal, kept INSIDE the overflow-hidden frame so the
 translated cream panel gets clipped on entry. */}
 <motion.div
 aria-hidden="true"
 initial={reduce ? { y: "100%" } : { y: 0 }}
 whileInView={{ y: "100%" }}
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 transition={{
 duration: 1.3,
 delay: 0.3,
 ease: [0.7, 0, 0.3, 1],
 }}
 className={`absolute inset-0 ${cardBg}`}
 />
 </div>
 </motion.figure>
 );
}
