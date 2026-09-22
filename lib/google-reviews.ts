import { cache } from "react";
import {
  fiveStarReviews,
  googleReviewsMeta,
  isFiveStarReview,
  type GoogleReview,
  type GoogleReviewsMeta,
} from "./reviews";

const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 24;
const PLACES_FIELD_MASK = "id,rating,userRatingCount,googleMapsUri,reviews";

export type GoogleReviewsPayload = {
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta;
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
};

type PlacesDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
  error?: { message?: string; status?: string };
};

function fallbackPayload(): GoogleReviewsPayload {
  return {
    reviews: fiveStarReviews,
    meta: { ...googleReviewsMeta },
  };
}

function mapPlaceReview(review: PlacesReview): GoogleReview | null {
  const quote = (review.text?.text ?? review.originalText?.text ?? "").trim();
  const name = review.authorAttribution?.displayName?.trim() ?? "";
  const rating = review.rating ?? 0;

  // Exact 5 only. Drop 4, 4.5, empty text, and nameless authors here.
  if (rating !== 5 || !quote || !name) return null;

  return {
    quote,
    name,
    rating: 5,
    relativeTime: review.relativePublishTimeDescription,
  };
}

function reviewKey(review: GoogleReview): string {
  return review.quote.trim().toLowerCase().replace(/\s+/g, " ");
}

function mergeFiveStarReviews(...lists: readonly GoogleReview[][]): GoogleReview[] {
  const seen = new Set<string>();
  const merged: GoogleReview[] = [];
  for (const list of lists) {
    for (const review of list) {
      if (!isFiveStarReview(review)) continue;
      const key = reviewKey(review);
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(review);
    }
  }
  return merged;
}

type LegacyDetailsResponse = {
  status?: string;
  result?: {
    reviews?: Array<{
      author_name?: string;
      rating?: number;
      text?: string;
      relative_time_description?: string;
    }>;
  };
};

function mapLegacyReview(review: {
  author_name?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
}): GoogleReview | null {
  const quote = review.text?.trim() ?? "";
  const name = review.author_name?.trim() ?? "";
  if (review.rating !== 5 || !quote || !name) return null;
  return {
    quote,
    name,
    rating: 5,
    relativeTime: review.relative_time_description,
  };
}

/**
 * Places API (New) most-relevant reviews, plus the newest 5 from Place
 * Details (legacy) so the marquee can show more than one Google batch.
 * Still exact-5 + text + name only. Unique saved 5-star quotes fill gaps
 * Google did not include in those two batches.
 */
export const getDisplayedGoogleReviews = cache(
  async (): Promise<GoogleReviewsPayload> => {
    const apiKey =
      process.env.GOOGLE_PLACES_API_KEY?.trim() ||
      process.env.GOOGLE_API_KEY?.trim();
    const placeId =
      process.env.GOOGLE_PLACE_ID?.trim() || googleReviewsMeta.placeId;

    if (!apiKey || !placeId || placeId.startsWith("REPLACE_")) {
      return fallbackPayload();
    }

    try {
      const [newResponse, newestResponse] = await Promise.all([
        fetch(
          `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
          {
            headers: {
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask": PLACES_FIELD_MASK,
            },
            next: {
              revalidate: REVIEWS_REVALIDATE_SECONDS,
              tags: ["google-reviews"],
            },
          },
        ),
        fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews&reviews_sort=newest&key=${encodeURIComponent(apiKey)}`,
          {
            next: {
              revalidate: REVIEWS_REVALIDATE_SECONDS,
              tags: ["google-reviews"],
            },
          },
        ),
      ]);

      const data = (await newResponse.json()) as PlacesDetailsResponse;
      const newestData = (await newestResponse.json()) as LegacyDetailsResponse;

      if (!newResponse.ok || data.error) {
        console.error(
          "Google Places reviews request failed:",
          data.error?.message ?? newResponse.statusText,
        );
        return fallbackPayload();
      }

      const relevantReviews = (data.reviews ?? [])
        .map(mapPlaceReview)
        .filter((review): review is GoogleReview => review !== null);

      const newestReviews = (newestData.result?.reviews ?? [])
        .map(mapLegacyReview)
        .filter((review): review is GoogleReview => review !== null);

      const liveReviews = mergeFiveStarReviews(
        relevantReviews,
        newestReviews,
        fiveStarReviews,
      );

      if (liveReviews.length === 0) return fallbackPayload();

      return {
        reviews: liveReviews,
        meta: {
          rating: data.rating ?? googleReviewsMeta.rating,
          reviewCount: data.userRatingCount ?? googleReviewsMeta.reviewCount,
          fiveStarCount: liveReviews.length,
          placeId,
          reviewsUrl: data.googleMapsUri ?? googleReviewsMeta.reviewsUrl,
        },
      };
    } catch (error) {
      console.error("Google Places reviews fetch error:", error);
      return fallbackPayload();
    }
  },
);
