<script setup>
// Not motion-v's own useReducedMotion() — see usePrefersReducedMotion.js for
// why that one can disagree with the server on the very first client render.
const prefersReduced = usePrefersReducedMotion()
const { fadeIn, fadeUp } = useAnimation()

// The `autoplay` attribute itself has to stay on for SSR/initial paint (the
// real preference isn't known until after mount — see usePrefersReducedMotion),
// so a device that already has Reduce Motion on can still have the browser
// start playback from that attribute before the correction lands. Pausing
// explicitly once the real value is in closes that gap.
const videoRef = ref(null)
watch(prefersReduced, (reduced) => {
  if (reduced) videoRef.value?.pause()
})
</script>

<template>
  <section class="hero">
    <div class="hero__frame">
      <Motion as="div" v-bind="fadeIn" class="hero__card">
        <video
          ref="videoRef"
          class="hero__media"
          src="~/assets/video/hero-loop.mp4"
          poster="~/assets/video/hero-loop-poster.jpg"
          :autoplay="!prefersReduced"
          muted
          loop
          playsinline
          aria-hidden="true"
        />
        <div class="hero__overlay" />
      </Motion>
    </div>

    <Motion as="h1" v-bind="fadeUp" class="hero__heading">Chef-Crafted<br>Comfort Food</Motion>

    <Motion as="div" v-bind="fadeUp" class="hero__cta-wrap">
      <CtaButton />
    </Motion>
  </section>
</template>

<style scoped>
.hero {
  /* Figma: card at left 20 / top 44 on a 1920px canvas; top stays a fixed 44px
     (pixel-verified), the side/bottom gutters scale with viewport width so the
     card keeps the same proportions at any screen size. */
  position: relative;
  padding: 44px calc(100vw * 20 / 1920) calc(100vw * 20 / 1920);
}

.hero__frame {
  position: relative;
}

.hero__card {
  position: relative;
  width: 100%;
  aspect-ratio: 1880 / 806;
  /* Figma outline: a rounded-rect (radius 32) with a stepped rectangular notch
     cut from the bottom-right corner — reserved for the CTA that nests there.
     Traced as one path (all corners already rounded in the source), so no
     boolean-subtract/arc math is needed this time — just applied verbatim as
     a mask. viewBox matches the card aspect so it scales without distorting. */
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1880 806' preserveAspectRatio='none'%3E%3Cpath d='M1880 630C1880 647.673 1865.67 662 1848 662H1292C1274.33 662 1260 676.327 1260 694V774C1260 791.673 1245.67 806 1228 806H32C14.3269 806 0 791.673 0 774V32C0 14.3269 14.3269 0 32 0H1848C1865.67 0 1880 14.3269 1880 32V630Z' fill='%23fff'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1880 806' preserveAspectRatio='none'%3E%3Cpath d='M1880 630C1880 647.673 1865.67 662 1848 662H1292C1274.33 662 1260 676.327 1260 694V774C1260 791.673 1245.67 806 1228 806H32C14.3269 806 0 791.673 0 774V32C0 14.3269 14.3269 0 32 0H1848C1865.67 0 1880 14.3269 1880 32V630Z' fill='%23fff'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
}

.hero__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(0deg, rgba(7, 7, 7, 0.45) 0%, rgba(7, 7, 7, 0) 100%),
    rgba(0, 0, 0, 0.2);
}

/* Figma: box 746x230 at left 48 / top 602 on the same 1920px canvas the card
   itself is measured against — positioned relative to .hero (the full-width
   frame) rather than .hero__frame (already inset by the card's own gutter),
   so it lines up with the same origin these numbers were measured from. Left
   and the box's own size scale fully with viewport width like the card does;
   top keeps the card's fixed-44px top gutter and scales only the remaining
   558px so it stays locked to the same relative spot on the card as it scales. */
.hero__heading {
  position: absolute;
  left: calc(100vw * 48 / 1920);
  top: calc(44px + 100vw * 558 / 1920);
  width: calc(100vw * 746 / 1920);
  height: calc(100vw * 230 / 1920);
  z-index: 1;
  display: flex;
  align-items: center;
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: calc(100vw * 96 / 1920);
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--color-white);
}

