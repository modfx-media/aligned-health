import type { Metadata } from "next";
import { PageChromeJsonLd } from "@/app/_components/ClinicJsonLd";
import { ServicesIntro } from "@/app/services/_components/ServicesIntro";

const PATH = "/services";

const TITLE = "Chiropractic Services in Laguna Hills · Aligned Health";
const DESCRIPTION =
  "Fourteen on-site services in one Laguna Hills office: adjustments, spinal decompression, percussion, red light, and more. One doctor, one visit.";

export const metadata: Metadata = {
 title: { absolute: TITLE },
 description: DESCRIPTION,
 alternates: { canonical: PATH },
 openGraph: {
 title: TITLE,
 description: DESCRIPTION,
 url: PATH,
 type: "website",
 images: [
 {
 url: "/images/services/chiropractic-adjustments-banner.jpg",
 width: 1774,
 height: 887,
 alt: "Chiropractic adjustment being performed at Aligned Health",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: TITLE,
 description: DESCRIPTION,
    images: ["/images/services/chiropractic-adjustments-banner.jpg"],
 },
};

export default function ServicesPage() {
 return (
 <>
      <PageChromeJsonLd path={PATH} name={TITLE} description={DESCRIPTION} />
 <ServicesIntro />
 </>
 );
}
