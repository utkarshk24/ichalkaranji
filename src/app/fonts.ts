import localFont from "next/font/local";

/**
 * Self-hosted variable fonts via next/font (preloaded, with size-adjusted fallbacks to avoid layout shift).
 * Only the subsets the portal uses are loaded: Inter's Latin face and Noto Sans Devanagari's Devanagari face,
 * each limited by unicode-range so a page downloads a face only for the scripts it actually shows.
 * Characters outside both ranges (e.g. ₹) fall through to the Devanagari face, which includes them.
 */
export const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter-face",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
    },
  ],
});

export const notoDevanagari = localFont({
  src: "../../node_modules/@fontsource-variable/noto-sans-devanagari/files/noto-sans-devanagari-devanagari-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-deva-face",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  declarations: [
    { prop: "unicode-range", value: "U+0900-097F,U+1CD0-1CF9,U+200C-200D,U+20A8,U+20B9,U+20F0,U+25CC,U+A830-A839,U+A8E0-A8FF,U+11B00-11B09" },
  ],
});
