# Project Log

This file exists so a new chat — with any AI model, or a human developer — can pick this project up without the conversation history that produced it. **Read this before making changes.** It's not a changelog of every commit; it's the load-bearing decisions, gotchas, and current state that aren't obvious from reading the code alone.

Three docs, three jobs:
- **`CLAUDE.md`** — coding conventions (stack, folder structure, styling/animation rules). How to write code here.
- **`README.md`** — setup instructions and backend handoff notes. What's fake and needs real integration.
- **This file** — what's been built, why it looks the way it does, and what's still open.

**Maintenance contract:** if you do meaningful work on this project, update the "Current state" and "Session history" sections below before you stop. An out-of-date log is worse than no log — it actively misleads whoever reads it next. (The old README sat as the untouched Nuxt starter template for the entire life of this project until this was written — don't let this file suffer the same fate.)

Last updated: 2026-07-20.

---

## Current state

- **Homepage (`/`) is fully built**, 8 sections, verified against Figma reference screenshots section by section.
- **Every other route is a placeholder.** `/menu`, `/order`, `/gallery`, `/about`, `/portfolio`, `/contact`, `/merge` all render the same `ComingSoonSection` component with no real content.
- **No backend exists.** No forms, no cart, no CMS. See README "Handoff notes" for the full list of what's decorative vs. real.
- **Deployed and live**: https://kitchen-king-ecru.vercel.app — Vercel project already linked (`.vercel/project.json`), deploy via `vercel deploy --prod --yes`.
- **No git history.** This repo has never been committed. Whoever picks this up next should make a clean initial commit.
- **Known content bug, live on production**: every image in the Specials grid (`app/assets/images/special-*.jpg`) is a mismatched stock photo — sushi, ramen, curry+naan, a cocktail, a poke bowl, a dessert — labeled as oxtail/jerk chicken/plantain dishes. None of it is Caribbean food. Needs real photography. Full detail in README.

## Homepage section order (top to bottom)

`HeroSection` → `TickerSection` → `StorySection` → `SpecialsSection` → `MenuSection` → `CtaLinksSection` → `SignatureMarqueeSection` → `FaqSection`, wrapped by `AppHeader` + `NavOverlay` (global, mounted in `app.vue`) and `AppFooter` (also global).

## Decisions worth knowing before you touch things

- **Specials vs. Menu use different interaction models on purpose.** Specials is click-to-expand; Menu is hover-to-expand. This was an explicit choice from the client during the build (not an inconsistency to "fix").
- **`CtaLinksSection`'s About/Gallery/Portfolio list is intentionally separate** from the real nav link lists in the footer and nav overlay — it's a curated 3-item decorative subset, not "the nav," so it wasn't merged into `useSiteConfig`. If you add centralized nav-link management later, keep this one distinct on purpose.
- **The accordion/reveal pattern used everywhere** (Specials cards, Menu items, FAQ answers) is `grid-template-rows: 0fr → 1fr` on a wrapper with `overflow: hidden` on the inner element — not `max-height` guessing. Reuse this, don't reinvent it.
- **The marquee/ticker pattern** (Ticker section, Signature Marquee) duplicates its content twice and animates `translateX(0) → translateX(-50%)`. Shared as `.ticker-track` / `@keyframes ticker-scroll` in `main.css`.
- **motion-v gotcha**: if an element has both a CSS `transform` (e.g., for centering) and a Motion-animated property like `y`, Motion's own inline `transform` wins and silently breaks the CSS one. `SignatureMarqueeSection.vue` splits this into an anchor element (CSS transform only, for centering) wrapping a Motion-controlled child (animates its own transform only). Follow that split if you hit the same issue elsewhere.
- **Nav overlay's tablet/desktop layout was inferred, not from Figma.** Only a mobile reference screenshot was ever provided. The current breakpoint (`768px`, full-bleed sheet below it, a left-anchored rounded drawer above it) is a reasonable extrapolation, not verified against a real design. If tablet/desktop Figma frames for the nav ever turn up, check them against `NavOverlay.vue`.
- **Business info (contact, hours, social links) lives in `app/composables/useSiteConfig.js`.** Don't hardcode an email/phone/social URL in a component — pull it from there. It was duplicated in three places before this was introduced.
- **`/merge` route exists but its purpose was never clarified with the client.** It showed up as a real link in the Figma footer export but was hidden in the mobile nav export. Currently a bare stub. Resolve with the client before building it out for real.
- **Figma fidelity checks**: when a user provides literal Figma CSS with absolute `top`/`left`/`width`/`height` values, the reliable way to verify a build matches is comparing `getBoundingClientRect()` deltas against those numbers directly — not eyeballing screenshots. This caught real spacing bugs in the Footer and FAQ sections that looked "close enough" visually but were off by 100+ px.
- **Figma layer dumps sometimes contain duplicated placeholder text** (e.g., every FAQ answer was identical copy-pasted text; every footer link layer was named "Link → info@kitchenking.com" regardless of what it actually linked to). Don't trust layer text/names literally when they're obviously reused boilerplate — cross-check against the reference screenshot for real content.

## Known open questions / rough edges

- Specials images are wrong (see "Current state" above) — needs real photography.
- `/merge` route purpose unclear.
- No git commits yet.
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
