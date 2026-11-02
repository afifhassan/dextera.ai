import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { chromium } from "playwright-core";

const require = createRequire(import.meta.url);
const axeSource = fs.readFileSync(
  require.resolve("axe-core/axe.min.js"),
  "utf8",
);
const BASE = process.env.QA_BASE || "http://127.0.0.1:3100";
const OUT = path.resolve("qa");
fs.mkdirSync(OUT, { recursive: true });

const chromePath =
  [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].find((candidate) => candidate && fs.existsSync(candidate)) ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const routes = [
  ["home", "/"],
  ["services", "/services"],
  ["real-world-data", "/services/real-world-data"],
  ["calibrated-simulator", "/services/calibrated-simulator"],
  ["testing-and-comparison", "/services/testing-and-comparison"],
  ["vision", "/vision"],
  ["about", "/about"],
  ["careers", "/careers"],
  ["blog", "/blog"],
  ["blog-post", "/blog/why-simulation-fidelity-should-be-measured-not-claimed"],
];

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--force-color-profile=srgb",
    "--font-render-hinting=none",
  ],
});

const report = {
  base: BASE,
  pages: [],
  a11y: [],
  visual: {},
  performance: {},
};

async function warmPage(page) {
  await page.evaluate(async () => {
    const step = Math.max(500, window.innerHeight * 0.7);
    const height = document.documentElement.scrollHeight;
    for (let y = 0; y < height; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 45));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 450));
  });
}

async function pageFacts(page, name) {
  return page.evaluate((pageName) => {
    const images = [...document.images];
    return {
      name: pageName,
      title: document.title,
      description:
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") || "",
      h1: [...document.querySelectorAll("h1")].map((node) =>
        node.textContent?.trim(),
      ),
      imagesMissingAlt: images.filter((image) => !image.hasAttribute("alt"))
        .length,
      emptyLinks: [...document.querySelectorAll("a")].filter(
        (link) => !link.textContent?.trim() && !link.getAttribute("aria-label"),
      ).length,
      horizontalOverflow:
        document.documentElement.scrollWidth > window.innerWidth + 1,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      height: document.documentElement.scrollHeight,
      canvases: document.querySelectorAll("canvas").length,
    };
  }, name);
}

// Full-page captures in reduced motion (stable, no pinning / autoplay).
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  for (const [name, route] of routes) {
    const errors = [];
    page.removeAllListeners("console");
    page.removeAllListeners("pageerror");
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto(`${BASE}${route}`, {
      waitUntil: "load",
      timeout: 60000,
    });
    await page.waitForTimeout(1000);
    await warmPage(page);
    const facts = await pageFacts(page, name);
    facts.status = response?.status();
    facts.consoleErrors = errors;
    report.pages.push(facts);

    await page.screenshot({
      path: path.join(OUT, `${name}-desktop.png`),
      fullPage: true,
      animations: "disabled",
    });

    await page.addScriptTag({ content: axeSource });
    const results = await page.evaluate(async () => {
      const result = await axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
      });
      return result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.length,
        targets: violation.nodes.slice(0, 4).map((node) => node.target),
      }));
    });
    report.a11y.push({ name, violations: results });
  }

  await context.close();
}

// Mobile captures.
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  for (const [name, route] of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(700);
    await warmPage(page);
    const facts = await pageFacts(page, `${name}-mobile`);
    report.pages.push(facts);
    await page.screenshot({
      path: path.join(OUT, `${name}-mobile.png`),
      fullPage: true,
      animations: "disabled",
    });
  }

  await context.close();
}

// Motion screenshots and 3D check.
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2600);
  await page.screenshot({
    path: path.join(OUT, "home-hero-motion.png"),
    animations: "disabled",
  });
  const hero = await page.evaluate(() => ({
    canvas: document.querySelectorAll("canvas").length,
    webgl: (() => {
      const canvas = document.createElement("canvas");
      return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    })(),
  }));
  report.visual.hero = hero;

  await page.evaluate(() => {
    const loop = document.querySelector("#section-03");
    loop?.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(2200);
  await page.screenshot({
    path: path.join(OUT, "loop-motion.png"),
    animations: "disabled",
  });
  await context.close();
}

// Performance: mobile, 4x CPU throttle, Fast 3G-ish network.
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  await page.addInitScript(() => {
    window.__vitals = {
      lcp: 0,
      lcpElement: "",
      cls: 0,
      longTasks: 0,
      tbt: 0,
      events: [],
    };
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        window.__vitals.lcp = last.startTime;
        window.__vitals.lcpElement = last.element?.tagName || "";
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__vitals.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__vitals.longTasks += 1;
        window.__vitals.tbt += Math.max(0, entry.duration - 50);
      }
    }).observe({ type: "longtask", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__vitals.events.push({
          name: entry.name,
          duration: entry.duration,
          interactionId: entry.interactionId || 0,
        });
      }
    }).observe({ type: "event", buffered: true, durationThreshold: 16 });
  });

  const started = Date.now();
  await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 120000 });
  await page.waitForTimeout(3500);
  const loadMs = Date.now() - started;

  // Capture LCP/CLS/TBT on the settled initial viewport, before any scrolling
  // or input can move the largest-content candidate.
  const initialPerformance = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    const transfer = resources.reduce(
      (sum, entry) => sum + (entry.transferSize || 0),
      0,
    );
    return {
      lcp: Math.round(window.__vitals.lcp),
      lcpElement: window.__vitals.lcpElement,
      cls: Number(window.__vitals.cls.toFixed(4)),
      tbt: Math.round(window.__vitals.tbt),
      longTasks: window.__vitals.longTasks,
      transferKb: Math.round(transfer / 1024),
      domContentLoaded: Math.round(nav?.domContentLoadedEventEnd || 0),
      loadEvent: Math.round(nav?.loadEventEnd || 0),
      resourceCount: resources.length,
    };
  });

  await page.evaluate(() => {
    document.querySelector("#section-07")?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  });
  await page.waitForTimeout(900);
  await page
    .getByRole("button", { name: /What do we receive in a dataset/i })
    .click();
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    document.querySelector("#section-06")?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  });
  await page.waitForTimeout(500);
  await page
    .getByRole("button", { name: /See the Daxtera Loop/i })
    .click()
    .catch(() => {});

  await page.waitForTimeout(600);

  const interactionData = await page.evaluate(() => {
    const eventDurations = window.__vitals.events
      .filter((entry) => entry.interactionId)
      .map((entry) => entry.duration);
    return {
      approxInp: eventDurations.length
        ? Math.round(Math.max(...eventDurations))
        : null,
      interactions: eventDurations.length,
    };
  });

  report.performance = {
    profile: "Chrome headless, 390x844, 4x CPU throttle, 1.6 Mbps / 150 ms RTT",
    wallClockLoadMs: loadMs,
    ...initialPerformance,
    ...interactionData,
  };
  await page.screenshot({
    path: path.join(OUT, "home-mobile-performance.png"),
    animations: "disabled",
  });
  await context.close();
}

fs.writeFileSync(
  path.join(OUT, "report.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));

await browser.close();
