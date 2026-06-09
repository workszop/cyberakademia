# Handoff: Quantica Lab — Design System

## Overview

This bundle is the **Quantica Lab** brand & design system, plus a reference example (a 6-page Polish-language RAG publication flyer) that exercises the system end-to-end.

Quantica Lab is an AI products + advisory company. The visual identity is anchored by a hot-magenta "Q" mark and a violet secondary, paired with a Satoshi/Geist Mono type system. Tagline: *"AI products. Advisory. Business impact."*

## About the design files

Everything in this bundle is a **design reference** — HTML/CSS/JSX prototypes that capture the intended look, tokens, components, and copy patterns of the Quantica Lab brand. It is **not production code** and is not meant to be copy-pasted into an app.

Your job is to **recreate this system inside the target codebase using its own conventions** (React, Vue, SwiftUI, native, Tailwind config, CSS-in-JS, etc.). If no codebase exists yet, pick the most appropriate framework for the project and implement the tokens + components there.

The CSS file (`colors_and_type.css`) is the only piece you might lift directly — and even then, you should translate the tokens into whatever format the target project expects (Tailwind theme, CSS variables in a layer, design-token JSON, etc.).

## Fidelity

**High-fidelity (hifi).** Colors, type, spacing, radii, and shadows are final. Recreate pixel-faithfully.

The flyer example demonstrates production-quality output: the page chrome, type rhythm, and card anatomy should feel identical when rebuilt in the target environment.

---

## What's in this bundle

```
design_handoff_quantica/
├── README.md                    ← you are here
├── colors_and_type.css          ← single source of truth for tokens
├── system/
│   ├── README.md                ← full design-system narrative (voice, visuals, iconography, caveats)
│   └── SKILL.md                 ← agent-facing skill manifest (also useful as a quick reference)
├── preview/                     ← one HTML card per concept (colors, type, spacing, components, brand)
│   ├── colors-primary.html      ← magenta + violet pair
│   ├── colors-secondary.html
│   ├── colors-accent.html
│   ├── colors-semantic.html
│   ├── colors-gradients.html
│   ├── color-pairings.html
│   ├── type-display.html
│   ├── type-hierarchy.html
│   ├── type-mono.html
│   ├── radii.html
│   ├── shadows.html
│   ├── spacing.html
│   ├── buttons-primary.html
│   ├── buttons-secondary.html
│   ├── inputs.html
│   ├── badges.html
│   ├── cards.html
│   ├── navigation.html
│   ├── iconography.html
│   ├── logo.html
│   ├── q-mark.html
│   ├── particle-wave.html
│   └── voice.html
├── ui_kits/
│   ├── website/                 ← marketing site components (Hero, Nav, FeatureCard, CTABand, MetricsBand)
│   └── app/                     ← mobile dashboard (Header, TabBar, ProjectRow, iOS frame)
├── assets/                      ← logos, Q-mark variants, brand reference board
└── examples/
    └── flyer-RAG_pub.html       ← 6-page A4 flyer using the system end-to-end
        + quantica-q-mark-white.png, quantica-logo-color.png, quantica-logo-white.png
```

Open any preview HTML in a browser. They reference `../colors_and_type.css` so keep the folder structure intact while reviewing.

---

## Design tokens

All tokens live in `colors_and_type.css`. Highlights:

### Color — primary

| Token | Value | Role |
|---|---|---|
| `--quantica-pink` | `#C41E54` | Hero. Buttons, headlines, brand emphasis. |
| `--rose-pink` | `#FF4D9A` | Highlights, focus rings. |
| `--deep-berry` | `#8A004C` | Hover/pressed, depth. |
| `--near-black` | `#111111` | Primary text, dark surfaces. **Never `#000`.** |
| `--white` | `#FFFFFF` | Light surfaces. |

### Color — violet pair (adopted secondary)

| Token | Value | Role |
|---|---|---|
| `--violet-primary` | `#7030A0` | Secondary emphasis, callouts, structure. |
| `--violet-deep` | `#4F1F75` | Foundation depth. |
| `--ink` | `#0A1F2C` | Cool-dark grounding (cover backgrounds, footers). |
| `--mist` | `#F4EEFA` | Violet-tinted atmosphere wash. |

> Legacy aliases `--teal` / `--deep-teal` map to the violet pair so older references don't break. **New work should use `--violet-primary` / `--violet-deep`.**

### Color — secondary palette (warm-tinted neutrals)

`--magenta-tint #FFE6F1`, `--soft-lilac #F3E8FF`, `--cool-gray #E6E8EC`, `--light-gray #F5F6F8`, `--silver #D1D5DB`. **No pure mid-grays.**

### Color — accents (data viz / status only)

