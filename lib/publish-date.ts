const NEW_YORK = "America/New_York";

/**
 * YYYY-MM-DD in America/New_York.
 * `en-CA` is not always zero-padded, and `"2026-10-15" <= "2026-10-9"` is true.
 */
export function todayInNewYork(now = new Date()): string {
  return formatZonedDate(now, NEW_YORK);
}

function formatZonedDate(now: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  if (!year || !month || !day) return now.toISOString().slice(0, 10);
  return `${year}-${month}-${day}`;
}

/**
 * Calendar date the editor scheduled.
 * ISO datetimes keep their date prefix so UTC midnight does not become the previous New York day.
 */
export function scheduledCalendarDate(
  value: string | null | undefined,
): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;

  const us = /^(\d{1,2})\/(\d{1,2})\/(\d{4})/.exec(trimmed);
  if (us) {
    return `${us[3]}-${us[1].padStart(2, "0")}-${us[2].padStart(2, "0")}`;
  }

  const parsed = Date.parse(trimmed);
  if (Number.isNaN(parsed)) return null;
  return formatZonedDate(new Date(parsed), NEW_YORK);
}

/** Newest card on the journal. Older posts step back by one week from here. */
export const BLOG_LATEST_DATE = "2026-10-20";
export const BLOG_PUBLISH_GAP_DAYS = 7;

/** Add calendar days to a YYYY-MM-DD date without timezone drift. */
export function addCalendarDays(isoDate: string, days: number): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate);
  if (!match) return isoDate;
  const utc = new Date(
    Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])),
  );
  utc.setUTCDate(utc.getUTCDate() + days);
  return utc.toISOString().slice(0, 10);
}

/**
 * Keep journal dates one week apart.
 * The newest live post is dated `latest` (20 Oct 2026) unless a newer
 * real date is already live, in which case that later date leads the list.
 */
export function spaceWeeklyPublishDates<
  T extends { datePublished: string; dateModified?: string },
>(
  posts: readonly T[],
  options?: { latest?: string; today?: string; gapDays?: number },
): T[] {
  if (posts.length === 0) return [];
  const latest = options?.latest ?? BLOG_LATEST_DATE;
  const today = options?.today ?? todayInNewYork();
  const gapDays = options?.gapDays ?? BLOG_PUBLISH_GAP_DAYS;
  const sorted = [...posts].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
  const newestReal =
    scheduledCalendarDate(sorted[0].datePublished) ??
    sorted[0].datePublished.slice(0, 10);
  let anchor = newestReal > latest ? newestReal : latest;
  if (anchor > today) anchor = today;

  return sorted.map((post, index) => {
    const datePublished = addCalendarDays(anchor, -index * gapDays);
    const dateModified =
      post.dateModified && post.dateModified >= datePublished
        ? post.dateModified
        : datePublished;
    return { ...post, datePublished, dateModified };
  });
}

/** True when the post has no schedule, or its calendar date is today or earlier in New York. */
export function isPublishDateLive(
  value: string | null | undefined,
  now = new Date(),
): boolean {
  const day = scheduledCalendarDate(value);
  if (!day) return true;
  return day <= todayInNewYork(now);
}
