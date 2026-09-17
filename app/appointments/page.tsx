import type { Metadata } from "next";
import { PageChromeJsonLd } from "@/app/_components/ClinicJsonLd";
import { AppointmentsIntro } from "@/app/appointments/_components/AppointmentsIntro";

const PATH = "/appointments";

const TITLE = "Existing Patient Appointments · Aligned Health Laguna Hills";
const DESCRIPTION =
  "Already a patient? Book your next visit online. New patients start with a 45-minute exam in Laguna Hills — we verify PPO coverage before you come in.";

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

export default function AppointmentsPage() {
 return (
 <>
      <PageChromeJsonLd path={PATH} name={TITLE} description={DESCRIPTION} />
 <AppointmentsIntro />
 </>
 );
}
