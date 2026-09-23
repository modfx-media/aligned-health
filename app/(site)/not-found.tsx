import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section-cream section relative overflow-hidden">
      <div className="container-shell relative z-10 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-espresso md:text-6xl">
          Page not <span className="italic text-tan">found.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-mocha md:text-lg">
          That URL is not on this site. Try the homepage or the sitemap.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-espresso px-6 py-3 text-sm text-linen transition-colors hover:bg-mocha"
          >
            Back to home
          </Link>
          <Link
            href="/sitemap"
            className="rounded-full border border-tan/40 px-6 py-3 text-sm text-espresso transition-colors hover:border-tan"
          >
            View sitemap
          </Link>
        </div>
      </div>
    </section>
  );
}
