"use client";

import Image from "next/image";
import Link from "next/link";
import {
 motion,
 useReducedMotion,
 type Variants,
} from "motion/react";

/**
 * About / Signature approach, deep dive on the three primary modalities
 * the practice combines. Copy is verbatim from the live services page for
 * each modality.
 */

interface Practice {
 slug: string;
 title: string;
 description: string;
 imageSrc: string;
 imageAlt: string;
}

const PRACTICES: readonly Practice[] = [
 {
 slug: "chiropractic-adjustments",
 title: "Diversified Adjusting",
 description:
 "A high-velocity, low-amplitude thrust aimed at the joint that has lost motion. The goal is simple: get the segment moving again so the muscle around it can stop guarding.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/3dd5634c-1569-4b59-9138-2caf3eb46524/IMG_8324.jpg",
 imageAlt: "Chiropractor performing a diversified spinal adjustment",
 },
 {
 slug: "percussion-therapy",
 title: "Percussion Therapy",
 description:
 "Rapid, targeted pulses into a tight muscle. We use it before an adjustment so the tissue is ready, and after so the change actually holds — not as a gadget demo.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/735abe96-9486-433e-9899-802b92cc0e45/IMG_8435.jpg",
 imageAlt: "Percussion therapy device being used on a patient",
 },
 {
 slug: "pneumatic-compressions",
 title: "Pneumatic Compression",
 description:
 "Inflatable sleeves that pump in sequence, the same idea as a pro training room. Useful after a hard session, a long drive, or when your legs feel heavy and slow to recover.",
 imageSrc:
 "https://images.squarespace-cdn.com/content/v1/5ee5219c63842071d176def5/d644eb01-5e65-4e5c-a604-f4dfcc95e70c/IMG_8245.jpeg",
 imageAlt: "Pneumatic compression recovery boots on a patient's legs",
 },
];

export function AboutApproach() {
 const reduce = useReducedMotion();

 const container: Variants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
 };
 const card: Variants = {
 hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
 },
 };

 return (
 <section className="section-cream section relative overflow-hidden">
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
 Signature approach
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
 Three modalities we{" "}
 <span className="italic text-mocha">combine.</span>
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
 <Link href="/services" className="btn-outline btn-sm">
 View All Services
 <span aria-hidden="true" className="ml-1">
 →
 </span>
 </Link>
 </motion.div>
 </div>

 {/* Cards */}
 <motion.ul
 variants={container}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 className="mt-14 grid gap-6 md:grid-cols-3 md:gap-6 lg:gap-8"
 >
 {PRACTICES.map((practice) => (
 <motion.li key={practice.slug} variants={card}>
 <Link
 href={`/services/${practice.slug}`}
 className="group flex h-full flex-col overflow-hidden rounded-3xl bg-linen shadow-card ring-1 ring-tan/20 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-card-hover"
 >
 <div className="relative aspect-[4/3] w-full overflow-hidden">
 <Image
 src={practice.imageSrc}
 alt={practice.imageAlt}
 fill
 sizes="(min-width: 768px) 33vw, 100vw"
 className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
 />
 </div>
 <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
 <h3 className="heading-card">{practice.title}</h3>
 <p className="text-sm leading-relaxed text-mocha md:text-base">
 {practice.description}
 </p>
 <span
 aria-hidden="true"
 className="mt-auto inline-flex items-center gap-2 pt-4 text-[0.7rem] uppercase tracking-[0.22em] text-espresso underline decoration-tan/60 underline-offset-4 transition-colors group-hover:text-mocha group-hover:decoration-tan"
 >
 Learn more
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
