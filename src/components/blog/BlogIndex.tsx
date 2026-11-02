"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { blogCategories } from "@/lib/data/blog";
import { PostCard, type PostSummary } from "@/components/blog/PostCard";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function BlogIndex({
  posts,
  featured,
}: {
  posts: PostSummary[];
  featured: PostSummary;
}) {
  const [category, setCategory] = useState<string>("All");
  const showFeatured = category === "All";
  const filtered =
    category === "All"
      ? posts.filter((post) => post.slug !== featured.slug)
      : posts.filter((post) => post.category === category);

  return (
    <>
      {showFeatured ? (
        <div className="mt-12 sm:mt-16">
          <PostCard post={featured} featured />
        </div>
      ) : null}

      <div className="mt-14 flex flex-col gap-5 border-t border-steel/18 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter posts by category"
        >
          {["All", ...blogCategories].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "rounded-full border px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors duration-300",
                category === item
                  ? "border-ink bg-ink text-bench"
                  : "border-steel/20 text-steel hover:border-steel/40 hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-steel">
          {filtered.length + (showFeatured ? 1 : 0)}{" "}
          {filtered.length + (showFeatured ? 1 : 0) === 1 ? "post" : "posts"}
        </p>
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 ? (
          <p className="border border-dashed border-steel/20 px-6 py-12 text-center text-sm text-steel">
            No other posts in this category yet.
          </p>
        ) : null}
      </div>
    </>
  );
}
