import Image from "next/image";
import Link from "next/link";
import { BookNowLink } from "@/app/_components/BookNowLink";
import { NEW_PATIENT_CTA_LABEL } from "@/lib/site";
import type { Service } from "@/lib/services";
import type { CityLocation } from "@/lib/locations";
import type { CityOverviewContent } from "@/lib/serviceAreas";

/**
 * Server-rendered view for /areas-we-serve/[city].
 * Lists all 14 services available to patients from this city, plus a
 * short, factually-grounded local overview and FAQ.
 */
export function CityAreaView({
  location,
  services,
  content,
}: {
  location: CityLocation;
  services: readonly Service[];
  content: CityOverviewContent;
}) {
  const cityPath = `/areas-we-serve/${location.slug}`;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative min-h-[380px] w-full overflow-hidden bg-espresso">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 60% at 85% 0%, rgba(185,165,144,0.16) 0%, rgba(54,48,42,0) 60%), radial-gradient(45% 55% at 10% 100%, rgba(87,76,63,0.4) 0%, rgba(54,48,42,0) 55%)",
          }}
        />
        <div className="container-shell relative z-10 flex min-h-[380px] flex-col justify-center py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-linen/80"
          >
            <Link href="/areas-we-serve" className="hover:text-linen">
              Areas We Serve
            </Link>
          </nav>
          <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.05] tracking-tight text-linen md:text-5xl">
            Chiropractic &amp; recovery care for {location.name}, CA
            <span aria-hidden="true" className="text-tan">
              .
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-linen md:text-lg">
            {content.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BookNowLink className="btn-primary inline-flex items-center gap-2">
              {NEW_PATIENT_CTA_LABEL}
              <span aria-hidden="true">&rarr;</span>
            </BookNowLink>
            <span className="text-xs uppercase tracking-[0.2em] text-linen/60">
              {location.region}
            </span>
          </div>
        </div>
      </section>

      {/* ---------- Local facts strip ---------- */}
      <section className="section-cream section relative overflow-hidden">
        <div className="container-shell relative z-10">
          <div className="stats-strip">
            <div className="stat">
              <span className="stat-value text-tan">
                {location.home ? "0" : location.driveMinutes}
              </span>
              <span className="stat-label">
                {location.home ? "min, we're local" : "min drive, approx."}
              </span>
            </div>
            <div className="stat">
              <span className="stat-value text-tan">14</span>
              <span className="stat-label">services available</span>
            </div>
            <div className="stat">
              <span className="stat-value text-tan">{location.zip}</span>
              <span className="stat-label">primary ZIP served</span>
            </div>
            <div className="stat">
              <span className="stat-value text-tan">{location.freeway.split(" ")[0]}</span>
              <span className="stat-label">main route in</span>
            </div>
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-mocha md:text-base">
            {content.commuteNote} Patients near {location.landmark} and the{" "}
            {location.neighborhood} area regularly build Aligned Health into
            their regular care routine, not just a one-time visit.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-mocha md:text-base">
            {content.localStory}
          </p>
        </div>
      </section>

      {/* ---------- Services grid ---------- */}
      <section className="section-linen section relative overflow-hidden">
        <div className="container-shell relative z-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">All services</p>
              <h2 className="heading-section mt-4">
                Care available in <span className="italic text-tan">{location.name}.</span>
              </h2>
            </div>
            <Link href="/services" className="btn-outline btn-sm">
              Full services overview
              <span aria-hidden="true" className="ml-1">
                &rarr;
              </span>
            </Link>
          </div>

          <span className="divider-hairline mt-10 block" />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`${cityPath}/${service.slug}`}
                className="card-image block"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="card-image-media"
                  />
                </div>
                <div className="card-image-body">
                  <p className="eyebrow !text-mocha">{service.short}</p>
                  <h3 className="heading-card mt-2">
                    {service.label} in {location.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section-cream section relative overflow-hidden">
        <div className="container-shell relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Common questions</p>
            <h2 className="heading-section mt-4">
              {location.name} <span className="italic text-tan">patients ask.</span>
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-tan/25 rounded-3xl border border-tan/25 bg-linen">
            {[content.localFaq, ...content.extraFaqs].map((faq) => (
              <div key={faq.q} className="p-6 md:p-7">
                <p className="font-serif text-lg text-espresso md:text-xl">
                  {faq.q}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-mocha md:text-base">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section-espresso section relative overflow-hidden">
        <div className="container-shell relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Ready when you are</p>
            <h2 className="heading-section mt-4 !text-linen">
              Schedule your visit from {location.name}.
            </h2>
          </div>
          <BookNowLink className="btn-cta-onDark inline-flex items-center gap-2 whitespace-nowrap">
            {NEW_PATIENT_CTA_LABEL}
            <span aria-hidden="true">&rarr;</span>
          </BookNowLink>
        </div>
      </section>
    </>
  );
}
