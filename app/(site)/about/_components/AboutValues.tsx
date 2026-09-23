"use client";

import {
 motion,
 useReducedMotion,
 type Variants,
} from "motion/react";
import type { ReactNode } from "react";

/**
 * About / Our principles, three numbered values that define how the
 * practice works. Copy summarizes the ethos already stated across the
 * source site's homepage and team page.
 */

interface Value {
 index: string;
 title: string;
 body: string;
 Icon: (p: { className?: string }) => ReactNode;
}

const VALUES: readonly Value[] = [
 {
 index: "01",
 title: "Evidence-based care",
 body: "We pick the tool that matches the tissue in front of us. Diversified adjusting when a joint is stuck. Decompression when a disc is crowding a nerve. Soft-tissue work when the muscle is the problem. No one-size protocol, and no 20-visit package on day one.",
 Icon: BeakerIcon,
 },
 {
 index: "02",
 title: "Personal attention",
 body: "Every session is one-on-one with Dr. Dustin Hack or Dr. Tara Hadden. They stay in the room. If you live in Irvine, Mission Viejo, or Laguna Niguel and you are driving over, you should not spend that time with someone who is not the doctor.",
 Icon: HandIcon,
 },
];

export function AboutValues() {
 const reduce = useReducedMotion();

 const container: Variants = {
 hidden: {},
 visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
 };
 const card: Variants = {
 hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
 visible: {
 opacity: 1,
 y: 0,
 transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
 },
 };

 return (
 <section className="section-linen section relative overflow-hidden">
 <div className="container-shell relative z-10">
 {/* Header */}
 <div className="grid gap-8 md:grid-cols-12 md:items-end">
 <div className="md:col-span-7 lg:col-span-6">
 <motion.p
 initial={reduce ? false : { opacity: 0, y: 10 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className="eyebrow"
 >
 Our principles
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
 How we{" "}
 <span className="italic text-mocha">practice.</span>
 </motion.h2>
 </div>
 <div className="md:col-span-5 md:col-start-8">
 <div className="flex items-center gap-4">
 <motion.span
 aria-hidden="true"
 initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
 whileInView={{ scaleX: 1 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 1.1,
 delay: 0.25,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="block h-px flex-1 origin-left bg-tan/60"
 />
 <span className="whitespace-nowrap text-[0.7rem] uppercase tracking-[0.24em] text-mocha/70">
 Two principles
 </span>
 </div>
 </div>
 </div>

 {/* Cards */}
 <motion.ul
 variants={container}
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "0px 0px -80px 0px" }}
 className="mt-14 grid gap-6 sm:grid-cols-2 md:mx-auto md:max-w-3xl md:gap-6 lg:gap-8"
 >
 {VALUES.map((value) => (
 <motion.li
 key={value.index}
 variants={card}
 className="group relative flex flex-col overflow-hidden rounded-3xl border border-tan/30 bg-cream p-8 shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:border-tan/60 hover:shadow-card-hover md:p-9"
 >
 <div className="flex items-start justify-between">
 <span className="font-serif text-5xl leading-none text-tan md:text-6xl">
 {value.index}
 </span>
 <IconChip>
 <value.Icon className="h-6 w-6" />
 </IconChip>
 </div>
 <h3 className="heading-card mt-8">{value.title}</h3>
 <p className="mt-4 text-sm leading-relaxed text-mocha md:text-base">
 {value.body}
 </p>
 <span
 aria-hidden="true"
 className="mt-8 block h-px w-full bg-tan/30"
 />
 </motion.li>
 ))}
 </motion.ul>
 </div>
 </section>
 );
}

/* ---------------------------------------------------------------------- */
/* Icon chip + icons */
/* ---------------------------------------------------------------------- */

function IconChip({ children }: { children: ReactNode }) {
 const reduce = useReducedMotion();
 return (
 <motion.span
 initial={reduce ? false : { opacity: 0, scale: 0.7 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true, margin: "0px 0px -60px 0px" }}
 transition={{
 duration: 0.5,
 delay: 0.4,
 ease: [0.16, 1, 0.3, 1],
 }}
 className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-tan/15 text-tan transition-colors duration-500 group-hover:bg-tan/25"
 >
 {children}
 </motion.span>
 );
}

interface IconProps {
 className?: string;
}

function BeakerIcon({ className }: IconProps) {
 const reduce = useReducedMotion();
 const draw = (delay: number) => ({
 initial: reduce
 ? { pathLength: 1, opacity: 1 }
 : { pathLength: 0, opacity: 0 },
 whileInView: { pathLength: 1, opacity: 1 },
 viewport: { once: true, margin: "0px 0px -60px 0px" },
 transition: {
 pathLength: { duration: 1.2, delay, ease: "easeOut" as const },
 opacity: { duration: 0.3, delay },
 },
 });
 return (
 <svg
 viewBox="0 0 32 32"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 className={className}
 aria-hidden="true"
 >
 <motion.path d="M12 4 H20 M13 4 V13 L6 26 A2 2 0 0 0 8 28 H24 A2 2 0 0 0 26 26 L19 13 V4" {...draw(0.9)} />
 <motion.path d="M9 22 H23" {...draw(1.4)} />
 </svg>
 );
}

function HandIcon({ className }: IconProps) {
 const reduce = useReducedMotion();
 const draw = (delay: number) => ({
 initial: reduce
 ? { pathLength: 1, opacity: 1 }
 : { pathLength: 0, opacity: 0 },
 whileInView: { pathLength: 1, opacity: 1 },
 viewport: { once: true, margin: "0px 0px -60px 0px" },
 transition: {
 pathLength: { duration: 1.2, delay, ease: "easeOut" as const },
 opacity: { duration: 0.3, delay },
 },
 });
 return (
 <svg
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.75"
 strokeLinecap="round"
 strokeLinejoin="round"
 className={className}
 aria-hidden="true"
 >
 {/* Middle finger */}
 <motion.path
 d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"
 {...draw(0.9)}
 />
 {/* Index finger */}
 <motion.path
 d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"
 {...draw(1.1)}
 />
 {/* Ring/pinky finger */}
 <motion.path
 d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"
 {...draw(1.3)}
 />
 {/* Palm + thumb sweep */}
 <motion.path
 d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
 {...draw(1.5)}
 />
 </svg>
 );
}
