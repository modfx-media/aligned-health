import { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgCard,
} from "@/app/(site)/blog/_components/og-card";

export const alt =
  "The Aligned Health Journal, chiropractic and recovery insights from Aligned Health in Laguna Hills, CA";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        headline="Wellness Insights from the Aligned Health Journal"
        footer="Chiropractic care · Recovery modalities · Treatment plans"
      />
    ),
    size
  );
}
