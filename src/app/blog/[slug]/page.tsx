import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { getAllPosts, getPost } from "@/lib/blog";
import { blogPostPage as copy } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.intro,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} — Daxtera`,
      description: post.intro,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      images: [
        {
          url: `/og/blog/${post.slug}.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.body,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    },
  });

  const related = getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  return (
    <article className="bg-bench">
      <header className="border-b border-steel/12 py-16 sm:py-24">
        <Container size="narrow">
          <Link
            href="/blog"
            className="font-mono text-[9px] uppercase tracking-[0.15em] text-deep transition-colors hover:text-ink"
          >
            ← {copy.back}
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MicroLabel tone="deep">{post.category}</MicroLabel>
            {post.draft ? (
              <span className="rounded-full border border-steel/20 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-steel">
                Draft
              </span>
            ) : null}
          </div>

          <h1 className="mt-6 max-w-[20ch] text-balance text-[clamp(2.4rem,5.4vw,4.8rem)] font-semibold leading-[1.01] tracking-[-0.055em] text-ink">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-steel">
            {post.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-steel/15 pt-5 font-mono text-[9px] uppercase tracking-[0.12em] text-steel">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>{copy.editorial}</span>
          </div>
        </Container>
      </header>

      <Container size="narrow" className="py-14 sm:py-20">
        <div className="prose-dax">{content}</div>

        <div className="mt-16 rounded-[12px] border border-steel/15 bg-ink/[0.018] p-7 sm:p-9">
          <MicroLabel tone="deep">{copy.nextLabel}</MicroLabel>
          <h2 className="mt-4 max-w-lg text-2xl font-semibold leading-[1.12] tracking-[-0.03em] text-ink">
            {copy.nextHeading}
          </h2>
          <p className="mt-3 max-w-lg text-[13px] leading-[1.7] text-steel">
            {copy.nextBody}
          </p>
          <div className="mt-6">
            <Button href="/about#contact">{copy.nextCta}</Button>
          </div>
        </div>

        <div className="mt-16 border-t border-steel/15 pt-6">
          <div className="flex items-center justify-between">
            <MicroLabel>{copy.relatedLabel}</MicroLabel>
            <ArrowLink href="/blog">{copy.allPosts}</ArrowLink>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group rounded-[10px] border border-steel/15 p-5 transition-colors duration-500 hover:border-deep/35"
              >
                <MicroLabel tone="deep">{item.category}</MicroLabel>
                <h2 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-deep">
                  {item.title}
                </h2>
                <p className="mt-2 text-[12px] leading-[1.65] text-steel">
                  {item.readingMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
