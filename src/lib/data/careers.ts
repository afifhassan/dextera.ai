export type Role = {
  slug: string;
  title: string;
  team: string;
  description: string;
  /** [PLACEHOLDER] until real openings are confirmed. */
  status: string;
};

export const roles: Role[] = [
  {
    slug: "domain-expert",
    title: "Domain expert",
    team: "Expert network",
    description:
      "An experienced practitioner who does the real work. Your skill is the source of the dataset, and your judgment helps define what good work looks like.",
    status: "[PLACEHOLDER: open or not]",
  },
  {
    slug: "capture-specialist",
    title: "Capture specialist",
    team: "Field operations",
    description:
      "A trained specialist who works alongside a domain expert, runs the protocol for the niche and makes sure each session produces usable ground truth.",
    status: "[PLACEHOLDER: open or not]",
  },
  {
    slug: "annotator",
    title: "Annotator",
    team: "Data quality",
    description:
      "A qualified annotator who turns real work into precise labels, works to gold-standard checks and helps resolve the cases that need a human judgment.",
    status: "[PLACEHOLDER: open or not]",
  },
  {
    slug: "engineer",
    title: "Engineer",
    team: "Product and platform",
    description:
      "An engineer who builds the systems that help Daxtera measure, verify and deliver ground truth reliably, without losing the human detail that makes it useful.",
    status: "[PLACEHOLDER: open or not]",
  },
];

export const careers = {
  title: "Careers",
  headline: "Work on the data physical AI depends on.",
  intro:
    "We are building a network of verified experts, capture specialists and annotators, and the team behind them. If you care about doing physical work justice in data, we would like to hear from you.",
  note: "Roles are listed with their current status. Applications are read by a person.",
  application: {
    heading: "Apply",
    body: "Tell us what you do and where you have done it. A short note is enough to start.",
  },
  rolesCopy: {
    heading: "Roles",
    intro:
      "Each role shows its current status. If nothing is open, a general application is still welcome.",
  },
  culture: {
    eyebrow: "What matters here",
    heading: "Care for the work. Care for the people who do it.",
    items: [
      {
        title: "Skill is the source",
        body: "The expert is not a prop in a recording. Their judgment is part of what makes the data useful.",
      },
      {
        title: "Consent is explicit",
        body: "Written consent, clear rights and anonymization by default are part of every engagement.",
      },
      {
        title: "Quality is visible",
        body: "Acceptance criteria, reviewer checks and named ownership make the standard something you can inspect.",
      },
    ],
  },
  applyCopy: {
    heading: "Tell us what you do.",
    body: "Applications are read by a person. We use your details only to review this application.",
    closing: "Not seeing the right role? Tell us how you would contribute.",
    contact: "Talk to us",
  },
} as const;
