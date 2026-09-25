import { previewFromPath } from "../lib/cms/preview";

process.env.PREVIEW_SECRET = process.env.PREVIEW_SECRET || "verify-secret";
process.env.NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

const cases: Array<[unknown, boolean]> = [
  ["/", true],
  ["/about", true],
  ["/blog/sciatica-care", true],
  ["/areas-we-serve/irvine/chiropractic-adjustments", true],
  ["/blog/null", false],
  ["/null", false],
  ["blog/post", false],
  ["/blog/", false],
  [null, false],
  [undefined, false],
  ["", false],
];

let failed = 0;
for (const [input, expectUrl] of cases) {
  const result = previewFromPath(input);
  const ok = expectUrl ? Boolean(result && !result.includes("/null")) : result === null;
  if (!ok) {
    failed += 1;
    console.error("fail", input, result);
  }
}

if (failed) {
  process.exit(1);
}

console.log("previewFromPath rejects null segments and accepts real public paths.");
