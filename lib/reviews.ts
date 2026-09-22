/**
 * Google review types + fallback quotes already shown on the live site.
 * Fallback quotes must stay real 5-star Google reviews for THIS clinic.
 * Never fabricate. Hide the section if the list is empty.
 */
export const googleReviewsMeta = {
  rating: 5,
  reviewCount: 43,
  fiveStarCount: 0,
  placeId: "ChIJk2H_u-Pr3IARsI2vkK-ZVaU",
  reviewsUrl:
    "https://www.google.com/maps/place/Aligned+Health/@33.5748115,-117.6755535,17z/data=!3m1!4b1!4m6!3m5!1s0x80dcebe3bbff6193:0xa55599af90af8db0!8m2!3d33.5748115!4d-117.6755535!16s%2Fg%2F11fwj32nr9",
} as const;

export type GoogleReview = {
  quote: string;
  name: string;
  rating: number;
  relativeTime?: string;
};

export type GoogleReviewsMeta = {
  rating: number;
  reviewCount: number;
  fiveStarCount: number;
  placeId: string;
  reviewsUrl: string;
};

export const googleReviews: GoogleReview[] = [
  {
    name: "Jenna M.",
    rating: 5,
    relativeTime: "1 month ago",
    quote:
      "Dustin treats his clients well, like you’re not just a number. Treatment feels tailored to specific needs and not rushed. This new location is great: easy to find, larger space, and has a comfortable feel and energy to it. I highly recommend!",
  },
  {
    name: "Jay L.",
    rating: 5,
    relativeTime: "2 months ago",
    quote:
      "Doctor Dustin is an adjusting savant. I go to chiropractors every 3 months, this man aligns joints and alleviates pressure others miss or can’t get to. Leaves me feeling like I can smell colors. Even my nasal passages open up. Forever grateful for you doctor.",
  },
  {
    name: "Juani L.",
    rating: 5,
    relativeTime: "11 months ago",
    quote:
      "I made an appointment with Dr. Dustin Hack after I threw out my lower back. I’d been in excruciating pain for three weeks. In a single session he was able to put my SI joint back and I felt huge relief. He is very personable, knowledgeable and very professional. He is a life changer.",
  },
  {
    name: "Trevor C.",
    rating: 5,
    relativeTime: "8 months ago",
    quote:
      "I can’t say enough good things about Dr. Dustin Hack. I’ve been to so many chiropractors over the years, and he is by far the best I’ve ever worked with. He helped me when no one else could. His care, skill, and attention to detail are on another level. Highly, highly recommend.",
  },
  {
    name: "Diana C.",
    rating: 5,
    relativeTime: "2 months ago",
    quote:
      "Dr. Dustin Hack is very honest, fair and knowledgeable! Highly recommend him for any kind of body pain you may be experiencing, he has creative solutions!",
  },
  {
    name: "Robert R.",
    rating: 5,
    relativeTime: "1 year ago",
    quote:
      "I have been going for 6 years now and every time I leave I feel so much better than when I walked in. Dustin spends the time to understand and evaluate the ailments of his patients and figures out the best treatment. His depth of knowledge is incredible. He is a true hidden gem.",
  },
  {
    name: "Jessica R.",
    rating: 5,
    relativeTime: "1 year ago",
    quote:
      "I’m currently training for the LA Marathon and ended up with severe pain in my back, hip, and leg. After nearly a month of discomfort, I finally visited Dr. Dustin. The next day, ALL of my pain was completely gone. If you’re considering going to a sports chiropractor, Dr. Dustin is worth every penny!",
  },
  {
    name: "Jordan B.",
    rating: 5,
    relativeTime: "10 months ago",
    quote:
      "Dustin is literally the best! I don’t know anyone that does both chiropractic work AND deep tissue work at the same time. He knows the body inside and out, and not only works on your body but helps you understand what he is doing and why.",
  },
];

export function isFiveStarReview(review: GoogleReview): boolean {
  return (
    review.rating === 5 &&
    review.quote.trim().length > 0 &&
    review.name.trim().length > 0
  );
}

export const fiveStarReviews = googleReviews.filter(isFiveStarReview);
