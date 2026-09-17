import type { Metadata } from "next";
import { PageChromeJsonLd } from "@/app/_components/ClinicJsonLd";
import { DoctorProfiles } from "@/app/our-team/_components/DoctorProfiles";
import { TeamHero } from "@/app/our-team/_components/TeamHero";

const PATH = "/our-team";

const TITLE = "Our Team · Dr. Dustin Hack & Dr. Tara Hadden";
const DESCRIPTION =
  "Meet the Laguna Hills chiropractors behind Aligned Health. Diversified adjusting, sports recovery, and honest answers when chiropractic is not the right next step.";

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
 url: "/images/contact-us/hero-v2.jpg",
 width: 2400,
 height: 1018,
 alt: "Aligned Health chiropractic office in Laguna Hills, CA",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: TITLE,
 description: DESCRIPTION,
 images: ["/images/contact-us/hero-v2.jpg"],
 },
};

export default function OurTeamPage() {
 return (
 <>
      <PageChromeJsonLd path={PATH} name={TITLE} description={DESCRIPTION} />
 <TeamHero />
 <DoctorProfiles />
 </>
 );
}
