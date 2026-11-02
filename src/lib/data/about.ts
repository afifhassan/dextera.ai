export type AboutStep = {
  index: string;
  title: string;
  body: string;
  href: string;
};

export const about = {
  title: "About us",
  headline: "A company built around what can be proved.",
  intro:
    "Daxtera exists because physical AI needs a source of truth that the internet cannot provide: the measured work of people who are good at physical tasks.",
  story: {
    heading: "Our story",
    lead: "Daxtera exists because physical AI needs a source of truth that the internet cannot provide.",
    placeholder:
      "[PLACEHOLDER: our story — origin, founders and why Daxtera exists]",
    paragraphs: [
      "Daxtera supplies the real-world ground truth that physical AI teams cannot get from the internet. Verified, experienced workers perform real work while it is recorded and measured to a documented standard.",
      "The company brings together three services that reinforce each other: real-world physical data, a calibrated simulator and independent testing. Each one makes the others more useful, niche by niche.",
    ],
  },
  howWeWork: {
    heading: "How we work",
    headline: "Three services that make each other better.",
    loopBody:
      "Capture real expert work and measure the physics. Use those measurements to calibrate the simulator. Teams train and tune in simulation and on real data. Held-out real data and calibrated simulation test the result against the real world. Failures show what is missing, which drives the next capture.",
    intro:
      "The loop is the operating model: capture real work and measure the physics, calibrate simulation against it, then test the result against the world.",
    steps: [
      {
        index: "01",
        title: "Real-world physical data",
        body: "Model-ready datasets of real expert work, with verified labels and documentation that can be audited.",
        href: "/services/real-world-data",
      },
      {
        index: "02",
        title: "Calibrated simulator",
        body: "Niche environments tuned to real measurements, for training, fine-tuning and stress testing without hardware time for every experiment.",
        href: "/services/calibrated-simulator",
      },
      {
        index: "03",
        title: "Testing and comparison",
        body: "Benchmarks and reports that measure a system against real-world references, other models and its own past performance.",
        href: "/services/testing-and-comparison",
      },
    ] satisfies AboutStep[],
    loopLabel: "The Daxtera Loop",
    loop: "Capture → Calibrate → Train → Test → Learn",
  },
  trust: {
    heading: "Trust and safety",
    headline: "Trust is a documented outcome.",
    intro:
      "Daxtera works with people, in their workplaces, and sells the result to teams who must be able to defend it. The safeguards are part of the service.",
    items: [
      {
        title: "Verified experts",
        body: "Identity, credentials where required, work history and a practical skills assessment before onboarding. Skill-graded, protocol-certified and audited over time.",
      },
      {
        title: "Written consent",
        body: "Every worker gives written consent, and the site owner consents where needed.",
      },
      {
        title: "Anonymization by default",
        body: "Privacy is designed in, not added at the end. Anonymization is the default for delivered data.",
      },
      {
        title: "Chain of custody",
        body: "Every handover is documented so the path from real work to delivered dataset can be followed.",
      },
      {
        title: "Provenance you can audit",
        body: "A provenance file a buyer's legal team can review, alongside clear ownership and licensing terms.",
      },
      {
        title: "Quality you can inspect",
        body: "Written acceptance criteria, a named quality lead, a rework policy and a sampling-based audit report with each delivery.",
      },
    ],
  },
  team: {
    heading: "The team",
    headline: "The people behind the work.",
    note: "Names, roles and biographies will appear here when they are confirmed.",
    cards: [
      { label: "[PLACEHOLDER: team member name]", role: "[PLACEHOLDER: role]" },
      { label: "[PLACEHOLDER: team member name]", role: "[PLACEHOLDER: role]" },
      { label: "[PLACEHOLDER: team member name]", role: "[PLACEHOLDER: role]" },
      { label: "[PLACEHOLDER: team member name]", role: "[PLACEHOLDER: role]" },
    ],
  },
  contact: {
    eyebrow: "Contact us",
    heading: "Tell us about your robot and your task.",
    body: "Share what you are building. We will reply with the best place to start.",
    roleLink: "Looking for a role instead?",
    closing:
      "Prefer to start with the work itself? The services page shows how the three parts fit together.",
    closingCta: "Explore the services",
  },
} as const;
