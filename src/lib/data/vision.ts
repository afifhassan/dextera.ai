export type Principle = {
  index: string;
  title: string;
  body: string;
  note: string;
};

export const vision = {
  title: "Our vision",
  headline: "A physical world machines can learn from.",
  intro:
    "Physical AI should not have to guess how the world behaves. It should learn from work that was done, measured and verified — and from simulation honest enough to extend that work.",
  mission: {
    label: "What we are building",
    statement:
      "A shared ground truth for physical AI: real work, measured; simulation, calibrated against it; and tests that show, rather than claim, what a system can do.",
  },
  principles: [
    {
      index: "01",
      title: "Real before synthetic.",
      body: "The source is always real work by a verified expert. Simulation extends what we can test; it does not replace the world it is measured against.",
      note: "Ground truth first",
    },
    {
      index: "02",
      title: "Measured, not claimed.",
      body: "Fidelity is a number with a context, not a slogan. We document where a simulator matches reality, where it does not and what that means for the decision at hand.",
      note: "Evidence over adjectives",
    },
    {
      index: "03",
      title: "Experts first.",
      body: "Skilled work belongs to the people who do it. We verify, pay and credit experts, pair them with trained capture specialists, and treat their judgment as part of the data.",
      note: "Skill has an owner",
    },
    {
      index: "04",
      title: "Consent and privacy by default.",
      body: "Written consent, clear rights and anonymization are not optional. Every contributor should be able to understand what is recorded, how it will be used and what control they keep.",
      note: "Rights before delivery",
    },
    {
      index: "05",
      title: "Niche by niche.",
      body: "There is no general-purpose shortcut to physical skill. We build depth in one domain at a time, with the protocols, experts and references that domain actually requires.",
      note: "Depth over breadth",
    },
  ] satisfies Principle[],
  path: {
    eyebrow: "The path of a skill",
    headline: "From a skilled hand to a result you can defend.",
    hint: "Scroll to follow the path",
  },
  principlesCopy: {
    eyebrow: "Principles",
    headline: "Five commitments that shape the work.",
    intro:
      "They are not values on a wall. They decide what Daxtera will and will not deliver.",
  },
  cta: {
    eyebrow: "Put it to work",
    heading: "Start with a task, a robot and a question worth answering.",
    primary: "Explore services",
    secondary: "Talk to us",
  },
  visual: {
    eyebrow: "The path of a skill",
    stages: [
      {
        index: "01",
        label: "Expert motion",
        body: "A skilled hand performs the task.",
      },
      {
        index: "02",
        label: "A dataset",
        body: "The work becomes aligned, verified examples.",
      },
      {
        index: "03",
        label: "A simulation",
        body: "The measured physics tune a learnable world.",
      },
      {
        index: "04",
        label: "A verified result",
        body: "A model is measured against the real thing.",
      },
    ],
  },
} as const;
