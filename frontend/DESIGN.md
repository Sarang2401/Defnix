---
version: alpha
name: Defnix
description: Engineering studio brand system — security, cloud, AI automation, web and mobile development.
colors:
  surface:
    value: "#2F3E46"
    description: "Primary dark background. Used for navbar, dark hero sections, footer, and any 'authority' surface."
  secondary:
    value: "#354F52"
    description: "Secondary dark surface. Used for cards, panels, nested menu rows, and sub-sections on top of the primary surface."
  pine:
    value: "#52796F"
    description: "Mid-tone accent. Used for primary buttons on light backgrounds, active tab states, icon tiles, dividers."
  sage:
    value: "#84A98C"
    description: "Highlight accent. Used for headline color-pop words, hover states, small caps labels, decorative tags."
  mist:
    value: "#CAD2C5"
    description: "Lightest tone. Used for text on dark surfaces, primary CTA fill, light section backgrounds."
typography:
  headline-display:
    fontFamily: "General Sans"
    fontSize: 3.5rem
    fontWeight: 600
    description: "Large hero headlines."
  headline-lg:
    fontFamily: "General Sans"
    fontSize: 2.25rem
    fontWeight: 600
    description: "Section headings."
  body-md:
    fontFamily: "Inter"
    fontSize: 1rem
    fontWeight: 400
    description: "Paragraph and body copy."
  label-caps:
    fontFamily: "Inter"
    fontSize: 0.75rem
    fontWeight: 500
    description: "Uppercase tracked-out nav items, tags, and small caps labels."
rounded:
  sm: 8px
  md: 16px
  pill: 999px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    description: "Main CTA. Solid mist fill, ink text, pill shape."
  button-secondary:
    backgroundColor: "transparent"
    borderColor: "{colors.mist}"
    textColor: "{colors.mist}"
    rounded: "{rounded.pill}"
    description: "Secondary CTA. Outline only, transparent fill."
  navbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.mist}"
    rounded: "{rounded.pill}"
    description: "Floating pill navbar, always dark regardless of section background."
  card:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.mist}"
    rounded: "{rounded.md}"
    description: "Default content card on dark sections."
  card-light:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    description: "Default content card on light sections."
---

## Overview
Defnix is an engineering studio for security, cloud, AI automation, web, and mobile development. The brand voice is quiet, precise, and technical — confident without being loud. Think "engineering firm," not "startup landing page." Layouts should feel structured and deliberate: generous whitespace, hairline dividers instead of shadows, flat color blocking instead of gradients, and restrained motion (fades, slides, no bounce or glow). When no explicit rule covers a decision, default to the calmer, more spacious option.

## Colors
- **Surface (#2F3E46):** the brand's home base. Any element meant to signal authority, structure, or "the studio itself" (navbar, footer, dark hero) sits on this.
- **Secondary (#354F52):** one step lighter than surface, used for cards and panels that sit on top of a surface background — never used as a full-page background on its own.
- **Pine (#52796F):** the workhorse accent — buttons, active states, icon fills on light backgrounds.
- **Sage (#84A98C):** the "signal" color — used sparingly for emphasis words in headlines, hover states, and small tags. Never used as a large background fill.
- **Mist (#CAD2C5):** the lightest tone — used for text on dark surfaces and as the fill for primary light-mode sections and buttons.
- Never introduce a color outside this five-value set. No gradients between them — flat fills only.

## Typography
Headlines use General Sans at 600 weight; body copy uses Inter at 400 weight. Labels and nav items are always uppercase with tracked-out letter-spacing, set in label-caps. Two weights only across the whole system — regular body and semi-bold headline — never a third weight.

## Spacing & Radius
Buttons and pills always use full radius (999px). Cards use 16px. Nothing in the system uses sharp 0px corners except hairline dividers. Spacing follows the 8/16/32/64 scale — no arbitrary values in between.

## Components
Buttons are always pill-shaped. Primary buttons are solid mist-on-surface (or surface-on-mist depending on section background); secondary buttons are outline-only. Cards never use drop shadows — separation comes from background contrast and 1px hairline borders only.

## Agent notes
- Strictly use only the five hex values above. If a design calls for a "light" or "dark" variant of a color, use mist or surface — do not invent a tint or shade outside the set.
- No drop shadows, no glow, no gradients anywhere in the system.
- Keep one component per screen when generating — do not merge navbar + hero + footer into a single generated screen.
