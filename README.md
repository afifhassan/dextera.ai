# Daxtera

Premium marketing site for **Daxtera**: verified real-world data, calibrated simulation and independent testing for physical AI, built niche by niche from the work of real experts.

The site is written as one calm, editorial experience. It sells outcomes. It does not explain hardware or software internals.

## Preview

- [Desktop homepage](docs/preview-desktop.png)
- [Mobile homepage](docs/preview-mobile.png)
- [Pinned loop state](docs/preview-loop.png)
- [Final QA report](docs/qa-report.json)

## Stack

- **Next.js 16** with the App Router
- **TypeScript**
- **Tailwind CSS v4**
- **three.js** + **React Three Fiber** + **drei** — procedural 3D, no external glTF files
- **GSAP ScrollTrigger** + **Lenis** — pinned loop and calm smooth scroll
- **Framer Motion** — menu, filters and form-state transitions
- **MDX** via `next-mdx-remote`, with `remark-gfm` and `rehype-highlight`
- **zod** — shared client/server form validation
- No analytics, cookies or tracking scripts

## Routes

| Route                              | Purpose                                                     |
| ---------------------------------- | ----------------------------------------------------------- |
| `/`                                | Eight-section homepage with progress rail, 3D hero and loop |
| `/services`                        | Overview of the three services and the loop                 |
| `/services/real-world-data`        | Real-World Physical Data                                    |
| `/services/calibrated-simulator`   | Calibrated Simulator                                        |
| `/services/testing-and-comparison` | Testing and Comparison                                      |
| `/blog`                            | Featured post, category filter, reading time                |
| `/blog/[slug]`                     | MDX article template with code, image and table support     |
| `/vision`                          | Vision and five principles, with a scroll-driven path       |
| `/about`                           | Story, how we work, trust and safety, team, contact form    |
| `/careers`                         | Roles from a typed data file and an application form        |
| `/feed.xml`                        | RSS 2.0 feed                                                |
| `/sitemap.xml`                     | Generated sitemap                                           |
| `/robots.txt`                      | Generated robots file                                       |

## Getting started

Requires **Node 20.9+** and **pnpm 10+**.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Production checks:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm start        # serves the production build
pnpm format
pnpm format:check
```

### Windows / pure-ESM note

`pnpm-workspace.yaml` sets `nodeLinker: hoisted` and `shamefullyHoist: true`. This is deliberate: Next's server runtime externalises the pure-ESM MDX chain (`next-mdx-remote`, `vfile`, `vfile-message`, and their transitive dependencies). Flattening those packages prevents `ERR_MODULE_NOT_FOUND` during page-data collection on Windows and in sandboxes. The lockfile is committed.

## Environment variables

| Variable               | Required           | Purpose                                                                                                  |
| ---------------------- | ------------------ | -------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended        | Canonical URL used by metadata, JSON-LD, sitemap, robots and RSS. Defaults to `https://daxtera.example`. |
| `RESEND_API_KEY`       | For email delivery | Resend API key. `[PLACEHOLDER]`                                                                          |
| `CONTACT_TO_EMAIL`     | For email delivery | Inbox that receives contact and careers submissions. `[PLACEHOLDER]`                                     |
| `CONTACT_FROM_EMAIL`   | For email delivery | Verified sender address. `[PLACEHOLDER]`                                                                 |

If the email variables are absent, submissions validate, pass spam checks and are logged server-side, then the visitor still sees a successful state. Set all three for real delivery.

## Content architecture

Main page copy lives in typed data files so it can be edited without touching a component:

- `src/lib/data/site.ts` — nav, service links, audience categories, footer
- `src/lib/data/home.ts` — all eight homepage sections
- `src/lib/data/services.ts` — the three service pages, promises, benefits, steps, deliverables, quality, options
- `src/lib/data/faq.ts` — accessible FAQ content
- `src/lib/data/vision.ts` — mission, five principles, path stages
- `src/lib/data/about.ts` — story, operating model, trust and team placeholders
- `src/lib/data/careers.ts` — roles and application content
- `src/lib/data/blog.ts` — post metadata and categories

Blog bodies are MDX in `src/content/blog/`. Add a post by adding its metadata to `src/lib/data/blog.ts` and a matching `<slug>.mdx` file.

Interface micro-labels (for example “Send message”) live with their components; substantive page copy is in the data files above.

## Design system

The exact tokens are defined once in `src/app/globals.css` (`@theme`) and mirrored in `src/lib/palette.ts` for SVG and three.js.

| Token        | Hex       | Use                                              |
| ------------ | --------- | ------------------------------------------------ |
| Ink          | `#0E2238` | Text, dark sections, footer                      |
| Bench        | `#EEF1F4` | Page background                                  |
| Signal amber | `#F0A12B` | Buttons, contact pulses, dark-section highlights |
| Trace teal   | `#17A398` | Data lines, traces, verified states on dark      |
| Deep teal    | `#0F766E` | Links and verified labels on light               |
| Steel        | `#566678` | Secondary text, borders                          |
| Flag coral   | `#C23B2B` | Rejected / needs-review flags                    |

Verified WCAG contrast (computed from the actual hex values):

| Pair               | Ratio   |
| ------------------ | ------- |
| Ink on Bench       | 14.20:1 |
| Steel on Bench     | 5.19:1  |
| Deep teal on Bench | 4.83:1  |
| Coral on Bench     | 4.68:1  |
| Ink on amber       | 7.54:1  |
| Bench on Ink       | 14.20:1 |
| Trace teal on Ink  | 5.16:1  |
| Amber on Ink       | 7.54:1  |

