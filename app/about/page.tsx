import type { Metadata } from "next";
import { PageChromeJsonLd } from "@/app/_components/ClinicJsonLd";
import { AboutApproach } from "@/app/about/_components/AboutApproach";
import { AboutClosing } from "@/app/about/_components/AboutClosing";
import { AboutIntro } from "@/app/about/_components/AboutIntro";
import { AboutTeamPreview } from "@/app/about/_components/AboutTeamPreview";
import { AboutValues } from "@/app/about/_components/AboutValues";

const PATH = "/about";

const TITLE = "About Aligned Health · Chiropractors in Laguna Hills, CA";
const DESCRIPTION =
  "Meet Dr. Dustin Hack and Dr. Tara Hadden, the Laguna Hills chiropractors who still treat you one-on-one — not as a number on a 10-minute rotation.";

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
 url: "/images/about/about-hero-office.jpg",
 width: 768,
 height: 1024,
 alt: "Aligned Health interior office in Laguna Hills",
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: TITLE,
 description: DESCRIPTION,
 images: ["/images/about/about-hero-office.jpg"],
 },
};

export default function AboutPage() {
 return (
 <>
      <PageChromeJsonLd path={PATH} name={TITLE} description={DESCRIPTION} />
 <AboutIntro />
 <AboutValues />
 <AboutApproach />
 <AboutTeamPreview />
 <AboutClosing />
 </>
 );
}
