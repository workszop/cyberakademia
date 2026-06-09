---
name: quantica-lab-design
description: Use this skill to generate well-branded interfaces and assets for Quantica Lab, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **Brand:** Quantica Lab — AI products + advisory. Tagline: "AI products. Advisory. Business impact."
- **Hero color:** Quantica Pink `#C41E54`. Hot magenta — never blue, never cold.
- **Type:** Satoshi (display + UI), Geist Mono (code/data).
- **Voice:** Strategic, outcome-driven, sentence case, no emoji, two-word periods ("Build Smarter. Scale Faster.").
- **Visual signature:** Dotted particle wave imagery in pink monochrome; chunky hexagonal Q-mark.

## Files

- `README.md` — full system documentation
- `colors_and_type.css` — design tokens (import this in any HTML you create)
- `assets/` — logos and brand reference imagery
- `ui_kits/` — recreations of Quantica's website and mobile app
- `preview/` — design system cards (visual reference)
- `slides/` — slide layout templates

## Defaults to follow

1. Always import `colors_and_type.css` and use CSS variables (`var(--quantica-pink)`, etc) — don't hardcode hex.
2. Pair Quantica Pink with white as the dominant duo. Use neutrals for body, deep berry for hover/pressed.
3. Use Lucide icons (`https://unpkg.com/lucide@latest`) as the iconography substitute — outlined, ~2px stroke, in Quantica Pink.
4. No emoji. No bluish-purple gradients as page backgrounds. No cards with colored left-border accents.
5. Buttons: pill radius for marketing, 10px radius for app contexts. Primary = solid Quantica Pink with white text.
