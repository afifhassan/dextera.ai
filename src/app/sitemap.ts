import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const base = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://daxtera.example"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newestPost = posts[0]?.date
    ? new Date(posts[0].date)
    : new Date("2026-11-01T00:00:00.000Z");
  const siteUpdated = new Date("2026-11-01T00:00:00.000Z");

  return [
    {
      url: `${base}/`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/services`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/services/real-world-data`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/services/calibrated-simulator`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/services/testing-and-comparison`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/blog`,
      lastModified: newestPost,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${base}/vision`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/about`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/careers`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