Amber is **fill only** on light backgrounds (1.88:1). Trace teal on Bench is used for non-text marks only (2.75:1). Steel text on light is always full opacity; opacity variants are reserved for borders and decorative marks.

Typography: **Geist** for headings/UI and **Geist Mono** for labels, numbers and indices, loaded with `next/font`. Spacing follows the 8 px scale, the grid is 12 columns, the content max width is 1280 px, cards use 12 px corners, and buttons are pills. Motion uses `cubic-bezier(0.22, 1, 0.36, 1)` at 600–900 ms with 60–80 ms staggers.

## Brand assets

The supplied Daxtera wordmark and icon are the source of truth:

- `public/brand/daxtera-wordmark-dark.png` — header lockup
- `public/brand/daxtera-icon.png` — icon, favicon and app icons
- `src/app/icon.png`, `src/app/apple-icon.png` — generated app icons

`scripts/generate-assets.py` creates the favicon, optimised wordmarks, Open Graph images, per-post OG images and the illustrative blog figure. It uses Pillow and original procedural artwork only. Run it with:

```bash
python scripts/generate-assets.py
```

No third-party 3D models, photos or illustration assets are used. All 3D scenes are built from primitives. There are no glTF files to license.

## Motion and 3D behaviour

- Every Canvas is lazy-loaded. Scene code is a separate dynamic chunk, so phones do not download three.js.
- WebGL scenes are limited to suitable viewports. Phones, low-power devices and reduced-motion users get hand-authored SVG posters.
- Rendering pauses when the scene is off-screen or the tab is hidden.
- DPR is capped at 2 desktop and 1.5 mobile.
- Particles render through point geometry (one draw call); there is no post-processing.
- `prefers-reduced-motion` disables smooth scroll, pinning, autoplay motion and 3D.
- Text is real HTML and visible in the server response. The reveal component arms itself after hydration and only animates content below the fold, so no-JS users never get hidden copy.

## Accessibility

- Semantic landmarks, one `h1` per page, skip link and a keyboard-trapping mobile dialog.
- Visible focus rings: 2 px Deep teal on light surfaces, amber on dark.
- ARIA on the menu, category filters and FAQ accordion. Closed FAQ panels are `inert`.
- All decorative SVGs are `aria-hidden`; the loop diagram has a screen-reader caption.
- Forms have associated labels, `aria-invalid`, field-level errors, live regions and a focus-first-error pass.
- Tested with axe-core WCAG 2 A/AA across ten desktop pages: **0 violations** in the final QA run.

## Forms, privacy and spam

- Contact: name, work email, company, role, interest, message.
- Careers: name, email, role, portfolio, note, consent.
- Shared zod schemas with server-side re-validation.
- Honeypot field, minimum time-on-page check and an in-memory rate limit keyed by a hashed IP.
- No cookies or analytics. Form details are used only to reply or review an application.
- Email is optional in local development and logged server-side when not configured.

## SEO

- Unique title/description and canonical URL per page.
- Open Graph and Twitter metadata, with generated 1200×630 images.
- `Organization` JSON-LD in the root layout and `Service` JSON-LD on service pages.
- Generated sitemap, robots file and RSS feed.
- Blog posts are static MDX with code highlighting and semantic headings.

## Measured QA

Measured on the final production build with headless Chrome:

**Mobile performance** — 390×844, DPR 2, 4× CPU throttle, 1.6 Mbps download / 750 kbps upload / 150 ms RTT:

| Metric                        | Result     | Goal                   |
| ----------------------------- | ---------- | ---------------------- |
| LCP                           | **1.36 s** | < 2.5 s                |
| CLS                           | **0.00**   | < 0.1                  |
| INP (lab, three interactions) | **24 ms**  | < 200 ms               |
| Total blocking time           | 574 ms     | reported, not a target |
| Transfer                      | 408 KB     | reported               |

These are lab figures, not field data. They were collected with Chrome headless; a real mid-range handset and a real network will vary.

Other checks:

- axe-core WCAG 2 A/AA: **0 violations** across all ten representative desktop pages.
- All tested routes have one `h1`, a main landmark, no missing image alt text, no empty links and no horizontal overflow.
- 360 px: all primary routes returned **no horizontal overflow**.
- Contact and careers forms: client validation, server validation, success states and email fallback verified.
- Mobile menu: opens, traps focus, closes on Escape, restores focus.
- FAQ: `aria-expanded` and `aria-controls` toggle correctly.
- `/feed.xml`, `/sitemap.xml` and `/robots.txt` return 200 with the expected content types.

Reproduce the core checks with a production server running on port 3100:

```bash
pnpm qa
pnpm qa:interactions
```

The QA scripts use `playwright-core` and the local Chrome executable. They write screenshots and JSON reports to `qa/`, which is gitignored.

## Placeholders

Missing company facts are explicit `[PLACEHOLDER: ...]` strings on purpose. Before launch, replace:

- Production URL (`NEXT_PUBLIC_SITE_URL`)
- Contact email, office location, social/platform links
- Privacy policy and terms URLs
- Our story, founders and origin
- Team member names, roles and biographies
- Role open/closed status
- Pricing and commercial terms (no prices are shown)
- Email delivery credentials (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`)

No customer names, logos, testimonials, case studies, awards, statistics or “trusted by” claims are used.

## Deployment

The project is ready for Vercel:

1. Import the repository and set the environment variables above.
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
3. Build with `pnpm build`.
4. Verify the production origin in the email provider before enabling form delivery.

The default Node runtime is used for the two small form route handlers. All content pages are statically generated or partially prerendered.