/* Figma "Frame 46": 596x120 button at left 1304 / top 730 — its right/bottom
   edges (1900, 850) land exactly on the card's own right/bottom edges
   (20+1880, 44+806), so it sits flush in the two flush sides of the notch and
   leaves a gap of page-background on the other two, matching the notch's own
   inset. Same fixed-top-gutter + proportional-remainder pattern as the
   heading, so it stays locked to the card as it scales. */
.hero__cta-wrap {
  position: absolute;
  left: calc(100vw * 1304 / 1920);
  top: calc(44px + 100vw * 686 / 1920);
  width: calc(100vw * 596 / 1920);
  height: calc(100vw * 120 / 1920);
  z-index: 1;
}

/* Designer's mobile spec, measured on a 390px canvas. Card top (32) and left
   gutter (8) both convert cleanly; .hero's own top padding stays fixed at
   32px (not proportional) to match, and every element below uses the same
   "32px fixed + proportional remainder" split for its own top offset so it
   stays locked to the card as the viewport scales — same pattern the desktop
   layout uses for its own fixed-44px top gutter. */
@media (max-width: 768px) {
  .hero {
    padding: 32px calc(100vw * 8 / 390) calc(100vw * 8 / 390);
  }

  /* The full composite SVG (card + button together) the designer gave shows
     this isn't a plain rounded rect after all — it's the same "Subtract"
     technique as the desktop card, just a portrait-oriented stepped notch cut
     from the bottom-right for the button to sit inside (the earlier CSS dump,
     without that combined SVG, read as a plain card with the button simply
     overlapping it — the grey "Rectangle59" in it turns out to be the notch's
     own unrounded construction bounds, not a shadow layer). viewBox matches
     the card's exact 374x665 px at the 390px reference, radius 24 throughout,
     same subtract-and-fillet path structure as the desktop notch. */
  .hero__card {
    aspect-ratio: 374 / 665;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 374 665' preserveAspectRatio='none'%3E%3Cpath d='M374 549C374 562.255 363.255 573 350 573H101C87.7452 573 77 583.745 77 597V641C77 654.255 66.2548 665 53 665H24C10.7452 665 0 654.255 0 641V24C0 10.7452 10.7452 0 24 0H350C363.255 0 374 10.7452 374 24V549Z' fill='%23fff'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 374 665' preserveAspectRatio='none'%3E%3Cpath d='M374 549C374 562.255 363.255 573 350 573H101C87.7452 573 77 583.745 77 597V641C77 654.255 66.2548 665 53 665H24C10.7452 665 0 654.255 0 641V24C0 10.7452 10.7452 0 24 0H350C363.255 0 374 10.7452 374 24V549Z' fill='%23fff'/%3E%3C/svg%3E") center / 100% 100% no-repeat;
  }

  /* No exact spec was given for the heading this round (only nav/card/button
     were) — sized/positioned to match the reference screenshot: big enough
     that even "Chef-Crafted" wraps across two lines by itself, four lines
     total, sitting in the upper portion of the card clear of the button. */
  .hero__heading {
    left: calc(100vw * 22 / 390);
    right: calc(100vw * 65 / 390);
    top: calc(32px + 100vw * 178 / 390);
    bottom: auto;
    width: auto;
    height: auto;
    font-size: calc(100vw * 56 / 390);
    line-height: 1.15;
  }

  /* Figma "Button": 285x80 at left 97 / top 617 on the same 390px canvas —
     its right/bottom edges (382, 697) land exactly on the card's own
     right/bottom edges (8+374, 32+665), flush in the notch just like the
     desktop button, with a 12px margin of the cut-away background showing on
     the other two sides. */
  .hero__cta-wrap {
    left: calc(100vw * 97 / 390);
    top: calc(32px + 100vw * 585 / 390);
    width: calc(100vw * 285 / 390);
    height: calc(100vw * 80 / 390);
  }
}
</style>
