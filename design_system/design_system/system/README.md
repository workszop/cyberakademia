# Quantica Lab — Design System

> **Quantica Lab** builds AI products and provides strategic advisory that help ambitious businesses transform data into decisions and outcomes.
>
> *Futuristic / Strategic / Intelligent*

---

## Company context

Quantica Lab is an AI products + advisory company. The brand positions itself as the bridge between sophisticated AI capability and measurable business outcomes — strategic, intelligent, technology-forward, but humanized through warm magenta tones rather than the typical cold blue of "tech."

The visual identity is anchored by the **Quantica Q** — a chunky, geometric Q-mark formed from a hexagon with a tail, rendered in a hot magenta-pink. The mark reads as a stylized particle node, reinforcing the brand's data/AI substrate.

The signature motif throughout the system is **dotted particle wave imagery**: dense fields of pink dots that flow into wave-like topographies, evoking data, networks, and intelligence emerging from noise.

### Products represented

Based on the supplied brand reference board (`assets/brand-reference-board.png`), Quantica Lab operates across these surfaces:

1. **Marketing website** (`quanticalab.ai`) — hero-driven, with sections for Solutions / Products / Advisory / Insights / Contact.
2. **Mobile app** — an AI dashboard product showing model accuracy, active projects, demand forecasting, etc.
3. **Brand collateral** — business cards, social media posts, out-of-home advertising.
4. **Presentation/deck system** — for pitch and advisory decks (Forecast / Optimize / Grow framing).

### Sources provided

| Source | Path | Notes |
|---|---|---|
| Brand identity board | `assets/brand-reference-board.png` (uploaded as `qdesign.png`) | Complete reference: colors, type, logo, mockups, iconography. Treat as source of truth. |
| Color logo | `assets/quantica-logo-color.png` | Quantica Pink horizontal lockup. |
| White logo | `assets/quantica-logo-white.png` | For dark backgrounds (note: ships transparent — use on dark surfaces only). |

> **Note for the reader:** No codebase or Figma file was attached for this system. The system was reconstructed from the brand reference board image, which is unusually complete. If a codebase or Figma later becomes available, prefer it as ground truth and update tokens accordingly.

---

## CONTENT FUNDAMENTALS

Quantica Lab's voice is **confident, precise, outcome-oriented**. It sells AI on results, not on hype.

### Tone

- **Strategic and assured.** Headlines are short, declarative, and forward-pointing.
- **Outcomes over features.** Every claim ties to a business result (impact, accuracy, hours saved, revenue).
- **Humanized intelligence.** Despite the technical subject, copy avoids jargon. It says "AI that works" not "leveraging machine learning architectures."

### Casing

- **Sentence case** for all UI labels, buttons, and most headings.
- **UPPERCASE EYEBROWS** with letter-spacing for section labels (`PRIMARY PALETTE`, `BRAND APPLICATIONS`, `TYPOGRAPHY SYSTEM`).
- **Title Case** is rare — reserved for proper product names.

### Person

- **"You"** addresses the customer directly: *"AI solutions that move your business forward."*
- **"We"** is used sparingly, mostly in advisory/about contexts.
- Never **"I"** — Quantica is positioned as a team and platform, not an individual.

### Emoji & ornamental punctuation

- **No emoji.** Anywhere. The brand is sophisticated; emoji would undermine the gravitas.
- No exclamation marks in product copy.
- **Periods are common** at the ends of headline phrases — they add rhythm and finality: *"Build Smarter. Scale Faster."*

### Vibe

Think **McKinsey meets a quant trading firm meets a design-forward AI lab.** Confident, dense with implication, never breathless.

### Specific examples (from the brand board)

| Surface | Copy |
|---|---|
| Website hero | "AI solutions that move your business forward." / "Products for today. Strategy for tomorrow. Built for impact." |
| Tagline | "AI products. Advisory. Business impact." |
| Brand keywords | "Futuristic / Strategic / Intelligent" |
| Pitch headline | "Build Smarter. Scale Faster." |
| Subhead | "Intelligent systems for complex world." |
| OOH ad | "AI that drives real business outcomes." / "Products. Advisory. Impact." |
| Social post 1 | "AI that works. Outcomes that matter." |
| Social post 2 | "From data to decisions. Faster." |
| Social post 3 | "Strategic AI. Real business impact." |
| Deck framing | "Forecast. Optimize. Grow." |
| Promise verbs | "Model. Automate. Optimize. Deliver." |

