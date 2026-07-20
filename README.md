# Kitchen King

Marketing website for Kitchen King, a Caribbean restaurant on West Bay St, Nassau, Bahamas. Built as a static/SSR marketing site — no backend exists yet, which is what this README is mainly here to hand off.

Live: https://kitchen-king-ecru.vercel.app

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Nuxt 4 |
| Animation | [motion-v](https://motion-v.dev) (Vue port of Motion) |
| Styling | Plain CSS, shared tokens in `app/assets/css/main.css` |
| Package manager | pnpm |
| Hosting | Vercel |

Full frontend conventions (folder rules, styling rules, animation patterns, component size limits) are documented in **`CLAUDE.md`** — read that before touching `app/`. It was written for an AI coding agent but doubles as the project's style guide; it's accurate and worth skimming either way.

Continuing development in a fresh AI chat (or handing this to someone new)? Read **`PROJECT_LOG.md`** first — it has the project's build history, the non-obvious decisions behind how sections were built, and what's still open. Keep it updated.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm generate`, `pnpm preview`.

## Project structure

```
app/
├── assets/           images, video, fonts, main.css
├── components/
│   ├── layout/       header, footer, nav overlay — mounted once in app.vue
│   ├── sections/     one component per homepage section
│   └── ui/           buttons, icons — small reusable primitives
├── composables/       useAnimation.js (motion presets), useSiteConfig.js (business info)
└── pages/            one .vue file per route
design-refs/           original Figma exports, kept for reference, one folder per section
server/                 empty — see "Handoff notes" below
```

Everything under `app/pages/` other than `index.vue` is currently a placeholder "Coming Soon" screen — see below.

## Handoff notes for the backend developer

This was built frontend-first from Figma exports with no backend, CMS, or forms wired up. Here's everything that's currently fake and needs real integration:

### 0. Urgent — wrong stock photos in the Specials grid

`app/assets/images/special-*.jpg` (all six files) are mismatched stock photos, not real Kitchen King dishes — this is live on production right now. Concretely: `special-oxtail-nachos.jpg` is a sushi platter, `special-oxtail-sliders.jpg` is a ramen bowl, `special-oxtail-philly.jpg` is curry and naan, `special-jerk-chicken-sliders.jpg` is a cocktail, `special-plantain-fries.jpg` is a poke bowl, and `special-oxtail-sliders-2.jpg` is an ice cream dessert. None of these are Caribbean food. This predates this cleanup pass — flagging it here because it needs real photography (or at minimum correctly-matched stock photos) before this is client-ready. `menu-item-burger.jpg` and `story-prep-counter.jpg` look correct/plausible for their captions and don't have this problem.

### 1. Business info — one place to edit

`app/composables/useSiteConfig.js` holds contact info (email/phone/address), opening hours, and social media URLs. Everything that displays this data (footer, nav overlay) reads from here — **edit that one file**, don't hunt through components. The values in it right now are placeholders and need confirming with the client before launch:

- `contact.email` / `contact.phone` — currently `info@kitchenking.com` / a fake number
- `social.*` — all four are `'#'`. Real Instagram/Facebook/TikTok/LinkedIn URLs need to go here.

### 2. Pages that don't exist yet

Only the homepage (`/`) is real. These routes exist as bare "Coming Soon" stubs (see `app/components/sections/ComingSoonSection.vue`) so links don't 404, but have no real content:

- `/menu` — full menu (homepage only shows 4 preview categories)
- `/order` — online ordering flow
- `/gallery`, `/about`, `/portfolio`, `/contact`
- `/merge` — **unclear what this is.** It appeared as a real nav item in the Figma footer export but was marked hidden in the mobile nav export, and was never clarified with the client. Confirm with them whether it's a real page, a leftover Figma artifact, or a typo for something else before building it out.

### 3. Things that look interactive but aren't wired up

- **"Add to Cart" buttons** (Specials grid, Menu list) — purely decorative, no cart state or checkout exists.
- **"Order Now" button** (header) → links to `/order`, which is a stub.
- **Contact form** — doesn't exist yet; `/contact` is just a placeholder. `server/` is scaffolded and empty, ready for a `server/api/contact.post.ts` handler once there's a form to submit.
- **Menu data** (`app/components/sections/MenuSection.vue`) and **Specials data** (`app/components/sections/SpecialsSection.vue`) are hardcoded arrays in the component files, including placeholder prices (`$14` on everything) and one shared description/note used for every menu item. This is the first thing that should move to a CMS or database — right now editing the menu means editing Vue files.

### 4. Deployment

The Vercel project is already linked (`.vercel/project.json`) and deploys via `vercel deploy --prod`. `vercel.json` pins `"framework": "nuxtjs"` — Vercel's project-level framework preset kept defaulting to Next.js without it, which breaks the build, so don't remove it.

### 5. Known rough edges

- No git history yet — this repo has never been committed. Worth a clean initial commit before handoff.
- `pnpm-lock.yaml` was generated locally; Vercel's build log shows it auto-resolving a pnpm version rather than reading a pin. Not currently broken, but worth explicitly pinning a `packageManager` field in `package.json` once you've settled on a pnpm version.
- No tests exist.
