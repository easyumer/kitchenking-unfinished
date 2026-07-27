# Project Log

This file exists so a new chat — with any AI model, or a human developer — can pick this project up without the conversation history that produced it. **Read this before making changes.** It's not a changelog of every commit; it's the load-bearing decisions, gotchas, and current state that aren't obvious from reading the code alone.

Three docs, three jobs:
- **`CLAUDE.md`** — coding conventions (stack, folder structure, styling/animation rules). How to write code here.
- **`README.md`** — setup instructions and backend handoff notes. What's fake and needs real integration.
- **This file** — what's been built, why it looks the way it does, and what's still open.

**Maintenance contract:** if you do meaningful work on this project, update the "Current state" section below before you stop. An out-of-date log is worse than no log — it actively misleads whoever reads it next.

Last updated: 2026-07-28.

---

## ⚠️ The homepage was reset to scratch (2026-07-28)

The client decided to **rebuild the homepage from absolute scratch**. `app/pages/index.vue` is now a blank `<main>` — the previous 8-section homepage and its header/footer chrome were deleted from `main`.

**Nothing was lost.** The entire prior build (the original 8-section homepage AND an in-progress "order-first" redesign of the hero) is preserved on the **`archive/pre-rebuild` branch** (pushed to GitHub). If you need the old Hero/Story/Specials/Menu/CtaLinks/SignatureMarquee/FAQ/Footer components, the order-first hero (AppTopBar, redesigned header, OrderBadge with the Figma "Subtract" corner cutout), or the detailed decision history behind them — check out that branch. This log intentionally does **not** re-document those deleted components; the archive branch's copy of this file does.

### What's retained on `main` (the fresh-start foundation)
- **Nuxt 4 scaffold**: `nuxt.config.js`, `package.json`, `vercel.json`, etc. — untouched.
- **Brand tokens + base CSS**: `app/assets/css/main.css` — the near-black/gold palette (see CLAUDE.md), resets, and the shared `.ticker-track` marquee utility.
- **Assets**: everything in `app/assets/images` and `app/assets/video` (logo, hero video, dish/story photos) is kept and reusable.
- **The side menu**: `NavOverlay.vue` + `NavOverlayLinks.vue` (the slide-in drawer). This was the one piece the client asked to keep. It's mounted in `app.vue`, opened by a **temporary floating "Menu" button** in `app.vue` (marked as such) — the rebuilt homepage should replace that trigger with a real header.
- **UI primitives** (`app/components/ui/`): `PillButton` + icons (arrow, chevron, menu, plus, facebook, instagram). Reusable toolkit.
- **Composables**: `useAnimation.js` (motion presets incl. `slideInLeft` used by the drawer) and `useSiteConfig.js` (business info — contact, hours, socials).
- **Other routes**: `/menu`, `/order`, `/gallery`, `/about`, `/portfolio`, `/contact`, `/merge` still render `ComingSoonSection` (kept). They were NOT part of the homepage wipe.

### Rebuilding — the workflow that has worked all along
The client supplies each section as a **reference screenshot + a raw Figma CSS dump**, one section at a time. Build each as a Vue component per `CLAUDE.md`, then:
1. Run the dev server, screenshot in a browser tool, compare against the reference at the viewport width the Figma frame was designed at (frame pixel dims usually hint at a 2× export of the real width).
2. For pixel-sensitive spacing, verify numerically with `getBoundingClientRect()` against the Figma spec's literal `top`/`padding`/`gap`/`width` values — don't eyeball it. (This caught real 100px+ bugs before.)
3. Check the browser console for errors/warnings before calling it done.
4. Clean up temp screenshots/scratch files.
5. Update this log.

Note: the client's designs are **order-first** in intent (menu/ordering surfaced early, brand later — modeled on QSR sites like KFC). Ask for the full new section lineup up front if it hasn't been given, so `index.vue` can be structured before building.

## Reusable patterns worth keeping (proven in the archived build)
These techniques are component-agnostic — reuse them in the rebuild rather than reinventing:
- **Accordion / reveal**: animate `grid-template-rows: 0fr → 1fr` on a wrapper with `overflow: hidden` on the inner element. Smooth, no `max-height` guessing.
- **Marquee / ticker**: duplicate the content twice in a track and animate `translateX(0) → translateX(-50%)`. Shared as `.ticker-track` / `@keyframes ticker-scroll` in `main.css`.
- **Hover + touch parity**: for cards/rows that expand, drive it off a JS active class for click/keyboard AND mirror the same visual states under `@media (hover: hover) and (pointer: fine)` for mouse hover. (This inherent duplication is why a couple of the archived components ran over the 150-line guideline — that's acceptable per CLAUDE.md, not a code smell.)
- **motion-v gotcha**: if an element needs both a CSS `transform` (e.g. centering) and a Motion-animated transform like `y`, Motion's inline transform silently overrides the CSS one. Split into an outer anchor (CSS transform only) wrapping a Motion-controlled child (its own transform only).
- **CSS "Subtract" cutout** (from the archived hero): to nest a badge into a notch cut out of an image card, mask the CARD with a `radial-gradient` hole (real cutout, page bg shows through) and float the badge as a SIBLING of the card, not a child. Drive the hole's radius/centre and the badge size/position off one shared CSS var so they stay aligned. Full worked example on `archive/pre-rebuild` (`HeroSection.vue` + `OrderBadge.vue`).
- **Business info stays in `useSiteConfig.js`** — never hardcode email/phone/social/hours in a component.

## Known open questions / rough edges
- **⚠️ Production deploy is blocked.** The backend dev's commit `3bc6af5` (CSP security headers, `ssr: true`, PillButton `resolveComponent` fix) is on `main` but never successfully deployed — CLI `vercel deploy` from this sandboxed environment kept stalling at `UNKNOWN` status (a connectivity issue, not a code problem; local `nuxt build` succeeds). Live production (kitchen-king-ecru.vercel.app) is still on the pre-`3bc6af5` build. Vercel's Git integration also flagged commit-author email `waqaransari70@gmail.com` as not matching the backend dev's local git config — they must fix `git config user.email` on their machine and push a fresh commit for a clean Git-triggered deploy. Deploy from the client's own machine or via connected Git; don't burn time re-attempting CLI deploys from here.
- **Specials dish photos are wrong** (on the archive branch): `app/assets/images/special-*.jpg` are mismatched stock photos (sushi, ramen, curry, a cocktail, a poke bowl, a dessert) — not Caribbean food. If the rebuild reuses them, they need real photography. See README.
- **`/merge` route** exists as a stub but its purpose was never clarified with the client.
- **`design-refs/homepage/02-hero/source-hero.gif` is 57 MB** — over GitHub's 50 MB warning threshold (not blocking). Worth Git LFS if `design-refs/` grows.
- **`packageManager` isn't pinned** in `package.json`; Vercel auto-resolves a pnpm version. Not broken, but worth pinning deliberately.
- No tests exist.
