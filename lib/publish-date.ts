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

/** True when the post has no schedule, or its calendar date is today or earlier in New York. */
export function isPublishDateLive(
  value: string | null | undefined,
  now = new Date(),
): boolean {
  const day = scheduledCalendarDate(value);
  if (!day) return true;
  return day <= todayInNewYork(now);
}
