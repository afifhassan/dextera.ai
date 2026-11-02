/**
 * The three service pages share one template. Copy is outcomes-first:
 * what a customer gets, how an engagement runs and how trust is handled.
 * No component lists, hardware detail or software internals.
 */

export type ServiceVisual = "dataset" | "simulator" | "benchmark";

export type ServicePoint = { title: string; body: string };
export type ServiceStep = { title: string; body: string };
export type ServiceQuality = { title: string; body: string };
export type ServiceOption = { title: string; body: string; label: string };
export type ProgramType = { title: string; body: string };

export type Service = {
  slug: string;
  index: string;
  name: string;
  shortName: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  visual: ServiceVisual;
  visualLabel: string;
  photo: string;
  photoAlt: string;
  eyebrow: string;
  headline: string;
  promise: string;
  intro: string;
  points: ServicePoint[];
  steps: ServiceStep[];
  receives: string[];
  receiveNote: string;
  quality: ServiceQuality[];
  programs?: ProgramType[];
  fidelity?: {
    heading: string;
    body: string;
    note: string;
  };
  deployment?: {
    heading: string;
    body: string;
  };
  options?: ServiceOption[];
  safetyNote?: string;
  related: string[];
  cta: { heading: string; body: string };
};

export const services: Service[] = [
  {
    slug: "real-world-data",
    index: "01",
    name: "Real-World Physical Data",
    shortName: "Real-world data",
    short:
      "Model-ready datasets of real expert work, with verified labels and full documentation.",
    metaTitle: "Real-world physical data for physical AI",
    metaDescription:
      "Verified, model-ready datasets of real expert work. Custom capture programs or niche catalog datasets, delivered with documentation, consent and rights records.",
    visual: "dataset",
    visualLabel: "Episodes assembling into a verified dataset",
    photo: "/photos/precision-work.webp",
    photoAlt:
      "An expert's hands aligning a cable connector on a precision press.",
    eyebrow: "Service 01 — Real-world data",
    headline: "Datasets built from work that actually happened.",
    promise:
      "Model-ready data of real expert work, with labels verified by people who understand the task.",
    intro:
      "Custom capture programs are built to your exact need. Niche catalog datasets give you a running start in a domain Daxtera already covers. Both arrive documented, rights-cleared and ready for training.",
    points: [
      {
        title: "Labels a model can trust",
        body: "Every episode is organized into the actions and outcomes that matter, with expert-verified labels and domain-expert adjudication where a judgment call affects the result.",
      },
      {
        title: "Built to your task, or from a catalog",
        body: "Commission a custom program around your robot, task and site, or begin with a niche catalog dataset shaped by the same standards.",
      },
      {
        title: "A verified expert workforce",
        body: "Two-person capture teams pair a domain expert who does the work with a trained capture specialist. Experts are verified, skill-graded, certified on the niche protocol and audited over time.",
      },
      {
        title: "Three-stage human verification",
        body: "Automated pre-labeling, trained annotators and reviewer checks are followed by domain-expert adjudication for disputes and outcome labels.",
      },
      {
        title: "Rights and provenance you can audit",
        body: "Written consent, clear ownership and licensing terms, anonymization by default, documented chain of custody and a provenance file a buyer's legal team can review.",
      },
    ],
    steps: [
      {
        title: "Requirements and protocol",
        body: "We agree the task, the robot or model it serves, the outcomes that count and the written acceptance criteria.",
      },
      {
        title: "Coverage plan",
        body: "We map the variation that matters — materials, conditions, edge cases and failure modes — into a plan for the program.",
      },
      {
        title: "Pilot batch",
        body: "A small first batch proves the protocol, the labels and the delivery format before production begins.",
      },
      {
        title: "Production with live quality gates",
        body: "Capture, annotation and verification run against the acceptance criteria, with a named quality lead watching the results.",
      },
      {
        title: "Handover",
        body: "You receive the accepted dataset and its documentation, plus a sampling-based audit report for the delivery.",
      },
    ],
    receives: [
      "Model-ready datasets of real expert work",
      "A data card describing what the dataset contains and what it should not be used for",
      "Label definitions and quality metrics",
      "Consent and rights records for every contributor",
      "Version history for the delivered dataset",
      "Delivery in standard robotics formats such as LeRobot and MCAP, plus customer-specified formats",
      "A sampling-based audit report with each delivery",
    ],
    receiveNote:
      "Documentation is part of the deliverable, not an afterthought. Your team should be able to understand, reproduce and defend the data without asking us what it means.",
    quality: [
      {
        title: "Acceptance criteria before production",
        body: "We write down what accepted data means before a single session is recorded. Customers pay for accepted data, not rejected data.",
      },
      {
        title: "A named quality lead",
        body: "Every program has one accountable quality lead, from protocol through delivery.",
      },
      {
        title: "Rework and audit",
        body: "A written rework policy applies when a delivery misses the criteria. Each delivery includes a sampling-based audit report.",
      },
      {
        title: "Privacy by default",
        body: "Every worker gives written consent, and the site owner consents where needed. Anonymization is the default, and chain of custody is documented.",
      },
    ],
    programs: [
      {
        title: "Custom capture programs",
        body: "Built around your task, robot or site, with acceptance criteria agreed up front.",
      },
      {
        title: "Niche catalog datasets",
        body: "Ready-shaped datasets from a domain Daxtera already covers.",
      },
      {
        title: "Last-mile packs",
        body: "Focused data that fine-tunes a model to one robot, one cell or one site.",
      },
      {
        title: "Evaluation sets",
        body: "Held-out real work for measuring performance against the world, not the training set.",
      },
      {
        title: "Annotation and verification",
        body: "Applied to data you already own, using the same labels, checks and documentation.",
      },
    ],
    related: ["calibrated-simulator", "testing-and-comparison"],
    cta: {
      heading: "Tell us what your model needs to learn.",
      body: "Share the task, the robot and the conditions that matter. We will reply with the best place to start.",
    },
  },

  {
    slug: "calibrated-simulator",
    index: "02",
    name: "Calibrated Simulator",
    shortName: "Calibrated simulator",
    short:
      "Niche-specific simulation tuned to real measurements, for training, fine-tuning and stress testing.",
    metaTitle: "Calibrated simulator for physical AI",
    metaDescription:
      "Niche-specific digital environments tuned to real measurements from Daxtera capture. Train, fine-tune and stress-test physical AI without hardware time for every experiment.",
    visual: "simulator",
    visualLabel: "A workcell assembling from scan to calibrated scene",
    photo: "/photos/expert-work-wide.webp",
    photoAlt:
      "An expert working with a precision tool at a bench of machined components.",
    eyebrow: "Service 02 — Calibrated simulator",
    headline: "A simulator that has met the real world.",
    promise:
      "Niche environments tuned against real measurements, so your experiments begin closer to reality.",
    intro:
      "Daxtera builds simulation environments for a specific niche, then calibrates their physics, materials and behaviour against measurements from real expert work. Your team can train, fine-tune and stress-test without needing hardware time for every experiment.",
    points: [
      {
        title: "Tuned to real measurements",
        body: "Physics and materials are adjusted against measurements from Daxtera's own capture, so the simulation reflects how the task actually behaves.",
      },
      {
        title: "More experiments, less hardware time",
        body: "Train and fine-tune without booking a robot cell for every variation. Save real hardware time for the questions that need it.",
      },
      {
        title: "Stress-test rare and unsafe situations",
        body: "Put a model through conditions that would be expensive, dangerous or impossible to stage repeatedly in the real world.",
      },
      {
        title: "A digital twin of your workplace",
        body: "Plan and test changes to a cell, line or site in a niche environment that reflects the real one.",
      },
      {
        title: "Replay real edge cases",
        body: "Return to the difficult moments captured in the field, and examine how a model responds when they happen again.",
      },
    ],
    steps: [
      {
        title: "Scope the niche",
        body: "We define the task, the site and the decisions the simulator needs to support.",
      },
      {
        title: "Measure the real work",
        body: "Real expert work is captured and the physics that matter to the task are measured.",
      },
      {
        title: "Build the environment",
        body: "The niche environment is built around the working conditions your model will meet.",
      },
      {
        title: "Calibrate against reality",
        body: "The environment is tuned against real measurements and checked against held-out real work.",
      },
      {
        title: "Hand over and iterate",
        body: "You receive the environment with its fidelity documentation, ready for training and stress testing.",
      },
    ],
    receives: [
      "A niche-specific calibrated simulation environment",
      "A fidelity document showing where it matches real measurements and where it does not",
      "A replay library of real edge cases from capture",
      "Training and stress-test scenarios for the task",
      "Versioned documentation for the environment",
      "Hosted or on-premise deployment",
    ],
    receiveNote:
      "Your team should know exactly how far to trust the simulator for a given task. The fidelity document is written to make that decision easier, not to hide the limits.",
    quality: [
      {
        title: "Measured, documented fidelity",
        body: "We show how closely the simulator matches real data for the task it was built for. We do not claim it is a perfect copy of reality.",
      },
      {
        title: "Held-out validation",
        body: "The environment is checked against real work that was not used to build it, so the result is evidence rather than a demonstration.",
      },
      {
        title: "Honest limits",
        body: "Accuracy varies by task, material and contact. The fidelity document states where the simulator is strong and where it should not be relied on alone.",
      },
      {
        title: "Strict separation",
        body: "Each customer's models and data are kept strictly separate, whether the deployment is hosted or on-premise.",
      },
    ],
    fidelity: {
      heading: "Simulation cannot be a perfect copy of reality.",
      body: "We promise measured, documented fidelity. For each environment we show how closely it matches real data, where the gaps are and which conclusions it can support. Accuracy varies by task, and some interactions — contact, soft materials, unusual conditions — are harder than others.",
      note: "The right question is not whether a simulator is realistic. It is whether it is faithful enough for the decision in front of you.",
    },
    deployment: {
      heading: "Where it runs",
      body: "Deployment can be hosted or on-premise. Each customer's models and data are kept strictly separate, and access is limited to the people you name.",
    },
    related: ["real-world-data", "testing-and-comparison"],
    cta: {
      heading: "Bring us the task your simulator gets wrong.",
      body: "Tell us where experiments need to happen and what your team needs to learn. We will reply with the best place to start.",
    },
  },

  {
    slug: "testing-and-comparison",
    index: "03",
    name: "Testing and Comparison",
    shortName: "Testing and comparison",
    short:
      "Benchmarks and reports that measure your physical AI against real-world references.",
    metaTitle: "Physical AI testing and comparison",
    metaDescription:
      "Benchmark suites, comparison against real-world references and failure analysis for physical AI. Evidence you can repeat, export and use in safety and compliance reviews.",
    visual: "benchmark",
    visualLabel: "A benchmark curve closing on the real-world reference",
    photo: "/photos/gripper-test.webp",
    photoAlt:
      "A robotic gripper holding a small object during a controlled test.",
    eyebrow: "Service 03 — Testing and comparison",
    headline: "Proof that holds up outside the demo.",
    promise:
      "Benchmarks and reports that measure your physical AI against the real world, other models and its own past performance.",
    intro:
      "A result is only useful if it can be repeated and compared. Daxtera benchmark suites use held-out real work and calibrated simulation to show where a system performs, where it fails and what to do next.",
    points: [
      {
        title: "Benchmark suites for each niche",
        body: "Tasks, conditions and scoring are defined for the work your system is expected to do, not borrowed from a generic leaderboard.",
      },
      {
        title: "Comparison you can defend",
        body: "Measure against real-world reference results and against other models on the same footing, with the evidence available for review.",
      },
      {
        title: "Failure analysis that points to data",
        body: "When a system fails, the report identifies the missing conditions, contacts or outcomes, so the next capture has a clear purpose.",
      },
      {
        title: "Regression checks on every change",
        body: "Automatic checks catch a model that improves on one task while quietly getting worse on another.",
      },
      {
        title: "Reports and dashboards",
        body: "Results arrive as reports and dashboards with exportable evidence, ready for a technical review, a buyer conversation or a safety file.",
      },
    ],
    steps: [
      {
        title: "Define the question",
        body: "We agree what decision the test needs to support and what evidence would change it.",
      },
      {
        title: "Choose the reference",
        body: "The right benchmark suite is selected, or a new one is designed around the niche and the task.",
      },
      {
        title: "Run and compare",
        body: "Your system is measured against real-world references and comparable models under the same conditions.",
      },
      {
        title: "Analyse the failures",
        body: "We identify the conditions and outcomes behind each failure, and what data would address them.",
      },
      {
        title: "Review the evidence",
        body: "You receive the report and exportable evidence, with a clear baseline for the next run.",
      },
    ],
    receives: [
      "A benchmark report for the niche and task",
      "Real-world reference results and a confidence band",
      "Comparison with other models on the same benchmark",
      "A failure analysis with recommended next data",
      "A regression baseline for future model changes",
      "Exportable evidence for technical, buyer and safety reviews",
    ],
    receiveNote:
      "A benchmark is not a verdict. It is a record of what was tested, how it was measured and where the result should be trusted.",
    quality: [
      {
        title: "Independent by design",
        body: "The test is run against references and criteria agreed before the result is known.",
      },
      {
        title: "Repeatable conditions",
        body: "The same benchmark can be run again after a model change, so improvement is measured rather than assumed.",
      },
      {
        title: "Evidence for safety reviews",
        body: "Daxtera supports safety and compliance reviews with test evidence. Daxtera does not certify robots and does not hold an accreditation.",
      },
      {
        title: "Clear scope",
        body: "Every report states what was measured, what was not and which conclusions the evidence can support.",
      },
    ],
    options: [
      {
        label: "Option 01",
        title: "Self-serve benchmarks",
        body: "Run a defined benchmark suite with your own team and use the reference results as your baseline.",
      },
      {
        label: "Option 02",
        title: "Managed evaluation",
        body: "Daxtera designs and runs the evaluation, then delivers the report, failure analysis and next-data recommendations.",
      },
      {
        label: "Option 03",
        title: "Independent audit report",
        body: "An arm's-length report for a buyer, safety reviewer or partner who needs evidence from outside your team.",
      },
    ],
    safetyNote:
      "Daxtera provides test evidence that supports safety and compliance reviews. Daxtera does not certify robots, and a Daxtera report is not a certification.",
    related: ["real-world-data", "calibrated-simulator"],
    cta: {
      heading: "Tell us what you need to prove.",
      body: "Describe the decision, the system and the reviewer. We will reply with the test that fits.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slugs: string[]): Service[] {
  return slugs
    .map((slug) => getService(slug))
    .filter((service): service is Service => Boolean(service));
}

/** Shared interface copy for the three service pages. */
export const servicePageCopy = {
  breadcrumb: "Services",
  promiseLabel: "The promise",
  talk: "Talk to our team",
  allServices: "All services",
  givesLabel: "Outcomes",
  givesHeading: "What this gives you",
  givesIntro: "Outcomes first. The method stays behind the result.",
  engagementLabel: "How an engagement works",
  engagementHeading: "A clear path from first conversation to handover.",
  engagementIntro:
    "Every step has a written output, so nothing important depends on memory or goodwill.",
  receivesLabel: "Deliverables",
  receivesHeading: "What you receive",
  programsHeading: "Program types",
  programsIntro:
    "Start with a custom program, a catalog dataset, or the last mile before deployment.",
  fidelityLabel: "Honest fidelity",
  optionsHeading: "Three ways to engage",
  optionsIntro:
    "The evidence is the same. The amount of the work Daxtera owns is different.",
  qualityLabel: "Quality and trust",
  qualityHeading: "Built to be checked.",
  relatedLabel: "Related services",
  allThree: "All three services",
  loopHeading: "The whole loop",
  loopBody: "Capture, calibrate, train, test and learn — connected.",
  seeLoop: "See the loop",
  nextStep: "Next step",
} as const;

/** Copy for the /services overview (the service detail copy is in `services`). */
export const servicesOverview = {
  eyebrow: "Our services",
  headline: "Three services. One loop.",
  intro:
    "Ground truth is not one product. It is a loop: real work becomes data, data calibrates simulation, and both are used to test what a system can actually do.",
  primaryCta: "Talk to our team",
  secondaryCta: "Compare services",
  listHeading: "Start where the gap is widest.",
  listIntro:
    "Use one service on its own, or connect all three when the program needs a closed loop.",
  standardEyebrow: "One standard",
  standardHeading: "Three services. The same standard of proof.",
  standardIntro:
    "Whether the deliverable is a dataset, a simulator or a report, it should be possible to see where it came from and what it can support.",
  standardItems: [
    {
      title: "Verified experts",
      body: "Real work, done by people whose skill and identity have been checked.",
    },
    {
      title: "Measured references",
      body: "Real-world measurements anchor the data, the simulator and the test.",
    },
    {
      title: "Documented rights",
      body: "Consent, provenance and licensing travel with the work.",
    },
  ],
  closing: "Use the whole loop, or start with the service you need.",
  visionLink: "Read our vision",
  ctaEyebrow: "Not sure where to start?",
  ctaHeading:
    "Tell us about the robot and the task. We will point to the part of the loop that will teach you the most.",
  ctaButton: "Talk to our team",
} as const;