**Pattern:** two- or three-word phrases joined by periods. Each phrase is a complete thought. No connective tissue, no filler.

---

## VISUAL FOUNDATIONS

### Color

- **Hero color:** Quantica Pink `#C41E54` — saturated magenta, used for the logo, primary buttons, headlines and brand emphasis.
- **Supporting pinks:** Rose `#FF4D9A` for highlights, Deep Berry `#8A004C` for hover/pressed and depth.
- **Neutrals:** A warm-tinted neutral ramp (Magenta Tint → Soft Lilac → Cool Gray → Light Gray → Silver) keeps the system from feeling cold. **Never pure mid-grays** — every neutral is slightly warm or has a magenta undertone.
- **Violet pair:** Violet `#7030A0` and Deep Violet `#4F1F75` are the adopted secondary direction — used alongside magenta for callouts, structure, and supporting accents.
- **Accents:** Indigo `#4F46E5`, Amber `#FFC107` for data viz and status only — **never as primary brand expression**.
- **Black** is `#111111` (near-black), never pure `#000`.

### Type

- **Display & UI:** Satoshi (300/400/500/700/900). Geometric humanist sans with a slightly mechanical feel. Negative tracking on display sizes (-1% to -2%) for a tight, confident headline.
- **Mono:** Geist Mono — used for code, data values, technical labels, and sometimes for eyebrows.
- Hierarchy is dramatic: H1 is 56px, body is 14px. Big numbers (data points like "92.4%", "+26.8%", "320 hrs") are treated as display elements.

### Backgrounds & imagery

- **Imagery is not photographic-realist.** The signature is **abstract dotted particle waves** — dense fields of pink dots that flow into wave/topography forms. Generated, not hand-drawn.
- Secondary imagery: cinematic photography of teams/screens with a **cool-to-neutral cast and a pink interactive element** (e.g. a screen showing pink charts).
- Full-bleed imagery is used sparingly, mostly for OOH and premium hero contexts.
- **Lighting motif:** bright, directional, with a pink accent — never moody.
- **Textures:** "data waves, grids, matte surfaces, depth, glass" (per the brand board).
- Gradients exist (hot pink, magenta-to-violet, spectrum) but are **used sparingly as accents** — never as page backgrounds. Solid white or solid Quantica Pink is the default surface.

### Spacing

- 8px base scale with 4px halfsteps. The brand board explicitly calls out 8/16/24/32/40/48/64/96/128 as the spacing scale.
- Layouts breathe — generous padding, never cramped. Cards have 24–32px internal padding.

### Animation & motion

The system itself doesn't define motion explicitly, but the brand voice implies:

- **Easing:** soft cubic-bezier curves; an emphasized ease-out for micro-interactions.
- **Duration:** 120–320ms for UI; 480ms for prominent transitions.
- **Style:** **fades and slides only** — no bouncy springs, no skeuomorphic physics. The brand is "intelligent," which reads as restrained.
- Hovers on the dotted-wave imagery often reveal a slow, looping particle drift.

### Hover & press states

