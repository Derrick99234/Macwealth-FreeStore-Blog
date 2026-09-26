export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Calculates human reading time accurately based on 200 words per minute.
 * Strips HTML tags and markdown syntax to count true editorial words.
 */
export function calculateReadTime(content: string = ""): string {
  if (!content) return "1 min read";
  // Strip HTML tags
  const stripped = content.replace(/<[^>]*>/g, " ");
  // Strip markdown formatting symbols
  const clean = stripped.replace(/[#*`_~\[\]()>-]/g, " ").trim();
  const words = clean.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Converts inline markdown formatting to clean HTML (for legacy posts)
 */
function formatInlineMarkdown(text: string): string {
  return text
    // bold: **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    // italic: *text*
    .replace(/\*(.*?)\*/g, '<em class="italic text-slate-200">$1</em>')
    // links: [text](url)
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300 underline font-medium">$1</a>');
}

/**
 * Converts legacy markdown content to rich HTML for reading or initial editor loading
 */
export function markdownToHtml(content: string = ""): string {
  if (!content) return "";
  if (/<[a-z][\s\S]*>/i.test(content)) return content;

  const blocks = content.split(/\n\n+/);
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      if (trimmed.startsWith("### ")) {
        return `<h3 class="text-xl font-bold text-white mt-6 mb-3">${formatInlineMarkdown(trimmed.slice(4))}</h3>`;
      }
      if (trimmed.startsWith("## ")) {
        return `<h2 class="text-2xl font-bold tracking-tight text-white mt-8 mb-4">${formatInlineMarkdown(trimmed.slice(3))}</h2>`;
      }
      if (trimmed.startsWith("# ")) {
        return `<h1 class="text-3xl font-extrabold text-white mt-8 mb-4">${formatInlineMarkdown(trimmed.slice(2))}</h1>`;
      }
      if (trimmed.startsWith("> ") || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
        const quoteText = trimmed.startsWith("> ") ? trimmed.slice(2) : trimmed.slice(1, -1);
        return `<blockquote class="relative pl-6 py-3 my-8 border-l-4 border-indigo-500 bg-[#121622] rounded-r-xl text-xl italic text-indigo-300 font-serif leading-relaxed">&ldquo;${formatInlineMarkdown(quoteText)}&rdquo;</blockquote>`;
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed
          .split("\n")
          .map((line) => line.replace(/^[-*]\s+/, "").trim())
          .filter(Boolean)
          .map((line) => `<li class="ml-4 list-disc text-slate-300 mb-1">${formatInlineMarkdown(line)}</li>`)
          .join("");
        return `<ul class="my-4 list-disc space-y-1 pl-4">${items}</ul>`;
      }

      return `<p class="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">${formatInlineMarkdown(trimmed)}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

/**
 * Formats article content for the public reader view, supporting both rich HTML and legacy text.
 */
export function formatArticleHtml(content: string = ""): string {
  return markdownToHtml(content);
}
