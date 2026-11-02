export type FaqItem = {
  question: string;
  answer: string;
};

/** Seeded only from the supplied company facts. No invented metrics or prices. */
export const faq: FaqItem[] = [
  {
    question: "What do we receive in a dataset?",
    answer:
      "Model-ready data of real expert work, plus the documentation needed to use it with confidence: a data card, label definitions, quality metrics, consent and rights records, a version history and a sampling-based audit report. Delivery follows written acceptance criteria agreed before production.",
  },
  {
    question: "Which formats do you deliver?",
    answer:
      "Datasets are delivered in standard robotics formats such as LeRobot and MCAP, and in customer-specified formats where needed.",
  },
  {
    question: "How are your experts verified?",
    answer:
      "Identity, credentials or licences where the trade requires them, work history and a practical skills assessment are checked before onboarding. Experts are then skill-graded, certified on the protocol for their niche and audited on an ongoing basis. Each two-person team pairs a domain expert with a trained capture specialist.",
  },
  {
    question: "How do you handle consent and privacy?",
    answer:
      "Daxtera obtains written consent from every worker and, where needed, the site owner. Ownership and licensing terms are explicit, with exclusive options available. Anonymization is the default, chain of custody is documented, and every dataset carries a provenance file a buyer's legal team can audit.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Pricing is based on accepted data measured against written acceptance criteria. Customers pay for accepted data, not rejected data. [PLACEHOLDER: pricing and commercial terms]",
  },
  {
    question: "Can you build a custom program for our task?",
    answer:
      "Yes. Custom capture programs are built to a customer's exact need, with a task protocol, coverage plan and pilot batch before production. If a niche catalog dataset fits, it can shorten the path. Last-mile packs, evaluation sets and annotation of data you already own are also available.",
  },
  {
    question: "Is your simulator a perfect copy of the real world?",
    answer:
      "No. Simulation cannot be a perfect copy of reality. Daxtera promises measured, documented fidelity: we show how closely an environment matches real data, where the gaps are and which conclusions it can support. Accuracy varies by task, and we say so plainly.",
  },
  {
    question: "Do you certify robots?",
    answer:
      "No. Daxtera does not certify robots and does not hold an accreditation. We provide test evidence that supports safety and compliance reviews, with a clear statement of what was measured and what the evidence can support.",
  },
  {
    question: "Who do you work with?",
    answer:
      "Robot foundation model labs, humanoid makers, industrial robot and automation vendors, systems integrators, vertical robotics startups, end-user enterprises, platform and chip companies, safety and insurance bodies, research programs and channel partners. Typical buyers include heads of data, robot learning leads, robotics software leads, functional safety engineers, procurement and founders or CTOs.",
  },
];
