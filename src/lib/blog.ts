import fs from "node:fs";
import path from "node:path";
import { posts, type PostMeta } from "@/lib/data/blog";
import { readingTime } from "@/lib/utils";

const contentDir = path.join(process.cwd(), "src", "content", "blog");

export type BlogPost = PostMeta & {
  readingMinutes: number;
  body: string;
};

export function getAllPosts(): BlogPost[] {
  return posts
    .map((meta) => {
      const file = path.join(contentDir, `${meta.slug}.mdx`);
      const body = fs.readFileSync(file, "utf8");
      return {
        ...meta,
        readingMinutes: readingTime(body),
        body,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
