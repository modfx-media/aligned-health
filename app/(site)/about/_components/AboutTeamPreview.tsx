"use client";

import Image from "next/image";
import Link from "next/link";
import {
 motion,
 useReducedMotion,
 type Variants,
} from "motion/react";

/**
 * About / Team preview, short two-column callout showing the doctors
 * with a "Read full bio" deep-link. Full bios live on /our-team.
 */

interface Doctor {
 slug: string;
 name: string;
 credential: string;
 role: string;
 photo: string;
 photoAlt: string;
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
 },
 {
 slug: "tara-hadden",
 name: "Dr. Tara Hadden",
 credential: "D.C.",
 role: "Chiropractor · Southern California native",
 photo:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/1600628721387-A4YL20DXRO9Z8PVW6SO1/IMG_1015-Edit_Original.JPG",
 photoAlt: "Portrait of Dr. Tara Hadden, D.C.",
 },
];

export function AboutTeamPreview() {
 const reduce = useReducedMotion();

 const container: Variants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
 };
 const card: Variants = {
 hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
 },
 };

 return (
 <section className="section-linen section relative overflow-hidden">
 <div className="container-shell relative z-10">
 {/* Header */}
 <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
 <div className="max-w-2xl">
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="eyebrow"
 >
 Meet the team
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
 className="heading-section mt-4"
 >
 Doctors you can{" "}
 <span className="italic text-mocha">trust.</span>
 </motion.h2>
 </div>

 <motion.div
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.6,
 delay: 0.2,
 ease: [0.16, 1, 0.3, 1],
 }}
 >
 <Link href="/our-team" className="btn-outline btn-sm">
 Read full bios
 <span aria-hidden="true" className="ml-1">
 →
 </span>
 </Link>
 </motion.div>
 </div>

 {/* Doctor cards */}
 <motion.ul
 variants={container}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8"
 >
 {DOCTORS.map((doctor) => (
 <motion.li key={doctor.slug} variants={card}>
 <Link
 href={`/our-team#${doctor.slug}`}
 className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream shadow-card ring-1 ring-tan/25 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-card-hover"
 >
 <div className="relative aspect-[4/5] w-full overflow-hidden">
 <Image
 src={doctor.photo}
 alt={doctor.photoAlt}
 fill
 sizes="(min-width: 768px) 50vw, 100vw"
 className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
 />
 {/* Warm bottom gradient for the role caption */}
 <div
 aria-hidden="true"
 className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent"
 />
 {/* Corner ticks */}
 <span
 aria-hidden="true"
 className="absolute left-3 top-3 h-3 w-3 border-l border-t border-linen/80"
 />
 <span
 aria-hidden="true"
 className="absolute right-3 bottom-3 h-3 w-3 border-b border-r border-linen/80"
 />
 </div>

 <div className="flex flex-1 flex-col gap-2 p-6 md:p-8">
 <h3 className="font-serif text-2xl leading-tight tracking-tight md:text-3xl">
 {doctor.name}
 <span className="italic text-tan">, {doctor.credential}</span>
 </h3>
 <p className="text-[0.7rem] uppercase tracking-[0.2em] text-mocha/80">
 {doctor.role}
 </p>
 <span
 aria-hidden="true"
 className="mt-4 inline-flex items-center gap-2 text-sm text-espresso underline decoration-tan underline-offset-4 transition-colors group-hover:text-mocha"
 >
 Read full bio
 <span
 aria-hidden="true"
 className="transition-transform duration-300 group-hover:translate-x-0.5"
 >
 →
 </span>
 </span>
 </div>
 </Link>
 </motion.li>
 ))}
 </motion.ul>
 </div>
 </section>
 );
}
