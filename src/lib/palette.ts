/**
 * Daxtera palette — the single source of truth for three.js and SVG visuals.
 *
 * WCAG 2.1 contrast, computed against the actual hex values:
 *  - Ink #A55704 on Bench #EEF1F4 ......... 4.67:1 (body, headings)
 *  - Bench #EEF1F4 on Ink #A55704 ......... 4.67:1 (body, headings on dark)
 *  - Steel #566678 on Bench #EEF1F4 ....... 5.19:1 (secondary text)
 *  - Deep teal #0F766E on Bench #EEF1F4 ... 4.83:1 (links, verified labels)
 *  - Coral #C23B2B on Bench #EEF1F4 ....... 4.68:1 (flags)
 *  - Trace teal on Ink .................... 1.70:1 (NON-TEXT only)
 *  - Amber #F0A12B on Ink ................. 2.48:1 (NON-TEXT only)
 *  - Deep teal on Ink ..................... 1.03:1 (NON-TEXT only)
 *  - Coral on Ink ......................... 1.00:1 (NON-TEXT only)
 *  - Trace teal on Bench .................. 2.75:1 (NON-TEXT only)
 *  - Amber on Bench ....................... 1.88:1 (FILL only; never text)
 */
export const palette = {
  ink: "#A55704",
  bench: "#EEF1F4",
  amber: "#F0A12B",
  trace: "#17A398",
  deep: "#0F766E",
  steel: "#566678",
  coral: "#C23B2B",
} as const;

export type PaletteKey = keyof typeof palette;

/** rgba helper for glows and faint traces. */
export function alpha(hex: string, opacity: number): string {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