`--electric-pink #FF20A1`, `--violet #7861FF`, `--indigo #4F46E5`, `--amber #FFC107`. Never use as primary brand expression.

### Color — semantic

Foreground: `--fg-1 #111111`, `--fg-2 #3A3A42`, `--fg-3 #6B6B76`, `--fg-4 #9A9AA5`, `--fg-on-pink #FFFFFF`, `--fg-brand #C41E54`.
Background: `--bg-1 #FFFFFF`, `--bg-2 #F5F6F8`, `--bg-3 #FFE6F1`, `--bg-inverse #111111`, `--bg-inverse-2 #1B1B22`.
Borders: `--border-1 #E6E8EC`, `--border-2 #D1D5DB`, `--border-brand #C41E54`, `--border-focus #FF4D9A`.
Status: `--status-success #00A37A`, `--status-warning #FFC107`, `--status-error #DC2626`, `--status-info #4F46E5`.

### Gradients (use sparingly — accents only, never page backgrounds)

`--grad-hot-pink`, `--grad-magenta`, `--grad-violet`, `--grad-spectrum`. See `colors_and_type.css` for stops.

### Typography

- **Display & UI:** `Satoshi` (300 / 400 / 500 / 700 / 900). Loaded from Fontshare CDN. Negative tracking on display sizes (-0.01 to -0.02em).
- **Mono:** `Geist Mono` (400 / 500 / 600). Loaded from Google Fonts. Used for code, data values, technical eyebrows, and pagination.
- **Scale:** display 72 / h1 56 / h2 28 / h3 20 / body-lg 18 / body 14 / caption 12 / micro 11.
- **Line-heights:** display 1.05, h1 1.1, h2 1.25, h3 1.4, body 1.65.
- **Weights:** light 300, regular 400, medium 500, bold 700, black 900.

### Spacing

8px base with 4px halfsteps. `--space-1` 4 → `--space-11` 128. Cards have 24–32px internal padding.

### Radii

`--radius-xs 4`, `--radius-sm 6`, `--radius-md 10`, `--radius-lg 16`, `--radius-xl 24`, `--radius-pill 999`. Buttons on the website use pill; in app contexts use md. Cards use lg.

### Shadows

Soft, low-contrast. `--shadow-xs` → `--shadow-lg` for neutral elevation. `--shadow-pink` and `--shadow-pink-soft` for elements that should "glow brand" — primary CTAs, hero cards. `--inner-hairline` for crisping cards on white. **Never heavy shadows.**

### Motion

- Durations: 120 / 200 / 320 / 480 ms.
- Easings: standard `cubic-bezier(0.2, 0.6, 0.2, 1)`, emphasized `(0.32, 0.72, 0, 1)`, out-soft `(0.16, 1, 0.3, 1)`.
- **Style: fades and slides only.** No bouncy springs. No scale-on-press for primary buttons.

---

## Components

The `preview/` folder has one card per atomic concept. The `ui_kits/` folder has assembled components for two surfaces (marketing website + mobile app). Recreate each in the target codebase using its existing component library where possible.

### Buttons

- **Primary:** `--quantica-pink` background, white text, pill radius (website) or md radius (app), `--shadow-pink-soft` lift. Hover → `--deep-berry`. **No scale on press.**
- **Secondary outlined:** transparent fill, `--quantica-pink` border + text. Hover fills with `--magenta-tint`.
- **Tertiary / link:** text-only in `--fg-brand`. Hover dims to `--deep-berry`.

### Inputs

10px radius, 1px `--border-1` hairline. Focus ring: 2px `--border-focus` (rose pink) at 2px offset.

### Cards

White surface, 16px radius, optional `--border-1` hairline, optional `--shadow-sm` to `--shadow-md`, 24–32px internal padding. **Never** use a left-border accent stripe — that's a cliché the brand avoids; if you need a brand accent, wrap the full border (see the flyer's benefit cards and closing block as the canonical pattern).

### Feature grid (`.features` / `.feature`)

Use **flexbox, not CSS grid**, so incomplete rows center automatically (e.g. 7 items → 3 + 3 + 1, last item centered):

```css
.features {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 18px;
}
.feature {
  flex: 0 0 calc(33.333% - 12px); /* exactly 3 per row with 18px gap */
  min-width: 0;
}
/* print override — gap shrinks to 14px */
@media print {
  .features { gap: 14px; }
  .feature  { flex-basis: calc(33.333% - 9.5px); }
}
/* mobile — single column */
@media screen and (max-width: 760px) {
  .feature { flex: 0 0 100%; }
}
```

### Last-page contact block pinned to bottom (`.page-final`)

The `.page` element is already `display: flex; flex-direction: column`. To pin the contact block to the bottom of the last A4 page in both screen and print, add class `.page-final` to that page section:

