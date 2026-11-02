import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const BASE = "http://127.0.0.1:3100";
const OUT = path.resolve("qa-new");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-color-profile=srgb"],
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const page = await context.newPage();

async function shot(name, route, fullPage = false) {
  await page.goto(`${BASE}${route}`, { waitUntil: "load" });
  await page.waitForTimeout(900);
  await page.screenshot({
    path: path.join(OUT, `${name}.png`),
    fullPage,
    animations: "disabled",
  });
}

await shot("home-top", "/");
await shot("home-full", "/", true);
await shot("services", "/services");
await shot("real-world-data", "/services/real-world-data");
await shot("simulator", "/services/calibrated-simulator");
await shot("testing", "/services/testing-and-comparison");
await shot("about", "/about");
await shot("vision", "/vision");
await shot("blog", "/blog");
await context.close();

const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  reducedMotion: "reduce",
});
const mobilePage = await mobile.newPage();
for (const [name, route] of [
  ["home-mobile", "/"],
  ["data-mobile", "/services/real-world-data"],
]) {
  await mobilePage.goto(`${BASE}${route}`, { waitUntil: "load" });
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({
    path: path.join(OUT, `${name}.png`),
    fullPage: name === "home-mobile",
    animations: "disabled",
  });
}
await mobile.close();

const motion = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const motionPage = await motion.newPage();
await motionPage.goto(`${BASE}/`, { waitUntil: "load" });
await motionPage.waitForTimeout(2400);
await motionPage.screenshot({
  path: path.join(OUT, "home-hero-motion.png"),
  animations: "disabled",
});
await motion.close();

await browser.close();
