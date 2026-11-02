/**
 * Homepage copy. Every string is typed here so the page can be edited
 * without touching a component.
 */

export const home = {
  hero: {
    index: "01",
    eyebrow: "Physical AI, grounded in the real world.",
    headline: "Ground truth for physical AI.",
    headlineAccent: "physical AI.",
    subhead:
      "Verified real-world data, calibrated simulation and independent testing, built niche by niche from the work of real experts.",
    primaryCta: { label: "Talk to our team", href: "/about#contact" },
    secondaryCta: { label: "See the Daxtera Loop", href: "#section-03" },
    quietLine: "Built for robotics teams, integrators and manufacturers.",
    facts: ["Verified experts", "Measured fidelity", "Auditable provenance"],
    sceneLabel: "Skilled motion, resolved into machine motion",
  },

  challenge: {
    index: "02",
    eyebrow: "The challenge",
    headline: "Physical AI cannot learn the real world from the internet.",
    body: "Robots need examples of skilled work that no web scrape contains: how hard to grip, how a tool resists, how a process really unfolds. Simulation helps teams move faster, but its accuracy varies from task to task. And proving a system is ready means measuring it against the real thing.",
    cards: [
      {
        title: "No real ground truth",
        body: "Skilled physical work is rarely recorded in a form models can learn from.",
      },
      {
        title: "Unknown simulation fidelity",
        body: "Simulators can drift from reality, especially around contact and soft or flexible objects.",
      },
      {
        title: "Hard-to-prove performance",
        body: "Teams need evidence they can compare, repeat and show to buyers and safety reviewers.",
      },
    ],
    visual: {
      leftLabel: "Synthetic scene",
      rightLabel: "Real-world reference",
      divergenceLabel: "Divergence",
      bridgeLabel: "Calibrated",
      caption:
        "A clean synthetic scene beside a richer real-world reference. The gap closes where the simulator is measured against reality.",
    },
  },

  loop: {
    index: "03",
    eyebrow: "The Daxtera Loop",
    headline: "One loop from real work to proven performance.",
    intro:
      "Capture, calibrate, train, test and learn. Each turn makes the next dataset and the next simulator more useful.",
    nodes: [
      {
        id: "capture",
        label: "Capture",
        body: "Verified experts perform real work, and we record it and measure the physics.",
      },
      {
        id: "calibrate",
        label: "Calibrate",
        body: "Those measurements tune niche simulation environments to match reality.",
      },
      {
        id: "train",
        label: "Train",
        body: "Teams train and fine-tune in simulation and on real data.",
      },
      {
        id: "test",
        label: "Test",
        body: "Held-out real data and calibrated simulation measure results against the real world.",
      },
      {
        id: "learn",
        label: "Learn",
        body: "Failures show exactly what is missing, which drives the next capture.",
      },
    ],
    returnLabel: "Learn returns to Capture",
    closing: "Use the whole loop, or start with the service you need.",
  },

  primitives: {
    index: "04",
    eyebrow: "Signals and actions",
    headline: "From raw signals to the actions that matter.",
    body: "Every session is captured across the signals that describe skilled work, then organized into the actions a model can learn from. Aligned, verified and documented.",
    signalsLabel: "Signals",
    actionsLabel: "Actions",
    signals: [
      {
        title: "Vision",
        body: "The scene, the tools and the material as the work unfolds.",
      },
      {
        title: "Motion",
        body: "How the expert moves, reaches and positions the tool.",
      },
      {
        title: "Touch and force",
        body: "How firmly an expert grips, and how a tool resists.",
      },
      {
        title: "Sound",
        body: "How a process sounds when it is running as it should.",
      },
      {
        title: "Environment",
        body: "The conditions around the work that change the result.",
      },
    ],
    actions: [
      {
        title: "Phases and steps",
        body: "Where each task begins, changes and ends.",
      },
      {
        title: "Contact events",
        body: "When tool meets material, and what that contact does.",
      },
      {
        title: "Outcome and quality",
        body: "What good work looks like, and how it was judged.",
      },
      {
        title: "Failures and recoveries",
        body: "What went wrong, and how the expert recovered.",
      },
      {
        title: "Safety-relevant events",
        body: "Moments that matter to a safety review.",
      },
    ],
    interactionHint:
      "Move the playhead, or scroll through the section, to see the matching action.",
    verifiedLabel: "Verified",
    rejectedLabel: "Needs review",
    rejectedNote:
      "A rejected label is flagged, corrected and replaced before delivery.",
  },

  services: {
    index: "05",
    eyebrow: "Platform and services",
    headline: "Three services. One platform.",
    intro:
      "Start where your program needs the most ground truth, then connect the rest of the loop when you are ready.",
    cards: [
      {
        slug: "real-world-data",
        index: "01",
        name: "Real-World Physical Data",
        short:
          "Model-ready datasets of real expert work, with verified labels and full documentation.",
        link: "Explore real-world data",
      },
      {
        slug: "calibrated-simulator",
        index: "02",
        name: "Calibrated Simulator",
        short:
          "Niche-specific simulation tuned to real measurements, for training, fine-tuning and stress testing.",
        link: "Explore the simulator",
      },
      {
        slug: "testing-and-comparison",
        index: "03",
        name: "Testing and Comparison",
        short:
          "Benchmarks and reports that measure your physical AI against real-world references.",
        link: "Explore testing",
      },
    ],
    builtForLabel: "Built for",
  },

  contact: {
    index: "06",
    eyebrow: "Contact",
    headline: "Tell us about your robot and your task.",
    body: "Share what you are building. We will reply with the best place to start.",
    note: "No newsletter. No automated sequence. A person reads every message.",
  },

  faq: {
    index: "07",
    eyebrow: "FAQ",
    headline: "The questions we hear first.",
    intro: "Clear answers, without the sales deck.",
  },

  careers: {
    index: "08",
    eyebrow: "Careers",
    headline: "Work on the data physical AI depends on.",
    body: "We are building a network of verified experts, capture specialists and annotators, and the team behind them.",
    cta: "See roles and apply",
  },
} as const;