- **Buttons (primary):** `Quantica Pink` → `Deep Berry` on hover, no scale change. Pressed state desaturates slightly (and per the brand board's design system row, a pressed button is shown in deep berry with depressed feel).
- **Buttons (secondary, outlined):** Border + text in Quantica Pink, transparent fill. Hover fills with `Magenta Tint`.
- **Links / icons:** opacity dip to 0.7, or color shift to Deep Berry.
- **No scale-on-press** as a default — the brand reads more polished than playful.

### Borders & dividers

- Default borders are 1px hairlines in Cool Gray `#E6E8EC` or one of the brand-tinted neutrals.
- **Brand outlines** (Quantica Pink) are reserved for focused inputs, selected states, and outlined buttons.
- Focus rings use Rose Pink `#FF4D9A` at 2px offset.

### Shadows

A **soft, low-contrast shadow system** — never heavy:

- `--shadow-xs` to `--shadow-lg` for neutral elevation.
- `--shadow-pink` and `--shadow-pink-soft` for elements that should "glow brand" — primary CTAs lifting off the page, hero cards.
- Inner hairline (`inset 0 0 0 1px rgba(17,17,17,0.06)`) is used to crisp up cards on white.

### Transparency & blur

- Used sparingly. Glass/blur surfaces appear in the mobile app for nav/header overlays.
- Cards on the website are solid white with a hairline border or a soft drop shadow — **not glassmorphic**.

### Imagery color cast

- Photography skews **cool/neutral-to-warm** with a deliberate pink interactive element layered in (e.g. a chart, a UI overlay, a glow).
- Abstract imagery is **monochromatic pink** — varying tints from white to magenta to deep berry, with occasional violet bleed at the spectrum edge.
- No B&W. No heavy grain.

### Corner radii

- **Buttons:** `--radius-pill` (fully rounded) for primary CTAs in the website style; `--radius-md` (10px) for app/dashboard contexts.
- **Cards:** `--radius-lg` (16px).
- **Inputs:** `--radius-md` (10px).
- **Avatar / icon containers:** `--radius-pill` for circular, `--radius-md` for squircle.

### Card anatomy

- White surface, 16–24px radius.
- Optional 1px hairline `--border-1`.
- Optional `--shadow-sm` to `--shadow-md`.
- Generous internal padding (24–32px).
- Brand-pink accent color used for primary metric, icon, or trend indicator — **never** as a left-border accent stripe (cliché the brand avoids).

### Layout rules

- **Fixed elements:** sticky top nav with a hairline border-bottom; mobile nav with translucent blur on iOS.
- Generous max-widths (1200–1280px content); never edge-to-edge text.
- Content sits on a 12-column grid with 24px gutters.

---

## ICONOGRAPHY

Quantica Lab uses **outlined icons with a single pink accent stroke**, ~1.75–2px stroke weight, with rounded line caps. Per the brand reference board, the canonical icon set covers: AI / Model, Data, Analytics, Automation, Security, Cloud, Collaboration, Insights, Performance, Support.

### Approach

- **Stroke style:** outlined (not filled), 1.75–2px stroke, rounded caps and joins.
- **Color:** Quantica Pink `#C41E54` is the default. Icons may also render in `--fg-1` or `--fg-3` for non-brand contexts.
- **Container:** icons are usually unconstrained (no background container) at ~24–32px. When containerized, they sit in a circle of `--magenta-tint` at ~40–48px.
- **No emoji.** The brand never uses emoji as a decorative element.
- **No unicode-character icons.** No `→`, `★`, `✓` standing in for real iconography.

### Implementation

Because no codebase ships its own icon set, this system uses **Lucide** (https://lucide.dev) as the substitute. Lucide matches the brand's outlined, rounded, ~2px-stroke aesthetic almost exactly. **Flag:** this is a substitution — if Quantica has a custom icon set, prefer that and update `ui_kits/*` accordingly.

Lucide is loaded from CDN (no install). Use the canonical brand-board mapping where relevant:

| Brand label | Lucide icon |
|---|---|
| AI / Model | `cpu` or `brain-circuit` |
| Data | `database` |
| Analytics | `bar-chart-3` |
| Automation | `settings-2` |
| Security | `shield-check` |
| Cloud | `cloud` |
| Collaboration | `users` |
| Insights | `lightbulb` |
| Performance | `zap` |
| Support | `headphones` |

### Logo as icon

The Quantica **Q-mark** (the chunky hexagonal Q with tail) is the most important brand asset. It can be used as a standalone icon at large sizes (~48px+) — at smaller sizes prefer the wordmark or a simplified hexagon variant.

---

## Index

- `README.md` — this file
- `colors_and_type.css` — all design tokens (colors, type, spacing, radii, shadows, motion)
- `SKILL.md` — agent skill manifest for Claude Code use
- `assets/` — logos, brand reference board, hero imagery
- `preview/` — registered Design System cards (one per concept)
- `ui_kits/` — high-fidelity recreations of Quantica surfaces
  - `ui_kits/website/` — marketing website
  - `ui_kits/app/` — mobile AI dashboard
- `slides/` — sample slide layouts in the Quantica deck style

---

## Caveats & known gaps

1. **No live codebase or Figma was provided.** The entire system was extracted from a single brand reference image. If a codebase exists, copy production tokens from it.
2. **Iconography** uses Lucide as a stand-in. Replace with Quantica's icon set if one exists.
3. **Satoshi** is a paid font loaded via Fontshare's CDN (free for use). For offline/locked-down environments, swap to local `.woff2` files.
4. **Photography** is referenced but not licensed/included — use placeholders or licensed imagery in production.
