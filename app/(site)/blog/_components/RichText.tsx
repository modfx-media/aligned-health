import type { BlogBlock } from "@/lib/blog";

/**
 * Simple markdown-lite inline renderer:
 * **bold** → <strong>
 * *italic* → <em>
 * &raquo;/&ldquo;/etc, passed through as raw HTML entities
 * Text is assumed to be safe author content, not untrusted user input.
 */
function renderMarkdownLinks(text: string, keyBase: number): React.ReactNode {
  const chunks = text.split(/(\[[^\]]+\]\([^)\s]+\))/g).filter(Boolean);
  return chunks.map((chunk, i) => {
    const match = chunk.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (match) {
      const href = match[2];
      const safe =
        href.startsWith("https://") ||
        href.startsWith("http://") ||
        href.startsWith("/");
      if (!safe) return <span key={`${keyBase}-${i}`}>{match[1]}</span>;
      return (
        <a
          key={`${keyBase}-${i}`}
          href={href}
          className="underline decoration-tan underline-offset-4 hover:text-espresso"
        >
          {match[1]}
        </a>
      );
    }
    return renderEmphasis(chunk, `${keyBase}-${i}`);
  });
}

function renderEmphasis(text: string, key: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${key}-b-${i}`} className="font-medium text-espresso">
          <span dangerouslySetInnerHTML={{ __html: part.slice(2, -2) }} />
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={`${key}-i-${i}`} className="italic text-tan">
          <span dangerouslySetInnerHTML={{ __html: part.slice(1, -1) }} />
        </em>
      );
    }
    return (
      <span key={`${key}-t-${i}`} dangerouslySetInnerHTML={{ __html: part }} />
    );
  });
}

function renderInline(text: string): React.ReactNode {
  return renderMarkdownLinks(text, 0);
}

export function RichText({ blocks }: { blocks: readonly BlogBlock[] }) {
 return (
 <div className="space-y-6 text-base leading-relaxed text-mocha md:text-lg">
 {blocks.map((block, i) => {
 switch (block.type) {
 case "lead":
 return (
 <p
 key={i}
 className="text-lg leading-relaxed text-espresso md:text-xl"
 >
 {renderInline(block.text)}
 </p>
 );
 case "p":
 return <p key={i}>{renderInline(block.text)}</p>;
 case "h2":
 return (
 <h2
 key={i}
 className="mt-14 font-serif text-3xl leading-tight tracking-tight text-espresso md:text-4xl"
 >
 {renderInline(block.text)}
 </h2>
 );
 case "h3":
 return (
 <h3
 key={i}
 className="mt-8 font-serif text-2xl leading-tight text-espresso md:text-3xl"
 >
 {renderInline(block.text)}
 </h3>
 );
 case "ul":
 return (
 <ul
 key={i}
 className="space-y-3 border-l-2 border-tan/40 pl-6 text-mocha"
 >
 {block.items.map((item, j) => (
 <li key={j} className="text-espresso">
 {renderInline(item)}
 </li>
 ))}
 </ul>
 );
 case "ol":
 return (
 <ol
 key={i}
 className="space-y-4 border-l-2 border-tan/40 pl-6 text-mocha"
 >
 {block.items.map((item, j) => (
 <li key={j} className="flex gap-4 text-espresso">
 <span
 aria-hidden="true"
 className="mt-0.5 shrink-0 font-serif text-tan"
 >
 {String(j + 1).padStart(2, "0")}
 </span>
 <span className="min-w-0 flex-1">
 {renderInline(item)}
 </span>
 </li>
 ))}
 </ol>
 );
 case "quote":
 return (
 <figure
 key={i}
 className="my-10 rounded-3xl border border-tan/30 bg-linen p-6 md:p-8"
 >
 <blockquote className="font-serif text-xl leading-snug text-espresso md:text-2xl">
 &ldquo;{renderInline(block.text)}&rdquo;
 </blockquote>
 {block.attribution ? (
 <figcaption className="mt-4 flex items-center gap-3">
 <span
 aria-hidden="true"
 className="block h-px w-8 bg-tan"
 />
 <span className="text-[0.7rem] uppercase tracking-[0.22em] text-mocha">
 {block.attribution}
 </span>
 </figcaption>
 ) : null}
 </figure>
 );
 case "callout":
 return (
 <aside
 key={i}
 className="my-10 rounded-3xl bg-espresso p-6 text-linen md:p-8"
 >
 <p className="text-[0.65rem] uppercase tracking-[0.24em] text-tan">
 {renderInline(block.title)}
 </p>
 <p className="mt-3 leading-relaxed text-linen/90">
 {renderInline(block.text)}
 </p>
 </aside>
 );
 }
 })}
 </div>
 );
}
