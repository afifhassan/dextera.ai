import type { Metadata } from "next";
import Link from "next/link";
import { BlogIndex } from "@/components/blog/BlogIndex";
import type { PostSummary } from "@/components/blog/PostCard";
import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { getAllPosts } from "@/lib/blog";
import { blogPage as copy } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from Daxtera on real-world data, measured simulation fidelity and physical AI testing.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Daxtera",
    description:
      "Notes on real-world data, measured simulation fidelity and tests that hold up.",
    url: "/blog",
    images: [
      { url: "/og/blog.png", width: 1200, height: 630, alt: "Daxtera blog" },
    ],
  },
};

export default function BlogPage() {
  const posts: PostSummary[] = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    intro: post.intro,
    category: post.category,
    date: post.date,
    readingMinutes: post.readingMinutes,
    draft: post.draft,
  }));
  const featured = posts[0];

  return (
    <div className="bg-bench">
      <section className="relative overflow-hidden border-b border-steel/12 py-20 sm:py-28">
        <div
          className="bg-grid-light pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <MicroLabel tone="deep">{copy.eyebrow}</MicroLabel>
              <h1 className="mt-6 max-w-[15ch] text-balance text-[clamp(2.9rem,6vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-ink">
                {copy.headline}
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-steel sm:text-base">
                {copy.intro}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/feed.xml"
                className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-deep"
              >
                {copy.feedLabel}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <BlogIndex posts={posts} featured={featured} />
        </Container>
      </section>
    </div>
  );
}
