import { getAllPosts } from "@/lib/blog";

const base = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://daxtera.example"
).replace(/\/$/, "");

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const lastBuildDate = posts[0]?.date
    ? new Date(posts[0].date).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <description>${escapeXml(post.intro)}</description>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <category>${escapeXml(post.category)}</category>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>Daxtera — Notes on ground truth</title>",
    `    <link>${base}/blog</link>`,
    `    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />`,
    "    <description>Notes on real-world data, measured simulation fidelity and physical AI testing.</description>",
    "    <language>en</language>",
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
