/**
 * Shared frame for the generated blog Open Graph cards (/blog and each
 * /blog/[slug]). Kept in one place so the index card and the per-post
 * card can never drift apart visually.
 *
 * Rendered by Satori via next/og, so only flexbox and the CSS subset it
 * supports are used here, and no webfont is loaded: the total bundle for
 * an ImageResponse is capped at 500KB.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const ESPRESSO = "#36302a";
const TAN = "#b9a590";
const LINEN = "#f6f3ec";

/** Step the headline down as it gets longer so it always fits the frame. */
export function headlineSize(text: string): number {
  if (text.length > 92) return 52;
  if (text.length > 68) return 60;
  if (text.length > 46) return 68;
  return 78;
}

export function OgCard({
  headline,
  eyebrow,
  footer,
}: {
  headline: string;
  /** Small pill above the headline, e.g. the post category. */
  eyebrow?: string;
  /** Muted meta line along the bottom edge. */
  footer?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: ESPRESSO,
        // Satori cannot blur, so warmth comes from a gradient rather than the
        // radial glow the dark sections use on the site itself.
        backgroundImage:
          "linear-gradient(130deg, #413a32 0%, #36302a 52%, #2e2924 100%)",
        color: LINEN,
        padding: "62px 76px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 10,
          height: "100%",
          backgroundColor: TAN,
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <div style={{ display: "flex", color: TAN, letterSpacing: 10 }}>
          ALIGNED HEALTH
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(246, 243, 236, 0.6)",
            letterSpacing: 2,
          }}
        >
          Laguna Hills, CA
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          maxWidth: 1000,
        }}
      >
        {eyebrow ? (
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              border: "1px solid rgba(185, 165, 144, 0.55)",
              borderRadius: 9999,
              padding: "9px 22px",
              marginBottom: 30,
              color: TAN,
              fontSize: 20,
              letterSpacing: 5,
            }}
          >
            {eyebrow.toUpperCase()}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              width: 96,
              height: 2,
              backgroundColor: TAN,
              marginBottom: 34,
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            fontSize: headlineSize(headline),
            lineHeight: 1.14,
            letterSpacing: -1,
          }}
        >
          {headline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 22,
          color: "rgba(246, 243, 236, 0.72)",
        }}
      >
        <div style={{ display: "flex" }}>{footer ?? ""}</div>
        <div style={{ display: "flex", color: TAN, letterSpacing: 2 }}>
          alignedhealthoc.com
        </div>
      </div>
    </div>
  );
}