```css
.page-final { padding-bottom: var(--page-pad-y); }       /* screen */
.page-final .contact { margin-top: auto; }

@media print {
  .page-final { padding-bottom: 16mm; }                  /* matches other print padding */
}
```

Note: `.page-last` intentionally sets `padding-bottom: 0` so the contact block can bleed flush when needed. `.page-final` restores the margin for pages where breathing room is required.

### Badges

Pill shape. Brand badge: `--magenta-tint` bg, `--quantica-pink` text. Status variants follow semantic colors at 10–16% alpha bg.

### Iconography

**Lucide** (https://lucide.dev) is the default icon set — outlined, ~1.75–2px stroke, rounded caps. Color defaults to `--quantica-pink`; can also render in `--fg-1` or `--fg-3` for non-brand contexts. **No emoji. No unicode-character icons.**

The Quantica **Q-mark** (chunky hexagonal Q with tail) is the most important brand asset. Use as a standalone icon at 48px+; below that, prefer the wordmark.

---

## Voice & copy patterns

- **Sentence case** for UI labels, buttons, most headings.
- **UPPERCASE EYEBROWS** with letter-spacing for section labels.
- **No emoji. No exclamation marks.** Sophistication is the point.
- **Two- or three-word phrases joined by periods**: *"Build Smarter. Scale Faster." / "Forecast. Optimize. Grow." / "AI products. Advisory. Business impact."*
- **"You" addresses the customer.** "We" sparingly. Never "I".
- **Polish copy uses hyphens with spaces (` - `), not em-dashes (` — `).** Applied throughout the flyer example.

Full voice guidance in `system/README.md` § CONTENT FUNDAMENTALS and the `preview/voice.html` card.

---

## Imagery

- **Signature motif:** abstract dotted particle waves — dense fields of pink dots flowing into wave/topography forms. See `preview/particle-wave.html`.
- **Photography:** cool/neutral cast with a deliberate pink interactive element (a chart, an overlay, a glow). Never moody.
- **No B&W. No heavy grain. No glassmorphism on cards.**
- Full-bleed imagery is for hero / OOH only — never for content body.

---

## Assets

| File | Use |
|---|---|
| `assets/quantica-logo-color.png` | Pink horizontal lockup. Default for light backgrounds. |
| `assets/quantica-logo-white.png` | Transparent white lockup for dark surfaces. |
| `assets/quantica-q-mark-pink.png` | Pink Q-mark. Standalone use. |
| `assets/quantica-q-mark-white.png` | White Q-mark. For dark backgrounds (cover watermarks etc.). |
| `assets/brand-reference-board.png` | Original brand identity board the system was reconstructed from. Keep for reference. |

---

## Reference example: RAG publication flyer

`examples/flyer-RAG_pub.html` is a 6-page A4 publication (Polish-language, B2G/public-sector audience) demonstrating the system in production:

- **Cover:** ink-deep `#0A1F2C` background with a 70%-bleed white Q-mark watermark, magenta diagonal slash, white logo lockup, mono "PUBLIKACJA · 2025" caption, hero title in Satoshi 56px, subtitle in 18px regular.
- **Content pages (2–6):** white surface, page header with color logo + mono pagination (`02 / 06 · Section name`), magenta accent eyebrow, h-major headings 28px, body 14px / 1.65 line-height.
- **Cards:** numbered rows with 56px display digit, full-bordered violet benefit cards (1.5px `--violet-primary` border), full-bordered magenta highlight figure (1.5px `--quantica-pink` border on `--magenta-tint`).
- **Closing block:** full violet-bordered card with body text and inline pink emphasis.
- **Contact section (page 6):** contained block (same width as content) on `--ink` with rounded corners, white type, mono labels.
- **Print:** screen padding 14mm, print padding 11mm. A4 portrait. `@media print` styles included.

The flyer references `quantica-q-mark-white.png`, `quantica-logo-color.png`, `quantica-logo-white.png` in the same folder — they're shipped alongside it in `examples/`.

---

## Caveats & known gaps

1. **No live codebase or Figma was provided.** The system was reconstructed from the brand reference board and iterated. If a codebase exists, prefer its production tokens as ground truth.
2. **Iconography uses Lucide as a stand-in.** Replace with Quantica's icon set if one exists.
3. **Satoshi** is loaded from the Fontshare CDN (free for personal & commercial). For offline / locked-down deployments, ship local `.woff2` files and update `@font-face` in `colors_and_type.css`.
4. **Geist Mono** is loaded from Google Fonts. Same offline guidance applies.
5. **Photography** is referenced but not licensed/included — use placeholders or licensed imagery in production.
6. The `--teal` / `--deep-teal` legacy aliases exist only to keep older files compiling. New work should use `--violet-primary` / `--violet-deep`.
