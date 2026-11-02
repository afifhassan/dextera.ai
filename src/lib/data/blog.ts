export type PostMeta = {
  slug: string;
  title: string;
  intro: string;
  category: BlogCategory;
  /** ISO date. Seed drafts only. */
  date: string;
  draft: boolean;
};

export const blogCategories = ["Data", "Simulation", "Testing"] as const;

export type BlogCategory = (typeof blogCategories)[number];

export const posts: PostMeta[] = [
  {
    slug: "why-simulation-fidelity-should-be-measured-not-claimed",
    title: "Why simulation fidelity should be measured, not claimed",
    intro:
      "Every simulator is accurate somewhere and wrong somewhere else. The useful question is not whether it looks real, but how closely it matches the measurements that matter for your task.",
    category: "Simulation",
    date: "2026-10-28",
    draft: true,
  },
  {
    slug: "what-makes-expert-demonstrations-different-from-internet-video",
    title: "What makes expert demonstrations different from internet video",
    intro:
      "A video shows what the work looked like. A demonstration records what the work took: the force, the timing, the outcome and the judgment behind it.",
    category: "Data",
    date: "2026-10-14",
    draft: true,
  },
  {
    slug: "how-to-design-a-physical-ai-test-you-can-trust",
    title: "How to design a physical AI test you can trust",
    intro:
      "A test is only evidence if it could have failed. Five decisions that separate a useful physical AI evaluation from a polished demonstration.",
    category: "Testing",
    date: "2026-09-30",
    draft: true,
  },
];

export const featuredPost = posts[0];

export const blogPage = {
  eyebrow: "Blog",
  headline: "Notes on ground truth.",
  intro:
    "What real work teaches a model, why simulation fidelity has to be measured, and how to design a physical AI test that can actually fail.",
  feedLabel: "RSS feed",
} as const;

export const blogPostPage = {
  back: "All posts",
  editorial: "Daxtera editorial",
  nextLabel: "Next step",
  nextHeading: "If this touches a program you are planning, tell us about it.",
  nextBody:
    "Share the robot, the task and what your team needs to prove. We will reply with the best place to start.",
  nextCta: "Talk to our team",
  relatedLabel: "Continue reading",
  allPosts: "All posts",
} as const;
