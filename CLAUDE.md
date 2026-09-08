# Kitchen King — Project Guidelines

> New AI session, or picking this project back up? Read **`PROJECT_LOG.md`** first — it has the project's history, decisions, and current state. This file (`CLAUDE.md`) is the coding conventions only.

## Tech Stack

| Layer           | Choice                                           |
| --------------- | ------------------------------------------------ |
| Framework       | Nuxt 4 (latest)                                  |
| Animation       | Motion.dev (`motion-v`)                        |
| Styling         | CSS (shared utilities in`assets/css/main.css`) |
| Language        | JavaScript                                       |
| Package Manager | pnpm                                             |

---

## Project Structure

The folder hierarchy below is enforced. File names within each folder are decided on the go as the project grows — the hierarchy itself is what matters.

```
/
├── app/                       # Nuxt 4 srcDir
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css       # All shared/global styles, variables, utility classes
│   │   └── (images, video, logo and other static assets)
│   ├── components/
│   │   ├── layout/            # App-wide layout pieces (header, footer, nav overlay)
│   │   ├── sections/          # One component per page section
│   │   └── ui/                # Reusable UI primitives (buttons, cards, widgets)
│   ├── composables/           # Shared logic — all prefixed with "use"
│   ├── pages/                 # One .vue file per route
│   └── app.vue
└── nuxt.config.js
```

---

## Styling Rules

### Single Source of Truth — `assets/css/main.css`

All **shared and repeated CSS** must live here. No exceptions.

```css
:root {
  /* ── Colors ── */
  --color-deep:        #070707;   /* darkest accent sections */
  --color-section:     #1a1a1a;   /* default page background */
  --color-surface:     #004d42;   /* cards, elevated surfaces */
  --color-gold:        #ffca59;   /* primary accent */
  --color-gold-light:  #ffefad;
  --color-gold-200:    #fddb8a;
  --color-cream:       #f7f3ec;
  --color-offwhite:    #fafafa;   /* primary text */
  --color-bahamian:    #00c4b0;   /* secondary accent */
  --color-coral:       #e8624a;
  --color-sand:        #f5edd8;
  --color-muted:       #8bb5a0;

  /* ── Typography ── */
  --font-display: 'Hanken Grotesk', sans-serif;   /* headings */
  --font-body:    'Inter', sans-serif;             /* body text */

  /* ── Easing ── */
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);
  --ease-bounce:      cubic-bezier(0.23, 1, 0.32, 1);

  /* ── Misc ── */
  --radius-md: 8px;
  --transition-base: 0.3s ease;
}
```

### What goes WHERE

| Style type                                           | Location                                    |
| ---------------------------------------------------- | ------------------------------------------- |
| Global vars, resets, utility classes                 | `assets/css/main.css`                     |
| Component-specific styles                            | `<style scoped>` inside the `.vue` file |
| Repeated patterns (buttons, overlays, shared blocks) | `main.css` as a reusable class            |

---

## Animation — Motion.dev

Motion.dev is the only JavaScript animation library used in this project, via **`motion-v`** (the official Vue package — `@motionone/vue` is deprecated, do not use it).

### Setup

```bash
pnpm add motion-v @vueuse/core
```

Registered as a Nuxt module in `nuxt.config.js` (`modules: ['motion-v/nuxt']`), which auto-imports `Motion`, `AnimatePresence`, etc. and utilities like `useReducedMotion` — no manual imports needed in components.

### Composable pattern

All reusable animation configs live in a composable inside `composables/`. Components consume configs from there — they do not define their own. Configs must respect `prefers-reduced-motion` via `usePrefersReducedMotion()` — **not** motion-v's own `useReducedMotion()`. motion-v's version (via VueUse's `useMediaQuery`) resolves synchronously the moment it's called, which on a device that already has Reduce Motion on makes the client's first (hydration) render disagree with the server-rendered HTML. Vue doesn't force a mismatched inline `style` back in sync during hydration, so an element motion-v hid on the server can stay hidden forever. `usePrefersReducedMotion()` (in `composables/usePrefersReducedMotion.js`) always starts at `false` on both server and the client's first render, then reads the real value inside `onMounted` — so any correction is a genuine reactive update, not a hydration mismatch.

Every reduced-motion branch must also resolve to an explicit, final visible state — `{ initial: false }` alone only skips the *entrance* animation, it does not guarantee the element ends up visible. Pair it with the same `animate` target the full-motion branch uses (with `transition: { duration: 0 }`), so both branches always converge on the same rendered result:

```js
// composables/useAnimation.js
export const useAnimation = () => {
  const prefersReduced = usePrefersReducedMotion()

  const fadeUp = computed(() => prefersReduced.value
    ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      })

  const staggerContainer = computed(() => prefersReduced.value
    ? {}
    : { transition: { staggerChildren: 0.1 } })

  return { fadeUp, staggerContainer }
}
```

```vue
<script setup>
const { fadeUp } = useAnimation()
</script>

<template>
  <Motion v-bind="fadeUp">
    <slot />
  </Motion>
</template>
```

### Guidelines

- Use Motion.dev for all entrance, scroll-triggered, and interactive animations
- Pure CSS `@keyframes` is allowed only for infinite/looping animations (e.g. a scrolling marquee ticker) — these go in `main.css`
- Never place animation logic directly inside `<template>` — always go through the composable
- Respect `prefers-reduced-motion`: no motion on elements when it is set

---

## Component Rules

1. **One responsibility per component** — a card renders one card, never the grid around it
2. **Props over hardcoded content** — all data is passed via props, nothing hardcoded in the template
3. **No inline styles** — CSS classes only, always
4. **Composables for logic** — no business logic inside `<template>`
5. **`<script setup>` syntax** — always use Composition API with `<script setup>`
6. **150-line limit** — if a component grows past 150 lines, split it. If a component that supports both hover (mouse) and click (touch/keyboard) triggers for the same visual states grows past the limit, check `PROJECT_LOG.md` before forcing a split — that duplication (each state written once for `:hover` and once for a JS-driven active class) is sometimes inherent to the feature, not a sign the component is doing too much.

---

## Pages

`AppHeader`, `NavOverlay`, and `AppFooter` are mounted once, globally, in `app.vue` — not per page. Each page file only assembles section components inside `<main>`. No styles, no logic, no layout chrome in page files.

```vue
<template>
  <main>
    <!-- section components assembled here -->
  </main>
</template>
```

---

## SEO

Use Nuxt's built-in `useSeoMeta()` in every page file.

```js
useSeoMeta({
  title: 'Kitchen King | Caribbean Restaurant, Nassau Bahamas',
  description: 'Fresh Caribbean flavors in Nassau, Bahamas. Dine in, order online, or reserve a table.',
  ogTitle: 'Kitchen King',
  ogDescription: 'Fresh Caribbean flavors in Nassau, Bahamas.',
})
```

---

## Code Quality

- No unused imports
- All component file names in `PascalCase`
- All CSS class names in `kebab-case`
- All composable files prefixed with `use`
- No inline styles, ever
- 150-line component limit — split if exceeded

---

## Project Context

|               |                                                       |
| ------------- | ----------------------------------------------------- |
| Restaurant    | Kitchen King                                          |
| Location      | West Bay St · Nassau, Bahamas                        |
| Cuisine       | Caribbean / Bahamian                                  |
| Primary CTA   | "Order Now" / "Reserve a Table"                       |
| Static assets | All sourced from`app/assets/` (logo, video, images) |
