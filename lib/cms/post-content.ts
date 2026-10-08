import type { BlogBlock } from "@/lib/blog";
import { mediaAlt, publicMediaUrl } from "./media-url";

const BULLET = /^(?:[•\u2022]|\*|-)\s+/;
const NUMBERED = /^\d+[.)]\s+/;
const IMAGE_MD = /!\[([^\]]*)\]\(([^)\s]+)\)/g;

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  format?: number;
  listType?: string;
  url?: string;
  value?: unknown;
  fields?: { url?: unknown; alt?: unknown };
  children?: LexicalNode[];
};

function proseLinesToBlocks(lines: string[]): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (BULLET.test(line)) {
      const items: string[] = [];
      while (index < lines.length && BULLET.test(lines[index])) {
        items.push(lines[index].replace(BULLET, "").trim());
        index += 1;
      }
      if (items.length) blocks.push({ type: "ul", items });
      continue;
    }

    if (NUMBERED.test(line)) {
      const items: string[] = [];
      while (index < lines.length && NUMBERED.test(lines[index])) {
        items.push(lines[index].replace(NUMBERED, "").trim());
        index += 1;
      }
      if (items.length) blocks.push({ type: "ol", items });
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      !BULLET.test(lines[index]) &&
      !NUMBERED.test(lines[index])
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    const text = paragraph.join(" ").trim();
    if (text) blocks.push({ type: "p", text });
  }

  return blocks;
}

function plainProseToBlocks(text: string): BlogBlock[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];
  return normalized.split(/\n{2,}/).flatMap((chunk) => {
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    return proseLinesToBlocks(lines);
  });
}

function blocksFromMarkdownImages(text: string): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  const pattern = new RegExp(IMAGE_MD.source, "g");
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    const before = text.slice(last, match.index).trim();
    if (before) blocks.push(...plainProseToBlocks(before));
    const src = publicMediaUrl(match[2]);
    if (src) blocks.push({ type: "image", src, alt: match[1].trim() });
    last = match.index + match[0].length;
  }

  const rest = text.slice(last).trim();
  if (rest) blocks.push(...plainProseToBlocks(rest));
  return blocks;
}

/** Split CMS textarea copy into the designed paragraph, list, and image blocks. */
export function proseToBlocks(text: string): BlogBlock[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];
  if (normalized.includes("![")) return blocksFromMarkdownImages(normalized);
  return plainProseToBlocks(normalized);
}

function promoteLead(blocks: BlogBlock[]): BlogBlock[] {
  if (blocks[0]?.type !== "p") return blocks;
  return [{ type: "lead", text: blocks[0].text }, ...blocks.slice(1)];
}

export function expandCmsBody(blocks: BlogBlock[]): BlogBlock[] {
  const expanded: BlogBlock[] = [];

  for (const block of blocks) {
    if (block.type === "p" || block.type === "lead") {
      const parts = proseToBlocks(block.text);
      if (block.type === "lead" && parts[0]?.type === "p") {
        expanded.push({ type: "lead", text: parts[0].text }, ...parts.slice(1));
      } else {
        expanded.push(...parts);
      }
      continue;
    }

    if (block.type === "h2" || block.type === "h3" || block.type === "quote" || block.type === "callout") {
      const text = "text" in block ? block.text.trim() : "";
      if (!text) continue;
      if (block.type === "h2" || block.type === "h3") {
        expanded.push({ type: block.type, text });
      } else {
        expanded.push({ ...block, text });
      }
      continue;
    }

    expanded.push(block);
  }

  return promoteLead(expanded);
}

function inlineText(node: LexicalNode): string {
  if (node.type === "linebreak") return " ";
  if (node.type === "link" || node.type === "autolink") {
    const label = (node.children ?? []).map(inlineText).join("").trim();
    const href = typeof node.fields?.url === "string" ? node.fields.url : "";
    if (label && (href.startsWith("/") || href.startsWith("http://") || href.startsWith("https://"))) {
      return `[${label}](${href})`;
    }
    return label;
  }

  if (typeof node.text === "string") {
    let text = node.text;
    const format = node.format ?? 0;
    if (format & 1) text = `**${text}**`;
    if (format & 2) text = `*${text}*`;
    return text;
  }

  return (node.children ?? []).map(inlineText).join("");
}

function lexicalNodeToBlocks(node: LexicalNode): BlogBlock[] {
  switch (node.type) {
    case "paragraph": {
      const text = inlineText(node).trim();
      return text ? proseToBlocks(text) : [];
    }
    case "heading": {
      const text = inlineText(node).trim();
      if (!text) return [];
      const type = node.tag === "h3" || node.tag === "h4" ? "h3" : "h2";
      return [{ type, text }];
    }
    case "quote": {
      const text = inlineText(node).trim();
      return text ? [{ type: "quote", text }] : [];
    }
    case "list": {
      const items = (node.children ?? [])
        .map((child) => inlineText(child).trim())
        .filter(Boolean);
      if (!items.length) return [];
      const ordered = node.tag === "ol" || node.listType === "number";
      return [{ type: ordered ? "ol" : "ul", items }];
    }
    case "upload": {
      const src = publicMediaUrl(node.value);
      if (!src) return [];
      return [{ type: "image", src, alt: mediaAlt(node.value) }];
    }
    default:
      return [];
  }
}

/** Lexical rich text, including inline media uploads, as designed article blocks. */
export function lexicalToBlocks(value: unknown): BlogBlock[] {
  if (!value || typeof value !== "object") return [];
  const children = (value as { root?: { children?: unknown[] } }).root?.children;
  if (!Array.isArray(children)) return [];
  return children.flatMap((node) =>
    node && typeof node === "object" ? lexicalNodeToBlocks(node as LexicalNode) : [],
  );
}

export function composeArticleBody(
  structured: BlogBlock[],
  richText: unknown,
): BlogBlock[] {
  const body = expandCmsBody(structured);
  const rich = lexicalToBlocks(richText);
  if (!rich.length) return body;
  if (!body.length) return promoteLead(rich);
  return [...body, ...rich];
}
