import type { Metadata } from "next";
import { BookNowBanner } from "@/app/_components/BookNowBanner";
import {
  FaqJsonLd,
  PageChromeJsonLd,
} from "@/app/_components/ClinicJsonLd";
import { BlogPreview } from "@/app/home/_sections/BlogPreview";
import { ClosingSection } from "@/app/home/_sections/ClosingSection";
import { GoogleReviews } from "@/app/home/_sections/GoogleReviews";
import { Hero } from "@/app/home/_sections/Hero";
import { HomeFaq, HOME_FAQ_LIST } from "@/app/home/_sections/HomeFaq";
import { MapSection } from "@/app/home/_sections/MapSection";
import { ServicesGrid } from "@/app/home/_sections/ServicesGrid";
import { TeamSection } from "@/app/home/_sections/TeamSection";
import { TestimonialsMarquee } from "@/app/home/_sections/TestimonialsMarquee";
import { TrustMarquee } from "@/app/home/_sections/TrustMarquee";
import { ValueProps } from "@/app/home/_sections/ValueProps";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { getRecentSitePosts } from "@/lib/ranked/site-posts";

const PATH = "/";

const TITLE = "Chiropractor in Laguna Hills, CA | Aligned Health";
const DESCRIPTION =
  "See a Laguna Hills chiropractor for back pain, sports injuries, and spinal decompression. Dr. Dustin Hack and Dr. Tara Hadden. Most PPO plans accepted.";

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

export default async function HomePage() {
  const recentPosts = await getRecentSitePosts(3);
  const googleReviews = await getDisplayedGoogleReviews();
  return (
    <>
      <PageChromeJsonLd path={PATH} name={TITLE} description={DESCRIPTION} />
      <FaqJsonLd faqs={HOME_FAQ_LIST} />
      <Hero featuredReview={googleReviews.reviews[0]} />
      <TrustMarquee />
      <ValueProps />
      <ServicesGrid />
      <TeamSection />
      <GoogleReviews>
        {(payload) => (
          <TestimonialsMarquee reviews={payload.reviews} meta={payload.meta} />
        )}
      </GoogleReviews>
      <HomeFaq />
      <BlogPreview posts={recentPosts} />
      <ClosingSection />
      <MapSection />
      <BookNowBanner />
    </>
  );
}
