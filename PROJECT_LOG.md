# Project Log

This file exists so a new chat — with any AI model, or a human developer — can pick this project up without the conversation history that produced it. **Read this before making changes.** It's not a changelog of every commit; it's the load-bearing decisions, gotchas, and current state that aren't obvious from reading the code alone.

Three docs, three jobs:
- **`CLAUDE.md`** — coding conventions (stack, folder structure, styling/animation rules). How to write code here.
- **`README.md`** — setup instructions and backend handoff notes. What's fake and needs real integration.
- **This file** — what's been built, why it looks the way it does, and what's still open.

**Maintenance contract:** if you do meaningful work on this project, update the "Current state" and "Session history" sections below before you stop. An out-of-date log is worse than no log — it actively misleads whoever reads it next. (The old README sat as the untouched Nuxt starter template for the entire life of this project until this was written — don't let this file suffer the same fate.)

Last updated: 2026-07-21.

---

## Current state

- **Homepage (`/`) is fully built**, 8 sections, verified against Figma reference screenshots section by section.
- **Every other route is a placeholder.** `/menu`, `/order`, `/gallery`, `/about`, `/portfolio`, `/contact`, `/merge` all render the same `ComingSoonSection` component with no real content.
- **No backend exists.** No forms, no cart, no CMS. See README "Handoff notes" for the full list of what's decorative vs. real.
- **Deployed and live**: https://kitchen-king-ecru.vercel.app — Vercel project already linked (`.vercel/project.json`), deploy via `vercel deploy --prod --yes`.
- **Pushed to GitHub**: https://github.com/easyumer/kitchen-king (private), `main` branch. History is a single squashed "Initial commit" covering everything up to this point — it does not reflect the incremental, section-by-section way this was actually built. That narrative is what the rest of this file is for.
- **Known content bug, live on production**: every image in the Specials grid (`app/assets/images/special-*.jpg`) is a mismatched stock photo — sushi, ramen, curry+naan, a cocktail, a poke bowl, a dessert — labeled as oxtail/jerk chicken/plantain dishes. None of it is Caribbean food. Needs real photography. Full detail in README.

## Homepage section order (top to bottom)

`HeroSection` → `TickerSection` → `StorySection` → `SpecialsSection` → `MenuSection` → `CtaLinksSection` → `SignatureMarqueeSection` → `FaqSection`, wrapped by `AppHeader` + `NavOverlay` (global, mounted in `app.vue`) and `AppFooter` (also global).

## Decisions worth knowing before you touch things

### Interaction & animation patterns

- **Specials and Menu use the same interaction model**: hover-to-expand on desktop, click-to-toggle as the touch/keyboard fallback. `SpecialsCard.vue` mirrors the `@media (hover: hover) and (pointer: fine)` pattern `MenuItemRow.vue` established first. This wasn't always true — Specials briefly went click-only per earlier client feedback, then was changed back to hover (2026-07-20) specifically because click allowed two cards to be expanded at once (one per row, since state used to be a per-row index) — a real bug, not a style choice. State is now a single `activeKey` shared across the whole grid so at most one card is ever active, regardless of which trigger fired it. Grid-wide dimming (siblings in the *other* row also dim, not just the current row) is done with `:has()` + `:deep()` in `SpecialsSection.vue` for the hover path, and the same single-key comparison in JS for the click/touch path — keep both in sync if you touch this again.
- **The accordion/reveal pattern used everywhere** (Specials cards, Menu items, FAQ answers) is `grid-template-rows: 0fr → 1fr` on a wrapper with `overflow: hidden` on the inner element — not `max-height` guessing. Reuse this, don't reinvent it.
- **The marquee/ticker pattern** (Ticker section, Signature Marquee) duplicates its content twice and animates `translateX(0) → translateX(-50%)`. Shared as `.ticker-track` / `@keyframes ticker-scroll` in `main.css`.
- **motion-v gotcha**: if an element has both a CSS `transform` (e.g., for centering) and a Motion-animated property like `y`, Motion's own inline `transform` wins and silently breaks the CSS one. `SignatureSlide.vue` splits this into an anchor element (CSS transform only, for centering) wrapping a Motion-controlled child (animates its own transform only). Follow that split if you hit the same issue elsewhere.
- **`PillButton.vue`'s 4 variants have an implicit hierarchy**, confirmed by how they're actually used across the site: `solid` = primary/highest-commitment (Add to Cart, hero's main CTA) → gets a hover lift + gold glow + icon nudge; `accent` = secondary navigational CTAs (Order Now, View Full Menu) → background fade + icon nudge only, deliberately no lift/glow so it doesn't outrank primary; `outline`/`dark` = tertiary/utility (nav toggle, overlay close) → subtlest feedback. This was researched (see chat, not reproduced here) rather than guessed — the specific pattern (color/shadow feedback always on, transform-based feedback gated behind `prefers-reduced-motion: no-preference`, a dedicated `:active` press state) follows current CTA/micro-interaction best practice. One bug this surfaced: `accent`'s hover fill used to be `var(--color-section)` flat, which became invisible once the palette rebrand made `--color-section` match the page background it sits on — fixed to a gold-tinted mix instead. If you add a 5th variant, decide its hierarchy tier first, then borrow the matching tier's motion treatment rather than inventing a new one.

### Visual decisions, including deliberate deviations from Figma

- **Color palette was rebranded from teal/mint to near-black/near-white** (2026-07-20): `--color-deep` `#001c18→#070707`, `--color-section` `#002e28→#1a1a1a`, `--color-gold` `#f5a623→#ffca59`, `--color-gold-light` `#feeec7→#ffefad`, `--color-offwhite` `#f0f8f5→#fafafa`. `--color-surface`, `--color-gold-200`, and the rest of the palette were untouched. The CSS variables in `main.css` (and mirrored in `CLAUDE.md`) are the source of truth, but several components have hardcoded `rgba()` literals of these same colors at custom opacities (Vue's `<style>` blocks can't do alpha-blending on a `var()` without `color-mix()`) — those were updated by hand alongside the variables. **If you add a new alpha-blended use of one of these colors, hardcode the new rgb triplet, don't reintroduce the old hex.** Full list of files touched: `HeroSection.vue`, `SpecialsCard.vue`, `FaqSection.vue`, `MenuSection.vue`, `CtaLinksSection.vue`, `MenuItemRow.vue`, `TickerSection.vue`. Deliberately left untouched: `rgba(252, 254, 254, …)` literals in `FooterLinks.vue`/`FaqItem.vue`/`MenuItemRow.vue` — that's a *different* near-white value that was never actually tied to `--color-offwhite` (a pre-existing minor inconsistency, not part of this rebrand's scope).
- **`CtaLinksSection` is a deliberate deviation from its own Figma spec.** The design file lists `border-radius: 48px` on the About/Gallery/Portfolio block, but per explicit client direction it's now a flat full-bleed rectangle (`border-radius` removed entirely) stretching edge-to-edge. Also: its hover fill originally only covered ~82% of the row width with a rounded right cap; it's now a full-bleed `inset: 0` fill with the arrow icon also flipping to dark on hover. If a future Figma export re-adds rounding here, confirm with the client before "fixing" it back — this was intentional.
- **Specials cards' hover/active content layout changed from centered-column to bottom-row** (2026-07-21, per a later Figma spec than the one used for the original build): title+description left-aligned as a group (`.specials-card__text`), "Add to Cart" pushed right by that group's `flex: 1 1 auto`. The "Add to Cart" icon changed from `IconArrowRight` to `IconPlus` to match `MenuItemRow`'s equivalent button (they were inconsistent before). `PillButton`'s shared `solid` variant also picked up a translucent dark border (`color-mix(--color-deep 60%, transparent)`) instead of gold-on-gold, per the same spec — that change applies everywhere `solid` is used (Hero, Menu, Specials), not just here.
- **FAQ section's card only rounds its top corners** (`border-radius: 48px 48px 0 0`, not a uniform `48px`) so it sits flush against the footer below with no visible seam — confirmed against an actual Figma frame screenshot mid-session. If you're ever tempted to round all four corners "for consistency" with Story/CtaLinks, don't — this one's bottom is intentionally flat.
- **Nav overlay's tablet/desktop layout was inferred, not from Figma.** Only a mobile reference screenshot was ever provided. The current breakpoint (`768px`, full-bleed sheet below it, a left-anchored rounded drawer above it) is a reasonable extrapolation, not verified against a real design. If tablet/desktop Figma frames for the nav ever turn up, check them against `NavOverlay.vue`.

### Content & data structure

- **Business info (contact, hours, social links) lives in `app/composables/useSiteConfig.js`.** Don't hardcode an email/phone/social URL in a component — pull it from there. It was duplicated in three places before this was introduced.
- **`CtaLinksSection`'s About/Gallery/Portfolio list is intentionally separate** from the real nav link lists in the footer and nav overlay — it's a curated 3-item decorative subset, not "the nav," so it wasn't merged into `useSiteConfig`. If you add centralized nav-link management later, keep this one distinct on purpose.
- **`/merge` route exists but its purpose was never clarified with the client.** It showed up as a real link in the Figma footer export but was hidden in the mobile nav export. Currently a bare stub. Resolve with the client before building it out for real.

### Component structure

- **Component splits (2026-07-21 cleanup pass)**: `FaqItem.vue` extracted from `FaqSection.vue` (one accordion row, the same parent-owns-state/child-is-presentational pattern as `MenuItemRow`/`SpecialsCard`), `FooterSocials.vue` extracted from `FooterLinks.vue` (the "Follow Us" column — its icon/copyright styles never overlapped with the other three columns, so this was a zero-duplication-cost split), `SignatureSlide.vue` extracted from `SignatureMarqueeSection.vue` (the repeated text+video "slide," which the marquee already rendered twice via `v-for` with no per-slide variation).
- **`SpecialsCard.vue` (~200 lines) and `MenuItemRow.vue` (~260 lines) are deliberately NOT split further** despite being over the 150-line guideline in `CLAUDE.md` — both are one cohesive card/row whose length comes from defining every hover-driven state twice (once under `.x--active` for the JS click/touch path, once under `@media (hover: hover)` for the CSS mouse path). There's no clean single-responsibility boundary to cut along; splitting would relocate the duplication into cross-component `:deep()` selectors without reducing it. If either grows further for an unrelated reason, reconsider then.

### Process notes

- **Figma fidelity checks**: when a user provides literal Figma CSS with absolute `top`/`left`/`width`/`height` values, the reliable way to verify a build matches is comparing `getBoundingClientRect()` deltas against those numbers directly — not eyeballing screenshots. This caught real spacing bugs in the Footer and FAQ sections that looked "close enough" visually but were off by 100+ px.
- **Figma layer dumps sometimes contain duplicated placeholder text** (e.g., every FAQ answer was identical copy-pasted text; every footer link layer was named "Link → info@kitchenking.com" regardless of what it actually linked to). Don't trust layer text/names literally when they're obviously reused boilerplate — cross-check against the reference screenshot for real content.
- **Figma proto links (`figma.com/proto/...`) can't be opened by an AI browser session** — they require the viewer to be signed into Figma, and there's no way to authenticate an automated session against that. If a proto link comes up, ask for a screenshot/export instead, or check whether the Figma MCP connector is authorized for direct file access.

## Known open questions / rough edges

- Specials images are wrong (see "Current state" above) — needs real photography.
- `/merge` route purpose unclear.
- `design-refs/homepage/02-hero/source-hero.gif` is 57 MB, over GitHub's 50 MB warning threshold (not blocking, just noisy on push). Worth Git LFS if `design-refs/` grows.
- Vercel's build log shows it auto-resolving a pnpm version rather than reading an explicit pin (`packageManager` field isn't set in `package.json`). Not currently broken — deliberately left unpinned rather than guessing a version and risking the working build, per README.
- Menu and Specials content (dishes, prices, descriptions) are hardcoded arrays inside the section components. First candidate for a real CMS/database if editing the menu shouldn't require a code change.

## How this project has been built (for continuing the pattern)

Every section so far was built the same way — follow this if the client keeps supplying Figma exports for new pages/sections:

1. User provides a reference screenshot + the raw Figma-exported CSS (usually a messy layer-by-layer dump — read past the noise for actual values).
2. Build the section as a Vue component per `CLAUDE.md` conventions.
3. Run the dev server, use a browser tool to navigate/screenshot/compare against the reference at the real viewport width the Figma frame was designed at (check the screenshot's own pixel dimensions — they usually hint at a 2x export of the real design width).
4. For pixel-sensitive sections, verify spacing numerically (`getBoundingClientRect`) against the Figma spec's literal `top`/`padding`/`gap` values rather than trusting a visual approximation.
5. Check the browser console for errors/warnings before calling it done.
6. Clean up any temp screenshots/scratch files afterward.
7. Update this log.
