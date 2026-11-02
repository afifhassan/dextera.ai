import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

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

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--force-color-profile=srgb",
  ],
});

const results = {};

{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(`${BASE}/`, { waitUntil: "load" });
  await page.waitForTimeout(2200);

  const menuButton = page.locator('button[aria-controls="site-menu"]');
  await menuButton.click();
  await page.waitForTimeout(350);
  const menuOpen = {
    expanded: await menuButton.getAttribute("aria-expanded"),
    menuVisible: await page
      .getByRole("dialog", { name: "Site menu" })
      .isVisible(),
    focusInside: await page.evaluate(
      () => document.activeElement?.closest("#site-menu") !== null,
    ),
  };
  await page.screenshot({
    path: path.join(OUT, "mobile-menu.png"),
    animations: "disabled",
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(350);
  menuOpen.closed =
    (await menuButton.getAttribute("aria-expanded")) === "false";

  await page.evaluate(() => {
    const target = document.querySelector("#section-06");
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo(0, top);
  });
  await page.waitForTimeout(900);
  await page.screenshot({
    path: path.join(OUT, "mobile-contact.png"),
    animations: "disabled",
  });

  const contactFacts = await page.evaluate(() => {
    const heading = [...document.querySelectorAll("#section-06 h2")][0];
    const form = document.querySelector("#section-06 form");
    const rect = heading?.getBoundingClientRect();
    return {
      heading: heading?.textContent?.trim(),
      headingVisible: rect
        ? rect.top >= 0 && rect.bottom <= window.innerHeight
        : false,
      formExists: Boolean(form),
      overflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    };
  });

  // Contact form validation + delivery.
  await page.getByLabel("Name").fill("QA Test");
  await page.getByLabel("Work email").fill("qa@example.com");
  await page.getByLabel("Company").fill("Daxtera QA");
  await page.getByLabel("Role").fill("Head of data");
  await page.getByText("Testing", { exact: true }).click();
  await page
    .getByLabel("What are you building?")
    .fill("A mobile QA run for a physical AI pilot.");
  await page.getByRole("button", { name: "Send message" }).click();
  await page.waitForTimeout(1500);
  const contactSuccess = await page
    .getByText("Thank you. We have your message.")
    .isVisible();
  await page.screenshot({
    path: path.join(OUT, "mobile-contact-success.png"),
    animations: "disabled",
  });

  // FAQ accordion keyboard/ARIA state.
  await page.evaluate(() => {
    const target = document.querySelector("#section-07");
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo(0, top);
  });
  await page.waitForTimeout(600);
  const secondQuestion = page.getByRole("button", {
    name: /Which formats do you deliver/i,
  });
  const firstQuestion = page.getByRole("button", {
    name: /What do we receive in a dataset/i,
  });
  await secondQuestion.click();
  await page.waitForTimeout(700);
  const faq = {
    firstExpanded: await firstQuestion.getAttribute("aria-expanded"),
    secondExpanded: await secondQuestion.getAttribute("aria-expanded"),
    secondPanelVisible: await page
      .getByRole("region", { name: /Which formats do you deliver/i })
      .isVisible(),
  };
  await page.screenshot({
    path: path.join(OUT, "mobile-faq.png"),
    animations: "disabled",
  });

  results.mobile = {
    menu: menuOpen,
    contactFacts,
    contactSuccess,
    faq,
    consoleErrors: errors,
  };
  await context.close();
}

// 360 px overflow and long-form checks.
{
  const context = await browser.newContext({
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const routes = [
    "/",
    "/services",
    "/services/real-world-data",
    "/blog",
    "/vision",
    "/about",
    "/careers",
  ];
  const checks = [];
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: "load" });
    await page.waitForTimeout(500);
    checks.push(
      await page.evaluate(
        (url) => ({
          route: url,
          overflow:
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth + 1,
          h1: document.querySelectorAll("h1").length,
          main: Boolean(document.querySelector("main")),
        }),
        route,
      ),
    );
  }
  results.width360 = checks;
  await context.close();
}

// Careers application.
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/careers`, { waitUntil: "load" });
  await page.waitForTimeout(2200);
  await page.getByLabel("Name").fill("QA Applicant");
  await page.getByLabel("Email").fill("qa-applicant@example.com");
  await page.getByLabel("Role").selectOption("Annotator");
  await page.getByLabel("Portfolio or profile").fill("https://example.com/qa");
  await page
    .getByLabel("What do you do?")
    .fill("Quality assurance for this site build.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send application" }).click();
  await page.waitForTimeout(1200);
  results.careers = {
    success: await page.getByText("Thank you for writing.").isVisible(),
  };
  await context.close();
}

// Feed and metadata endpoints.
{
  const context = await browser.newContext();
  const page = await context.newPage();
  const endpoints = ["/feed.xml", "/sitemap.xml", "/robots.txt"];
  results.endpoints = [];
  for (const endpoint of endpoints) {
    const response = await page.goto(`${BASE}${endpoint}`);
    results.endpoints.push({
      endpoint,
      status: response?.status(),
      type: response?.headers()["content-type"],
      bodyStart: (await page.content()).slice(0, 90),
    });
  }
  await context.close();
}

fs.writeFileSync(
  path.join(OUT, "interactions.json"),
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));

await browser.close();
