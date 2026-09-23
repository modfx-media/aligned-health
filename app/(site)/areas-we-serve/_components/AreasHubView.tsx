import Link from "next/link";
import { BookNowLink } from "@/app/_components/BookNowLink";
import { NEW_PATIENT_CTA_LABEL } from "@/lib/site";
import { getRegions, getLocationsByRegion } from "@/lib/locations";

/**
 * Hub view for /areas-we-serve. Groups the 30 served cities by region and
 * links each into its own /areas-we-serve/[city] landing page. This is the
 * single page linked from the site footer, individual city/service pages
 * are not linked directly from global nav.
 */
export function AreasHubView() {
  const regions = getRegions();

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative w-full overflow-hidden bg-espresso py-24 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 60% at 85% 0%, rgba(185,165,144,0.16) 0%, rgba(54,48,42,0) 60%), radial-gradient(45% 55% at 10% 100%, rgba(87,76,63,0.4) 0%, rgba(54,48,42,0) 55%)",
          }}
        />
        <div className="container-shell relative z-10">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="block h-px w-10 bg-tan/60" />
            <p className="eyebrow">Areas we serve</p>
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-linen md:text-5xl lg:text-6xl">
            Chiropractic care across{" "}
            <span className="italic text-tan">Orange County.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-linen/85 md:text-lg">
            We are based at 26071 Merit Circle in Laguna Hills. People drive
            in from Irvine, Mission Viejo, Aliso Viejo, Lake Forest, and
            farther south because the visit itself is unhurried. Pick your
            city for real drive times and the 14 services we can do on site.
          </p>
          <div className="mt-8">
            <BookNowLink className="btn-primary inline-flex items-center gap-2">
              {NEW_PATIENT_CTA_LABEL}
              <span aria-hidden="true">&rarr;</span>
            </BookNowLink>
          </div>
        </div>
      </section>

      {/* ---------- Region groups ---------- */}
      {regions.map((region, i) => {
        const cities = getLocationsByRegion(region);
        return (
          <section
            key={region}
            className={
              i % 2 === 0
                ? "section-cream section relative overflow-hidden"
                : "section-linen section relative overflow-hidden"
            }
          >
            <div className="container-shell relative z-10">
              <p className="eyebrow">{region}</p>
              <h2 className="heading-section mt-4">
                {cities.length}{" "}
                <span className="italic text-tan">
                  {cities.length === 1 ? "city" : "cities"}
                </span>{" "}
                served.
              </h2>
              <span className="divider-hairline mt-8 block" />
              <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                {cities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/areas-we-serve/${city.slug}`}
                      className={`group relative block overflow-hidden rounded-2xl border p-4 transition-colors md:p-5 ${
                        city.home
                          ? "border-tan/60 bg-tan/10"
                          : "border-tan/25 bg-cream hover:border-tan/50"
                      }`}
                    >
                      <span className="font-serif text-base text-espresso md:text-lg">
                        {city.name}
                      </span>
                      {city.home ? (
                        <span className="ml-2 text-[0.6rem] uppercase tracking-[0.18em] text-tan">
                          Home office
                        </span>
                      ) : (
                        <span className="mt-1 block text-xs text-mocha">
                          ~{city.driveMinutes} min drive
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {/* ---------- CTA ---------- */}
      <section className="section-espresso section relative overflow-hidden">
        <div className="container-shell relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Don&rsquo;t see your city?</p>
            <h2 className="heading-section mt-4 !text-linen">
              Give us a call, we likely still serve you.
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
