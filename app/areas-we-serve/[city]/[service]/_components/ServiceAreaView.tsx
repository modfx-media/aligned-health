import Image from "next/image";
import Link from "next/link";
import { BookNowLink } from "@/app/_components/BookNowLink";
import type { Service } from "@/lib/services";
import type { CityLocation } from "@/lib/locations";
import type { ServiceAreaContent } from "@/lib/serviceAreas";

/**
 * Server-rendered view for /areas-we-serve/[city]/[service].
 *
 * `content.structuralVariant` (0/1/2) reorders the "Why choose us" / "How
 * it works" / "Benefits" block sequence so the ~420 pages in this cluster
 * don't share one identical section order. Kept as a plain server
 * component (no client JS) since a batch this size shouldn't ship a
 * per-page motion bundle.
 */
export function ServiceAreaView({
  service,
  location,
  content,
  related,
}: {
  service: Service;
  location: CityLocation;
  content: ServiceAreaContent;
  related: readonly Service[];
}) {
  const cityPath = `/areas-we-serve/${location.slug}`;

  const whyBlock = (
    <section className="section-linen section relative overflow-hidden" key="why">
      <div className="container-shell relative z-10">
        <SectionHeader
          eyebrow={`Why ${location.name} patients choose us`}
          heading={
            <>
              Built for <span className="italic text-tan">{location.name}</span>{" "}
              patients.
            </>
          }
        />
        <ul className="mx-auto mt-12 grid max-w-4xl gap-3 md:mt-14 md:grid-cols-1 md:gap-4">
          {content.whyChooseUs.map((reason, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-tan/25 bg-cream px-5 py-4"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tan/15 text-tan"
              >
                <CheckIcon />
              </span>
              <span className="text-sm leading-relaxed text-espresso md:text-base">
                {reason}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  const howBlock = (
    <section className="section-cream section relative overflow-hidden" key="how">
      <div className="container-shell relative z-10">
        <SectionHeader
          eyebrow="How it works"
          heading={
            <>
              Inside a{" "}
              <span className="italic text-tan">{service.label.toLowerCase()}</span>{" "}
              session.
            </>
          }
        />
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {service.howItWorks.map((step, i) => (
            <div
              key={i}
              className="relative rounded-3xl border border-tan/30 bg-linen p-6 md:p-7"
            >
              <span className="font-serif text-2xl text-tan md:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-lg leading-snug text-espresso md:text-xl">
                {step.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed text-mocha md:text-base"
                dangerouslySetInnerHTML={{ __html: step.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const benefitsBlock = (
    <section className="section-linen section relative overflow-hidden" key="benefits">
      <div className="container-shell relative z-10">
        <SectionHeader
          eyebrow="What you can expect"
          heading={
            <>
              Real results,{" "}
              <span className="italic text-tan">close to home.</span>
            </>
          }
        />
        <ul className="mx-auto mt-12 grid max-w-4xl gap-3 md:mt-14 md:grid-cols-2 md:gap-4">
          {service.benefits.map((benefit, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-tan/25 bg-cream px-5 py-4"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tan/15 text-tan"
              >
                <CheckIcon />
              </span>
              <span
                className="text-sm leading-relaxed text-espresso md:text-base"
                dangerouslySetInnerHTML={{ __html: benefit }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  const orderedBlocks =
    content.structuralVariant === 0
      ? [whyBlock, howBlock, benefitsBlock]
      : content.structuralVariant === 1
        ? [howBlock, whyBlock, benefitsBlock]
        : [howBlock, benefitsBlock, whyBlock];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative min-h-[420px] w-full overflow-hidden bg-espresso">
        <Image
          src={service.imageSrc}
          alt={service.imageAlt}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/60 to-espresso/95"
        />
        <div className="container-shell relative z-10 flex min-h-[420px] flex-col justify-center py-20">
          <div className="max-w-3xl">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-linen/80"
            >
              <Link href="/areas-we-serve" className="hover:text-linen">
                Areas We Serve
              </Link>
              <span aria-hidden="true" className="block h-px w-6 bg-tan/60" />
              <Link href={cityPath} className="hover:text-linen">
                {location.name}
              </Link>
            </nav>
            <h1 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight text-linen md:text-5xl">
              {service.label} in {location.name}, CA
              <span aria-hidden="true" className="text-tan">
                .
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-linen md:text-lg">
              {content.intro}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-linen/80 md:text-base">
              {content.localStory}
            </p>
            <div className="mt-10">
              <BookNowLink className="btn-primary inline-flex items-center gap-2">
                Book your New Patient Appointment
                <span aria-hidden="true">&rarr;</span>
              </BookNowLink>
            </div>
          </div>
        </div>
      </section>

      {orderedBlocks}

      {/* ---------- FAQ ---------- */}
      <section className="section-cream section relative overflow-hidden">
        <div className="container-shell relative z-10">
          <SectionHeader
            eyebrow="Questions from local patients"
            heading={
              <>
                {location.name} <span className="italic text-tan">FAQs.</span>
              </>
            }
          />
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-tan/25 rounded-3xl border border-tan/25 bg-linen">
            <FaqRow q={content.localFaq.q} a={content.localFaq.a} />
            {content.extraFaqs.map((f) => (
              <FaqRow key={f.q} q={f.q} a={f.a} />
            ))}
            {service.faqs.slice(0, 2).map((f, i) => (
              <FaqRow
                key={i}
                q={f.q}
                a={f.a.replace(/&rsquo;/g, "\u2019")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section-espresso section relative overflow-hidden">
        <div className="container-shell relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Getting here</p>
            <h2 className="heading-section mt-4 !text-linen">
              {content.commuteNote}
            </h2>
          </div>
          <BookNowLink className="btn-cta-onDark inline-flex items-center gap-2 whitespace-nowrap">
            Book your New Patient Appointment
            <span aria-hidden="true">&rarr;</span>
          </BookNowLink>
        </div>
      </section>

      {/* ---------- Related services in this city ---------- */}
      {related.length > 0 ? (
        <section className="section-linen section relative overflow-hidden">
          <div className="container-shell relative z-10">
            <SectionHeader
              eyebrow={`More for ${location.name} patients`}
              heading={
                <>
                  Other services near{" "}
                  <span className="italic text-tan">you.</span>
                </>
              }
            />
            <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`${cityPath}/${r.slug}`}
                  className="card-flat block transition-colors hover:border-tan"
                >
                  <p className="eyebrow">{r.short}</p>
                  <h3 className="heading-card mt-3">{r.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mocha">
                    in {location.name}, CA
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={cityPath} className="btn-outline btn-sm">
                All services in {location.name}
              </Link>
              <Link href={`/services/${service.slug}`} className="btn-ghost btn-sm">
                {service.label} overview page
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function SectionHeader({
  eyebrow,
  heading,
}: {
  eyebrow: string;
  heading: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="flex items-center justify-center gap-3">
        <span aria-hidden="true" className="block h-px w-10 bg-tan/60" />
        <p className="eyebrow">{eyebrow}</p>
        <span aria-hidden="true" className="block h-px w-10 bg-tan/60" />
      </div>
      <h2 className="heading-section mt-4">{heading}</h2>
    </div>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  return (
    <details className="group p-6 md:p-7">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-espresso md:text-xl">
        {q}
        <span
          aria-hidden="true"
          className="shrink-0 text-tan transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="mt-4 text-sm leading-relaxed text-mocha md:text-base">
        {a}
      </p>
    </details>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        d="M4 10.5l3.5 3.5L16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
